"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorPage } from "@/components/errors/error-page";
import { reportClientError } from "@/lib/errors/app-error";

type Props = {
  children: ReactNode;
  /** Scope tag for client error reporting. */
  name?: string;
};

type State = {
  error: Error | null;
};

/**
 * Compact error boundary for heavy client islands (3D, periodic table, image hub).
 * Prevents one island throw from unmounting the whole page shell.
 */
export class IslandErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    reportClientError(`island:${this.props.name ?? "unknown"}`, error, {
      componentStack: info.componentStack,
    });
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <ErrorPage
          error={this.state.error}
          compact
          reset={() => this.setState({ error: null })}
        />
      );
    }
    return this.props.children;
  }
}
