"use client";

import type { ReactNode } from "react";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerUser } from "@/lib/owner";

/**
 * Renders `children` only for allowlisted owner emails (frontend/lib/owner).
 *
 * Used to HIDE owner-only surfaces (the Mind Studio home launcher) rather than
 * redirect: before the session resolves — and for every guest and non-owner
 * account — this renders null, so the markup never appears in the served HTML
 * for anyone but an owner. Keeps its children server-rendered; only the
 * visibility switch is client-side.
 */
export function OwnerOnly({ children }: { children: ReactNode }) {
  const { user } = useSession();
  return isOwnerUser(user) ? <>{children}</> : null;
}
