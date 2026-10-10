"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CaptainMark } from "@/components/ai/captain-logo";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerUser } from "@/lib/owner";

/**
 * Floating AI launcher (bottom-left corner) — OWNER RULE CHANGE 2026-10-02:
 * "make all ai not open as widget but their whole interface … their own
 * separate page not as floating widget anymore".
 *
 * The floating PANEL (and the Escape handler, and the embedded
 * AIChatInterface) are gone: the button no longer opens anything in place.
 * It NAVIGATES to /chat — the assistant's canonical full page (the same
 * AIChatInterface that used to be squeezed into the panel, with its history,
 * quota badges and live dot at full size). The launcher button itself stays
 * at its old spot, per the owner rule of 2026-09-27.
 *
 * /ai/chat forwards to /chat too, so every AI surface reaches the interface
 * as a PAGE: /chat (assistant), /ai/tutor (studio tutor), /ai-quiz, /ai/search.
 */
export function AIWidget() {
  const { user, isLoading } = useSession();
  // The auth provider hydrates a cached session on the first client render,
  // which the server never sees. Render nothing until mounted so the first
  // client pass matches the server HTML (avoids a hydration mismatch).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Owner emails only (owner request 2026-10-05): students never see the
  // launcher. Hidden — never a redirect, this is a global floating button.
  if (!mounted || isLoading || !isOwnerUser(user)) return null;
  return (
    <Link
      href="/chat"
      aria-label="Open Veer — full chat page"
      className="fixed left-6 bottom-safe z-50 h-14 w-14 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-br from-primary to-primary/70 hover:scale-105 transition-all"
    >
      <CaptainMark className="h-7 w-7 text-white" />
    </Link>
  );
}
