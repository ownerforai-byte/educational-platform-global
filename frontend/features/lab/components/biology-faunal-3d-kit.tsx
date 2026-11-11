"use client";

/**
 * Faunal Diversity 3D — shared kit.
 *
 * Same house pattern as the other biology suites: three.js WebGL scene,
 * CSS2D label chips, arrow-free SVG leader lines with perpendicular tip
 * terminators, and the reveal bar (◉ Reveal → Next +1 … / All / Clear)
 * that lets a teacher surface the labels one by one.
 *
 * Rules honored platform-wide:
 *  - NO arrowheads anywhere — leader lines end in a tick terminator.
 *  - Every scene has a TheoryPanel (Look → Principle → Why).
 *  - Scenes dispose cleanly (labels, leader layer, renderer, RAF loop).
 */

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import {
  createLeaderLayer,
  createRevealBar,
  type LeaderLayer,
} from "@/components/lab/leader-lines";
import {
  createThreeScene,
  disposeThreeScene,
  bindResize,
  titleText,
  type ThreeScene,
  type ThreeSceneOptions,
} from "@/components/lab/three-scene";
import { isWebGLAvailable } from "@/lib/webgl";
import { VizToolbar, type VizTarget, type VizTargetRef } from "@/components/viz/viz-toolbar";

export type LeaderConn = { label: THREE.Object3D; target: THREE.Vector3; color: string };

export type FaunalKit = {
  ts: ThreeScene;
  mount: HTMLElement;
  labelRenderer: CSS2DRenderer;
  leader: LeaderLayer | null;
  connections: LeaderConn[];
  addLbl: (
    color: string,
    title: string,
    sub: string | undefined,
    pos: THREE.Vector3,
    target?: THREE.Vector3,
  ) => void;
};

export function chipEl(color: string, title: string, sub?: string): HTMLDivElement {
  const el = document.createElement("div");
  el.style.cssText =
    "pointer-events:auto;padding:3px 8px;border-radius:8px;background:rgba(2,6,23,0.82);" +
    `border:1.5px solid ${color};color:#e2e8f0;font:600 11px/1.35 ui-sans-serif,system-ui;white-space:nowrap;`;
  el.innerHTML = `<span style="color:${color};font-weight:800">${title}</span>` +
    (sub ? `<br/><span style="opacity:.8;font-weight:500">${sub}</span>` : "");
  return el;
}

export function setupKit(mount: HTMLElement, opts: ThreeSceneOptions = {}): FaunalKit {
  const ts = createThreeScene(mount, { background: 0x0b1220, ...opts });
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
  labelRenderer.domElement.style.cssText =
    "position:absolute;top:0;left:0;pointer-events:none;z-index:10";
  mount.appendChild(labelRenderer.domElement);

  let leader: LeaderLayer | null = null;
  try {
    leader = createLeaderLayer(mount);
  } catch {
    leader = null;
  }
  if (leader) {
    try {
      createRevealBar(mount, leader);
    } catch {
      /* non-fatal */
    }
  }

  const connections: LeaderConn[] = [];
  return {
    ts,
    mount,
    labelRenderer,
    leader,
    connections,
    addLbl(color, title, sub, pos, target) {
      const o = new CSS2DObject(chipEl(color, title, sub));
      o.position.copy(pos);
      ts.group.add(o);
      if (target) connections.push({ label: o, target: target.clone(), color });
    },
  };
}

export function disposeKit(kit: FaunalKit) {
  kit.leader?.dispose();
  kit.labelRenderer.domElement.remove();
  disposeThreeScene(kit.ts);
}

export function runLoop(kit: FaunalKit, onUpdate?: (t: number) => void): () => void {
  const clock = new THREE.Clock();
  let raf = 0;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    onUpdate?.(clock.getElapsedTime());
    kit.ts.controls.update();
    kit.ts.renderer.render(kit.ts.scene, kit.ts.camera);
    kit.labelRenderer.render(kit.ts.scene, kit.ts.camera);
    kit.leader?.draw(kit.ts.camera, kit.connections);
  };
  animate();
  return () => cancelAnimationFrame(raf);
}

export function useFaunalScene(
  build: (kit: FaunalKit) => void | ((t: number) => void),
  deps: unknown[],
): { mountRef: React.RefObject<HTMLDivElement | null>; webGL: boolean; vizTargetRef: VizTargetRef } {
  const vizTargetRef = useRef<VizTarget>({});
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !webGL) return;
    const kit = setupKit(mount);
    vizTargetRef.current = {
      controls: kit.ts.controls,
      el: mount,
      canvasEl: kit.ts.renderer.domElement,
      render: () => {
        kit.ts.renderer.render(kit.ts.scene, kit.ts.camera);
        kit.labelRenderer.render(kit.ts.scene, kit.ts.camera);
        kit.leader?.draw(kit.ts.camera, kit.connections);
      },
    };
    const tick = build(kit);
    const stop = runLoop(kit, tick ?? undefined);
    const offResize = bindResize(kit.ts);
    const onResize = () => kit.labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      offResize();
      disposeKit(kit);
      vizTargetRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGL, ...deps]);
  return { mountRef, webGL, vizTargetRef };
}

export function CanvasMount({
  mountRef,
  webGL,
  targetRef,
}: {
  mountRef: React.RefObject<HTMLDivElement | null>;
  webGL: boolean;
  targetRef: VizTargetRef;
}) {
  return webGL ? (
    <div
      ref={mountRef}
      aria-label="3D scene"
      className="relative w-full h-80 sm:h-96 md:h-[clamp(320px,60vh,620px)] overflow-hidden rounded-md"
    >
      <VizToolbar targetRef={targetRef} />
    </div>
  ) : (
    <div className="flex w-full h-80 sm:h-96 items-center justify-center rounded-md border border-border bg-muted/30 text-sm text-muted-foreground">
      WebGL is not available in this browser.
    </div>
  );
}

/* ---------------- tiny geometry helpers ---------------- */

export const std = (c: number, op = 1) =>
  new THREE.MeshStandardMaterial({
    color: c,
    roughness: 0.45,
    metalness: 0.1,
    transparent: op < 1,
    opacity: op,
  });

export const sph = (r: number, c: number, op = 1) =>
  new THREE.Mesh(new THREE.SphereGeometry(r, 28, 20), std(c, op));

export const cyl = (r1: number, r2: number, h: number, c: number, op = 1) =>
  new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, 24), std(c, op));

export const box = (w: number, h: number, d: number, c: number, op = 1) =>
  new THREE.Mesh(new THREE.BoxGeometry(w, h, d), std(c, op));

export const tor = (r: number, t: number, c: number, op = 1) =>
  new THREE.Mesh(new THREE.TorusGeometry(r, t, 16, 48), std(c, op));

/** a thin connector line between two points (no arrowheads — house rule) */
export function seg(a: THREE.Vector3, b: THREE.Vector3, c: number, r = 0.02): THREE.Mesh {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const m = cyl(r, r, len, c);
  m.position.copy(a).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return m;
}

export { titleText };
