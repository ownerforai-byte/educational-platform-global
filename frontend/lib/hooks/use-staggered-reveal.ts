"use client";

import { useEffect, useState } from "react";

/** Sequential card entrance interval (owner: one item per second). */
export const CARD_STAGGER_MS = 1000;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Mount/reveal count ramps 1 → `count` every `intervalMs`. Reduced motion shows all at once.
 */
export function useStaggeredReveal(count: number, intervalMs = CARD_STAGGER_MS): number {
  const [visible, setVisible] = useState(() =>
    prefersReducedMotion() ? count : count > 0 ? 1 : 0,
  );

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(count);
      return;
    }
    setVisible(count > 0 ? 1 : 0);
    if (count <= 1) return;

    let current = 1;
    const timer = window.setInterval(() => {
      current += 1;
      setVisible(current);
      if (current >= count) window.clearInterval(timer);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [count, intervalMs]);

  return Math.min(visible, count);
}

/** CSS `animation-delay` for decorative entrance when all items are already mounted. */
export function cardStaggerDelayMs(index: number, intervalMs = CARD_STAGGER_MS): string {
  return `${index * intervalMs}ms`;
}