"use client";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SUBJECT_ACCENT_MAP } from "./3d-rig/accents";
import type { SubjectName } from "./3d-rig/types";

export type SceneQuality = "low" | "medium" | "high";

export interface ThreeSceneOptions {
  cameraPosition?: THREE.Vector3;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  background?: number;
  grid?: boolean;
  axes?: boolean;
  containerWidth?: number;
  containerHeight?: number;
  responsive?: boolean;
  /** Tints key/fill/rim lights and the grid so a visual reads as its subject. */
  subject?: SubjectName;
  /** Overrides the auto-detected quality tier (device-resolution + shading cost). */
  quality?: SceneQuality;
  /** Set false for cheap scenes: drops the shadow map and shadow-casting key light. */
  shadows?: boolean;
}

export interface ThreeScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  group: THREE.Group;
  container: HTMLElement;
  dispose: () => void;
}

export interface LightingRig {
  hemisphere: THREE.HemisphereLight;
  key: THREE.DirectionalLight;
  fill: THREE.DirectionalLight;
  rim: THREE.DirectionalLight;
}

/**
 * Device tier used to pick resolution and shading cost. Mirrors the rule set in
 * `3d-rig/use-scene-tier.ts` so the imperative scenes and the React rig degrade
 * on the same devices.
 */
export function detectSceneQuality(): SceneQuality {
  if (typeof window === "undefined") return "medium";
  const cores =
    (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 4;
  const isMobile = window.matchMedia?.("(max-width: 767px)").matches ?? false;
  if (isMobile) return cores <= 6 ? "low" : "medium";
  if (cores < 4) return "low";
  if (cores < 8) return "medium";
  return "high";
}

/** Pixel ratio for a tier: full retina costs fill-rate nobody can see at 1x zoom. */
export function scenePixelRatio(quality: SceneQuality): number {
  const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
  if (quality === "low") return 1.25;
  if (quality === "medium") return Math.min(dpr, 1.75);
  return Math.min(dpr, 2);
}

/**
 * Three-point studio lighting shared by every imperative scene: a hemisphere
 * ambient for soft gradient shading, a shadow-casting key from the upper right,
 * a low fill so unlit faces keep their colour, and a back rim to separate the
 * model from the background.
 *
 * Pass `subject` to light the scene in that subject's accent palette.
 */
export function addStudioLighting(
  scene: THREE.Scene,
  opts: { quality?: SceneQuality; subject?: SubjectName; shadows?: boolean } = {},
): LightingRig {
  const quality = opts.quality ?? detectSceneQuality();
  const shadows = opts.shadows ?? true;
  const accent = opts.subject ? SUBJECT_ACCENT_MAP[opts.subject] ?? SUBJECT_ACCENT_MAP.default : null;

  const hemisphere = new THREE.HemisphereLight(
    new THREE.Color(accent?.hemisphereSky ?? "#ffffff"),
    new THREE.Color(accent?.hemisphereGround ?? "#1e293b"),
    accent ? 0.6 : 0.5,
  );
  scene.add(hemisphere);

  const key = new THREE.DirectionalLight(new THREE.Color(accent?.key ?? "#ffffff"), 1.15);
  key.position.set(10, 20, 15);
  if (shadows) {
    key.castShadow = true;
    // The three.js default shadow camera is only ±5 units, so anything scaled
    // for a classroom view (atoms, cells, prisms) rendered clipped or unlit
    // shadows. Widen it and soften the acne instead of leaving it clipped.
    const shadowCamera = key.shadow.camera;
    shadowCamera.left = -24;
    shadowCamera.right = 24;
    shadowCamera.top = 24;
    shadowCamera.bottom = -24;
    shadowCamera.near = 1;
    shadowCamera.far = 90;
    shadowCamera.updateProjectionMatrix();
    const shadowMapSize = quality === "low" ? 1024 : 2048;
    key.shadow.mapSize.set(shadowMapSize, shadowMapSize);
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.02;
  }
  scene.add(key);

  const fill = new THREE.DirectionalLight(new THREE.Color(accent?.fill ?? "#ffffff"), 0.35);
  fill.position.set(-10, -5, -8);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(new THREE.Color(accent?.rim ?? "#cbd5e1"), accent ? 0.55 : 0.35);
  rim.position.set(-12, 8, -14);
  scene.add(rim);

  return { hemisphere, key, fill, rim };
}

export function createThreeScene(container: HTMLElement, opts: ThreeSceneOptions = {}): ThreeScene {
  const {
    cameraPosition = new THREE.Vector3(8, 7, 11),
    autoRotate = false,
    autoRotateSpeed = 0.5,
    background = 0x0f172a,
    grid = true,
    axes = false,
    responsive = true,
    subject,
    quality = detectSceneQuality(),
    shadows = true,
  } = opts;

  const accent = subject ? SUBJECT_ACCENT_MAP[subject] ?? SUBJECT_ACCENT_MAP.default : null;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(background);
  scene.fog = new THREE.Fog(background, 40, 90);

  const updateSize = () => {
    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.copy(cameraPosition);
  const renderer = new THREE.WebGLRenderer({
    antialias: quality !== "low",
    powerPreference: "high-performance",
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(scenePixelRatio(quality));
  renderer.shadowMap.enabled = shadows;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.style.display = "block";
  container.appendChild(renderer.domElement);

  // Without preventDefault the browser will not offer a context restore, so a
  // GPU hiccup permanently blacks out the visual.
  const onContextLost = (event: Event) => event.preventDefault();
  renderer.domElement.addEventListener("webglcontextlost", onContextLost, false);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = autoRotate;
  controls.autoRotateSpeed = autoRotateSpeed;

  addStudioLighting(scene, { quality, ...(subject ? { subject } : {}), shadows });
  if (grid) scene.add(new THREE.GridHelper(20, 40, accent ? new THREE.Color(accent.key).getHex() : 0x334155, 0x1e293b));
  if (axes) scene.add(new THREE.AxesHelper(5));

  const group = new THREE.Group();
  scene.add(group);

  let resizeObserver: ResizeObserver | null = null;
  if (responsive) {
    resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);
  }

  const dispose = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
    renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
    disposeThreeScene({ scene, camera, renderer, controls, group, container, dispose });
  };

  return { scene, camera, renderer, controls, group, container, dispose };
}

/**
 * Visibility gate for scene animation loops (smoothness).
 *
 * Returns a predicate that is true only while the container is on screen and
 * the tab is foregrounded. Offscreen scenes skip their render work entirely —
 * an invisible 60fps WebGL loop is pure GPU/CPU waste.
 *
 * Usage inside an animate loop:
 *   const isLive = makeVisibilityGate(container);
 *   const animate = () => {
 *     raf = requestAnimationFrame(animate);
 *     if (!isLive()) return;
 *     ...render...
 *   };
 */
export function makeVisibilityGate(container: HTMLElement): () => boolean {
  let intersecting = true;
  const io =
    typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver((entries) => { intersecting = entries[0]?.isIntersecting ?? true; }, { rootMargin: "120px" })
      : null;
  io?.observe(container);
  return () => intersecting && !(typeof document !== "undefined" && document.hidden);
}

/** Remove and dispose everything added to the root scene group. */
export function clearGroup(group: THREE.Group) {
  while (group.children.length > 0) {
    const child = group.children[0];
    group.remove(child);
    clearObject(child);
  }
}

/** Add a floating text label (sprite) centered on the scene group. */
export function titleText(ts: ThreeScene, text: string, pos: THREE.Vector3): THREE.Sprite | null {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.font = "bold 104px sans-serif";
  ctx.fillStyle = "#7dd3fc";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 1024, 128);
  const tex = new THREE.CanvasTexture(canvas);
  // Canvas textures default to no colour space; without this the label is
  // uploaded as linear data and renders washed out against the tone-mapped scene.
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(4, ts.renderer.capabilities.getMaxAnisotropy());
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  sprite.scale.set(7, 0.95, 1);
  sprite.position.copy(pos);
  ts.group.add(sprite);
  return sprite;
}

/** Dispose a material together with every texture it owns. */
export function disposeMaterial(material: THREE.Material) {
  const values = Object.values(material as unknown as Record<string, unknown>);
  for (const value of values) {
    if (value instanceof THREE.Texture) value.dispose();
  }
  material.dispose();
}

export function clearObject(obj: THREE.Object3D) {
  obj.traverse((o) => {
    const anyObj = o as any;
    if (o instanceof THREE.Line || o instanceof THREE.Mesh || o instanceof THREE.Points || o instanceof THREE.Sprite) {
      if (o.geometry) o.geometry.dispose();
    }
    if (anyObj.line?.geometry) anyObj.line.geometry.dispose();
    if (anyObj.cone?.geometry) anyObj.cone.geometry.dispose();
    const mat = (o as THREE.Mesh).material as THREE.Material | undefined;
    if (mat) {
      if (Array.isArray(mat)) mat.forEach((m) => disposeMaterial(m));
      else disposeMaterial(mat);
    }
    if (anyObj.line?.material && !Array.isArray(anyObj.line.material)) disposeMaterial(anyObj.line.material);
    if (anyObj.cone?.material && !Array.isArray(anyObj.cone.material)) disposeMaterial(anyObj.cone.material);
  });
}

/** Dispose every child of a scene, including lights, grids and helpers. */
export function disposeScene(scene: THREE.Scene) {
  for (const child of [...scene.children]) {
    scene.remove(child);
    if ((child as THREE.Light).isLight) {
      (child as THREE.Light & { dispose?: () => void }).dispose?.();
      continue;
    }
    if ((child as THREE.Camera).isCamera) continue;
    clearObject(child);
  }
}

export function disposeThreeScene(ts: ThreeScene) {
  clearGroup(ts.group);
  // Lights, grid helpers and axes are added straight to the scene, so clearing
  // the group alone would leak their shadow maps and buffers on every unmount.
  disposeScene(ts.scene);
  if (ts.container && ts.renderer.domElement.parentNode === ts.container) ts.container.removeChild(ts.renderer.domElement);
  // OrbitControls keeps pointer/context-menu listeners on the canvas; detach
  // them explicitly instead of waiting for the detached node to be collected.
  ts.controls.dispose();
  ts.renderer.dispose();
  // Browsers cap live WebGL contexts (typically 8-16) and each topic switch
  // mounts a fresh scene, so leaking them eventually blacks out the oldest
  // visual. The canvas is detached by now and no caller reattaches a disposed
  // canvas, so releasing the context here is safe.
  try {
    ts.renderer.forceContextLoss();
  } catch {
    /* context already gone */
  }
}

/** Remove a mesh/arrow and its geometry/material from a parent. */
export function removeObject(p: THREE.Object3D, o: THREE.Object3D) {
  p.remove(o);
  clearObject(o);
}

/** Add a resize listener tied to a scene; returns a cleanup fn. */
export function bindResize(ts: ThreeScene): () => void {
  function onResize() {
    const w = ts.container.clientWidth || 1;
    const h = ts.container.clientHeight || 1;
    ts.camera.aspect = w / h;
    ts.camera.updateProjectionMatrix();
    ts.renderer.setSize(w, h);
  }
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}

export function standardMaterial(
  color: number,
  opts: {
    emissive?: number;
    emissiveIntensity?: number;
    wireframe?: boolean;
    transparent?: boolean;
    opacity?: number;
    metalness?: number;
    roughness?: number;
    side?: THREE.Side;
  } = {},
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.35,
    metalness: opts.metalness ?? 0.15,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 0,
    wireframe: opts.wireframe ?? false,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1,
    ...(opts.side ? { side: opts.side } : {}),
  });
}
