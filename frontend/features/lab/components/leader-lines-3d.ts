import * as THREE from "three";

/**
 * 3D Leader Lines — arrow-free scene connectors.
 *
 * Project-wide design rules:
 *  - NO arrowheads anywhere. A leader line ends in a small perpendicular
 *    "tip terminator" (tick) that marks the exact point being named.
 *  - Direction stays readable via a subtle particle flow along the shaft —
 *    never via arrow geometry.
 *  - `LiveLeaderLine` is a drop-in replacement for THREE.ArrowHelper /
 *    LiveArrow usage sites: same constructor signature, `setLength`,
 *    `setDirection`, and it survives `instanceof THREE.ArrowHelper` style
 *    cleanup via a `.isLeaderLine` marker (callers check `dispose()`).
 *
 * Hold-to-expand:
 *  - Lines subscribe to the shared `leader-line-toggle` CustomEvent emitted
 *    by the 2D SVG leader-line pins (leader-lines.ts). When the matching pin
 *    is held/expanded, the 3D line thickens and its terminator grows —
 *    pressing the pin again contracts it. `setExpanded()` can also be driven
 *    directly (e.g. from a long-press gesture on the scene).
 */

export interface LeaderLine3DStyle {
  /** Shaft radius in world units. */
  shaftRadius?: number;
  /** Tip terminator half-length in world units (perpendicular tick). */
  tipLength?: number;
  /** Particle flow speed. */
  flowSpeed?: number;
  /** Particle count along the shaft. */
  particleCount?: number;
}

export interface LeaderLine3D {
  group: THREE.Group;
  update: (time: number) => void;
  dispose: () => void;
  /** ArrowHelper-compatible API. */
  setLength: (length: number, headLength?: number, headWidth?: number) => void;
  setDirection: (dir: THREE.Vector3) => void;
  /** Expand (bigger shaft + tip) — mirrors the SVG pin hold state. */
  setExpanded: (expanded: boolean) => void;
  isExpanded: () => boolean;
  /** Marker so cleanup code can distinguish leader lines from arrow helpers. */
  isLeaderLine: true;
}

const TOGGLE_EVENT = "leader-line-toggle";

export function createLeaderLine3D(
  origin: THREE.Vector3,
  direction: THREE.Vector3,
  length: number,
  color: number | string,
  id: string | undefined,
  options: LeaderLine3DStyle = {},
): LeaderLine3D {
  const {
    shaftRadius = 0.035,
    tipLength = 0.14,
    flowSpeed = 0.9,
    particleCount = 5,
  } = options;

  const colHex = typeof color === "string" ? new THREE.Color(color).getHex() : color;

  const group = new THREE.Group();
  const disposables: Array<() => void> = [];

  const dir = direction.clone().normalize();
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

  const shaftGeom = new THREE.CylinderGeometry(shaftRadius, shaftRadius, 1, 10, 1, true);
  const shaftMat = new THREE.MeshBasicMaterial({ color: colHex, transparent: true, opacity: 0.9 });
  const shaft = new THREE.Mesh(shaftGeom, shaftMat);
  shaft.geometry.translate(0, 0.5, 0); // grow from base
  group.add(shaft);
  disposables.push(() => shaftGeom.dispose(), () => shaftMat.dispose());

  // Tip terminator: a small perpendicular tick at the line's end (NOT an arrowhead).
  const tickGeom = new THREE.BoxGeometry(tipLength * 2, shaftRadius * 2.2, shaftRadius * 2.2);
  const tickMat = new THREE.MeshBasicMaterial({ color: colHex, transparent: true, opacity: 1 });
  const tick = new THREE.Mesh(tickGeom, tickMat);
  group.add(tick);
  disposables.push(() => tickGeom.dispose(), () => tickMat.dispose());

  // Flow particles — they convey direction; the line itself has no arrowhead.
  const pGeom = new THREE.SphereGeometry(shaftRadius * 1.6, 6, 6);
  disposables.push(() => pGeom.dispose());
  const pMats: THREE.MeshBasicMaterial[] = [];
  const particles: THREE.Mesh[] = [];
  for (let i = 0; i < particleCount; i++) {
    const pMat = new THREE.MeshBasicMaterial({ color: colHex, transparent: true, opacity: 0.85 });
    pMats.push(pMat);
    disposables.push(() => pMat.dispose());
    const p = new THREE.Mesh(pGeom, pMat);
    particles.push(p);
    group.add(p);
  }

  group.position.copy(origin);
  group.quaternion.copy(quat);

  let baseLength = Math.max(0.0001, length);
  let expanded = false;
  let phase = Math.random() * Math.PI * 2;

  function applyGeometry() {
    const pulse = 1 + Math.sin(performance.now() / 1000 * 2.2 + phase) * 0.05;
    const len = baseLength * pulse;
    shaft.scale.set(expanded ? 1.9 : 1, len, expanded ? 1.9 : 1);
    tick.position.y = len;
    const tipScale = expanded ? 1.7 : 1;
    tick.scale.set(tipScale, 1, tipScale);
  }
  applyGeometry();

  const update = (time: number) => {
    applyGeometry();
    shaftMat.opacity = 0.78 + Math.sin(time * 2.2 + phase) * 0.15;
    for (let i = 0; i < particles.length; i++) {
      const t = ((time * flowSpeed * 0.14 + i / particles.length) % 1 + 1) % 1;
      particles[i].position.set(0, t * baseLength, 0);
      const s = (expanded ? 1.5 : 1) * (0.7 + Math.sin(time * 3 + i * 1.7) * 0.3);
      particles[i].scale.setScalar(Math.max(0.05, s));
      pMats[i].opacity = 0.5 + (Math.sin(time * 2 + i * 1.3) * 0.5 + 0.5) * 0.4;
    }
  };

  const onToggle = (ev: Event) => {
    const detail = (ev as CustomEvent).detail as { id?: string; expanded?: boolean } | undefined;
    if (!detail || detail.id !== id) return;
    expanded = !!detail.expanded;
    applyGeometry();
  };
  if (typeof window !== "undefined") {
    window.addEventListener(TOGGLE_EVENT, onToggle);
  }

  return {
    group,
    update,
    isLeaderLine: true,
    setLength(len: number) {
      baseLength = Math.max(0.0001, len);
      applyGeometry();
    },
    setDirection(d: THREE.Vector3) {
      dir.copy(d).normalize();
      quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      group.quaternion.copy(quat);
    },
    setExpanded(e: boolean) {
      expanded = e;
      applyGeometry();
    },
    isExpanded: () => expanded,
    dispose() {
      if (typeof window !== "undefined") window.removeEventListener(TOGGLE_EVENT, onToggle);
      disposables.forEach((d) => d());
      group.clear();
    },
  };
}

/**
 * LiveLeaderLine — drop-in animated replacement for THREE.ArrowHelper.
 * Constructor signature matches ArrowHelper so migration is mechanical,
 * and an ArrowHelper-shaped structural surface (line/cone/setColor) keeps
 * typed call sites compiling; `line` and `cone` are inert stubs because
 * leader lines never render arrowheads.
 */
export class LiveLeaderLine extends THREE.Group {
  private impl: LeaderLine3D;
  public isLeaderLine = true as const;
  /** Exposed so callers can add/position the line via group semantics. */
  public get group(): THREE.Group {
    return this;
  }
  /** ArrowHelper-compat stubs — leader lines have no arrowhead geometry. */
  public readonly line: THREE.Line;
  public readonly cone: THREE.Mesh;

  constructor(
    dir?: THREE.Vector3,
    origin?: THREE.Vector3,
    length?: number,
    color?: number | string,
    headLength?: number,
    headWidth?: number,
    id?: string,
  ) {
    super();
    this.line = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ visible: false }));
    this.cone = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ visible: false }));
    this.line.visible = false;
    this.cone.visible = false;

    // headLength/headWidth are accepted for signature compatibility but are
    // ignored: leader lines never render arrowheads.
    void headLength;
    void headWidth;
    const d = dir ?? new THREE.Vector3(0, 1, 0);
    const o = origin ?? new THREE.Vector3(0, 0, 0);
    const len = length ?? 1;
    const c = color ?? 0xffffff;
    this.impl = createLeaderLine3D(o, d, len, c, id);
    this.add(this.impl.group);
    // Drive particle flow from the host render loop via onBeforeRender,
    // so no changes are needed at call sites.
    this.onBeforeRender = () => this.impl.update(performance.now() / 1000);
  }

  /** ArrowHelper-compat color API (recolors the leader line). */
  setColor(color: number | string) {
    // Implemented by recreating the internal line with the new color.
    const old = this.impl;
    this.remove(old.group);
    old.dispose();
    this.impl = createLeaderLine3D(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 1, 0),
      1,
      color,
      undefined,
    );
    this.add(this.impl.group);
    this.onBeforeRender = () => this.impl.update(performance.now() / 1000);
  }

  update(time: number) {
    this.impl.update(time);
  }

  setLength(length: number, headLength?: number, headWidth?: number) {
    void headLength;
    void headWidth;
    this.impl.setLength(length);
  }

  setDirection(dir: THREE.Vector3) {
    this.impl.setDirection(dir);
  }

  setExpanded(expanded: boolean) {
    this.impl.setExpanded(expanded);
  }

  isExpanded() {
    return this.impl.isExpanded();
  }

  dispose() {
    this.impl.dispose();
    this.remove(this.impl.group);
  }
}
