"use client";

/**
 * Leader-line arrows for CSS2D labels in 3D scenes.
 *
 * Each heat/symbol experiment places HTML chips (CSS2D) near the 3D parts.
 * To make the association explicit — and stop labels from swallowing the
 * geometry — this helper draws a curved SVG arrow from each label's projected
 * screen position to the projected position of the ACTUAL part it names.
 * Call draw() every frame inside the rAF loop.
 */

import * as THREE from "three";

export interface LeaderLine {
  /** The CSS2DObject (or any Object3D) whose screen position anchors the arrow start. */
  label: THREE.Object3D;
  /** Scene-space coordinates of the part this arrow points to (the tip). */
  target: THREE.Vector3;
  /** Border/line colour for the arrow. */
  color: string;
}

/** Project a scene point to pixel coordinates. */
function project2(cam: THREE.Camera, p: THREE.Vector3, w: number, h: number): [number, number] {
  const v = p.clone().project(cam);
  return [(v.x + 1) * (w / 2), (1 - v.y) * (h / 2)];
}

export function createLeaderLayer(mount: HTMLElement): {
  draw: (camera: THREE.Camera, lines: LeaderLine[]) => void;
  dispose: () => void;
} {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.style.cssText =
    "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9";
  mount.appendChild(svg);

  function draw(camera: THREE.Camera, lines: LeaderLine[]) {
    svg.innerHTML = "";
    const w = mount.clientWidth || 1;
    const h = mount.clientHeight || 1;
    const ns = "http://www.w3.org/2000/svg";
    const tmp = new THREE.Vector3();

    lines.forEach((l) => {
      if (!l.label.visible) return;
      tmp.setFromMatrixPosition(l.label.matrixWorld);
      const [sx, sy] = project2(camera, tmp, w, h);
      const [tx, ty] = project2(camera, l.target, w, h);
      // Skip degenerate arrows and off-screen labels
      if (Math.abs(sx - tx) < 1 && Math.abs(sy - ty) < 1) return;
      if (sx < -80 || sy < -80 || sx > w + 80 || sy > h + 80) return;

      // Curved (quadratic) leader: bend above the two points
      const mx = (sx + tx) / 2;
      const my = Math.min(sy, ty) - 26;
      const path =
        `M ${sx.toFixed(1)} ${sy.toFixed(1)}` +
        ` Q ${mx.toFixed(1)} ${my.toFixed(1)}` +
        ` ${tx.toFixed(1)} ${ty.toFixed(1)}`;
      const angle = Math.atan2(ty - my, tx - mx);

      const line = document.createElementNS(ns, "path");
      line.setAttribute("d", path);
      line.setAttribute("fill", "none");
      line.setAttribute("stroke", l.color);
      line.setAttribute("stroke-width", "2.4");
      line.setAttribute("stroke-opacity", "0.95");
      line.setAttribute("stroke-linecap", "round");
      svg.appendChild(line);

      // Solid arrowhead at the tip
      const len = 8;
      const a1x = tx - len * Math.cos(angle - 0.42);
      const a1y = ty - len * Math.sin(angle - 0.42);
      const a2x = tx - len * Math.cos(angle + 0.42);
      const a2y = ty - len * Math.sin(angle + 0.42);
      const head = document.createElementNS(ns, "path");
      head.setAttribute(
        "d",
        `M ${a1x.toFixed(1)} ${a1y.toFixed(1)}` +
        ` L ${tx.toFixed(1)} ${ty.toFixed(1)}` +
        ` L ${a2x.toFixed(1)} ${a2y.toFixed(1)}`
      );
      head.setAttribute("fill", l.color);
      head.setAttribute("stroke", "none");
      svg.appendChild(head);
    });
  }

  function dispose() {
    if (svg.parentNode) svg.parentNode.removeChild(svg);
  }

  return { draw, dispose };
}

export default createLeaderLayer;