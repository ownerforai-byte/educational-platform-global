"use client";

import { useEffect, useState } from "react";
import type { SceneTier, SceneTierState, SubjectAccentTokens, SubjectName } from "./types";

const SUBJECT_ACCENT_MAP: Record<SubjectName, SubjectAccentTokens> = {
  physics: {
    key: "#f59e0b",
    fill: "#fbbf24",
    rim: "#fcd34d",
    ambient: "#fff7ed",
    hemisphereSky: "#fde68a",
    hemisphereGround: "#78350f",
  },
  chemistry: {
    key: "#0ea5b7",
    fill: "#22d3ee",
    rim: "#67e8f9",
    ambient: "#ecfeff",
    hemisphereSky: "#a5f3fc",
    hemisphereGround: "#164e63",
  },
  biology: {
    key: "#10b981",
    fill: "#34d399",
    rim: "#6ee7b7",
    ambient: "#ecfdf5",
    hemisphereSky: "#a7f3d0",
    hemisphereGround: "#064e3b",
  },
  mathematics: {
    key: "#8b5cf6",
    fill: "#a78bfa",
    rim: "#c4b5fd",
    ambient: "#f5f3ff",
    hemisphereSky: "#ddd6fe",
    hemisphereGround: "#4c1d95",
  },
  english: {
    key: "#3b82f6",
    fill: "#60a5fa",
    rim: "#93c5fd",
    ambient: "#eff6ff",
    hemisphereSky: "#bfdbfe",
    hemisphereGround: "#1e3a8a",
  },
  nepali: {
    key: "#ea580c",
    fill: "#f97316",
    rim: "#fb923c",
    ambient: "#fff7ed",
    hemisphereSky: "#fed7aa",
    hemisphereGround: "#7c2d12",
  },
  default: {
    key: "#3b82f6",
    fill: "#60a5fa",
    rim: "#93c5fd",
    ambient: "#eff6ff",
    hemisphereSky: "#bfdbfe",
    hemisphereGround: "#1e3a8a",
  },
};

function detectHardwareTier(): SceneTier {
  if (typeof navigator === "undefined") return "medium";
  const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 4;
  if (cores < 4) return "low";
  if (cores < 8) return "medium";
  return "high";
}

/**
 * Tier resolution shared by the initial state and the live-recompute effect.
 *
 * T3-TR2 requirement: emulated iPhone SE (6 cores, mobile) must resolve "low".
 * Rule set:
 *  - reduced-motion  → low (no auto-animation budget)
 *  - mobile + ≤6 cores → low (SE-class devices)
 *  - mobile + high-tier hardware + DPR ≥ 2.5 → medium (pixel-ratio cost)
 */
function resolveTier(
  tierOverride: SceneTier | undefined,
  isMobile: boolean,
  reducedMotion: boolean
): SceneTier {
  if (tierOverride) return tierOverride;
  if (reducedMotion) return "low";
  const cores =
    (typeof navigator !== "undefined"
      ? (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 4
      : 4);
  if (isMobile) {
    if (cores <= 6) return "low";
    if (typeof window !== "undefined" && (window.devicePixelRatio ?? 1) >= 2.5) return "medium";
    return "medium";
  }
  return detectHardwareTier();
}

function detectIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

function detectReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function detectDpr(isMobile: boolean): number {
  if (typeof window === "undefined") return 1.5;
  const dpr = window.devicePixelRatio ?? 1;
  if (isMobile && dpr >= 2.5) return 2;
  return Math.min(dpr, 2);
}

export function useSceneTier(
  subject?: SubjectName,
  tierOverride?: SceneTier,
): SceneTierState {
  const [state, setState] = useState<SceneTierState>(() => {
    const isMobile = detectIsMobile();
    const reducedMotion = detectReducedMotion();
    const clampedDpr = detectDpr(isMobile);
    const subjectKey: SubjectName = subject ?? "default";
    const accent = SUBJECT_ACCENT_MAP[subjectKey] ?? SUBJECT_ACCENT_MAP.default;

    const tier = resolveTier(tierOverride, isMobile, reducedMotion);

    return { tier, clampedDpr, accent, reducedMotion, isMobile };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const subjectKey: SubjectName = subject ?? "default";
    const accent = SUBJECT_ACCENT_MAP[subjectKey] ?? SUBJECT_ACCENT_MAP.default;

    const compute = () => {
      const isMobile = detectIsMobile();
      const reducedMotion = detectReducedMotion();
      const clampedDpr = detectDpr(isMobile);
      const tier = resolveTier(tierOverride, isMobile, reducedMotion);

      setState({ tier, clampedDpr, accent, reducedMotion, isMobile });
    };

    compute();

    const mqMobile = window.matchMedia("(max-width: 767px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = () => compute();
    mqMobile.addEventListener?.("change", handleChange);
    mqMotion.addEventListener?.("change", handleChange);

    return () => {
      mqMobile.removeEventListener?.("change", handleChange);
      mqMotion.removeEventListener?.("change", handleChange);
    };
  }, [subject, tierOverride]);

  return state;
}

export { SUBJECT_ACCENT_MAP };
