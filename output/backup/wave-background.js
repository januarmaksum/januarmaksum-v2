const canvas = document.querySelector("#ambient-waves");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileViewport = window.matchMedia("(max-width: 767px)");
const frameInterval = 1000 / 30;

let threeModulePromise;
let renderer;
let scene;
let camera;
let geometry;
let material;
let resolution;
let animationFrame = 0;
let lastRenderTime = 0;
let elapsedTime = 0;
let currentPixelRatio = 0;
let startGeneration = 0;
let starting = false;
let running = false;
let contextLost = false;
let pageHidden = false;

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

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
`;

const loadThree = () => {
  if (!threeModulePromise) {
    threeModulePromise = import("three");
  }

  return threeModulePromise;
};

const stopAnimation = () => {
  running = false;
  lastRenderTime = 0;

  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  }
};

const disposeScene = () => {
  stopAnimation();
  document.body.classList.remove("waves-active");

  geometry?.dispose();
  material?.dispose();

  if (renderer) {
    try {
      renderer.dispose();
    } catch {
      // The static SVG remains visible if WebGL cleanup is unavailable.
    }
  }

  renderer = undefined;
  scene = undefined;
  camera = undefined;
  geometry = undefined;
  material = undefined;
  resolution = undefined;
  currentPixelRatio = 0;
};

const resizeRendererToDisplaySize = () => {
  if (!renderer || !resolution) return;

  const pixelRatioLimit = mobileViewport.matches ? 1.25 : 1.5;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, pixelRatioLimit);
  const width = Math.max(1, canvas.clientWidth);
  const height = Math.max(1, canvas.clientHeight);
  const drawingWidth = Math.floor(width * pixelRatio);
  const drawingHeight = Math.floor(height * pixelRatio);
  const needsResize =
    canvas.width !== drawingWidth ||
    canvas.height !== drawingHeight ||
    currentPixelRatio !== pixelRatio;

  if (!needsResize) return;

  currentPixelRatio = pixelRatio;
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height, false);
  renderer.getDrawingBufferSize(resolution);
  material.uniforms.uResolution.value.copy(resolution);
};

const renderFrame = (time) => {
  if (!running || !renderer || !material) return;

  const timeSinceLastRender = time - lastRenderTime;

  if (!lastRenderTime || timeSinceLastRender >= frameInterval) {
    const delta = lastRenderTime ? Math.min(timeSinceLastRender / 1000, 0.05) : 0;
    lastRenderTime = time;
    elapsedTime += delta;

    try {
      resizeRendererToDisplaySize();
      material.uniforms.uTime.value = elapsedTime;
      renderer.render(scene, camera);
      document.body.classList.add("waves-active");
    } catch {
      disposeScene();
      return;
    }
  }

  animationFrame = window.requestAnimationFrame(renderFrame);
};

const startAnimation = () => {
  if (running || !renderer || document.hidden || reducedMotion.matches || contextLost || pageHidden) return;

  running = true;
  lastRenderTime = 0;
  animationFrame = window.requestAnimationFrame(renderFrame);
};

const createScene = (THREE) => {
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false,
    canvas,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0x000000, 0);

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
  camera.position.z = 1;
  geometry = new THREE.PlaneGeometry(2, 2);
  resolution = new THREE.Vector2(1, 1);
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
  });

  const plane = new THREE.Mesh(geometry, material);
  plane.frustumCulled = false;
  scene.add(plane);

  resizeRendererToDisplaySize();
  renderer.render(scene, camera);
  document.body.classList.add("waves-active");
  startAnimation();
};

const start = async () => {
  if (
    !canvas ||
    starting ||
    renderer ||
    contextLost ||
    pageHidden ||
    document.hidden ||
    reducedMotion.matches
  ) {
    return;
  }

  starting = true;
  const generation = ++startGeneration;

  try {
    const THREE = await loadThree();

    if (
      generation !== startGeneration ||
      contextLost ||
      pageHidden ||
      document.hidden ||
      reducedMotion.matches
    ) {
      return;
    }

    createScene(THREE);
  } catch {
    disposeScene();
  } finally {
    if (generation === startGeneration) {
      starting = false;
    }
  }
};

const handleMotionPreference = () => {
  if (reducedMotion.matches) {
    startGeneration += 1;
    starting = false;
    disposeScene();
    return;
  }

  start();
};

const handleVisibility = () => {
  if (document.hidden) {
    stopAnimation();
    return;
  }

  if (renderer) {
    startAnimation();
  } else {
    start();
  }
};

const handleContextLost = (event) => {
  event.preventDefault();
  contextLost = true;
  startGeneration += 1;
  starting = false;
  disposeScene();
};

const handleContextRestored = () => {
  contextLost = false;
  start();
};

const handlePageHide = () => {
  pageHidden = true;
  startGeneration += 1;
  starting = false;
  disposeScene();
  document.removeEventListener("visibilitychange", handleVisibility);
  canvas?.removeEventListener("webglcontextlost", handleContextLost);
  canvas?.removeEventListener("webglcontextrestored", handleContextRestored);

  if (typeof reducedMotion.removeEventListener === "function") {
    reducedMotion.removeEventListener("change", handleMotionPreference);
  } else {
    reducedMotion.removeListener(handleMotionPreference);
  }
};

if (canvas) {
  canvas.addEventListener("webglcontextlost", handleContextLost);
  canvas.addEventListener("webglcontextrestored", handleContextRestored);
  document.addEventListener("visibilitychange", handleVisibility);
  window.addEventListener("pagehide", handlePageHide, { once: true });

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", handleMotionPreference);
  } else {
    reducedMotion.addListener(handleMotionPreference);
  }

  start();
}
