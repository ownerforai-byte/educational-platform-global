"use client";

import { useEffect, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathRendererProps {
  expression: string;
  displayMode?: boolean;
  className?: string;
  throwOnError?: boolean;
}

export function MathRenderer({
  expression,
  displayMode = false,
  className = "",
  throwOnError = false,
}: MathRendererProps) {
  const [html, setHtml] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rendered = katex.renderToString(expression, {
        displayMode,
        throwOnError,
        output: "html",
        trust: true,
      });
      setHtml(rendered);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to render math");
      setHtml("");
    }
  }, [expression, displayMode, throwOnError]);

  if (error) {
    return (
      <code
        className={className}
        style={{
          fontFamily: "monospace",
          fontSize: "0.9em",
          color: "#ef4444",
          padding: "4px 8px",
          background: "rgba(239, 68, 68, 0.1)",
          borderRadius: "4px",
        }}
      >
        {expression}
      </code>
    );
  }

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ display: displayMode ? "block" : "inline" }}
    />
  );
}

export function MathBlock({
  expression,
  className = "",
}: {
  expression: string;
  className?: string;
}) {
  return (
    <div className={className} style={{ margin: "16px 0", padding: "16px", background: "rgba(99, 102, 241, 0.05)", borderRadius: "8px", overflowX: "auto" }}>
      <MathRenderer expression={expression} displayMode={true} />
    </div>
  );
}

export function MathInline({
  expression,
  className = "",
}: {
  expression: string;
  className?: string;
}) {
  return (
    <span className={className}>
      <MathRenderer expression={expression} displayMode={false} />
    </span>
  );
}

export function MathDisplay({
  expression,
  className = "",
}: {
  expression: string;
  className?: string;
}) {
  return (
    <div className={className} style={{ margin: "20px 0", padding: "20px", background: "rgba(99, 102, 241, 0.05)", borderRadius: "8px", overflowX: "auto", textAlign: "center" }}>
      <MathRenderer expression={expression} displayMode={true} />
    </div>
  );
}
