"use client";

/**
 * AdminApprovalModal — the intercepted-action notice view.
 *
 * Shown whenever an unauthenticated guest touches a locked feature, a
 * directory element, or any gated button. Carries the mandated notice copy
 * verbatim and a prominent login button directly below it that routes to the
 * platform's internal portal entry path (/login — internal, not external).
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, X } from "lucide-react";
import { LOGIN_PATH, NOTICE_COPY } from "./constants";

export interface AdminApprovalModalProps {
  open: boolean;
  onClose: () => void;
  /** Optional heading above the notice; defaults to a neutral title. */
  title?: string;
}

export function AdminApprovalModal({
  open,
  onClose,
  title = "Access Notice",
}: AdminApprovalModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus the dialog on open, trap Escape, and lock background scrolling.
  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="presentation"
      onMouseDown={(event) => {
        // Close only on direct backdrop mousedown, not when dragging out.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-approval-notice-title"
        aria-describedby="admin-approval-notice-body"
        className="relative w-full max-w-lg rounded-3xl border border-border/70 bg-card p-6 shadow-2xl sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close notice"
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>

          <h2
            id="admin-approval-notice-title"
            className="mt-4 text-lg font-extrabold tracking-tight text-foreground"
          >
            {title}
          </h2>

          <p
            id="admin-approval-notice-body"
            className="mt-3 text-sm leading-relaxed text-muted-foreground"
          >
            {NOTICE_COPY}
          </p>

          {/* Login action — internal portal entry path, directly below notice */}
          <Link
            href={LOGIN_PATH}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card"
          >
            Go to Login
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="mt-3 h-10 w-full rounded-2xl border border-border/70 bg-background text-sm font-semibold text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
}
