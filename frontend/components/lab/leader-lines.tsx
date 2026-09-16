"use client";

/**
 * Leader-line arrows for CSS2D labels in 3D scenes — with an expand/contract
 * leader-line system.
 *
 * Each heat/symbol experiment places HTML chips (CSS2D) near the 3D parts.
 * To make the association explicit — and stop labels from swallowing the
 * geometry — this helper draws a curved SVG arrow from each label's projected
 * screen position to the projected position of the ACTUAL part it names.
 * Call draw() every frame inside the rAF loop.
 *
 * Expand/contract:
 *   Every line exposes a clickable "pin" at the label's screen anchor. Clicking
 *   it toggles the line between a compact and an expanded geometry (bigger
 *   bend, thicker stroke, larger arrowhead and pin). Toggling also emits a
 *   window-level `leader-line-toggle` CustomEvent so surrounding UI can react.
 *
 * Public API: draw, dispose, toggle, isExpanded, setExpanded, getPinIds.
 */

import * as THREE from "three";

export interface LeaderLine {
  /** The CSS2DObject (or any Object3D) whose screen position anchors the arrow start. */
  label: THREE.Object3D;
  /** Scene-space coordinates of the part this arrow points to (the tip). */
  target: THREE.Vector3;
  /** Border/line colour for the arrow. */
  color: string;
  /** Stable key for this line. Falls back to the array index when omitted. */
  id?: string;
}

/** Runtime expansion state tracked per line. */
export interface LeaderLineRuntimeState {
  expanded: boolean;
}

const NS = "http://www.w3.org/2000/svg";

/** Project a scene point to pixel coordinates. */
function project2(cam: THREE.Camera, p: THREE.Vector3, w: number, h: number): [number, number] {
  const v = p.clone().project(cam);
  return [(v.x + 1) * (w / 2), (1 - v.y) * (h / 2)];
}

export function createLeaderLayer(mount: HTMLElement): {
  draw: (camera: THREE.Camera, lines: LeaderLine[]) => void;
  dispose: () => void;
  toggle: (id: string) => void;
  isExpanded: (id: string) => boolean;
  setExpanded: (id: string, expanded: boolean) => void;
  getPinIds: () => string[];
} {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.style.cssText =
    "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9";
  mount.appendChild(svg);

  // Per-line expansion state, keyed by stable line id.
  const stateStore = new Map<string, LeaderLineRuntimeState>();
  const knownIds: string[] = [];

  function keyFor(index: number, line: LeaderLine): string {
    const k = line.id ?? `leader-line-${index}`;
    if (!stateStore.has(k)) {
      stateStore.set(k, { expanded: false });
      knownIds.push(k);
    }
    return k;
  }

  function toggle(id: string): void {
    const st = stateStore.get(id);
    if (!st) return;
    st.expanded = !st.expanded;
    const evt = new CustomEvent("leader-line-toggle", {
      detail: { id, expanded: st.expanded },
    });
    window.dispatchEvent(evt);
  }

  function isExpanded(id: string): boolean {
    return stateStore.get(id)?.expanded ?? false;
  }

  function setExpanded(id: string, expanded: boolean): void {
    let st = stateStore.get(id);
    if (!st) {
      st = { expanded: false };
      stateStore.set(id, st);
    }
    st.expanded = expanded;
  }

  function getPinIds(): string[] {
    return [...knownIds];
  }

  function draw(camera: THREE.Camera, lines: LeaderLine[]) {
    svg.innerHTML = "";
    const w = mount.clientWidth || 1;
    const h = mount.clientHeight || 1;
    const tmp = new THREE.Vector3();

    lines.forEach((l, i) => {
      if (!l.label.visible) return;
      const id = keyFor(i, l);
      const expanded = stateStore.get(id)?.expanded ?? false;

      tmp.setFromMatrixPosition(l.label.matrixWorld);
      const [sx, sy] = project2(camera, tmp, w, h);
      const [tx, ty] = project2(camera, l.target, w, h);
      // Skip degenerate arrows and off-screen labels
      if (Math.abs(sx - tx) < 1 && Math.abs(sy - ty) < 1) return;
      if (sx < -80 || sy < -80 || sx > w + 80 || sy > h + 80) return;

      // Geometry varies with expanded state.
      const bend = expanded ? 44 : 26;
      const strokeW = expanded ? 3.8 : 2.4;
      const headLen = expanded ? 13 : 8;
      const pinR = expanded ? 11 : 7;
      const pinInnerR = expanded ? 4.2 : 2.8;
      const glyphR = expanded ? 3.4 : 2.2;

      // Curved (quadratic) leader: bend above the two points.
      const mx = (sx + tx) / 2;
      const my = Math.min(sy, ty) - bend;
      const path =
        `M ${sx.toFixed(1)} ${sy.toFixed(1)}` +
        ` Q ${mx.toFixed(1)} ${my.toFixed(1)}` +
        ` ${tx.toFixed(1)} ${ty.toFixed(1)}`;
      const angle = Math.atan2(ty - my, tx - mx);

      const line = document.createElementNS(NS, "path");
      line.setAttribute("d", path);
      line.setAttribute("fill", "none");
      line.setAttribute("stroke", l.color);
      line.setAttribute("stroke-width", String(strokeW));
      line.setAttribute("stroke-opacity", expanded ? "1" : "0.95");
      line.setAttribute("stroke-linecap", "round");
      svg.appendChild(line);

      // Solid arrowhead at the tip.
      const a1x = tx - headLen * Math.cos(angle - 0.42);
      const a1y = ty - headLen * Math.sin(angle - 0.42);
      const a2x = tx - headLen * Math.cos(angle + 0.42);
      const a2y = ty - headLen * Math.sin(angle + 0.42);
      const head = document.createElementNS(NS, "path");
      head.setAttribute(
        "d",
        `M ${a1x.toFixed(1)} ${a1y.toFixed(1)}` +
        ` L ${tx.toFixed(1)} ${ty.toFixed(1)}` +
        ` L ${a2x.toFixed(1)} ${a2y.toFixed(1)}`
      );
      head.setAttribute("fill", l.color);
      head.setAttribute("stroke", "none");
      svg.appendChild(head);

      // Clickable pin at the label anchor.
      const pin = document.createElementNS(NS, "circle");
      pin.setAttribute("cx", sx.toFixed(1));
      pin.setAttribute("cy", sy.toFixed(1));
      pin.setAttribute("r", String(pinR));
      pin.setAttribute("fill", "#ffffff");
      pin.setAttribute("stroke", l.color);
      pin.setAttribute("stroke-width", expanded ? "2.8" : "2.2");
      pin.setAttribute("data-pin-id", id);
      pin.style.pointerEvents = "auto";
      pin.style.cursor = "pointer";
      const onPinClick = (ev: Event) => {
        ev.stopPropagation();
        toggle(id);
      };
      pin.addEventListener("click", onPinClick);
      svg.appendChild(pin);

      // Inner dot (non-interactive).
      const pinInner = document.createElementNS(NS, "circle");
      pinInner.setAttribute("cx", sx.toFixed(1));
      pinInner.setAttribute("cy", sy.toFixed(1));
      pinInner.setAttribute("r", String(pinInnerR));
      pinInner.setAttribute("fill", l.color);
      pinInner.setAttribute("stroke", "none");
      pinInner.style.pointerEvents = "none";
      svg.appendChild(pinInner);

      // Plus/minus glyph indicating the current state.
      // Expanded => minus only; compact => plus (horizontal + vertical bars).
      const glyphColor = l.color;
      const minus = document.createElementNS(NS, "rect");
      minus.setAttribute("x", (sx - glyphR).toFixed(1));
      minus.setAttribute("y", (sy - 0.9).toFixed(1));
      minus.setAttribute("width", String(glyphR * 2));
      minus.setAttribute("height", "1.8");
      minus.setAttribute("rx", "0.9");
      minus.setAttribute("fill", glyphColor);
      minus.style.pointerEvents = "none";
      svg.appendChild(minus);

      if (!expanded) {
        const plusV = document.createElementNS(NS, "rect");
        plusV.setAttribute("x", (sx - 0.9).toFixed(1));
        plusV.setAttribute("y", (sy - glyphR).toFixed(1));
        plusV.setAttribute("width", "1.8");
        plusV.setAttribute("height", String(glyphR * 2));
        plusV.setAttribute("rx", "0.9");
        plusV.setAttribute("fill", glyphColor);
        plusV.style.pointerEvents = "none";
        svg.appendChild(plusV);
      }
    });
  }

  function dispose() {
    // Clear any registered listeners before removing the layer.
    if (svg.parentNode) svg.parentNode.removeChild(svg);
    stateStore.clear();
    knownIds.length = 0;
  }

  return { draw, dispose, toggle, isExpanded, setExpanded, getPinIds };
}

export default createLeaderLayer;
