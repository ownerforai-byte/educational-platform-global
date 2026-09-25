"use client";

/**
 * Faunal Diversity — REAL ANATOMY STUDIO (shared kit).
 *
 * A second, photoreal explorer that sits BELOW the original faunal suite.
 * Nothing is replaced: this is an additional layer with capabilities the
 * original scenes do not have —
 *
 *   • VIEW SWITCHING — external (real skin) / transparent (skin turned
 *     glassy, organs visible in place) / cutaway (body wall opened) /
 *     one view per organ system (digestive, excretory, nervous,
 *     reproductive, circulatory).
 *   • TRANSPARENCY PRESETS — opaque, semi-transparent, x-ray.
 *   • PROCESS ANIMATION — peristalsis, circulation, cyclosis, heartbeat,
 *     nephridial pulsing — each system's working process, not a still.
 *   • KNOWLEDGE TABLE — every exam-asked part with its function and why
 *     it matters, per view.
 *
 * House rules preserved: no arrowheads (tick-terminated leader lines),
 * CSS2D label chips, reveal bar on every canvas, TheoryPanel below.
 */

import { useRef, useState, useEffect, type ReactNode } from "react";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { createLeaderLayer, createRevealBar, type LeaderLayer } from "@/components/lab/leader-lines";
import {
  createThreeScene,
  disposeThreeScene,
  bindResize,
  titleText,
  type ThreeScene,
} from "@/components/lab/three-scene";
import { isWebGLAvailable } from "@/lib/webgl";
import { VizToolbar, type VizTarget, type VizTargetRef } from "@/components/viz/viz-toolbar";

/* ------------------------------------------------------------------ */
/* types                                                               */
/* ------------------------------------------------------------------ */

export type RealViewId =
  | "external"
  | "transparent"
  | "cutaway"
  | "digestive"
  | "excretory"
  | "nervous"
  | "circulatory"
  | "reproductive"
  | "process"
  | (string & {});

export type RealView = { id: RealViewId; label: string; hint: string };

export type RealPart = {
  name: string;
  fn: string;
  why: string;
};

export type RealOpts = {
  view: RealViewId;
  clarity: "opaque" | "semi" | "xray";
  process: boolean;
  /** Optional focus (e.g. earthworm segment number) — 0 = none. */
  focus: number;
};

export type RealLeader = { label: THREE.Object3D; target: THREE.Vector3; color: string };

export type RealKit = {
  ts: ThreeScene;
  mount: HTMLElement;
  labelRenderer: CSS2DRenderer;
  leader: LeaderLayer | null;
  lines: RealLeader[];
  add: (
    color: string,
    title: string,
    sub: string | undefined,
    pos: THREE.Vector3,
    target?: THREE.Vector3,
  ) => void;
};

export function realChip(color: string, title: string, sub?: string): HTMLDivElement {
  // Wrapper (what CSS2DRenderer positions) + inner styled chip (what the
  // leader-line layer measures and scales).
  //
  // The two-element structure matters: the declutter measures
  // `el.firstElementChild`. Without the wrapper it would measure the title
  // <span> instead of the whole chip — a narrower box — and then pack chips
  // as if they were smaller than they are, letting them overlap and drift
  // off-canvas. It would also scale the span rather than the chip.
  const el = document.createElement("div");
  el.style.cssText = "pointer-events:auto;";
  const inner = document.createElement("div");
  // Compact chips: a crowded anatomy scene can carry 10+ of these, and the
  // leader-line declutter needs vertical room inside the canvas to separate
  // them. 10px/1.25 with 2px padding keeps each chip ~30px tall.
  inner.style.cssText =
    "pointer-events:auto;padding:2px 8px;border-radius:9px;background:rgba(2,6,23,0.88);" +
    `border:1.5px solid ${color};color:#e2e8f0;font:600 10px/1.25 ui-sans-serif,system-ui;white-space:nowrap;box-shadow:0 2px 10px rgba(0,0,0,.35);`;
  inner.innerHTML =
    `<span style="color:${color};font-weight:800">${title}</span>` +
    (sub ? `<br/><span style="opacity:.82;font-weight:500">${sub}</span>` : "");
  el.appendChild(inner);
  return el;
}

/**
 * The DOM layers this kit attaches to a mount, so a rebuilt scene can drop the
 * previous scene's layers exactly. Leftover chips are invisible to the live
 * scene's declutter pass (which only knows its own lines), so they sit at
 * their raw anchors and pile up on the live labels — which is precisely what
 * made the head-end annotations unreadable.
 */
const MOUNT_LAYERS = new WeakMap<HTMLElement, { label: HTMLElement; svg: SVGSVGElement | null }>();

function sweepMountLayers(mount: HTMLElement) {
  const prev = MOUNT_LAYERS.get(mount);
  if (!prev) return;
  try {
    prev.label.remove();
  } catch {
    /* non-fatal */
  }
  try {
    prev.svg?.remove();
  } catch {
    /* non-fatal */
  }
  MOUNT_LAYERS.delete(mount);
}

export function setupRealKit(mount: HTMLElement, bg = 0x071019): RealKit {
  sweepMountLayers(mount);
  const ts = createThreeScene(mount, { background: bg });
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
  labelRenderer.domElement.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;z-index:10";
  mount.appendChild(labelRenderer.domElement);

  let leader: LeaderLayer | null = null;
  try {
    leader = createLeaderLayer(mount);
  } catch {
    leader = null;
  }
  MOUNT_LAYERS.set(mount, {
    label: labelRenderer.domElement,
    svg: (leader ? mount.querySelector<SVGSVGElement>(':scope > svg[style*="z-index:9"]') : null),
  });
  if (leader) {
    try {
      createRevealBar(mount, leader);
    } catch {
      /* non-fatal */
    }
  }

  const lines: RealLeader[] = [];
  return {
    ts,
    mount,
    labelRenderer,
    leader,
    lines,
    add(color, title, sub, pos, target) {
      const o = new CSS2DObject(realChip(color, title, sub));
      o.position.copy(pos);
      ts.group.add(o);
      if (target) lines.push({ label: o, target: target.clone(), color });
    },
  };
}

export function disposeRealKit(kit: RealKit) {
  // Each step is isolated: a throw in one layer must not orphan the others.
  try {
    kit.leader?.dispose();
  } catch {
    /* non-fatal */
  }
  try {
    disposeThreeScene(kit.ts);
  } catch {
    /* non-fatal */
  }
  sweepMountLayers(kit.mount);
}

export function runRealLoop(kit: RealKit, tick?: (t: number) => void): () => void {
  const clock = new THREE.Clock();
  let raf = 0;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    tick?.(clock.getElapsedTime());
    kit.ts.controls.update();
    kit.ts.renderer.render(kit.ts.scene, kit.ts.camera);
    kit.labelRenderer.render(kit.ts.scene, kit.ts.camera);
    kit.leader?.draw(kit.ts.camera, kit.lines);
  };
  animate();
  return () => cancelAnimationFrame(raf);
}

/**
 * Frame the camera on the model's real geometry.
 *
 * Only meshes count towards the bounding box — CSS2D label chips sit far off
 * the body on purpose (that is how leader lines get their room), so including
 * them would zoom the camera out until the organism became a speck.
 */
export function fitCamera(ts: ThreeScene, pad = 1.22) {
  const box = new THREE.Box3();
  const v = new THREE.Vector3();
  ts.group.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    const geo = m.geometry;
    if (!geo) return;
    if (!geo.boundingBox) geo.computeBoundingBox();
    const bb = geo.boundingBox;
    if (!bb) return;
    m.updateWorldMatrix(true, false);
    for (const corner of [
      [bb.min.x, bb.min.y, bb.min.z],
      [bb.max.x, bb.min.y, bb.min.z],
      [bb.min.x, bb.max.y, bb.min.z],
      [bb.max.x, bb.max.y, bb.min.z],
      [bb.min.x, bb.min.y, bb.max.z],
      [bb.max.x, bb.min.y, bb.max.z],
      [bb.min.x, bb.max.y, bb.max.z],
      [bb.max.x, bb.max.y, bb.max.z],
    ]) {
      v.set(corner[0], corner[1], corner[2]).applyMatrix4(m.matrixWorld);
      box.expandByPoint(v);
    }
  });
  if (box.isEmpty()) return;

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  // Fit each axis independently — a 26-unit worm is wide and flat, so a
  // single max-dimension radius would leave huge empty bands above and below.
  const fov = (ts.camera.fov * Math.PI) / 180;
  const aspect = ts.camera.aspect || 1;
  const halfW = size.x / 2 || 1;
  const halfH = Math.max(size.y, size.z) / 2 || 1;
  const distV = halfH / Math.tan(fov / 2);
  const distH = halfW / (Math.tan(fov / 2) * aspect);
  const dist = Math.max(distV, distH) * pad;

  ts.camera.position.copy(center).add(new THREE.Vector3(0.42, 0.5, 1).normalize().multiplyScalar(dist));
  ts.camera.near = Math.max(0.05, dist / 200);
  ts.camera.far = dist * 40;
  ts.camera.updateProjectionMatrix();
  ts.controls.target.copy(center);
  ts.controls.update();
}

/** Skin opacity by clarity preset — the "transparent view" control. */
export function skinOpacity(clarity: RealOpts["clarity"]): number {
  return clarity === "opaque" ? 1 : clarity === "semi" ? 0.42 : 0.14;
}

export function isSystemView(view: RealViewId): boolean {
  return (
    view === "digestive" ||
    view === "excretory" ||
    view === "nervous" ||
    view === "circulatory" ||
    view === "reproductive"
  );
}

/** Should the body wall be drawn at all in this view? */
export function wallVisible(view: RealViewId, clarity: RealOpts["clarity"]): boolean {
  if (view === "transparent") return clarity !== "opaque";
  if (view === "cutaway") return true;
  if (isSystemView(view) || view === "process") return clarity !== "xray" ? clarity === "opaque" ? false : true : false;
  return true;
}

/* ------------------------------------------------------------------ */
/* the viewer shell                                                    */
/* ------------------------------------------------------------------ */

export function RealAnatomyViewer({
  title,
  subtitle,
  badge = "Real anatomy",
  clarityText = { prefix: "Skin", opaque: "Opaque (real skin)" },
  views,
  parts,
  partsFor,
  build,
  defaultView = "external",
  defaultClarity = "opaque",
  defaultProcess = false,
  extraControls,
  footer,
}: {
  title: string;
  subtitle: string;
  /** Small uppercase tag before the title — subject-specific (defaults to the faunal studio's). */
  badge?: string;
  /**
   * Wording for the see-through control. Faunal scenes talk about skin;
   * a periodic table or a lens bench talks about its casing instead.
   */
  clarityText?: { prefix: string; opaque: string };
  views: RealView[];
  /** Fallback knowledge rows when no per-view table is supplied. */
  parts: RealPart[];
  /** Per-view knowledge table — keeps the rows in step with the switch. */
  partsFor?: (view: RealViewId) => RealPart[];
  build: (kit: RealKit, opts: RealOpts) => void | ((t: number) => void);
  defaultView?: RealViewId;
  defaultClarity?: RealOpts["clarity"];
  defaultProcess?: boolean;
  extraControls?: (opts: RealOpts, set: (patch: Partial<RealOpts>) => void) => ReactNode;
  footer?: ReactNode;
}) {
  const [view, setView] = useState<RealViewId>(defaultView);
  const [clarity, setClarity] = useState<RealOpts["clarity"]>(defaultClarity);
  const [process, setProcess] = useState(defaultProcess);
  const [focus, setFocus] = useState(0);

  const vizTargetRef = useRef<VizTarget>({});
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !webGL) return;
    const kit = setupRealKit(mount);
    vizTargetRef.current = {
      controls: kit.ts.controls,
      el: mount,
      canvasEl: kit.ts.renderer.domElement,
      render: () => {
        kit.ts.renderer.render(kit.ts.scene, kit.ts.camera);
        kit.labelRenderer.render(kit.ts.scene, kit.ts.camera);
        kit.leader?.draw(kit.ts.camera, kit.lines);
      },
    };
    const tick = build(kit, { view, clarity, process, focus });
    fitCamera(kit.ts);
    const stop = runRealLoop(kit, tick ?? undefined);
    const offResize = bindResize(kit.ts);
    const onResize = () => kit.labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      offResize();
      disposeRealKit(kit);
      vizTargetRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGL, view, clarity, process, focus]);

  const opts: RealOpts = { view, clarity, process, focus };
  const set = (patch: Partial<RealOpts>) => {
    if (patch.view !== undefined) setView(patch.view);
    if (patch.clarity !== undefined) setClarity(patch.clarity);
    if (patch.process !== undefined) setProcess(patch.process);
    if (patch.focus !== undefined) setFocus(patch.focus);
  };

  const activeView = views.find((v) => v.id === view) ?? views[0];
  const activeParts = partsFor ? partsFor(view) : parts;

  return (
    <div className="space-y-3 rounded-2xl border border-border/60 bg-card/40 p-3 md:p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold md:text-base">
            <span className="mr-1.5 rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              {badge}
            </span>
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* view switcher */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => set({ view: v.id })}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                view === v.id
                  ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                  : "border-border/60 text-muted-foreground hover:text-foreground"
              }`}
              title={v.hint}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground">{clarityText.prefix}:</span>
          {(
            [
              ["opaque", clarityText.opaque],
              ["semi", "Semi-transparent"],
              ["xray", "X-ray"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => set({ clarity: id })}
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                clarity === id
                  ? "border-sky-500/50 bg-sky-500/15 text-sky-700 dark:text-sky-300"
                  : "border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => set({ process: !process })}
            className={`ml-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-colors ${
              process
                ? "border-amber-500/50 bg-amber-500/15 text-amber-700 dark:text-amber-300"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            {process ? "◼ Stop process" : "▶ Play process"}
          </button>
          {extraControls?.(opts, set)}
        </div>
        {activeView && (
          <p className="text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground">{activeView.label}:</span> {activeView.hint}
          </p>
        )}
      </div>

      {/* canvas */}
      {webGL ? (
        <div
          ref={mountRef}
          aria-label={`${title} 3D scene`}
          className="relative h-[420px] w-full overflow-hidden rounded-xl sm:h-[500px] md:h-[clamp(440px,66vh,720px)]"
        >
          <VizToolbar targetRef={vizTargetRef} />
        </div>
      ) : (
        <div className="flex h-80 w-full items-center justify-center rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground">
          WebGL is not available in this browser.
        </div>
      )}

      {/* knowledge table */}
      <div className="overflow-hidden rounded-xl border border-border/60">
        <div className="flex items-center justify-between bg-muted/30 px-3 py-2">
          <p className="text-xs font-bold">
            Parts in view — {activeView?.label}
            <span className="ml-2 font-normal text-muted-foreground">
              {activeParts.length} structures documented
            </span>
          </p>
        </div>
        <div className="max-h-72 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <tbody>
              {activeParts.map((p) => (
                <tr key={p.name} className="border-t border-border/40 align-top">
                  <td className="w-40 px-3 py-2 font-semibold text-emerald-700 dark:text-emerald-300">{p.name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{p.fn}</td>
                  <td className="px-3 py-2 text-muted-foreground/85">
                    <span className="font-medium text-foreground/80">Why it matters: </span>
                    {p.why}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {footer}
    </div>
  );
}

export { titleText };
