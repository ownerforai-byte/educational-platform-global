"use client";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * MouseOrbitScene — drop-in helper that creates a Three.js scene with
 * a perspective camera AND a fully mouse-driven OrbitControls. Used by every
 * chapter/topic animation in the lab so the user can rotate the camera with
 * the mouse universally, with no extra wiring.
 */
export interface MouseOrbitOptions {
  cameraPosition?: THREE.Vector3;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  background?: number;
  showGrid?: boolean;
  showAxes?: boolean;
  fog?: { near: number; far: number } | false;
  /** Clamp min/max zoom (camera distance to origin). */
  minDistance?: number;
  maxDistance?: number;
  dampingFactor?: number;
}

export interface MouseOrbitHandle {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  group: THREE.Group;
  container: HTMLElement;
  dispose: () => void;
  /** Resize the canvas to the current container size. */
  resize: () => void;
}

export function createMouseOrbitScene(
  container: HTMLElement,
  opts: MouseOrbitOptions = {},
): MouseOrbitHandle {
  const {
    cameraPosition = new THREE.Vector3(8, 6, 12),
    autoRotate = true,
    autoRotateSpeed = 0.6,
    background = 0x0f172a,
    showGrid = true,
    showAxes = false,
    fog = { near: 40, far: 90 },
    minDistance = 3,
    maxDistance = 80,
    dampingFactor = 0.08,
  } = opts;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(background);
  if (fog) scene.fog = new THREE.Fog(background, fog.near, fog.far);

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / Math.max(container.clientHeight, 1),
    0.1,
    1000,
  );
  camera.position.copy(cameraPosition);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = dampingFactor;
  controls.autoRotate = autoRotate;
  controls.autoRotateSpeed = autoRotateSpeed;
  controls.minDistance = minDistance;
  controls.maxDistance = maxDistance;
  controls.enablePan = true;
  controls.screenSpacePanning = true;

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const dir = new THREE.DirectionalLight(0xffffff, 1.1);
  dir.position.set(10, 20, 15);
  dir.castShadow = true;
  dir.shadow.mapSize.set(1024, 1024);
  scene.add(dir);
  const fill = new THREE.DirectionalLight(0x6366f1, 0.4);
  fill.position.set(-10, -5, -8);
  scene.add(fill);

  if (showGrid) scene.add(new THREE.GridHelper(20, 40, 0x334155, 0x1e293b));
  if (showAxes) scene.add(new THREE.AxesHelper(5));

  const group = new THREE.Group();
  scene.add(group);

  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  let resizeObserver: ResizeObserver | null = new ResizeObserver(() => resize());
  resizeObserver.observe(container);

  const disposables: Array<{ dispose: () => void }> = [
    scene.background as unknown as { dispose: () => void },
  ];

  const dispose = () => {
    resizeObserver?.disconnect();
    resizeObserver = null;
    controls.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement);
    }
    disposables.forEach((d) => {
      try {
        d.dispose();
      } catch {
        /* noop */
      }
    });
  };

  return { scene, camera, renderer, controls, group, container, dispose, resize };
}

/** Create a labelled title sprite that floats above any 3D scene group. */
export function makeTitleSprite(
  text: string,
  color = "#7dd3fc",
  fontPx = 56,
  scale: [number, number] = [9, 1.1],
): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.font = `bold ${fontPx}px sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 512, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }),
  );
  sprite.scale.set(scale[0], scale[1], 1);
  return sprite;
}