"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Bookmark,
  Heart,
  LogIn,
  MessageCircle,
  Pencil,
  Share2,
  UserPlus,
  X,
  type LucideIcon,
} from "lucide-react";
import { PLATFORM_DISPLAY_NAME } from "@/lib/core/platform-brand";
import { cn } from "@/lib/utils";

/** Every community action that can ask a signed-out viewer to sign in. */
export type SignInAction = "like" | "comment" | "save" | "share" | "create";

const COPY: Record<SignInAction, { title: string; hint: string; Icon: LucideIcon; ring: string }> = {
  like: {
    title: "Sign in to like",
    hint: "Your likes are saved to your account and counted on the post.",
    Icon: Heart,
    ring: "from-rose-400 via-rose-500 to-pink-500",
  },
  comment: {
    title: "Sign in to comment",
    hint: "Join the conversation — your replies stay on your account.",
    Icon: MessageCircle,
    ring: "from-sky-400 via-sky-500 to-cyan-500",
  },
  save: {
    title: "Sign in to save",
    hint: "Saved posts are kept on your account to read later.",
    Icon: Bookmark,
    ring: "from-amber-400 via-amber-500 to-orange-500",
  },
  share: {
    title: "Sign in to share",
    hint: "Sign in so your share is counted on the post.",
    Icon: Share2,
    ring: "from-teal-400 via-teal-500 to-emerald-500",
  },
  create: {
    title: "Sign in to create",
    hint: "Create an account to publish posts on the community.",
    Icon: Pencil,
    ring: "from-violet-400 via-violet-500 to-purple-500",
  },
};

export interface SignInOverlayProps {
  open: boolean;
  /** Which action triggered the prompt — picks the title, hint and icon. */
  action?: SignInAction;
  onOpenChange: (open: boolean) => void;
}

/**
 * THE SIGN-IN OVERLAY — a native-app modal (owner 2026-11-27: "show as overlay
 * on screen like error — sign in to like, sign in to comment, sign in to
 * create…"). Same visual language as the error screens: blurred backdrop, one
 * centered column, gradient-ringed icon tile, eyebrow chip, short title and
 * hint, stacked pill actions. Closes on Escape, the backdrop, or the X.
 */
export function SignInOverlay({ open, action = "like", onOpenChange }: SignInOverlayProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  // Enter/exit choreography: the overlay stays mounted while it animates out,
  // then unmounts. `entered` flips one frame after mount so the CSS transition
  // always runs (class swap, not initial paint).
  const [render, setRender] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setRender(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
      return () => cancelAnimationFrame(raf);
    }
    // Leaving: fade/slide out smoothly, then drop from the DOM.
    setEntered(false);
    const timer = window.setTimeout(() => setRender(false), 280);
    return () => window.clearTimeout(timer);
  }, [open]);

  // Escape closes; the page behind the modal does not scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onOpenChange]);

  if (!render || !mounted) return null;

  const copy = COPY[action] ?? COPY.like;
  const Icon = copy.Icon;
  const close = () => onOpenChange(false);

  // Portal to document.body: ancestor transforms (app shell animations) would
  // otherwise turn `fixed` into a containing-block-relative box and let the
  // bottom tab bar sit above the backdrop.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-sign-in-action={action}
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto px-5 py-10"
    >
      {/* Backdrop — a button so a click or keyboard dismisses the overlay */}
      <button
        type="button"
        aria-label="Close sign-in prompt"
        onClick={close}
        className={cn(
          "absolute inset-0 h-full w-full cursor-default bg-black/45 backdrop-blur-sm transition-opacity duration-200 ease-out motion-reduce:transition-none",
          entered ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={cn(
          "relative w-full max-w-sm rounded-[2rem] border border-border/80 bg-card/95 p-6 text-center shadow-2xl shadow-black/10 backdrop-blur",
          "transition-all duration-[260ms] ease-out motion-reduce:transition-none",
          entered
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-[0.97] opacity-0",
        )}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        {/* Icon tile — gradient-ringed, like the error screens */}
        <div className="relative mx-auto w-fit">
          <div
            className={cn(
              "pointer-events-none absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br opacity-25 blur-xl",
              copy.ring,
            )}
            aria-hidden="true"
          />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-primary/10 text-primary shadow-lg shadow-black/5 ring-1 ring-inset ring-border/50">
            <Icon className="h-9 w-9" strokeWidth={1.6} aria-hidden="true" />
          </div>
        </div>

        <span className="mt-5 inline-flex rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
          {PLATFORM_DISPLAY_NAME}
        </span>
        <h2 id={titleId} className="mt-3 text-2xl font-extrabold tracking-tight">
          {copy.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.hint}</p>

        <div className="mt-6 flex flex-col gap-3">
          <ButtonLink href="/login" onClick={close} primary>
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in
          </ButtonLink>
          <ButtonLink href="/signup" onClick={close}>
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Create account
          </ButtonLink>
        </div>
      </div>
    </div>
    ,
    document.body,
  );
}

function ButtonLink({
  href,
  onClick,
  primary = false,
  children,
}: {
  href: string;
  onClick: () => void;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-bold transition",
        primary
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90"
          : "border-2 border-border/80 text-foreground hover:border-primary hover:text-primary",
      )}
    >
      {children}
    </Link>
  );
}
