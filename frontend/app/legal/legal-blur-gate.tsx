import type { ReactNode } from "react";

/** Public legal disclosures must remain readable and available to screen readers. */
export function LegalBlurGate({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return <div className={compact ? "py-1" : "space-y-4"}>{children}</div>;
}
