"use client";

/**
 * Shared labelled-3D infrastructure.
 *
 * A single "label system" renders rich CSS2D chips into the 3D scene. Each
 * chip carries the physics/math SYMBOL (italic), its name, and a short
 * description — placed exactly where that quantity acts. The SAME LabelDef[]
 * is reused below the canvas by <GuidePanel>, so the in-scene text and the
 * below-canvas guide can never drift out of sync.
 */

import * as THREE from "three";
import { ReactNode, RefObject } from "react";
import { isWebGLAvailable } from "@/lib/webgl";

export interface LabelDef {
  x: number;
  y: number;
  z: number;
  symbol: string;      // italic symbol, e.g. "F = B·I·L"
  name: string;        // label heading, e.g. "Magnetic force"
  desc: string;        // short description
  color?: string;      // border accent colour
}

export interface LabelSystem {
  /** THREE.Group holding every chip; add it to your scene group once. */
  group: THREE.Group;
  /** Append a chip from a def; returns its index into the internal list. */
  add: (d: LabelDef) => number;
  /** Reposition a chip in scene space (for animations). */
  setPos: (index: number, x: number, y: number, z: number) => void;
  /** Show / hide a chip. */
  setVisible: (index: number, visible: boolean) => void;
  /** Render the chips for one frame (call inside the rAF loop). */
  render: (scene: THREE.Scene, camera: THREE.Camera) => void;
  /** Remove the embedded DOM and dispose the chips. */
  dispose: () => void;
}

const chipStyle = (color: string) =>
  `background:rgba(2,6,23,0.88);padding:6px 9px;border-radius:6px;` +
  `border:2px solid ${color};box-shadow:0 2px 10px rgba(0,0,0,0.5);` +
  `max-width:230px;line-height:1.25;text-align:left;pointer-events:none;`;

const chipHtml = (d: LabelDef) =>
  `<div style="${chipStyle(d.color ?? "#38bdf8")}">` +
  `<div style="color:${d.color ?? "#38bdf8"};font-weight:700;font-size:12px;` +
  `font-family:Georgia,serif;font-style:italic;white-space:nowrap">${d.symbol}</div>` +
  `<div style="color:#e2e8f0;font-weight:600;font-size:11px">${d.name}</div>` +
  `<div style="color:#94a3b8;font-size:10px">${d.desc}</div>` +
  `</div>`;

export async function createLabelSystem(): Promise<LabelSystem> {
  const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
  const renderer = new CSS2DRenderer();
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  renderer.domElement.style.pointerEvents = "none";
  renderer.domElement.style.zIndex = "10";

  const group = new THREE.Group();
  const chips: { obj: THREE.Object3D }[] = [];

  const add = (d: LabelDef) => {
    const wrap = document.createElement("div");
    wrap.className = "label";
    wrap.innerHTML = chipHtml(d);
    const obj = new CSS2DObject(wrap);
    obj.position.set(d.x, d.y, d.z);
    obj.renderOrder = 99;
    group.add(obj);
    chips.push({ obj });
    return chips.length - 1;
  };

  const system: LabelSystem = {
    group,
    add,
    setPos: (i, x, y, z) => { if (chips[i]) chips[i].obj.position.set(x, y, z); },
    setVisible: (i, v) => { if (chips[i]) chips[i].obj.visible = v; },
    render: (scene, camera) => renderer.render(scene, camera),
    dispose: () => {
      while (group.children.length) group.remove(group.children[0]);
      chips.length = 0;
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    },
  };
  return system;
}

/* ---------------- React presentational helpers ---------------- */

export function SceneArea({
  mountRef,
  children,
  hint,
}: {
  mountRef: RefObject<HTMLDivElement | null>;
  children?: ReactNode;
  hint?: string;
}) {
  return (
    <div
      className="relative w-full h-[340px] sm:h-[430px] rounded-lg border border-primary/30 overflow-hidden bg-slate-950"
      aria-label="3D scene with labelled symbols"
    >
      <div ref={mountRef} className="absolute inset-0" />
      {!isWebGLAvailable() && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-muted-foreground">
          WebGL is unavailable in this browser — the labelled 3D scene cannot be rendered.
        </div>
      )}
      {hint && (
        <span className="absolute bottom-2 left-2 text-[10px] text-slate-400 bg-black/40 rounded px-2 py-1 pointer-events-none">
          {hint}
        </span>
      )}
      {children}
    </div>
  );
}

export function GuidePanel({ title, defs }: { title?: string; defs: LabelDef[] }) {
  return (
    <div className="rounded-md border border-border bg-muted/30 p-4">
      <h4 className="font-semibold mb-3 text-primary">{title ?? "Parts guide — symbol · position · description"}</h4>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {defs.map((d) => (
          <div
            key={`${d.name}-${d.x.toFixed(1)}-${d.y.toFixed(1)}`}
            className="flex items-start gap-2 rounded-md border-l-4 bg-background/60 p-2"
            style={{ borderColor: d.color ?? "#38bdf8" }}
          >
            <span className="min-w-[44px] shrink-0 pt-0.5 font-serif italic text-[13px] font-bold" style={{ color: d.color ?? "#38bdf8" }}>
              {d.symbol}
            </span>
            <div>
              <p className="text-xs font-semibold">{d.name}</p>
              <p className="text-[11px] text-muted-foreground">
                <span className="font-medium">Position:</span> ({d.x.toFixed(1)}, {d.y.toFixed(1)}, {d.z.toFixed(1)})
              </p>
              <p className="text-[11px] text-muted-foreground">{d.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default createLabelSystem;