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
const _projScratch = new THREE.Vector3();
function project2(cam: THREE.Camera, p: THREE.Vector3, w: number, h: number): [number, number] {
  // Shared scratch (never re-entrant: results are consumed immediately) —
  // avoids allocating a Vector3 clone twice per line per frame.
  _projScratch.copy(p).project(cam);
  return [(_projScratch.x + 1) * (w / 2), (1 - _projScratch.y) * (h / 2)];
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
  setRevealMode: (on: boolean) => void;
  isRevealMode: () => boolean;
  revealNext: () => void;
  revealAllLabels: () => void;
  hideAllLabels: () => void;
  revealedCount: () => number;
  totalCount: () => number;
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
    // Invalidate cached chip boxes; next draw re-measures at the new size.
    chipScaleVersion++;
    // Trigger an immediate redraw at the new scale.
    const ev = new CustomEvent("leader-line-resize");
    window.dispatchEvent(ev);
  });
  chipScaleRO.observe(mount);

  let chipScaleVersion = 0;
  // Chips are measured once and cached (a rAF-time getBoundingClientRect is
  // layout thrashing). But the very first frames can measure a chip before
  // its fonts/text have laid out, freezing a wrong width in the cache — which
  // then lets the declutter pack overlapping chips. Re-measure a couple of
  // times after mount, once layout has certainly settled.
  const remeasureTimers: ReturnType<typeof setTimeout>[] = [];
  const scheduleRemeasure = (ms: number) => {
    if (typeof window === "undefined") return;
    remeasureTimers.push(
      setTimeout(() => {
        chipScaleVersion++;
        window.dispatchEvent(new CustomEvent("leader-line-resize"));
      }, ms),
    );
  };
  scheduleRemeasure(420);
  scheduleRemeasure(1400);
  // Cached chip measurement boxes (smoothness): chip sizes only change on
  // mount resize / scale change, so avoid a per-frame getBoundingClientRect
  // (a forced layout read inside rAF = layout thrashing). Cache is keyed by
  // the chip element and invalidated on resize or scene rebuild.
  const chipBoxCache = new WeakMap<HTMLElement, { v: number; w: number; h: number }>();
  const measureChip = (inner: HTMLElement, el: HTMLElement | undefined): { w: number; h: number } => {
    const cached = chipBoxCache.get(inner);
    if (cached && cached.v === chipScaleVersion) return cached;
    const box = inner.getBoundingClientRect();
    // Take the widest honest reading available: a chip whose second line is
    // longer than its first can report a box narrower than its content for a
    // frame, and an under-measured chip is exactly what lets the declutter
    // push a real, wider chip past the canvas edge.
    const w = Math.max(box?.width || 0, inner.scrollWidth || 0, el?.scrollWidth || 0);
    const h = Math.max(box?.height || 0, inner.scrollHeight || 0, el?.offsetHeight || 0);
    // A zero/absurd measurement means the chip was read before its text had
    // laid out. Caching that value would tell the declutter the chip is
    // narrow — and it would happily wedge the real (wider) chip off-canvas.
    // Re-read until the measurement is plausible instead of trusting it.
    if (w < 8 || h < 8) {
      const fallback = { v: chipScaleVersion, w: cached?.w || 96, h: cached?.h || 44 };
      return fallback;
    }
    const size = { v: chipScaleVersion, w, h };
    chipBoxCache.set(inner, size);
    return size;
  };

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
  // NOTE: keyFor's template string allocation only happens when lines lack
  // stable ids; scenes that pass `id` in LeaderLine skip it entirely.

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

  // ── Reveal mode (classroom reveal) ─────────────────────────────
  // Labels can start hidden and be revealed ONE BY ONE (Next), all at
  // once (Show all) or cleared (Hide all). UI lives in the floating
  // reveal bar (createRevealBar). Outside reveal mode everything is
  // always visible.
  let revealMode = false;
  let revealSeq = 0; // number of labels revealed so far

  function setRevealMode(on: boolean): void {
    revealMode = on;
    revealSeq = 0; // entering reveal mode starts from a blank scene
  }
  function isRevealMode(): boolean {
    return revealMode;
  }
  function isRevealed(id: string): boolean {
    if (!revealMode) return true;
    const idx = knownIds.indexOf(id);
    return idx >= 0 && idx < revealSeq;
  }
  function revealNext(): void {
    revealSeq = Math.min(revealSeq + 1, knownIds.length);
  }
  function revealAllLabels(): void {
    revealSeq = knownIds.length;
  }
  function hideAllLabels(): void {
    revealSeq = 0;
  }
  function revealedCount(): number {
    return revealMode ? revealSeq : knownIds.length;
  }
  function totalCount(): number {
    return knownIds.length;
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
    // NOTE: no svg.innerHTML wipe — nodes live in a persistent pool and are
    // swept individually (see the pool sweep below). Wiping here would detach
    // the pooled groups every frame and defeat the pool entirely.
    const w = mount.clientWidth || 1;
    const h = mount.clientHeight || 1;
    const tmp = new THREE.Vector3();
    const world = new THREE.Vector3();

    // ── Reveal sync ──────────────────────────────────────────────
    // Keep each CSS2D chip's DOM visibility in step with the reveal
    // state so "one by one" / "Hide all" hides the CHIP (and its
    // leader line) — not just the SVG stroke.
    lines.forEach((l, i) => {
      const el = (l.label as unknown as { element?: HTMLElement }).element;
      if (!el) return;
      const show = l.label.visible && isRevealed(keyFor(i, l));
      const next = show ? "" : "none";
      if (el.style.display !== next) el.style.display = next;
    });

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
    lines.forEach((l, i) => {
      if (!l.label.visible) return;
      if (!isRevealed(keyFor(i, l))) return;
      let base = basePositions.get(l.label);
      if (!base) {
        base = l.label.position.clone();
        basePositions.set(l.label, base);
      }
      if (!l.label.position.equals(base)) l.label.position.copy(base);
      l.label.updateMatrixWorld();
      tmp.setFromMatrixPosition(l.label.matrixWorld);
      const ndc = tmp.project(camera);
      // Self-heal: a torn-down tab can hand back NaN projections for one
      // frame; reset the chip to its authored anchor instead of letting
      // NaN cascade into the SVG ("M NaN NaN" console spam).
      if (!Number.isFinite(ndc.x) || !Number.isFinite(ndc.y)) {
        l.label.position.copy(base);
        return;
      }
      const el = (l.label as unknown as { element?: HTMLElement }).element;
      // Scale the styled inner chip on narrow mounts; measure the VISUAL box
      // (from cache) so decluttering packs the true on-screen size.
      const inner = (el?.firstElementChild as HTMLElement | null) ?? el;
      if (inner && inner !== el) {
        inner.style.transformOrigin = "center center";
        const wantT = scale < 1 ? `scale(${scale})` : "";
        if (inner.style.transform !== wantT) inner.style.transform = wantT;
      }
      const { w: vw, h: vh } = inner ? measureChip(inner, el) : { w: el?.offsetWidth || 96, h: el?.offsetHeight || 44 };
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
    // Convergence budget: the relax ↔ clamp alternation needs more passes
    // on genuinely dense scenes (nine-phyla row, 8-system anatomy) where a
    // boundary clamp can keep re-creating collisions. The loop exits early
    // the moment nothing moves, so a generous cap costs nothing on the
    // scenes that already converge in a handful of passes.
    for (let iter = 0; iter < 260; iter++) {
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

    // ── Persistent node pool (smoothness) ────────────────────────
    // One <g> per line, created ONCE and reused every frame. Attributes
    // are written only when a value actually changes (fingerprint check),
    // and pin listeners are attached once at creation. This replaces the
    // old wipe-and-rebuild (svg.innerHTML = "" + recreate ~7 nodes and 4
    // listeners per line per frame) which caused constant GC churn and
    // visible jank on busy scenes.
    interface PoolEntry {
      g: SVGGElement;
      line: SVGPathElement;
      tick: SVGPathElement;
      pin: SVGCircleElement;
      pinInner: SVGCircleElement;
      minus: SVGRectElement;
      plusV: SVGRectElement;
      lastKey: string;
    }
    if (!(draw as unknown as { pool?: Map<string, PoolEntry> }).pool) {
      (draw as unknown as { pool?: Map<string, PoolEntry> }).pool = new Map();
    }
    const pool = (draw as unknown as { pool: Map<string, PoolEntry> }).pool;
    const usedIds = new Set<string>();

    const makeEntry = (id: string): PoolEntry => {
      const g = document.createElementNS(NS, "g");
      const line = document.createElementNS(NS, "path");
      line.setAttribute("fill", "none");
      line.setAttribute("stroke-linecap", "round");
      line.style.pointerEvents = "none";
      const tick = document.createElementNS(NS, "path");
      tick.setAttribute("fill", "none");
      tick.setAttribute("stroke-linecap", "round");
      tick.style.pointerEvents = "none";
      const pin = document.createElementNS(NS, "circle");
      pin.setAttribute("fill", "#ffffff");
      pin.setAttribute("data-pin-id", id);
      pin.style.pointerEvents = "auto";
      pin.style.cursor = "pointer";
      pin.style.touchAction = "none";
      // Listeners are bound ONCE per pooled pin — never per frame.
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
      const pinInner = document.createElementNS(NS, "circle");
      pinInner.setAttribute("stroke", "none");
      pinInner.style.pointerEvents = "none";
      const minus = document.createElementNS(NS, "rect");
      minus.setAttribute("height", "1.8");
      minus.setAttribute("rx", "0.9");
      minus.style.pointerEvents = "none";
      const plusV = document.createElementNS(NS, "rect");
      plusV.setAttribute("width", "1.8");
      plusV.setAttribute("rx", "0.9");
      plusV.style.pointerEvents = "none";
      g.append(line, tick, pin, pinInner, minus, plusV);
      svg.appendChild(g);
      return { g, line, tick, pin, pinInner, minus, plusV, lastKey: "" };
    };

    const setAttr = (el: Element, name: string, val: string) => {
      if (el.getAttribute(name) !== val) el.setAttribute(name, val);
    };

    lines.forEach((l, i) => {
      if (!l.label.visible) return;
      const id = keyFor(i, l);
      if (!isRevealed(id)) return;
      const expanded = stateStore.get(id)?.expanded ?? false;

      tmp.setFromMatrixPosition(l.label.matrixWorld);
      const [sx, sy] = project2(camera, tmp, w, h);
      const [tx, ty] = project2(camera, l.target, w, h);
      // Skip degenerate lines and off-screen labels
      if (!Number.isFinite(sx) || !Number.isFinite(sy) || !Number.isFinite(tx) || !Number.isFinite(ty)) return;
      if (Math.abs(sx - tx) < 1 && Math.abs(sy - ty) < 1) return;
      if (sx < -80 || sy < -80 || sx > w + 80 || sy > h + 80) return;

      const fp = `${sx.toFixed(1)}|${sy.toFixed(1)}|${tx.toFixed(1)}|${ty.toFixed(1)}|${l.color}|${expanded ? 1 : 0}`;
      let e = pool.get(id);
      if (!e) {
        e = makeEntry(id);
        pool.set(id, e);
      }
      usedIds.add(id);
      if (e.lastKey === fp) return; // nothing changed this frame — skip all DOM writes
      e.lastKey = fp;

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
      setAttr(e.line, "d", `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}`);
      setAttr(e.line, "stroke", l.color);
      setAttr(e.line, "stroke-width", String(strokeW));
      setAttr(e.line, "stroke-opacity", expanded ? "1" : "0.95");

      // Tip terminator: perpendicular tick at the target (NOT an arrowhead).
      const angle = Math.atan2(ty - my, tx - mx);
      const nx = Math.cos(angle);
      const ny = Math.sin(angle);
      // ONE straight stroke across the shaft. A two-stroke chevron back to
      // the tip is geometrically an arrowhead — it reads as an arrow no
      // matter what it is called, and the house rule is arrow-free leaders.
      setAttr(e.tick, "d", `M ${(tx - ny * tickHalf).toFixed(1)} ${(ty + nx * tickHalf).toFixed(1)} L ${(tx + ny * tickHalf).toFixed(1)} ${(ty - nx * tickHalf).toFixed(1)}`);
      setAttr(e.tick, "stroke", l.color);
      setAttr(e.tick, "stroke-width", String(tickW));

      // Clickable pin at the label anchor (hold-to-expand).
      setAttr(e.pin, "cx", sx.toFixed(1));
      setAttr(e.pin, "cy", sy.toFixed(1));
      setAttr(e.pin, "r", String(pinR));
      setAttr(e.pin, "stroke", l.color);
      setAttr(e.pin, "stroke-width", expanded ? "2.8" : "2.2");

      // Inner dot (non-interactive).
      setAttr(e.pinInner, "cx", sx.toFixed(1));
      setAttr(e.pinInner, "cy", sy.toFixed(1));
      setAttr(e.pinInner, "r", String(pinInnerR));
      setAttr(e.pinInner, "fill", l.color);

      // Plus/minus glyph: expanded => minus only; compact => plus.
      setAttr(e.minus, "x", (sx - glyphR).toFixed(1));
      setAttr(e.minus, "y", (sy - 0.9).toFixed(1));
      setAttr(e.minus, "width", String(glyphR * 2));
      setAttr(e.minus, "fill", l.color);
      setAttr(e.plusV, "x", (sx - 0.9).toFixed(1));
      setAttr(e.plusV, "y", (sy - glyphR).toFixed(1));
      setAttr(e.plusV, "height", String(glyphR * 2));
      setAttr(e.plusV, "fill", l.color);
      const pv = e.plusV.getAttribute("display") ?? "";
      const wantPv = expanded ? "none" : "";
      if (pv !== wantPv) e.plusV.setAttribute("display", wantPv);
    });

    // Sweep pooled groups whose lines disappeared (tab switch, scene rebuild).
    for (const [pid, pe] of pool) {
      if (!usedIds.has(pid)) {
        pe.g.remove();
        pool.delete(pid);
      }
    }
  }

  function dispose() {
    clearHold();
    remeasureTimers.forEach((t) => clearTimeout(t));
    remeasureTimers.length = 0;
    chipScaleRO.disconnect();
    if (svg.parentNode) svg.parentNode.removeChild(svg);
    stateStore.clear();
    knownIds.length = 0;
    (draw as unknown as { pool?: Map<string, unknown> }).pool?.clear();
  }

  return {
    draw,
    dispose,
    toggle,
    isExpanded,
    setExpanded,
    getPinIds,
    setRevealMode,
    isRevealMode,
    revealNext,
    revealAllLabels,
    hideAllLabels,
    revealedCount,
    totalCount,
  };
}

export default createLeaderLayer;

export type LeaderLayer = ReturnType<typeof createLeaderLayer>;

/**
 * Floating reveal control bar for a leader layer.
 *
 * Buttons: Reveal (toggle reveal mode) · Next (reveal labels one by one,
 * with a live "n / total" counter) · Show all · Hide all.
 *
 * Place the returned element inside the scene mount (it positions itself
 * absolute top-left, clear of the VizToolbar in the top-right). All
 * drawing is picked up by the scene's own animation loop, so no extra
 * redraw plumbing is needed.
 */
export function createRevealBar(
  host: HTMLElement,
  layer: LeaderLayer,
): () => void {
  // Idempotent per mount: a re-created scene on the same mount replaces
  // the previous bar instead of stacking duplicates.
  host
    .querySelectorAll("[data-leader-reveal-bar]")
    .forEach((el) => el.remove());

  const bar = document.createElement("div");
  bar.dataset.leaderRevealBar = "";
  bar.style.cssText =
    "position:absolute;top:8px;left:8px;z-index:30;display:flex;align-items:center;gap:6px;" +
    "padding:4px 6px;border-radius:12px;background:rgba(2,6,23,0.82);" +
    "border:1px solid rgba(148,163,184,0.35);backdrop-filter:blur(6px);" +
    "font:600 11px/1 ui-sans-serif,system-ui;color:#e2e8f0;user-select:none;";

  const mkBtn = (label: string, title: string, color: string) => {
    const b = document.createElement("button");
    b.textContent = label;
    b.title = title;
    b.style.cssText =
      "padding:4px 8px;border-radius:8px;border:1px solid rgba(148,163,184,0.3);" +
      "background:rgba(15,23,42,0.6);color:#e2e8f0;cursor:pointer;font:inherit;" +
      "transition:background .15s,border-color .15s;";
    b.addEventListener("pointerdown", (ev) => ev.stopPropagation());
    b.addEventListener("click", (ev) => ev.stopPropagation());
    b.dataset.color = color;
    return b;
  };

  const revealToggle = mkBtn("◉ Reveal", "Reveal mode: labels start hidden", "#38bdf8");
  const counter = document.createElement("span");
  counter.style.cssText = "padding:0 2px;opacity:.85;min-width:34px;text-align:center;";
  const nextBtn = mkBtn("Next +1", "Reveal the next label", "#38bdf8");
  const allBtn = mkBtn("Show all", "Reveal every label at once", "#a3e635");
  const hideBtn = mkBtn("Hide all", "Hide every label again", "#f87171");

  bar.append(revealToggle, counter, nextBtn, allBtn, hideBtn);
  host.appendChild(bar);

  const sync = () => {
    const on = layer.isRevealMode();
    const total = layer.totalCount();
    const shown = layer.revealedCount();
    revealToggle.style.borderColor = on ? "#38bdf8" : "rgba(148,163,184,0.3)";
    revealToggle.style.background = on ? "rgba(56,189,248,0.18)" : "rgba(15,23,42,0.6)";
    revealToggle.style.color = on ? "#7dd3fc" : "#e2e8f0";
    counter.textContent = `${shown}/${total}`;
    const exhausted = !on || shown >= total;
    nextBtn.style.opacity = exhausted ? "0.4" : "1";
    nextBtn.style.pointerEvents = exhausted ? "none" : "auto";
    hideBtn.style.opacity = on && shown === 0 ? "0.4" : "1";
    hideBtn.style.pointerEvents = on && shown === 0 ? "none" : "auto";
  };

  revealToggle.addEventListener("click", () => {
    layer.setRevealMode(!layer.isRevealMode());
    sync();
  });
  nextBtn.addEventListener("click", () => {
    layer.revealNext();
    sync();
  });
  allBtn.addEventListener("click", () => {
    layer.revealAllLabels();
    sync();
  });
  hideBtn.addEventListener("click", () => {
    layer.hideAllLabels();
    sync();
  });
  sync();

  // Refresh the counter when the scene's line set changes (tab switches
  // rebuild scenes, but a live-updating scene may add lines mid-flight).
  const ro = new ResizeObserver(sync);
  ro.observe(host);

  return () => {
    ro.disconnect();
    bar.remove();
  };
}
