"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { KATEX_OPTIONS } from "@/lib/content/katex";

type KatexProps = {
  math: string;
  displayMode?: boolean;
  className?: string;
};

export function Katex({ math, displayMode = false, className }: KatexProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    katex.render(math, containerRef.current, {
      ...KATEX_OPTIONS,
      displayMode,
    });
  }, [math, displayMode]);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: "" }}
    />
  );
}
