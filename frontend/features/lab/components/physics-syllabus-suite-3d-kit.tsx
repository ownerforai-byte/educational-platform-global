"use client";
import { useRef, useState, useEffect, type RefObject } from "react";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { createLeaderLayer, createRevealBar } from "@/components/lab/leader-lines";
import type { LeaderLayer } from "@/components/lab/leader-lines";
import {
  createThreeScene, disposeThreeScene, bindResize,
  standardMaterial, titleText, type ThreeScene, type ThreeSceneOptions,
} from "@/components/lab/three-scene";
import { isWebGLAvailable } from "@/lib/webgl";
import { VizToolbar, type VizTarget, type VizTargetRef } from "@/components/viz/viz-toolbar";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
export { standardMaterial, titleText, TheoryPanel };
export type { LeaderLayer };
/* small geometry helpers shared by every unit scene */
export function sph(r: number, color: number, opacity = 1): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.SphereGeometry(r, 28, 20),
    standardMaterial(color, { transparent: opacity < 1, opacity }),
  );
}
export function cyl(rt: number, rb: number, h: number, color: number, opacity = 1): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.CylinderGeometry(rt, rb, h, 24),
    standardMaterial(color, { transparent: opacity < 1, opacity }),
  );
}
export function boxm(w: number, h: number, d: number, color: number, opacity = 1): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    standardMaterial(color, { transparent: opacity < 1, opacity }),
  );
}
/* arrow-free connector: shaft + perpendicular tip tick, never an arrowhead */
export function flowLine(a: THREE.Vector3, b: THREE.Vector3, color: number): THREE.Group {
  const g = new THREE.Group();
  const dir = b.clone().sub(a);
  const len = Math.max(dir.length(), 0.001);
  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, len, 8, 1, true),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }),
  );
  shaft.position.copy(a).addScaledVector(dir, 0.5);
  shaft.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  g.add(shaft);
  const tick = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.06, 0.06),
    new THREE.MeshBasicMaterial({ color }),
  );
  tick.position.copy(b);
  tick.quaternion.copy(shaft.quaternion);
  tick.rotateZ(Math.PI / 2);
  g.add(tick);
  return g;
}
export function trail(pts: THREE.Vector3[], color: number): THREE.Line {
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 }),
  );
}
/* kit: scene + CSS2D chips + SVG leader lines + reveal bar */
export type LeaderConn = { label: THREE.Object3D; target: THREE.Vector3; color: string };
export type SuiteKit = {
  ts: ThreeScene; mount: HTMLElement; labelRenderer: CSS2DRenderer;
  leader: LeaderLayer | null; connections: LeaderConn[];
  addLbl: (color: string, title: string, sub: string | undefined, pos: THREE.Vector3, target?: THREE.Vector3) => void;
};
function chipEl(color: string, title: string, sub?: string): HTMLDivElement {
  const el = document.createElement("div");
  el.style.cssText =
    "pointer-events:auto;padding:3px 8px;border-radius:8px;background:rgba(2,6,23,0.82);" +
    `border:1.5px solid ${color};color:#e2e8f0;font:600 11px/1.35 ui-sans-serif,system-ui;white-space:nowrap;`;
  el.innerHTML =
    `<span style="color:${color};font-weight:800">${title}</span>` +
    (sub ? `<br/><span style="opacity:.8;font-weight:500">${sub}</span>` : "");
  return el;
}
export function setupKit(mount: HTMLElement, opts: ThreeSceneOptions = {}): SuiteKit {
  const ts = createThreeScene(mount, { background: 0x0b1220, subject: "physics", ...opts });
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
  labelRenderer.domElement.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;z-index:10";
  mount.appendChild(labelRenderer.domElement);
  let leader: LeaderLayer | null = null;
  try { leader = createLeaderLayer(mount); } catch { leader = null; }
  if (leader) { try { createRevealBar(mount, leader); } catch { /* noop */ } }
  const connections: LeaderConn[] = [];
  const addLbl: SuiteKit["addLbl"] = (color, title, sub, pos, target) => {
    const o = new CSS2DObject(chipEl(color, title, sub));
    o.position.copy(pos);
    ts.group.add(o);
    if (target) connections.push({ label: o, target: target.clone(), color });
  };
  return { ts, mount, labelRenderer, leader, connections, addLbl };
}



export function runLoop(kit: SuiteKit, unbind: () => void, onUpdate?: (t: number) => void): () => void {
  const { ts, labelRenderer, mount } = kit;
  const clock = new THREE.Clock();
  let raf = 0;
  // Smoothness: scenes that scroll out of view (accordion, tab switch) stop
  // rendering entirely instead of burning GPU/CPU invisibly — the suite can
  // mount up to 4 scenes, but only visible ones do work.
  let visible = true;
  const io = new IntersectionObserver(
    (entries) => { visible = entries[0]?.isIntersecting ?? true; },
    { rootMargin: "120px" },
  );
  io.observe(mount);
  const animate = () => {
    raf = requestAnimationFrame(animate);
    if (!visible || document.hidden) return;
    const t = clock.getElapsedTime();
    onUpdate?.(t);
    ts.controls.update();
    ts.renderer.render(ts.scene, ts.camera);
    labelRenderer.render(ts.scene, ts.camera);
    try { kit.leader?.draw(ts.camera, kit.connections); } catch { /* noop */ }
  };
  animate();
  return () => { cancelAnimationFrame(raf); io.disconnect(); unbind(); };
}
export function teardownKit(kit: SuiteKit): void {
  const { ts, labelRenderer, mount } = kit;
  try { kit.leader?.dispose(); } catch { /* noop */ }
  mount.querySelectorAll("[data-leader-reveal-bar]").forEach((el) => el.remove());
  if (labelRenderer.domElement.parentNode === mount) mount.removeChild(labelRenderer.domElement);
  disposeThreeScene(ts);
}
export function useLabScene(build: (kit: SuiteKit) => void | ((t: number) => void), deps: unknown[] = [], opts: ThreeSceneOptions = {}) {
  const vizTargetRef = useRef<VizTarget>({});
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !webGL) return;
    const kit = setupKit(mount, opts);
    const { ts, labelRenderer } = kit;
    vizTargetRef.current = {
      controls: ts.controls as unknown as VizTarget["controls"],
      el: mount, canvasEl: ts.renderer.domElement,
      render: () => { ts.renderer.render(ts.scene, ts.camera); labelRenderer.render(ts.scene, ts.camera); },
      setLabels: (on: boolean) => { ts.group.traverse((o) => { if (o instanceof CSS2DObject) o.visible = on; }); },
    };
    const unbind = bindResize(ts);
    let onUpdate: ((t: number) => void) | void;
    try { onUpdate = build(kit); } catch { onUpdate = undefined; }
    const stop = runLoop(kit, unbind, typeof onUpdate === "function" ? onUpdate : undefined);
    return () => { stop(); teardownKit(kit); vizTargetRef.current = {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGL, ...deps]);
  return { mountRef, webGL, vizTargetRef };
}
export function CanvasMount({ mountRef, webGL, targetRef, title, desc }: {
  mountRef: RefObject<HTMLDivElement | null>; webGL: boolean; targetRef: VizTargetRef; title: string; desc: string;
}) {
  if (!webGL) return <WebGLFallback title={title} description={desc} />;
  return (
    <div ref={mountRef} className="relative h-[clamp(300px,52vh,560px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
      <VizToolbar targetRef={targetRef} />
    </div>
  );
}

