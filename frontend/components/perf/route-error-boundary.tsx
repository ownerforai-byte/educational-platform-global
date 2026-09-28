"use client";

/**
 * components/perf/route-error-boundary.tsx — ADD-ONLY route-scoped boundary.
 *
 * Kept in its own module so `error-boundary.tsx` stays free of Next.js
 * imports (it is unit-tested directly). This wrapper reads the current
 * pathname and feeds it to the boundary as `resetKey`, so navigating away from
 * a crashed route automatically re-renders the subtree instead of leaving the
 * fallback on screen.
 */

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ErrorBoundary, type ErrorBoundaryProps } from "./error-boundary";

/** Props accepted by {@link RouteErrorBoundary}. */
export interface RouteErrorBoundaryProps {
  children: ReactNode;
  /** Label used in log lines. Defaults to `app-route`. */
  name?: string;
  /** Optional custom fallback (node only — it crosses an RSC boundary). */
  fallback?: ReactNode;
  onError?: ErrorBoundaryProps["onError"];
}

/**
 * Wraps a subtree so a render error degrades to the shared fallback card while
 * the surrounding app shell (nav, theme, offline banner) stays interactive.
 */
export function RouteErrorBoundary({
  children,
  name = "app-route",
  fallback,
  onError,
}: RouteErrorBoundaryProps) {
  const pathname = usePathname();

  return (
    <ErrorBoundary name={name} resetKey={pathname} fallback={fallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
}
