"use client";

/**
 * components/perf/error-boundary.tsx — ADD-ONLY React error boundary.
 *
 * Added by the perf/resilience pass. It does not replace Next.js'
 * `app/error.tsx` / `app/global-error.tsx`; it *adds* an inner layer so a crash
 * inside a route's subtree keeps the app shell (header, nav, theme, offline
 * banner) alive and offers an in-place retry. Errors are reported through the
 * additive `reportClientError` funnel (dev: full detail, prod: generic line).
 */

import { Component, type ComponentType, type ErrorInfo, type ReactNode } from "react";
import { ErrorPage } from "@/components/errors/error-page";
import { reportClientError } from "@/lib/errors/app-error";

/** Arguments handed to a custom fallback renderer. */
export interface ErrorFallbackArgs {
  error: Error;
  /** Clears the boundary so the subtree renders again. */
  reset: () => void;
}

/** Props accepted by {@link ErrorBoundary}. */
export interface ErrorBoundaryProps {
  children: ReactNode;
  /** Label used in log lines, e.g. `notes-viewer`. */
  name?: string;
  /**
   * Custom UI. Either a node or a render prop receiving `{ error, reset }`.
   * (A render prop must be supplied from a client component.)
   */
  fallback?: ReactNode | ((args: ErrorFallbackArgs) => ReactNode);
  /** Extra hook for telemetry; called after the built-in report. */
  onError?: (error: Error, info: { componentStack?: string }) => void;
  /**
   * Changing this value clears a captured error automatically — pass the
   * pathname (see `RouteErrorBoundary`) so navigation recovers the subtree.
   */
  resetKey?: unknown;
  /** Render nothing on failure instead of the default card. */
  silent?: boolean;
}

interface ErrorBoundaryState {
  error: Error | null;
  componentStack?: string;
  resetKey?: unknown;
}

/**
 * Class-based boundary (React only supports `getDerivedStateFromError` /
 * `componentDidCatch` on classes — hooks cannot catch render errors).
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { error };
  }

  static getDerivedStateFromProps(
    props: ErrorBoundaryProps,
    state: ErrorBoundaryState,
  ): Partial<ErrorBoundaryState> | null {
    if (props.resetKey === state.resetKey) return null;
    // A new reset key means "fresh route/attempt" — drop the captured error.
    if (state.error) {
      return { error: null, componentStack: undefined, resetKey: props.resetKey };
    }
    return { resetKey: props.resetKey };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const scope = this.props.name ?? "unknown";
    reportClientError(`boundary:${scope}`, error, {
      componentStack: info.componentStack ?? undefined,
    });
    this.setState({ componentStack: info.componentStack ?? undefined });
    this.props.onError?.(error, { componentStack: info.componentStack ?? undefined });
  }

  /** Public reset hook, stable identity for `onClick` handlers. */
  reset = (): void => {
    this.setState({ error: null, componentStack: undefined });
  };

  render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;

    const { fallback, silent } = this.props;
    if (typeof fallback === "function") return fallback({ error, reset: this.reset });
    if (fallback) return fallback;
    if (silent) return null;

    return <ErrorPage error={error} reset={this.reset} compact />;
  }
}

/** Options for {@link withErrorBoundary}. */
export interface WithErrorBoundaryOptions {
  name?: string;
  fallback?: ErrorBoundaryProps["fallback"];
  onError?: ErrorBoundaryProps["onError"];
  silent?: boolean;
}

/**
 * HOC variant of the boundary for class-free call sites. Returns a *new*
 * component; the wrapped original keeps its existing export and behaviour, so
 * no current import path changes.
 */
export function withErrorBoundary<P extends object>(
  Wrapped: ComponentType<P>,
  options: WithErrorBoundaryOptions = {},
): ComponentType<P> {
  function WrappedWithBoundary(props: P) {
    return (
      <ErrorBoundary
        name={options.name}
        fallback={options.fallback}
        onError={options.onError}
        silent={options.silent}
      >
        <Wrapped {...props} />
      </ErrorBoundary>
    );
  }

  WrappedWithBoundary.displayName = `withErrorBoundary(${
    Wrapped.displayName ?? Wrapped.name ?? "Component"
  })`;

  return WrappedWithBoundary;
}
