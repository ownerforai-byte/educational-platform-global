import type { SubjectAccentTokens, SubjectName } from "./types";

/**
 * Per-subject light palette. Shared by the React-Three-Fiber rig
 * (`use-scene-tier.ts`) and the imperative helper (`../three-scene.ts`) so a
 * physics visual is lit amber and a biology visual green no matter which
 * rendering path the topic happens to use.
 */
export const SUBJECT_ACCENT_MAP: Record<SubjectName, SubjectAccentTokens> = {
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
