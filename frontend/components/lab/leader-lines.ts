"use client";

/**
 * Leader lines for CSS2D labels in 3D scenes — arrow-free, hold-to-expand.
 *
 * Each labelled experiment places HTML chips (CSS2D) near the 3D parts.
 * This helper draws a curved SVG leader line from each label's projected
 * screen position to the projected position of the ACTUAL part it names.
 *
 * Project-wide design rules:
 *  - NO arrowheads. Lines end in a small perpendicular "tip terminator"
 *    (tick) that marks the exact point being named.
 *  - HOLD-to-expand: press-and-hold (or plain click) on the line's pin
 *    expands the line (bigger bend, thicker stroke, larger tick and pin).
 *    Release does NOT collapse — press again to contract. Works for mouse,
 *    touch and pen via pointer events.
 *  - Toggling emits `leader-line-toggle` so 3D leader lines
 *    (leader-lines-3d.ts) and surrounding UI stay in sync.
 *
 * Public API: draw, dispose, toggle, isExpanded, setExpanded, getPinIds.
 */

import * as THREE from "three";

export interface LeaderLine {
  /** The CSS2DObject (or any Object3D) whose screen position anchors the line start. */
  label: THREE.Object3D;
  /** Scene-space coordinates of the part this line points to (the tip). */
  target: THREE.Vector3;
  /** Border/line colour. */
  color: string;
  /** Stable key for this line. Falls back to the array index when omitted. */
  id?: string;
}

/** Runtime expansion state tracked per line. */
export interface LeaderLineRuntimeState {
  expanded: boolean;
}

const NS = "http://www.w3.org/2000/svg";
const TOGGLE_EVENT = "leader-line-toggle";

/** Project a scene point to pixel coordinates. */
function project2(cam: THREE.Camera, p: THREE.Vector3, w: number, h: number): [number, number] {
  const v = p.clone().project(cam);
  return [(v.x + 1) * (w / 2), (1 - v.y) * (h / 2)];
}

/** Remembers each label's authored anchor so per-frame decluttering never drifts. */
const basePositions = new WeakMap<THREE.Object3D, THREE.Vector3>();

/**
 * Reveal mode — when active, labels start hidden and are revealed ONE BY ONE
 * (chip + leader line + pin together) via revealNext(); revealAll()/hideAll()
 * manage the full set. Each layer instance tracks its own lines, so multiple
 * scenes on one page stay independent.
 */
interface RevealState {
  mode: boolean;
  revealedCount: number;
  order: THREE.Object3D[]; // reveal order = registration order
}

const REVEAL_EVENT = "leader-line-reveal"; // detail: { layerId, shown, total, mode }

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

  // Responsive chip scale — on narrow mounts, shrink the CSS2D chips (inline
  // transform on the styled inner div) so they can physically fit; the
  // declutter pass measures the scaled size and packs accordingly.
  const chipScale = () => {
    const cw = mount.clientWidth;
    return cw > 0 && cw < 420 ? Math.max(0.6, cw / 560) : 1;
  };
  const chipScaleRO = new ResizeObserver(() => {
    // Trigger an immediate redraw at the new scale.
    const ev = new CustomEvent("leader-line-resize");
    window.dispatchEvent(ev);
  });
  chipScaleRO.observe(mount);

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

  function emit(id: string, expanded: boolean) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent(TOGGLE_EVENT, { detail: { id, expanded } }),
    );
  }

  function toggle(id: string): void {
    const st = stateStore.get(id);
    if (!st) return;
    st.expanded = !st.expanded;
    emit(id, st.expanded);
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

  // ── Hold-to-expand gesture handling ─────────────────────────────
  // pointerdown starts a hold timer; if the pointer is released quickly it
  // counts as a click (simple toggle). Holding ≥ 350ms expands (and keeps
  // expanded after release); pressing again contracts.
  const HOLD_MS = 350;
  let holdTimer: number | null = null;
  let activePinId: string | null = null;
  let holdFired = false;

  function clearHold() {
    if (holdTimer !== null) {
      window.clearTimeout(holdTimer);
      holdTimer = null;
    }
  }

  function startHold(id: string) {
    clearHold();
    activePinId = id;
    holdFired = false;
    holdTimer = window.setTimeout(() => {
      holdFired = true;
      const st = stateStore.get(id);
      if (!st) return;
      // Holding while compact expands; holding while expanded keeps it open.
      st.expanded = true;
      emit(id, true);
    }, HOLD_MS);
  }

  function endHold() {
    clearHold();
    if (activePinId && !holdFired) {
      toggle(activePinId); // quick tap = toggle
    }
    activePinId = null;
    holdFired = false;
  }

  function cancelHold() {
    clearHold();
    activePinId = null;
    holdFired = false;
  }

  function draw(camera: THREE.Camera, lines: LeaderLine[]) {
    svg.innerHTML = "";
    const w = mount.clientWidth || 1;
    const h = mount.clientHeight || 1;
    const tmp = new THREE.Vector3();
    const world = new THREE.Vector3();

    // ── Screen-space declutter ──────────────────────────────────────
    // CSS2D chips anchored at fixed 3D points can overlap once projected
    // (narrow viewports, crowded apparatus). Reset every chip to its base
    // anchor, measure the projected rectangles, relax the overlaps apart
    // in pixel space, then write the offset back into 3D so the chip AND
    // its SVG leader line stay glued together.
    interface DeclItem {
      l: LeaderLine; sx: number; sy: number; w: number; h: number;
      ox: number; oy: number; nx: number; ny: number; nz: number;
    }
    const scale = chipScale();
    const items: DeclItem[] = [];
    lines.forEach((l) => {
      if (!l.label.visible) return;
      let base = basePositions.get(l.label);
      if (!base) {
        base = l.label.position.clone();
        basePositions.set(l.label, base);
      }
      if (!l.label.position.equals(base)) l.label.position.copy(base);
      l.label.updateMatrixWorld();
      tmp.setFromMatrixPosition(l.label.matrixWorld);
      const ndc = tmp.project(camera);
      const el = (l.label as unknown as { element?: HTMLElement }).element;
      // Scale the styled inner chip on narrow mounts and measure the VISUAL
      // box so decluttering packs the true on-screen size.
      const inner = (el?.firstElementChild as HTMLElement | null) ?? el;
      if (inner && inner !== el) {
        inner.style.transformOrigin = "center center";
        inner.style.transform = scale < 1 ? `scale(${scale})` : "";
      }
      const box = inner?.getBoundingClientRect();
      const vw = box?.width || el?.offsetWidth || 96;
      const vh = box?.height || el?.offsetHeight || 44;
      items.push({
        l,
        sx: (ndc.x + 1) * (w / 2),
        sy: (1 - ndc.y) * (h / 2),
        w: vw + 10,
        h: vh + 10,
        ox: 0,
        oy: 0,
        nx: ndc.x,
        ny: ndc.y,
        nz: ndc.z,
      });
    });
    const PAD = 8;
    // CSS2D chips are CENTERED on their anchor point, so every rect below
    // is treated as [cx - w/2, cy - h/2, w, h]. Chips are also CONFINED to
    // the canvas: each relaxation pass ends with a boundary clamp, then the
    // next pass re-relaxes any collisions the clamp created (alternating
    // relax ↔ clamp converges without pushing chips off-scene).
    const clampInside = (it: DeclItem) => {
      const minX = it.w / 2 + 4;
      const maxX = w - it.w / 2 - 4;
      const minY = it.h / 2 + 4;
      const maxY = h - it.h / 2 - 4;
      if (minX <= maxX) {
        const cx = Math.max(minX, Math.min(maxX, it.sx + it.ox));
        it.ox = cx - it.sx;
      }
      if (minY <= maxY) {
        const cy = Math.max(minY, Math.min(maxY, it.sy + it.oy));
        it.oy = cy - it.sy;
      }
    };
    for (let iter = 0; iter < 80; iter++) {
      let moved = false;
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const a = items[i];
          const b = items[j];
          const ax = a.sx + a.ox;
          const ay = a.sy + a.oy;
          const bx = b.sx + b.ox;
          const by = b.sy + b.oy;
          const px = Math.min(ax + a.w / 2, bx + b.w / 2) - Math.max(ax - a.w / 2, bx - b.w / 2);
          const py = Math.min(ay + a.h / 2, by + b.h / 2) - Math.max(ay - a.h / 2, by - b.h / 2);
          if (px > 0 && py > 0) {
            moved = true;
            if (px <= py) {
              const dir = ax <= bx ? -1 : 1;
              const push = (px + PAD) / 2;
              a.ox += dir * push;
              b.ox -= dir * push;
            } else {
              const dir = ay <= by ? -1 : 1;
              const push = (py + PAD) / 2;
              a.oy += dir * push;
              b.oy -= dir * push;
            }
          }
        }
      }
      items.forEach(clampInside);
      if (!moved) break;
    }
    items.forEach((it) => {
      it.ox = Math.max(-260, Math.min(260, it.ox));
      it.oy = Math.max(-260, Math.min(260, it.oy));
      if (it.ox === 0 && it.oy === 0) return;
      world.set(it.nx + (2 * it.ox) / w, it.ny - (2 * it.oy) / h, it.nz).unproject(camera);
      const parent = it.l.label.parent;
      if (!parent) return;
      it.l.label.position.copy(parent.worldToLocal(world));
      it.l.label.updateMatrixWorld();
    });

    lines.forEach((l, i) => {
      if (!l.label.visible) return;
      const id = keyFor(i, l);
      const expanded = stateStore.get(id)?.expanded ?? false;

      tmp.setFromMatrixPosition(l.label.matrixWorld);
      const [sx, sy] = project2(camera, tmp, w, h);
      const [tx, ty] = project2(camera, l.target, w, h);
      // Skip degenerate lines and off-screen labels
      if (Math.abs(sx - tx) < 1 && Math.abs(sy - ty) < 1) return;
      if (sx < -80 || sy < -80 || sx > w + 80 || sy > h + 80) return;

      // Geometry varies with expanded state.
      const bend = expanded ? 48 : 26;
      const strokeW = expanded ? 3.6 : 2.2;
      const tickHalf = expanded ? 9 : 5.5;
      const tickW = expanded ? 3.4 : 2.2;
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

      const line = document.createElementNS(NS, "path");
      line.setAttribute("d", path);
      line.setAttribute("fill", "none");
      line.setAttribute("stroke", l.color);
      line.setAttribute("stroke-width", String(strokeW));
      line.setAttribute("stroke-opacity", expanded ? "1" : "0.95");
      line.setAttribute("stroke-linecap", "round");
      svg.appendChild(line);

      // Tip terminator: perpendicular tick at the target (NOT an arrowhead).
      // Its angle matches the curve's arrival direction so it reads as a
      // precise marker of the named point.
      const angle = Math.atan2(ty - my, tx - mx);
      const nx = Math.cos(angle);
      const ny = Math.sin(angle);
      const t1x = tx - ny * tickHalf;
      const t1y = ty + nx * tickHalf;
      const t2x = tx + ny * tickHalf;
      const t2y = ty - nx * tickHalf;
      const tick = document.createElementNS(NS, "path");
      tick.setAttribute(
        "d",
        `M ${t1x.toFixed(1)} ${t1y.toFixed(1)} L ${tx.toFixed(1)} ${ty.toFixed(1)} L ${t2x.toFixed(1)} ${t2y.toFixed(1)}`,
      );
      tick.setAttribute("fill", "none");
      tick.setAttribute("stroke", l.color);
      tick.setAttribute("stroke-width", String(tickW));
      tick.setAttribute("stroke-linecap", "round");
      svg.appendChild(tick);

      // Clickable pin at the label anchor (hold-to-expand).
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
      pin.style.touchAction = "none";
      pin.addEventListener("pointerdown", (ev) => {
        ev.stopPropagation();
        startHold(id);
      });
      pin.addEventListener("pointerup", (ev) => {
        ev.stopPropagation();
        endHold();
      });
      pin.addEventListener("pointerleave", () => cancelHold());
      pin.addEventListener("pointercancel", () => cancelHold());
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
    clearHold();
    chipScaleRO.disconnect();
    if (svg.parentNode) svg.parentNode.removeChild(svg);
    stateStore.clear();
    knownIds.length = 0;
  }

  return { draw, dispose, toggle, isExpanded, setExpanded, getPinIds };
}

export default createLeaderLayer;
