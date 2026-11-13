"use client";

/**
 * ActivityStage — the ONE render surface for manifest activities (Phase 6).
 *
 * Rules this component enforces:
 *  - Nothing loads until the learner asks for it (no eager Three.js download).
 *  - At most one WebGL canvas exists: the stage renders exactly one renderer and
 *    unmounting it is what disposes the scene (React Three Fiber disposes the
 *    canvas, geometries and materials on unmount), so no second canvas can be
 *    created by this component.
 *  - A 2D/static/text fallback is always available: no WebGL, a failed chunk, or
 *    `prefers-reduced-motion` all resolve to the manifest's declared fallback
 *    rather than a blank box.
 *  - Device tier comes from the shared `3d-rig/use-scene-tier` hook, never a
 *    private capability check.
 */

import { createElement, useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, Loader2, Play, RotateCcw } from "lucide-react";

import { useSceneTier } from "@/components/lab/3d-rig/use-scene-tier";
import { IslandErrorBoundary } from "@/components/ui/island-error-boundary";
import {
  loadActivityRenderer,
  type ActivityRenderer,
} from "@/lib/lab-activity-loaders";
import type { LabActivity } from "@/lib/lab-manifest";

type Status = "idle" | "loading" | "ready" | "error";

function detectWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

function Fallback({ activity, reason }: { activity: LabActivity; reason: string }) {
  return (
    <div
      data-testid="activity-fallback"
      className="flex min-h-[280px] flex-col items-center justify-center gap-2 rounded-2xl border border-border/60 bg-muted/20 p-6 text-center"
    >
      <p className="text-sm font-bold">{activity.title}</p>
      <p className="max-w-md text-sm text-muted-foreground">{activity.fallback.summary}</p>
      <p className="text-[11px] text-muted-foreground">{reason}</p>
    </div>
  );
}

/**
 * Keyboard control of the mounted canvas (Phase 6 close-out).
 *
 * The scenes all steer through drei's `<OrbitControls>`, which listens for
 * pointer and wheel events on the canvas element itself. Dispatching synthetic
 * PointerEvent/WheelEvent sequences on that element therefore drives the REAL
 * camera — no per-scene coupling, no second control path to keep in sync.
 *  - Arrow keys orbit (Shift = larger step)
 *  - `+` / `-` zoom via the wheel channel OrbitControls already handles
 *  - Escape closes the scene, matching the visible "Close scene" button
 */
function orbitCanvas(canvas: HTMLCanvasElement, dx: number, dy: number): void {
  if (typeof PointerEvent === "undefined") return; // non-browser test env
  const rect = canvas.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const at = (x: number, y: number, buttons: number) =>
    new PointerEvent(buttons ? "pointermove" : "pointerup", {
      pointerId: 1,
      isPrimary: true,
      pointerType: "mouse",
      button: 0,
      buttons,
      clientX: x,
      clientY: y,
      bubbles: true,
    });
  canvas.dispatchEvent(
    new PointerEvent("pointerdown", {
      pointerId: 1,
      isPrimary: true,
      pointerType: "mouse",
      button: 0,
      buttons: 1,
      clientX: cx,
      clientY: cy,
      bubbles: true,
    }),
  );
  const steps = 4;
  for (let i = 1; i <= steps; i += 1) {
    canvas.dispatchEvent(at(cx + (dx * i) / steps, cy + (dy * i) / steps, 1));
  }
  canvas.dispatchEvent(at(cx + dx, cy + dy, 0));
}

function zoomCanvas(canvas: HTMLCanvasElement, deltaY: number): void {
  if (typeof WheelEvent === "undefined") return; // non-browser test env
  canvas.dispatchEvent(
    new WheelEvent("wheel", { deltaY, bubbles: true, cancelable: true }),
  );
}

export function ActivityStage({ activity }: { activity: LabActivity }) {
  const { tier, reducedMotion } = useSceneTier(activity.curriculum.subject);

  // Capability and motion preference resolve after mount: rendering them from
  // markup would mismatch on the server.
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [Renderer, setRenderer] = useState<ActivityRenderer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [allowMotion, setAllowMotion] = useState(false);
  const sceneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setWebgl(detectWebgl());
  }, []);

  const open = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const component = await loadActivityRenderer(activity.renderer);
      setRenderer(() => component);
      setStatus("ready");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The 3D scene could not load.");
      setStatus("error");
    }
  }, [activity.renderer]);

  const reset = useCallback(() => {
    setRenderer(null);
    setStatus("idle");
    setError(null);
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const canvas = sceneRef.current?.querySelector("canvas");
      if (!canvas) return;
      const step = event.shiftKey ? 60 : 24;
      switch (event.key) {
        case "ArrowLeft":
          orbitCanvas(canvas, -step, 0);
          break;
        case "ArrowRight":
          orbitCanvas(canvas, step, 0);
          break;
        case "ArrowUp":
          orbitCanvas(canvas, 0, -step);
          break;
        case "ArrowDown":
          orbitCanvas(canvas, 0, step);
          break;
        case "+":
        case "=":
          zoomCanvas(canvas, -120);
          break;
        case "-":
        case "_":
          zoomCanvas(canvas, 120);
          break;
        case "Escape":
          reset();
          break;
        default:
          return;
      }
      event.preventDefault();
    },
    [reset],
  );

  if (webgl === false) {
    return <Fallback activity={activity} reason="This device has no WebGL support." />;
  }

  if (webgl === null) {
    return (
      <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-border/60">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (reducedMotion && !allowMotion && status !== "ready") {
    return (
      <div className="space-y-3">
        <Fallback activity={activity} reason="Reduced-motion is on, so the scene stays still." />
        <button
          type="button"
          onClick={() => setAllowMotion(true)}
          className="min-h-10 rounded-xl border border-border/60 px-3 text-xs font-bold text-muted-foreground"
        >
          Play the 3D scene anyway
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-3">
        <Fallback activity={activity} reason={error ?? "The scene failed to load."} />
        <button
          type="button"
          onClick={open}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 text-xs font-bold text-primary"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Try again
        </button>
      </div>
    );
  }

  if (status === "idle") {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/70 bg-muted/10 p-6 text-center">
        <p className="text-sm font-bold">{activity.title}</p>
        <p className="max-w-md text-sm text-muted-foreground">
          Loads only when you ask for it — the 3D scene is {activity.deviceTier}-tier and
          stays off this page until then.
        </p>
        <button
          type="button"
          onClick={open}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-bold text-white"
        >
          <Play className="h-4 w-4" /> Open the 3D scene
        </button>
        <p className="text-[11px] text-muted-foreground">{activity.fallback.summary}</p>
      </div>
    );
  }

  if (status === "loading" || !Renderer) {
    return (
      <div className="flex min-h-[320px] items-center justify-center gap-2 rounded-2xl border border-border/60 text-sm text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading the 3D scene…
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        key={activity.slug}
        ref={sceneRef}
        data-testid="activity-stage"
        data-tier={tier}
        tabIndex={0}
        role="application"
        aria-label={`${activity.title} 3D scene. Arrow keys orbit, plus and minus zoom, Escape closes.`}
        onKeyDown={onKeyDown}
        className="relative min-h-[320px] overflow-hidden rounded-2xl border border-border/60"
      >
        {/* Exactly one canvas: swapping activities unmounts this subtree, which
            is what disposes the previous scene. */}
        <IslandErrorBoundary name={`lab-activity:${activity.slug}`}>
          {createElement(Renderer)}
        </IslandErrorBoundary>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] text-muted-foreground">
          Drag to rotate · Scroll to zoom · Pinch on touch · Keyboard: arrow keys orbit,
          +/− zoom, Esc closes
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border/60 px-2.5 text-[11px] font-bold text-muted-foreground"
        >
          <RotateCcw className="h-3 w-3" /> Close scene
        </button>
      </div>
    </div>
  );
}

export function ActivityStageErrorHint({ activity }: { activity: LabActivity }) {
  return (
    <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
      <AlertTriangle className="h-3 w-3" /> If the scene fails, the {activity.fallback.kind}{" "}
      fallback stays available.
    </p>
  );
}
