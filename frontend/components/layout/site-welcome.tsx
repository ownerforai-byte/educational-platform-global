"use client";

/**
 * SiteWelcome — the site-wide greeting bubble.
 *
 * Owner request (2026-10-08, follow-up): "add the message entry globally,
 * not only in chat, and for everyone opening the website — for public also."
 * The warm multi-colour welcome that used to live inside /chat's TutorConsole
 * now mounts ONCE here, in the root layout, so every visitor is greeted:
 * public visitors on the marketing/auth pages and signed-in students on any
 * route.
 *
 * One greeting per page OPEN: the root layout survives client-side
 * navigation, so the bubble greets you when you arrive or refresh, then is
 * gone — it never re-pops while you hop between routes.
 *
 * Lifecycle (5 seconds): the single `animate-welcome-in` keyframe in
 * globals.css drives enter → hold → fade so the fade lands on opacity 0 just
 * as the React timer unmounts it. Under prefers-reduced-motion the animation
 * is dropped and the timer alone dismisses it (static, still readable).
 *
 * History safety by construction: the bubble renders OUTSIDE every page's
 * content — a fixed, pointer-events-none overlay that (a) cannot block clicks,
 * (b) cannot shift any layout, and (c) is not part of any message list, so it
 * is never posted to the server, never written to guest localStorage and never
 * saved into a chat session.
 *
 * Personalisation: signed-in users see their first name; public/signed-out
 * visitors (user === null) see "friend". useSession() reads a context with a
 * safe default, so this renders before the session resolves, and the name
 * fills in when auth comes back — no provider guard needed.
 */
import { useEffect, useState } from "react";

import { useSession } from "@/features/auth/hooks/use-session";

export function SiteWelcome() {
  const { user } = useSession();
  const [showWelcome, setShowWelcome] = useState(true);
  // The session can hydrate from the client cache on the first render, which
  // the server never sees. Keep the server's "friend" text until mounted so
  // the first client pass matches the server HTML.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Owner rule: the greeting removes itself after 5 seconds.
  useEffect(() => {
    const id = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(id);
  }, []);

  if (!showWelcome) return null;

  const firstName =
    mounted && user?.fullName ? user.fullName.split(" ")[0] : "friend";

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-16 z-40 flex justify-center px-4 sm:px-6"
    >
      <div className="animate-welcome-in max-w-md rounded-2xl border border-border/70 bg-card/95 p-[1.5px] shadow-xl shadow-primary/10 backdrop-blur-sm">
        <div className="rounded-[15px] bg-gradient-to-br from-rose-500/10 via-amber-500/10 to-emerald-500/10 px-4 py-3">
          <p className="text-[13px] font-bold leading-tight">
            <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 bg-clip-text text-transparent">
              Namaste {firstName}! 🎉
            </span>{" "}
            <span className="text-foreground/90">Welcome to</span>{" "}
            <span className="bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent">
              Veer
            </span>
            <span className="text-foreground/90">.</span>
          </p>
          <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
            Ask anything from your syllabus — I reply with{" "}
            <span className="font-semibold text-sky-600 dark:text-sky-400">tables</span>,{" "}
            <span className="font-semibold text-violet-600 dark:text-violet-400">diagrams</span> &amp;{" "}
            <span className="font-semibold text-amber-600 dark:text-amber-400">worked steps</span>.
            <span className="ml-1 font-medium text-emerald-600 dark:text-emerald-400">
              Let's learn something brilliant ✨
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
