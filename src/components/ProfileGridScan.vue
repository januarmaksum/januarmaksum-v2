<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const root = ref(null)
const canvas = ref(null)

const frameInterval = 1000 / 30
const lineThickness = 2
const gridScale = 0.1
const lineJitter = 0.1
const sensitivity = 0.4
const scanOpacity = 0.42
const scanGlow = 0.3
const scanSoftness = 2
const scanDuration = 2
const scanDelay = 2
const snapBackDelay = 250

let THREE
let reducedMotion
let mobileViewport
let preloadObserver
let visibilityObserver
let resizeObserver
let host
let renderer
let scene
let camera
let geometry
let material
let resolution
let lookTarget
let lookCurrent
let animationFrame = 0
let lastRenderTime = 0
let elapsedTime = 0
let currentPixelRatio = 0
let leaveTimer = 0
let startGeneration = 0
let starting = false
let running = false
let nearViewport = false
let sectionVisible = false
let contextLost = false
let rendererFailed = false
let pageHidden = false

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  uniform vec3 iResolution;
  uniform float iTime;
  uniform vec2 uSkew;
  uniform float uLineThickness;
  uniform vec3 uSurfaceColor;
  uniform vec3 uLinesColor;
  uniform vec3 uScanColor;
  uniform float uGridScale;
  uniform float uLineJitter;
  uniform float uScanOpacity;
  uniform float uScanGlow;
  uniform float uScanSoftness;
  uniform float uScanDuration;
  uniform float uScanDelay;
  varying vec2 vUv;

  float smoother01(float edge0, float edge1, float value) {
    float amount = clamp((value - edge0) / max(0.00001, edge1 - edge0), 0.0, 1.0);
    return amount * amount * amount * (amount * (amount * 6.0 - 15.0) + 10.0);
  }

  vec2 applyJitter(vec2 gridUv, float time, float jitter) {
    return gridUv + vec2(
      sin(gridUv.y * 2.7 + time * 1.8),
      cos(gridUv.x * 2.3 - time * 1.6)
    ) * (0.15 * jitter);
  }

  float gridMask(vec2 gridUv, float thickness) {
    float cellX = fract(gridUv.x);
    float cellY = fract(gridUv.y);
    float axisX = min(cellX, 1.0 - cellX);
    float axisY = min(cellY, 1.0 - cellY);
    float widthX = fwidth(gridUv.x);
    float widthY = fwidth(gridUv.y);
    float halfPixel = max(0.0, thickness) * 0.5;
    float lineX = 1.0 - smoothstep(halfPixel * widthX, (halfPixel + 1.0) * widthX, axisX);
    float lineY = 1.0 - smoothstep(halfPixel * widthY, (halfPixel + 1.0) * widthY, axisY);
    return max(lineX, lineY);
  }

  void main() {
    vec2 point = (2.0 * vUv * iResolution.xy - iResolution.xy) / iResolution.y;
    float aspectRatio = iResolution.x / max(1.0, iResolution.y);
    point.x *= min(1.0, 2.2 / max(1.0, aspectRatio));
    vec3 rayOrigin = vec3(0.0);
    vec3 rayDirection = normalize(vec3(point, 2.0));
    vec2 skew = clamp(uSkew, vec2(-0.7), vec2(0.7));
    rayDirection.xy += skew * rayDirection.z;

    float closestDistance = 100000.0;
    float hitIsHorizontal = 1.0;
    vec2 gridUv = vec2(0.0);
    float safeGridScale = max(0.00001, uGridScale);

    for (int index = 0; index < 4; index++) {
      float horizontal = float(index < 2);
      float position = mix(-0.2, 0.2, float(index)) * horizontal
        + mix(-0.5, 0.5, float(index - 2)) * (1.0 - horizontal);
      float numerator = position - (horizontal * rayOrigin.y + (1.0 - horizontal) * rayOrigin.x);
      float denominator = horizontal * rayDirection.y + (1.0 - horizontal) * rayDirection.x;
      float distanceAlongRay = numerator / denominator;
      vec3 hitPosition = rayOrigin + rayDirection * distanceAlongRay;
      float depthBoost = smoothstep(0.0, 3.0, hitPosition.z);
      hitPosition.xy += skew * 0.15 * depthBoost;

      bool useHit = distanceAlongRay > 0.0 && distanceAlongRay < closestDistance;
      gridUv = useHit ? mix(hitPosition.zy, hitPosition.xz, horizontal) / safeGridScale : gridUv;
      closestDistance = useHit ? distanceAlongRay : closestDistance;
      hitIsHorizontal = useHit ? horizontal : hitIsHorizontal;
    }

    vec3 hit = rayOrigin + rayDirection * closestDistance;
    float distanceFade = exp(-length(hit - rayOrigin) * 0.8);
    float jitter = clamp(uLineJitter, 0.0, 1.0);
    gridUv = applyJitter(gridUv, iTime, jitter);
    float primaryGrid = gridMask(gridUv, uLineThickness);

    vec2 alternateGridUv = (hitIsHorizontal > 0.5 ? hit.xz : hit.zy) / safeGridScale;
    alternateGridUv = applyJitter(alternateGridUv.yx, iTime * 0.86, jitter);
    float alternateGrid = gridMask(alternateGridUv, uLineThickness);
    float edgeDistanceX = min(abs(hit.x + 0.5), abs(hit.x - 0.5));
    float edgeDistanceY = min(abs(hit.y + 0.2), abs(hit.y - 0.2));
    float edgeDistance = mix(edgeDistanceY, edgeDistanceX, hitIsHorizontal);
    alternateGrid *= 1.0 - smoothstep(safeGridScale * 0.5, safeGridScale * 2.0, edgeDistance);

    float lineVisibility = max(primaryGrid, alternateGrid);
    float lineStrength = lineVisibility * mix(0.70, 1.0, distanceFade);
    float duration = max(0.05, uScanDuration);
    float delay = max(0.0, uScanDelay);
    float pingPongTime = mod(max(0.0, iTime - delay), duration * 2.0);
    float phase = pingPongTime < duration
      ? pingPongTime / duration
      : 1.0 - (pingPongTime - duration) / duration;
    float scanDepth = phase * 2.0;
    float distanceToScan = abs(hit.z - scanDepth);
    float sigma = max(0.001, 0.18 * max(0.1, uScanGlow) * uScanSoftness);
    float scanBand = exp(-0.5 * distanceToScan * distanceToScan / (sigma * sigma));
    float scanAura = exp(-0.5 * distanceToScan * distanceToScan / (sigma * sigma * 4.0));
    float phaseWindow = smoother01(0.0, 0.45, phase) * (1.0 - smoother01(0.55, 1.0, phase));
    float scanPulse = scanBand * phaseWindow * clamp(uScanOpacity, 0.0, 1.0);
    float auraPulse = scanAura * phaseWindow * clamp(uScanOpacity, 0.0, 1.0) * 0.25;

    float scanStrength = clamp(scanPulse + auraPulse, 0.0, uScanOpacity);
    vec3 color = mix(uSurfaceColor, uScanColor, scanStrength);
    color = mix(color, uLinesColor, clamp(lineStrength * 0.92, 0.0, 0.92));
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
    #include <colorspace_fragment>
  }
`

function stopAnimation() {
  running = false
  lastRenderTime = 0
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
  animationFrame = 0
}

function disposeRenderer() {
  stopAnimation()
  geometry?.dispose()
  material?.dispose()
  renderer?.renderLists?.dispose()
  try { renderer?.dispose() } catch { /* The section background remains visible. */ }
  renderer = undefined
  scene = undefined
  camera = undefined
  geometry = undefined
  material = undefined
  resolution = undefined
  lookTarget = undefined
  lookCurrent = undefined
  currentPixelRatio = 0
  elapsedTime = 0
}

function resizeRenderer() {
  if (!renderer || !material || !resolution || !root.value) return
  const width = Math.max(1, root.value.clientWidth)
  const height = Math.max(1, root.value.clientHeight)
  const pixelRatio = Math.min(window.devicePixelRatio || 1, mobileViewport.matches ? 1.25 : 1.5)
  const drawingWidth = Math.floor(width * pixelRatio)
  const drawingHeight = Math.floor(height * pixelRatio)

  if (canvas.value.width === drawingWidth && canvas.value.height === drawingHeight && currentPixelRatio === pixelRatio) return

  currentPixelRatio = pixelRatio
  renderer.setPixelRatio(pixelRatio)
  renderer.setSize(width, height, false)
  renderer.getDrawingBufferSize(resolution)
  material.uniforms.iResolution.value.set(resolution.x, resolution.y, pixelRatio)
}

function renderFrame(time) {
  if (!running || !renderer || !material || !lookCurrent || !lookTarget) return

  const timeSinceLastRender = time - lastRenderTime
  if (!lastRenderTime || timeSinceLastRender >= frameInterval) {
    const delta = lastRenderTime ? Math.min(timeSinceLastRender / 1000, 0.05) : 0
    lastRenderTime = time
    elapsedTime += delta

    try {
      const smoothTime = THREE.MathUtils.lerp(0.45, 0.12, sensitivity)
      const skewScale = THREE.MathUtils.lerp(0.06, 0.2, sensitivity)
      const yBoost = THREE.MathUtils.lerp(1.2, 1.6, sensitivity)
      const smoothing = delta ? 1 - Math.exp(-delta / smoothTime) : 1
      lookCurrent.lerp(lookTarget, smoothing)
      material.uniforms.uSkew.value.set(lookCurrent.x * skewScale, -lookCurrent.y * yBoost * skewScale)
      material.uniforms.iTime.value = elapsedTime
      renderer.render(scene, camera)
    } catch {
      rendererFailed = true
      disposeRenderer()
      return
    }
  }

  animationFrame = window.requestAnimationFrame(renderFrame)
}

function startAnimation() {
  if (running || !renderer || !sectionVisible || document.hidden || reducedMotion.matches || contextLost || pageHidden) return
  running = true
  lastRenderTime = 0
  animationFrame = window.requestAnimationFrame(renderFrame)
}

function createRenderer() {
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false,
    canvas: canvas.value,
    powerPreference: 'low-power',
  })
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.NoToneMapping

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  geometry = new THREE.PlaneGeometry(2, 2)
  resolution = new THREE.Vector2(1, 1)
  lookTarget = new THREE.Vector2(0, 0)
  lookCurrent = new THREE.Vector2(0, 0)

  const toLinearColor = (color) => new THREE.Color(color).convertSRGBToLinear()
  material = new THREE.ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    fragmentShader,
    transparent: true,
    uniforms: {
      iResolution: { value: new THREE.Vector3(1, 1, 1) },
      iTime: { value: 0 },
      uGridScale: { value: gridScale },
      uLineJitter: { value: lineJitter },
      uSurfaceColor: { value: toLinearColor('#5d5c65') },
      uLinesColor: { value: toLinearColor('#51465F') },
      uLineThickness: { value: lineThickness },
      uScanColor: { value: toLinearColor('#E6FF40') },
      uScanDelay: { value: scanDelay },
      uScanDuration: { value: scanDuration },
      uScanGlow: { value: scanGlow },
      uScanOpacity: { value: scanOpacity },
      uScanSoftness: { value: scanSoftness },
      uSkew: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader,
  })

  const plane = new THREE.Mesh(geometry, material)
  plane.frustumCulled = false
  scene.add(plane)
  resizeRenderer()
  renderer.render(scene, camera)
  startAnimation()
}

async function startRenderer() {
  if (!canvas.value || starting || renderer || rendererFailed || contextLost || pageHidden || !nearViewport || reducedMotion.matches) return
  starting = true
  const generation = ++startGeneration

  try {
    THREE ||= await import('three')
    if (generation !== startGeneration || contextLost || pageHidden || !nearViewport || reducedMotion.matches) return
    createRenderer()
  } catch {
    rendererFailed = true
    disposeRenderer()
  } finally {
    if (generation === startGeneration) starting = false
  }
}

function handlePointerMove(event) {
  if ((event.pointerType !== 'mouse' && event.pointerType !== 'pen') || !lookTarget || !host) return
  if (leaveTimer) window.clearTimeout(leaveTimer)
  leaveTimer = 0
  const bounds = host.getBoundingClientRect()
  const x = ((event.clientX - bounds.left) / Math.max(1, bounds.width)) * 2 - 1
  const y = -(((event.clientY - bounds.top) / Math.max(1, bounds.height)) * 2 - 1)
  lookTarget.set(THREE.MathUtils.clamp(x, -1, 1), THREE.MathUtils.clamp(y, -1, 1))
}

function handlePointerEnter(event) {
  if (event.pointerType === 'touch' || !leaveTimer) return
  window.clearTimeout(leaveTimer)
  leaveTimer = 0
}

function handlePointerLeave(event) {
  if ((event.pointerType !== 'mouse' && event.pointerType !== 'pen') || !lookTarget) return
  if (leaveTimer) window.clearTimeout(leaveTimer)
  leaveTimer = window.setTimeout(() => lookTarget?.set(0, 0), snapBackDelay)
}

function handleMotionPreference() {
  startGeneration += 1
  starting = false

  if (reducedMotion.matches) disposeRenderer()
  else startRenderer()
}

function handleVisibility() {
  if (document.hidden) stopAnimation()
  else if (renderer) startAnimation()
  else startRenderer()
}

function handleContextLost(event) {
  event.preventDefault()
  contextLost = true
  startGeneration += 1
  starting = false
  disposeRenderer()
}

function handleContextRestored() {
  contextLost = false
  rendererFailed = false
  startRenderer()
}

function cleanup() {
  pageHidden = true
  startGeneration += 1
  starting = false
  if (leaveTimer) window.clearTimeout(leaveTimer)
  leaveTimer = 0
  preloadObserver?.disconnect()
  visibilityObserver?.disconnect()
  resizeObserver?.disconnect()
  host?.removeEventListener('pointermove', handlePointerMove)
  host?.removeEventListener('pointerenter', handlePointerEnter)
  host?.removeEventListener('pointerleave', handlePointerLeave)
  document.removeEventListener('visibilitychange', handleVisibility)
  window.removeEventListener('pagehide', cleanup)
  canvas.value?.removeEventListener('webglcontextlost', handleContextLost)
  canvas.value?.removeEventListener('webglcontextrestored', handleContextRestored)
  reducedMotion?.removeEventListener?.('change', handleMotionPreference)
  disposeRenderer()
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  mobileViewport = window.matchMedia('(max-width: 767px)')
  host = root.value.parentElement

  host.addEventListener('pointermove', handlePointerMove, { passive: true })
  host.addEventListener('pointerenter', handlePointerEnter, { passive: true })
  host.addEventListener('pointerleave', handlePointerLeave, { passive: true })
  canvas.value.addEventListener('webglcontextlost', handleContextLost)
  canvas.value.addEventListener('webglcontextrestored', handleContextRestored)
  document.addEventListener('visibilitychange', handleVisibility)
  window.addEventListener('pagehide', cleanup, { once: true })
  reducedMotion.addEventListener('change', handleMotionPreference)

  resizeObserver = new ResizeObserver(resizeRenderer)
  resizeObserver.observe(root.value)

  preloadObserver = new IntersectionObserver((entries) => {
    nearViewport = entries[0]?.isIntersecting ?? false
    if (nearViewport) startRenderer()
  }, { rootMargin: '200px 0px' })
  preloadObserver.observe(root.value)

  visibilityObserver = new IntersectionObserver((entries) => {
    sectionVisible = entries[0]?.isIntersecting ?? false
    if (sectionVisible) {
      if (renderer) startAnimation()
      else startRenderer()
    } else stopAnimation()
  }, { threshold: 0.01 })
  visibilityObserver.observe(root.value)
})

onBeforeUnmount(cleanup)
</script>

<template>
  <div ref="root" class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <canvas
      ref="canvas"
      class="absolute inset-0 block size-full motion-reduce:hidden"
    />
  </div>
</template>
