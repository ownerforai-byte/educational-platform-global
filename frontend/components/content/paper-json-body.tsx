"use client";

import type { ReactNode } from "react";
import { A4DocumentSurface } from "@/features/docs/academic-doc-layout";

/** Renders authored JSON / markdown children on the shared paper sheet. */
export function PaperJsonBody({
  children,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <A4DocumentSurface className={className} innerClassName={innerClassName}>
      {children}
    </A4DocumentSurface>
  );
}