"use client";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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

export function createThreeScene(container: HTMLElement, opts: ThreeSceneOptions = {}): ThreeScene {
  const {
    cameraPosition = new THREE.Vector3(8, 7, 11),
    autoRotate = false,
    autoRotateSpeed = 0.5,
    background = 0x0f172a,
    grid = true,
    axes = false,
    responsive = true,
  } = opts;
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
  controls.autoRotate = autoRotate;
  controls.autoRotateSpeed = autoRotateSpeed;
  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const dir = new THREE.DirectionalLight(0xffffff, 1.1);
  dir.position.set(10, 20, 15);
  dir.castShadow = true;
  scene.add(dir);
  const fill = new THREE.DirectionalLight(0xffffff, 0.4);
  fill.position.set(-10, -5, -8);
  scene.add(fill);
  if (grid) scene.add(new THREE.GridHelper(20, 40, 0x334155, 0x1e293b));
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
    disposeThreeScene({ scene, camera, renderer, controls, group, container, dispose });
  };
  
  return { scene, camera, renderer, controls, group, container, dispose };
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
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.font = "bold 52px sans-serif";
  ctx.fillStyle = "#7dd3fc";
  ctx.textAlign = "center";
  ctx.fillText(text, 512, 80);
  const tex = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  sprite.scale.set(7, 0.95, 1);
  sprite.position.copy(pos);
  ts.group.add(sprite);
  return sprite;
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
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat.dispose();
    }
    if (anyObj.line?.material && !Array.isArray(anyObj.line.material)) anyObj.line.material.dispose();
    if (anyObj.cone?.material && !Array.isArray(anyObj.cone.material)) anyObj.cone.material.dispose();
  });
}

export function disposeThreeScene(ts: ThreeScene) {
  clearGroup(ts.group);
  if (ts.container && ts.renderer.domElement.parentNode === ts.container) ts.container.removeChild(ts.renderer.domElement);
  ts.renderer.dispose();
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

export function standardMaterial(color: number, opts: { emissive?: number; emissiveIntensity?: number; wireframe?: boolean; transparent?: boolean; opacity?: number; metalness?: number; roughness?: number } = {}): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.35,
    metalness: opts.metalness ?? 0.15,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 0,
    wireframe: opts.wireframe ?? false,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1,
  });
}
