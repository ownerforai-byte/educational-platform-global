"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerUser } from "@/lib/owner";

/**
 * Renders `children` only for allowlisted owner emails (frontend/lib/owner).
 *
 * Used to HIDE owner-only surfaces (the Diagram Hub home launcher) rather than
 * redirect: before the session resolves — and for every guest and non-owner
 * account — this renders null, so the markup never appears in the served HTML
 * for anyone but an owner. Keeps its children server-rendered; only the
 * visibility switch is client-side.
 */
export function OwnerOnly({ children }: { children: ReactNode }) {
  const { user } = useSession();
  // The session can hydrate from the client cache on the first render, which
  // the server never sees. Hold the switch closed until mounted so the first
  // client pass matches the server HTML (no hydration mismatch).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && isOwnerUser(user) ? <>{children}</> : null;
}
