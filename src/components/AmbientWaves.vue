<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import fallbackUrl from '@/assets/landing-dark.svg'

const canvas = ref(null)
const isActive = ref(false)
const frameInterval = 1000 / 30

let reducedMotion
let mobileViewport
let renderer
let scene
let camera
let geometry
let material
let resolution
let animationFrame = 0
let lastRenderTime = 0
let elapsedTime = 0
let currentPixelRatio = 0
let startGeneration = 0
let starting = false
let running = false
let contextLost = false
let pageHidden = false

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform float uSeed;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float random(vec2 point) {
    return fract(sin(dot(point, vec2(127.1, 311.7)) + uSeed) * 43758.5453123);
  }

  float noise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    vec2 curve = local * local * (3.0 - 2.0 * local);
    float a = random(cell);
    float b = random(cell + vec2(1.0, 0.0));
    float c = random(cell + vec2(0.0, 1.0));
    float d = random(cell + vec2(1.0, 1.0));
    return mix(mix(a, b, curve.x), mix(c, d, curve.x), curve.y);
  }

  float fbm(vec2 point) {
    float value = 0.0;
    float amplitude = 0.55;
    mat2 rotation = mat2(0.80, 0.60, -0.60, 0.80);
    for (int octave = 0; octave < 3; octave++) {
      value += amplitude * noise(point);
      point = rotation * point * 2.03 + vec2(17.1, 9.2);
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    float shortSide = max(1.0, min(uResolution.x, uResolution.y));
    vec2 point = (gl_FragCoord.xy - 0.5 * uResolution.xy) / shortSide;
    point *= 2.5;
    float time = uTime * 0.035;
    vec2 drift = vec2(time * 0.58, -time * 0.36);
    vec2 warp = vec2(
      fbm(point * 0.78 + drift + vec2(4.2, 1.7)),
      fbm(point * 0.78 - drift + vec2(8.3, 5.1))
    );
    float field = fbm(point * 1.18 + (warp - 0.5) * 0.72 + drift);
    float bands = field * 10.0;
    float distanceToLine = abs(fract(bands) - 0.5);
    float antialiasWidth = max(fwidth(bands), 0.0025);
    float line = 1.0 - smoothstep(antialiasWidth * 0.65, antialiasWidth * 1.65, distanceToLine);
    vec3 teal = vec3(0.0549, 0.4627, 0.4314);
    gl_FragColor = vec4(teal, line * 0.52);
  }
`

function stopAnimation() {
  running = false
  lastRenderTime = 0
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
  animationFrame = 0
}

function disposeScene() {
  stopAnimation()
  isActive.value = false
  geometry?.dispose()
  material?.dispose()
  try { renderer?.dispose() } catch { /* The SVG fallback remains visible. */ }
  renderer = undefined
  scene = undefined
  camera = undefined
  geometry = undefined
  material = undefined
  resolution = undefined
  currentPixelRatio = 0
}

function resizeRenderer() {
  if (!renderer || !resolution || !canvas.value) return
  const pixelRatio = Math.min(window.devicePixelRatio || 1, mobileViewport.matches ? 1.25 : 1.5)
  const width = Math.max(1, canvas.value.clientWidth)
  const height = Math.max(1, canvas.value.clientHeight)
  const drawingWidth = Math.floor(width * pixelRatio)
  const drawingHeight = Math.floor(height * pixelRatio)
  if (canvas.value.width === drawingWidth && canvas.value.height === drawingHeight && currentPixelRatio === pixelRatio) return
  currentPixelRatio = pixelRatio
  renderer.setPixelRatio(pixelRatio)
  renderer.setSize(width, height, false)
  renderer.getDrawingBufferSize(resolution)
  material.uniforms.uResolution.value.copy(resolution)
}

function renderFrame(time) {
  if (!running || !renderer || !material) return
  const timeSinceLastRender = time - lastRenderTime
  if (!lastRenderTime || timeSinceLastRender >= frameInterval) {
    const delta = lastRenderTime ? Math.min(timeSinceLastRender / 1000, 0.05) : 0
    lastRenderTime = time
    elapsedTime += delta
    try {
      resizeRenderer()
      material.uniforms.uTime.value = elapsedTime
      renderer.render(scene, camera)
      isActive.value = true
    } catch {
      disposeScene()
      return
    }
  }
  animationFrame = window.requestAnimationFrame(renderFrame)
}

function startAnimation() {
  if (running || !renderer || document.hidden || reducedMotion.matches || contextLost || pageHidden) return
  running = true
  lastRenderTime = 0
  animationFrame = window.requestAnimationFrame(renderFrame)
}

function createScene(THREE) {
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, canvas: canvas.value, powerPreference: 'low-power' })
  renderer.setClearColor(0x000000, 0)
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2)
  camera.position.z = 1
  geometry = new THREE.PlaneGeometry(2, 2)
  resolution = new THREE.Vector2(1, 1)
  material = new THREE.ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    fragmentShader,
    transparent: true,
    uniforms: {
      uResolution: { value: resolution },
      uSeed: { value: Math.random() * 1000 },
      uTime: { value: 0 },
    },
    vertexShader,
  })
  const plane = new THREE.Mesh(geometry, material)
  plane.frustumCulled = false
  scene.add(plane)
  resizeRenderer()
  renderer.render(scene, camera)
  isActive.value = true
  startAnimation()
}

async function start() {
  if (!canvas.value || starting || renderer || contextLost || pageHidden || document.hidden || reducedMotion.matches) return
  starting = true
  const generation = ++startGeneration
  try {
    const THREE = await import('three')
    if (generation !== startGeneration || contextLost || pageHidden || document.hidden || reducedMotion.matches) return
    createScene(THREE)
  } catch {
    disposeScene()
  } finally {
    if (generation === startGeneration) starting = false
  }
}

function handleMotionPreference() {
  if (reducedMotion.matches) {
    startGeneration += 1
    starting = false
    disposeScene()
  } else start()
}

function handleVisibility() {
  if (document.hidden) stopAnimation()
  else if (renderer) startAnimation()
  else start()
}

function handleContextLost(event) {
  event.preventDefault()
  contextLost = true
  startGeneration += 1
  starting = false
  disposeScene()
}

function handleContextRestored() {
  contextLost = false
  start()
}

function cleanup() {
  pageHidden = true
  startGeneration += 1
  starting = false
  disposeScene()
  document.removeEventListener('visibilitychange', handleVisibility)
  window.removeEventListener('pagehide', cleanup)
  canvas.value?.removeEventListener('webglcontextlost', handleContextLost)
  canvas.value?.removeEventListener('webglcontextrestored', handleContextRestored)
  reducedMotion?.removeEventListener?.('change', handleMotionPreference)
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  mobileViewport = window.matchMedia('(max-width: 767px)')
  canvas.value.addEventListener('webglcontextlost', handleContextLost)
  canvas.value.addEventListener('webglcontextrestored', handleContextRestored)
  document.addEventListener('visibilitychange', handleVisibility)
  window.addEventListener('pagehide', cleanup, { once: true })
  reducedMotion.addEventListener('change', handleMotionPreference)
  start()
})

onBeforeUnmount(cleanup)
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-0 bg-[#080808]" aria-hidden="true">
    <img :src="fallbackUrl" alt="" class="absolute inset-0 size-full object-cover opacity-75 transition-[opacity,visibility] duration-300 motion-reduce:visible motion-reduce:opacity-75 motion-reduce:transition-none" :class="isActive ? 'invisible' : 'visible'" />
    <canvas ref="canvas" class="absolute inset-0 block size-full transition-[opacity,visibility] duration-300 motion-reduce:hidden motion-reduce:transition-none" :class="isActive ? 'visible opacity-100' : 'invisible opacity-0'" />
  </div>
</template>
