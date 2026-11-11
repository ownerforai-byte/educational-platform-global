"use client";

/**
 * VoiceMicButton — the one mic control every chat composer uses.
 *
 * Owner request (2026-10-21): "make it voice supported, means it takes
 * instructions in voice also". Dictation belongs in the composer, not scattered
 * across three surfaces, so the button owns the whole presentation: the idle
 * mic, the live-listening state with a pulsing halo, the interim transcript
 * that shows the student their words are being heard, and the unsupported
 * state (a browser without the Web Speech API simply shows no control at all —
 * a dead button is worse than no button).
 *
 * It is presentation-only: the caller owns the `useVoiceInput` hook and passes
 * the state down, so the same control can drive hands-free auto-send on one
 * surface and a simple dictation on another.
 */
import { Mic, MicOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VoiceMicButtonProps {
  /** False on SSR and on browsers without the Web Speech API. */
  supported: boolean;
  /** True while the microphone pass is live. */
  listening: boolean;
  /** The partial phrase still being spoken (not yet committed). */
  interim?: string;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
  /** The language the mic listens in — shown in the tooltip. */
  langLabel?: string;
  className?: string;
  size?: "sm" | "md";
}

export function VoiceMicButton({
  supported,
  listening,
  interim = "",
  onStart,
  onStop,
  disabled = false,
  langLabel,
  className,
  size = "md",
}: VoiceMicButtonProps) {
  // No control at all where the API is missing: a button that can never work
  // is worse than no button.
  if (!supported) return null;

  const box = size === "sm" ? "h-8 w-8 rounded-lg" : "h-9 w-9 rounded-xl";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {listening && interim ? (
        <span className="max-w-[180px] truncate text-[11px] italic text-muted-foreground">
          {interim}
        </span>
      ) : null}
      <button
        type="button"
        onClick={listening ? onStop : onStart}
        disabled={disabled}
        title={
          listening
            ? "Stop listening"
            : `Ask Veer out loud${langLabel ? ` (${langLabel})` : ""}`
        }
        aria-label={listening ? "Stop listening" : "Ask Veer out loud"}
        aria-pressed={listening}
        className={cn(
          "relative flex shrink-0 items-center justify-center border transition-colors disabled:cursor-not-allowed disabled:opacity-40",
          box,
          listening
            ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
            : "border-border/70 bg-background text-muted-foreground hover:border-emerald-500/40 hover:text-emerald-500",
        )}
      >
        {listening ? (
          <>
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-[inherit] ring-2 ring-emerald-500/30 animate-ping"
            />
            <MicOff className={cn(icon, "relative")} />
          </>
        ) : (
          <Mic className={icon} />
        )}
      </button>
    </div>
  );
}

/** The small spinner used while a transcript is still being recognised. */
export function VoiceSpinner({ className }: { className?: string }) {
  return <Loader2 className={cn("h-3.5 w-3.5 animate-spin", className)} />;
}
