"use client";

/**
 * VizToolbar — universal floating control overlay for every visualization
 * (WebGL scenes, 2D schematics, mind maps). Interaction conventions follow
 * PhET Interactive Simulations / GeoGebra / three.js viewport standards:
 *   - explicit zoom ± buttons + % readout (scroll shortcuts are undiscoverable)
 *   - reset view (PhET ResetAllButton convention)
 *   - auto-rotate toggle + speed control (slow-motion exploration)
 *   - labels toggle (optional, when the visual supports it)
 *   - screenshot export (WebGL scenes with `render` provided)
 *   - fullscreen (GeoGebra/Desmos convention)
 *   - keyboard shortcuts while hovering the scene: +/− zoom, 0 reset, F fullscreen, Space rotate-pause
 *
 * The toolbar stays framework-light: it drives any OrbitControls-like
 * instance pushed into a VizTarget ref — no three.js import needed here.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Play,
  Pause,
  Camera,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Move3d,
  Box,
  Sparkles,
} from "lucide-react";
import { lookupSceneFx, type SceneFx } from "@/components/lab/three-fx-registry";

/** Everything a visual pushes so VizToolbar can drive it. All optional. */
export interface VizTarget {
  /** three.js OrbitControls-like instance (raw three.js or drei makeDefault). */
  controls?: {
    object?: {
      position: {
        x: number;
        y: number;
        z: number;
        set: (...args: any[]) => unknown;
        copy: (...args: any[]) => unknown;
      };
    } | null;
    target?: {
      x: number;
      y: number;
      z: number;
      copy: (...args: any[]) => unknown;
    } | null;
    minDistance?: number;
    maxDistance?: number;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    update?: () => void;
    domElement?: Element | null;
  } | null;
  /** The visual's root element — fullscreen + keyboard target. */
  el?: HTMLElement | null;
  /** The WebGL canvas — required for the screenshot button. */
  canvasEl?: HTMLCanvasElement | null;
  /** Re-render the scene right before a screenshot capture. */
  render?: () => void;
  /** Show/hide in-canvas labels — required for the labels button. */
  setLabels?: (on: boolean) => void;
  /** Toggle wireframe on every mesh — provided by three-scene.ts scenes. */
  setWireframe?: (on: boolean) => void;
  /** Replay the camera fly-in intro. */
  replayIntro?: () => void;
}

export type VizTargetRef = React.MutableRefObject<VizTarget>;

export interface VizToolbarProps {
  /** Ref the visual pushes its VizTarget into (works with async init). */
  targetRef: VizTargetRef;
  /** 2D mode: current CSS zoom scale + setter (e.g. schematic diagrams). */
  zoom?: number;
  onZoomChange?: (next: number) => void;
  minZoom?: number;
  maxZoom?: number;
  /** Labels toggle — shown only when provided (2D mode) or target.setLabels exists. */
  labelsOn?: boolean;
  onLabelsToggle?: (next: boolean) => void;
  className?: string;
}

const SPEEDS = [0.5, 1, 2] as const;

function len3(
  a: { x: number; y: number; z: number },
  b: { x: number; y: number; z: number },
): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function VizToolbar({
  targetRef,
  zoom,
  onZoomChange,
  minZoom = 0.5,
  maxZoom = 3,
  labelsOn,
  onLabelsToggle,
  className = "",
}: VizToolbarProps) {
  const is2D = typeof zoom === "number" && typeof onZoomChange === "function";

  const [hasControls, setHasControls] = useState(false);
  const [hasFx, setHasFx] = useState(false);
  const [wireOn, setWireOn] = useState(false);
  const [distPct, setDistPct] = useState(100);
  const [autorot, setAutorot] = useState(true);
  const [speedIdx, setSpeedIdx] = useState(1);
  const [isFs, setIsFs] = useState(false);
  const [hover, setHover] = useState(false);
  const initialRef = useRef<{ pos: { x: number; y: number; z: number }; target: { x: number; y: number; z: number }; baseSpeed: number } | null>(null);

  /* Poll for the visual's (possibly async-created) controls and capture defaults. */
  useEffect(() => {
    const t = window.setInterval(() => {
      const tgt = targetRef.current;
      const c = tgt?.controls ?? null;
      if (c?.object?.position && c.target && !initialRef.current) {
        initialRef.current = {
          pos: { ...c.object.position },
          target: { ...c.target },
          baseSpeed: c.autoRotateSpeed ?? 0.6,
        };
        setHasControls(true);
        setAutorot(c.autoRotate ?? true);
      }
      if (tgt?.setWireframe || tgt?.replayIntro || lookupSceneFx(tgt?.canvasEl ?? tgt?.el)) setHasFx(true);
    }, 400);
    return () => window.clearInterval(t);
  }, [targetRef]);

  useEffect(() => {
    const h = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  const applyZoom = useCallback(
    (factor: number) => {
      if (is2D) {
        onZoomChange?.(Math.min(Math.max((zoom as number) * factor, minZoom), maxZoom));
        return;
      }
      const c = targetRef.current?.controls;
      const pos = c?.object?.position;
      const target = c?.target;
      if (!pos || !target) return;
      const dist = len3(pos, target);
      const min = c?.minDistance ?? 0.5;
      const max = c?.maxDistance ?? 500;
      const next = Math.min(Math.max(dist * factor, min), max);
      const s = next / dist;
      pos.set(target.x + (pos.x - target.x) * s, target.y + (pos.y - target.y) * s, target.z + (pos.z - target.z) * s);
      c?.update?.();
      const init = initialRef.current;
      setDistPct(init ? Math.round((next / len3(init.pos, init.target)) * 100) : 100);
    },
    [is2D, onZoomChange, zoom, minZoom, maxZoom, targetRef],
  );

  const resetView = useCallback(() => {
    if (is2D) {
      onZoomChange?.(1);
      return;
    }
    const c = targetRef.current?.controls;
    const init = initialRef.current;
    if (!c?.object?.position || !c.target || !init) return;
    c.object.position.copy(init.pos);
    c.target.copy(init.target);
    c.update?.();
    setDistPct(100);
  }, [is2D, onZoomChange, targetRef]);

  const toggleRotate = useCallback(() => {
    const c = targetRef.current?.controls;
    if (!c || typeof c.autoRotate !== "boolean") return;
    c.autoRotate = !c.autoRotate;
    setAutorot(c.autoRotate);
  }, [targetRef]);

  const cycleSpeed = useCallback(() => {
    const nextIdx = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(nextIdx);
    const c = targetRef.current?.controls;
    const base = initialRef.current?.baseSpeed ?? 0.6;
    if (c && typeof c.autoRotateSpeed === "number") c.autoRotateSpeed = base * SPEEDS[nextIdx];
  }, [speedIdx, targetRef]);

  const toggleLabels = useCallback(() => {
    const next = !labelsOn;
    onLabelsToggle?.(next);
    targetRef.current?.setLabels?.(next);
  }, [labelsOn, onLabelsToggle, targetRef]);

  const wireframeFn = useCallback((): SceneFx["setWireframe"] | null => {
    const tgt = targetRef.current;
    if (tgt?.setWireframe) return tgt.setWireframe;
    const fx = lookupSceneFx(tgt?.canvasEl ?? tgt?.el);
    return fx ? fx.setWireframe : null;
  }, [targetRef]);

  const toggleWireframe = useCallback(() => {
    const fn = wireframeFn();
    if (!fn) return;
    const next = !wireOn;
    setWireOn(next);
    fn(next);
  }, [wireOn, wireframeFn]);

  const replayIntro = useCallback(() => {
    const tgt = targetRef.current;
    const fx = tgt?.replayIntro ? tgt : lookupSceneFx(tgt?.canvasEl ?? tgt?.el);
    if (!fx) return;
    resetView();
    ("replayIntro" in fx ? fx.replayIntro : undefined)?.();
  }, [targetRef, resetView]);

  const screenshot = useCallback(() => {
    const tgt = targetRef.current;
    if (!tgt?.canvasEl) return;
    try {
      tgt.render?.();
      const url = tgt.canvasEl.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `lab-capture-${Date.now()}.png`;
      a.click();
    } catch {
      /* canvas tainted or capture unsupported — noop */
    }
  }, [targetRef]);

  const toggleFs = useCallback(async () => {
    const el = targetRef.current?.el;
    if (!el) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await el.requestFullscreen?.();
  }, [targetRef]);

  /* Keyboard shortcuts while hovering the scene (hover-guarded so form inputs stay safe). */
  useEffect(() => {
    if (!hover) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") applyZoom(0.8);
      else if (e.key === "-" || e.key === "_") applyZoom(1.25);
      else if (e.key === "0") resetView();
      else if (e.key === "f" || e.key === "F") void toggleFs();
      else if (e.key === "w" || e.key === "W") toggleWireframe();
      else if (e.key === " ") {
        e.preventDefault();
        toggleRotate();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [hover, applyZoom, resetView, toggleFs, toggleRotate, toggleWireframe]);

  /* Track hover on the visual's own element (not the toolbar). */
  useEffect(() => {
    const el = targetRef.current?.el;
    if (!el) return;
    const on = () => setHover(true);
    const off = () => setHover(false);
    el.addEventListener("mouseenter", on);
    el.addEventListener("mouseleave", off);
    return () => {
      el.removeEventListener("mouseenter", on);
      el.removeEventListener("mouseleave", off);
    };
  }, [hasControls, targetRef]);

  const btn =
    "grid h-7 w-7 place-items-center rounded-lg border border-transparent text-slate-300 transition-colors hover:bg-slate-700/80 hover:text-white";
  const sep = <div className="h-4 w-px bg-slate-600/70" />;

  const webglGroup = hasControls ? (
    <>
      <button onClick={() => applyZoom(1.25)} className={btn} title="Zoom out (−)">
        <ZoomOut className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-[10px] font-semibold text-slate-400">{distPct}%</span>
      <button onClick={() => applyZoom(0.8)} className={btn} title="Zoom in (+)">
        <ZoomIn className="h-4 w-4" />
      </button>
      <button onClick={resetView} className={btn} title="Reset view (0)">
        <RotateCcw className="h-4 w-4" />
      </button>
      {sep}
      <button onClick={toggleRotate} className={btn} title={autorot ? "Pause rotation (Space)" : "Resume rotation (Space)"}>
        {autorot ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      <button onClick={cycleSpeed} className={`${btn} w-auto px-1.5`} title="Rotation speed">
        <span className="text-[10px] font-bold">{SPEEDS[speedIdx]}x</span>
      </button>
      {hasFx ? (
        <>
          <button
            onClick={toggleWireframe}
            className={`${btn} ${wireOn ? "!bg-slate-700 text-white" : ""}`}
            title="Toggle wireframe (W)"
          >
            <Box className="h-4 w-4" />
          </button>
          <button onClick={replayIntro} className={btn} title="Replay fly-in intro">
            <Sparkles className="h-4 w-4" />
          </button>
        </>
      ) : null}
      {(typeof labelsOn === "boolean" || targetRef.current?.setLabels) ? (
        <button onClick={toggleLabels} className={btn} title="Toggle labels">
          {labelsOn === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      ) : null}
      {targetRef.current?.canvasEl ? (
        <button onClick={screenshot} className={btn} title="Save screenshot (PNG)">
          <Camera className="h-4 w-4" />
        </button>
      ) : null}
      {sep}
    </>
  ) : null;

  const d2Group = is2D ? (
    <>
      <button onClick={() => applyZoom(0.8)} disabled={(zoom as number) <= minZoom} className={`${btn} disabled:opacity-40`} title="Zoom out (−)">
        <ZoomOut className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-[10px] font-semibold text-slate-400">{Math.round((zoom as number) * 100)}%</span>
      <button onClick={() => applyZoom(1.25)} disabled={(zoom as number) >= maxZoom} className={`${btn} disabled:opacity-40`} title="Zoom in (+)">
        <ZoomIn className="h-4 w-4" />
      </button>
      <button onClick={resetView} className={btn} title="Reset zoom (0)">
        <RotateCcw className="h-4 w-4" />
      </button>
      {sep}
    </>
  ) : null;

  return (
    <div
      className={`absolute right-2 top-2 z-20 flex items-center gap-0.5 rounded-xl border border-slate-600/60 bg-slate-900/85 p-1 shadow-lg backdrop-blur ${className}`}
    >
      {d2Group}
      {webglGroup}
      <button
        onClick={() => void toggleFs()}
        className={btn}
        title={isFs ? "Exit fullscreen (F)" : "Fullscreen (F)"}
      >
        {isFs ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </button>
      <div className="pointer-events-none ml-0.5 hidden items-center gap-1 pr-1 text-[9px] text-slate-500 md:flex" title="Hover the scene and use +/−/0/F/Space">
        <Move3d className="h-3 w-3" />
      </div>
    </div>
  );
}

/**
 * VizControlsCapture — drop INSIDE a react-three-fiber <Canvas> to publish
 * the default controls/canvas into the same VizTarget ref that VizToolbar reads.
 * Requires <OrbitControls makeDefault /> (or any controls writing state.controls).
 */
export function VizControlsCapture({ targetRef }: { targetRef: VizTargetRef }) {
  const controls = useThreeControls();
  const triple = useThreeTriple();
  useEffect(() => {
    if (!targetRef.current) targetRef.current = {};
    if (controls) {
      targetRef.current.controls = controls;
      targetRef.current.el = (controls.domElement?.parentElement ?? controls.domElement) as HTMLElement | null;
    }
    if (triple) {
      const [gl, scene, camera] = triple;
      targetRef.current.canvasEl = gl.domElement;
      targetRef.current.render = () => gl.render(scene, camera);
      targetRef.current.el = (gl.domElement.parentElement ?? gl.domElement) as HTMLElement | null;
    }
  }, [controls, triple, targetRef]);
  return null;
}

/* Small hooks so the fiber import stays local to the capture component. */
import { useThree } from "@react-three/fiber";

function useThreeControls() {
  const controls = useThree((s) => s.controls) as unknown;
  return (controls ?? null) as VizTarget["controls"];
}

function useThreeTriple() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  return [gl, scene, camera] as const;
}
