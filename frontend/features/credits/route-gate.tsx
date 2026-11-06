"use client";
import { useEffect, useState, type ReactNode } from "react";

/**
 * RouteCreditGate — COIN GATE REMOVED.
 *
 * The content spark / coin gate has been removed from the frontend.
 * Access is now purely tier-based (SectionTierGate handles that).
 * This component is kept as a transparent passthrough so existing
 * imports do not break. It renders children unconditionally.
 */
export function RouteCreditGate({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function RouteCreditGateBoundary({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <>{children}</>;
  return <>{children}</>;
}