"use client";

/**
 * Reusable interactivity layer for 3D / visual lab scenes.
 *
 * Every scene already has domain sliders; what they were missing is a uniform
 * set of exploration controls. These three drop-in pieces add it consistently:
 *   - ScenePresets  → one-tap common scenarios (the pattern the interactive
 *     template recommends but no scene had).
 *   - PlaybackBar   → play/pause, animation-speed stepping and a real reset
 *     (state relaunch — never window.location.reload()).
 *   - ReadoutGrid   → live computed results that update as sliders move.
 *
 * Kept framework-light so any scene (raw three.js or react-three-fiber) can use
 * them without changing how it renders.
 */

import { Button } from "@/components/ui/button";
import { LabResult } from "@/components/lab/lab-result";
import { RotateCcw, Play, Pause } from "lucide-react";

export interface ScenePreset {
  name: string;
  /** Optional one-line explanation shown as a tooltip. */
  hint?: string;
  /** Applies the preset by setting the scene's own state. */
  apply: () => void;
}

export interface SceneReadout {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}

const SPEEDS = [0.25, 0.5, 1, 2] as const;

/** One-tap scenario buttons. Renders nothing when there are no presets. */
export function ScenePresets({
  presets,
  className = "",
}: {
  presets: ScenePreset[];
  className?: string;
}) {
  if (!presets.length) return null;
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        Presets
      </span>
      {presets.map((p) => (
        <Button
          key={p.name}
          type="button"
          variant="outline"
          size="sm"
          title={p.hint}
          onClick={p.apply}
          className="h-7 px-2.5 text-xs"
        >
          {p.name}
        </Button>
      ))}
    </div>
  );
}

/**
 * Play/pause + speed stepping + reset. Speed cycles through 0.25× → 2×.
 * `onReset` must restore the scene's own state (relaunch), not reload the page.
 */
export function PlaybackBar({
  playing,
  onPlayToggle,
  speed,
  onSpeedChange,
  onReset,
  resetLabel = "Reset",
  className = "",
}: {
  playing: boolean;
  onPlayToggle: () => void;
  speed: number;
  onSpeedChange: (next: number) => void;
  onReset: () => void;
  resetLabel?: string;
  className?: string;
}) {
  const cycleSpeed = () => {
    const i = SPEEDS.indexOf(speed as (typeof SPEEDS)[number]);
    const next = SPEEDS[(i + 1) % SPEEDS.length] ?? 1;
    onSpeedChange(next);
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <Button
        type="button"
        size="sm"
        variant={playing ? "default" : "outline"}
        onClick={onPlayToggle}
        className="h-7 gap-1.5 px-2.5 text-xs"
      >
        {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        {playing ? "Pause" : "Play"}
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={cycleSpeed}
        title="Animation speed"
        className="h-7 px-2.5 text-xs font-bold"
      >
        {speed}×
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={onReset}
        title="Reset to defaults"
        className="h-7 gap-1.5 px-2.5 text-xs text-muted-foreground"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        {resetLabel}
      </Button>
    </div>
  );
}

/** Live computed results, updating as the scene's inputs change. */
export function ReadoutGrid({
  items,
  className = "",
}: {
  items: SceneReadout[];
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <div
      className={`grid gap-2 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {items.map((r) => (
        <LabResult
          key={r.label}
          label={r.label}
          value={r.value}
          unit={r.unit}
          highlight={r.highlight}
        />
      ))}
    </div>
  );
}
