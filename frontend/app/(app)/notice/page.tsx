import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  History,
  Coins,
  ShieldCheck,
  Users,
  Mail,
  Gem,
  Sparkles,
  Instagram,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Notice Board — Ravikisan's Platform",
  description:
    "Standing notices for Ravikisan's Platform: account approval, the daily credit pool, saved chat history, how Veer grounds its answers, and how to reach the owner.",
};

/**
 * /notice — the standing notice board.
 *
 * Owner request (2026-09-30): a notice SECTION that is never coin-gated and is
 * not advertised on the home page, opened from a link. Two consequences shape
 * this file:
 *
 *   · it is a plain public route, so it lives in `PUBLIC_PATHS`
 *     (features/credits/constants.ts) and the coin gate skips it entirely;
 *   · it is deliberately absent from `lib/navigation.ts`, home portals and the
 *     site index — `tests/lib/site-index-coverage.test.ts` only requires the
 *     NAV destinations to be indexed, so a hidden route stays legal.
 *
 * Owner request (2026-09-30, second): the mailto and the Instagram profile come
 * off the footer and live HERE instead. This page is where the owner speaks in
 * his own words, so it is the one place that should also say how to reach him;
 * every other page stops carrying his address.
 *
 * Every notice below states something the platform actually does — no
 * countdowns, no "maintenance windows", nothing that would need updating to
 * stay true.
 */

/** The owner's own line, kept verbatim. */
const OWNER_NOTICE =
  "This is the page of Ravikisan, made by him for easy access. If you want to explore then sign in and clear your thoughts.";

/** The owner's profile — moved off the footer, kept in exactly one place. */
const OWNER_INSTAGRAM = "https://www.instagram.com/___unxknown___player";
const OWNER_HANDLE = "@___unxknown___player";

interface Notice {
  icon: typeof BellRing;
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
}

const NOTICES: Notice[] = [
  {
    icon: ShieldCheck,
    title: "Accounts are approved by the owner",
    body:
      "Login works after administrative approval only. Sign in with Google and your request is reviewed — until it is approved the account stays closed, and nothing you have written is lost.",
  },
  {
    icon: Coins,
    title: "The daily pool, and what a coin buys",
    body:
      "Guests get 2 free messages a day and signed-in students get 4 credits a day; one credit pays for one Veer reply. The pool refills at 12:00 AM and is fixed — refreshing the page does not top it up. Coin-gated sections unlock for 20 minutes, then re-lock themselves.",
    href: "/credits",
    linkLabel: "See your plan and top-up options",
  },
  {
    icon: Gem,
    title: "PRO removes the daily cap",
    body:
      "PRO is for students who use Veer daily: Veer replies and note credits with no daily ceiling, instead of a pool that refills once a day.",
    href: "/pro-plan",
    linkLabel: "Read the PRO plan",
  },
  {
    icon: History,
    title: "Your conversations are kept for you",
    body:
      "Signed-in threads are saved to your own account, scoped to you alone — one conversation per thread, re-openable later, and clearable. Signed-out threads stay on your device.",
    href: "/ai/tutor",
    linkLabel: "Open your console and history",
  },
  {
    icon: Sparkles,
    title: "How Veer grounds an answer",
    body:
      "An answer is built from the platform's own Class 11/12 material where that material exists, is carried across in full rather than shortened, and says plainly when the platform has nothing on the topic — so you always know which part came from the notes and which came from the wider web.",
  },
  {
    icon: Users,
    title: "Content is aligned to NEB / CDC",
    body:
      "Unit breakdown, teaching hours, question weights, derivations and practical experiments follow the official NEB Class 11 & 12 CDC curriculum, with CEE / IOE entrance framing where the exam asks for it.",
  },
  {
    icon: Mail,
    title: "Corrections, requests and access",
    body:
      "Found a mistake in a note, want a topic covered, or need PRO access on your account? Write to the owner directly — a wrong note is corrected at the source, for everyone. His address and profile are on this page and nowhere else on the site.",
    href: "mailto:ravikisan1814@gmail.com",
    linkLabel: "ravikisan1814@gmail.com",
  },
];

export default function NoticePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-8">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-3">
        <Link
          href="/home"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-xs font-semibold text-foreground">Notice Board</span>
      </div>

      {/* Header */}
      <header className="rounded-2xl border border-border/70 bg-gradient-to-br from-primary/[0.07] via-card to-card p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10">
            <BellRing className="h-5 w-5 text-primary" />
          </span>
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">Notice Board</h1>
            <p className="text-xs text-muted-foreground">
              Standing notices — how accounts, credits, history and answers work here.
            </p>
          </div>
        </div>
      </header>

      {/* The owner's own line, kept verbatim */}
      <figure className="mt-4 rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
        <blockquote className="text-sm leading-relaxed text-foreground">{OWNER_NOTICE}</blockquote>
        <figcaption className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
          <span className="flex items-center gap-2 font-bold text-primary">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[10px] font-extrabold">
              R
            </span>
            — Ravikisan, owner
          </span>
          <a
            href={OWNER_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-pink-500"
          >
            <Instagram className="h-3.5 w-3.5" />
            <span>{OWNER_HANDLE}</span>
            <ExternalLink className="h-2.5 w-2.5 opacity-60" />
          </a>
        </figcaption>
      </figure>

      {/* The notices themselves */}
      <section className="mt-4 grid gap-3 sm:grid-cols-2">
        {NOTICES.map((notice) => {
          const Icon = notice.icon;
          return (
            <article
              key={notice.title}
              className="flex flex-col rounded-2xl border border-border/70 bg-card p-4 sm:p-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/30">
                  <Icon className="h-4 w-4 text-primary" />
                </span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  {notice.title}
                </h2>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{notice.body}</p>
              {notice.href && (
                <Link
                  href={notice.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  {notice.linkLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </article>
          );
        })}
      </section>

      <p className="mt-4 rounded-2xl border border-border/70 bg-muted/20 p-4 text-[11px] leading-relaxed text-muted-foreground">
        No notice on this page is coin-gated — reading is always free. Anything that needs
        your attention the moment it changes is put on the home page; this board is the
        permanent record.
      </p>
    </div>
  );
}
