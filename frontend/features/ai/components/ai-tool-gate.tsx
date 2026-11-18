"use client";

import type { ReactNode } from "react";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerAccount } from "@/lib/owner";

/**
 * Owner-only visibility gate for the shared Veer tool rails and decks.
 *
 * The AI tool registry can carry `ownerOnly` entries (owner 2026-11-18: the
 * Model Quad is "owner only — for now"). The rails render server-side without
 * a viewer, so each owner-only row is wrapped here: it renders nothing — also
 * server-side and while the session resolves — for anyone who is not an owner,
 * and appears (without a hydration flash) once the session says owner.
 * Access itself is enforced by the page gate and the API, never by this menu.
 */
export function AiToolGate({ children }: { children: ReactNode }) {
  const { user } = useSession();
  return isOwnerAccount(user) ? <>{children}</> : null;
}
