"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/** sessionStorage flag: this session has navigated INSIDE the app at least once. */
const IN_APP_NAV_KEY = "neb_inapp_nav";

interface BackButtonProps {
  className?: string;
  variant?: "floating" | "inline";
  label?: string;
}

export function BackButton({
  className,
  variant = "floating",
  label = "Back",
}: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);
  const [overFooter, setOverFooter] = useState(false);

  // The floating button sits exactly where the footer's last legal links land
  // on a phone. While any part of the footer is on screen, slide it away so
  // every footer link stays tappable.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOverFooter(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  // Remember in-app navigation: once this session has moved between app
  // routes, history.back() is safe (scroll-exact). A fresh deep-link has no
  // in-app history behind it, so its back must land on HOME instead of
  // leaving the site (owner rule 2026-09-27).
  useEffect(() => {
    if (prevPathRef.current !== null && prevPathRef.current !== pathname) {
      try {
        sessionStorage.setItem(IN_APP_NAV_KEY, "1");
      } catch {
        /* storage blocked — fall back to home */
      }
    }
    prevPathRef.current = pathname;
  }, [pathname]);

  // Home is the destination — the button only appears once something else
  // has been opened on top of it.
  if (pathname === "/" || pathname === "/home" || pathname?.startsWith("/home/")) {
    return null;
  }

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let inAppNav = false;
    try {
      inAppNav = sessionStorage.getItem(IN_APP_NAV_KEY) === "1";
    } catch {
      inAppNav = false;
    }

    if (inAppNav && typeof window !== "undefined" && window.history.length > 1) {
      // Navigated here from inside the app → exact back. RouteScrollReset
      // lands it at the HEADER, not wherever the previous page was left.
      window.history.back();
    } else {
      // Deep link / fresh tab → straight back to the home dashboard, at top.
      router.push("/home", { scroll: true });
    }
  };

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={handleBack}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/70 bg-card/80 hover:bg-muted text-xs font-semibold text-foreground transition-colors shadow-sm",
          className
        )}
        aria-label="Go back"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {/* No empty span: an icon-only back button must not inherit the icon→label gap. */}
        {label ? <span>{label}</span> : null}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={cn(
        "fixed right-4 bottom-safe-above-guide z-50 h-9 w-9 rounded-full shadow-lg sm:right-6 sm:h-11 sm:w-11",
        "flex items-center justify-center",
        "bg-primary text-primary-foreground",
        "hover:opacity-90 hover:scale-105 active:scale-95",
        "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40",
        overFooter && "pointer-events-none translate-y-24 opacity-0",
        className
      )}
      aria-hidden={overFooter}
      tabIndex={overFooter ? -1 : 0}
      aria-label="Go back"
      title="Go back (opens the previous page at the header)"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}
