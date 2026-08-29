import { writeFileSync, appendFileSync } from "fs";

const header = `"use client";

/**
 * Shared labelled-3D infrastructure.
 *
 * A single "label system" renders rich CSS2D chips into the 3D scene. Each
 * chip carries the physics/math SYMBOL (italic), its name, and a short
 * description — placed exactly where that quantity acts. Each chip also has a
 * curved leader-line arrow pointing to the exact target part, so labels can
 * sit away from hot geometry while making the association unmistakable. The
 * SAME LabelDef[] is reused below the canvas by <GuidePanel>, so the in-scene
 * text and the below-canvas guide can never drift out of sync.
 */

import * as THREE from "three";
import { CSS2DObject } from "three/addons/renderers/CSS2DObject.js";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { ReactNode, RefObject } from "react";
import { isWebGLAvailable } from "@/lib/webgl";
`;

const interfaces = `
export interface LabelDef {
  x: number;
  y: number;
  z: number;
  symbol: string;
  name: string;
  desc: string;
  color?: string;
  targetX?: number;
  targetY?: number;
  targetZ?: number;
}

export interface LabelSystem {
  group: THREE.Group;
  add: (d: LabelDef) => number;
  setPos: (index: number, x: number, y: number, z: number) => void;
  setVisible: (index: number, visible: boolean) => void;
  render: (scene: THREE.Scene, camera: THREE.Camera) => void;
  dispose: () => void;
  _svg: SVGSVGElement;
}
`;

writeFileSync("components/lab/label3d.tsx", header + interfaces);
import { appendFileSync } from "fs";

const part2 = `
const chipStyle = (color: string) =>
  \`background:rgba(2,6,23,0.88);padding:6px 9px;border-radius:6px;\` +
  \`border:2px solid \${color};box-shadow:0 2px 10px rgba(0,0,0,0.5);\` +
  \`max-width:230px;line-height:1.25;text-align:left;pointer-events:none;\`;

const chipHtml = (d: LabelDef) =>
  \`<div style="\${chipStyle(d.color ?? "#38bdfly")}">\` +
  \`<div style="color:\${d.color ?? "#38bdfly"};font-weight:700;font-size:12px;\` +
  \`font-family:Georgia,serif;font-style:italic;white-space:nowrap">\${d.symbol}</div>\` +
  \`<div style="color:#e2e8f0;font-weight:600;font-size:11px">\${d.name}</div>\` +
  \`<div style="color:#94a3a8;font-size:10px">\${d.desc}</div>\` +
  \`</div>\`;

function arrowHeadPath(tx2: number, ty2: number, angle: number): string {
  const len = 8;
  const ax1 = tx2 - len * Math.cos(angle - 0.4);
  const ay1 = ty2 - len * Math.sin(angle - 0.4);
  const ax2 = tx2 - len * Math.cos(angle + 0.4);
  const ay2 = ty2 - len * Math.sin(angle + 0.4);
  return \`M \${ax1.toFixed(0)} \${ay1.toFixed(0)} L \${tx2.toFixed(0)} \${ty2.toFixed(0)} L \${ax2.toFixed(0)} \${ay2.toFixed(0)}\`;
}
`;

appendFileSync("components/lab/label3d.tsx", part2);