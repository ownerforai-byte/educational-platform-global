"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Crown,
  ShieldCheck,
  Coins,
  Sparkles,
  BadgeCheck,
  ArrowRight,
  LayoutDashboard,
  Activity,
  Home,
  LogIn,
  Loader2,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

/**
 * The canonical owner allowlist — kept in sync with
 * `backend/src/middleware/auth.ts` OWNER_EMAILS. Any account signing up or
 * logging in with one of these emails is auto-granted the OWNER role by the
 * backend (unlimited credits, premium, admin access).
 */
const OWNER_EMAILS = [
  "harindarsah98172@gmail.com",
  "yashsah231@gmail.com",
  "sahrocky81@gmail.com",
  "ravikisan1814@gmail.com",
  "planephoto88@gmail.com",
];

const OWNER_TOOLS = [
  {
    href: "/admin",
    icon: LayoutDashboard,
    title: "Admin Panel",
    desc: "Manage users, roles, credits and premium requests.",
    accent: "text-amber-400 bg-amber-500/10 border-amber-500/25",
  },
  {
    href: "/controller",
    icon: Activity,
    title: "Platform Controller",
    desc: "System health, database and content diagnostics.",
    accent: "text-sky-400 bg-sky-500/10 border-sky-500/25",
  },
  {
    href: "/credits",
    icon: Coins,
    title: "Credits & Plan",
    desc: "Your unlimited owner credits and premium status.",
    accent: "text-violet-400 bg-violet-500/10 border-violet-500/25",
  },
];

export default function OwnerPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const isOwner = user?.role === "OWNER" || user?.role === "ADMIN";

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [isLoading, user, router]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full bg-amber-500/10 blur-[110px]" />

      <main className="relative mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-500">
              <Crown className="h-3.5 w-3.5" />
              Owner Access
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Owner Console</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Private control center — only visible to the five platform owners.
            </p>
          </div>
          <Link
            href="/home"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-card px-3.5 py-2 text-xs font-semibold text-foreground/80 transition-colors hover:text-primary"
          >
            <Home className="h-3.5 w-3.5" />
            Back to home
          </Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="mt-16 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Checking your session…
          </div>
        )}

        {/* Signed in but not owner */}
        {!isLoading && user && !isOwner && (
          <div className="mt-10 rounded-3xl border border-destructive/30 bg-destructive/5 p-8 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-lg font-bold">Owner access only</h2>
            <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
              You are signed in as{" "}
              <span className="font-semibold text-foreground">{user.email}</span>. This console
              requires the OWNER role, which is reserved for the platform owner emails.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <Button variant="outline" onClick={() => router.push("/home")} className="rounded-xl">
                Go to Home
              </Button>
            </div>
          </div>
        )}

        {/* Owner view */}
        {!isLoading && isOwner && user && (
          <div className="mt-8 space-y-6">
            {/* Session card */}
            <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-amber-500/10 via-card to-card p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500">
                    <Crown className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="text-base font-bold">{user.email}</h2>
                    <p className="text-xs text-muted-foreground">Signed in with full platform privileges</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-500">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    OWNER
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    Premium
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-500">
                    <Coins className="h-3.5 w-3.5" />
                    ∞ Credits
                  </span>
                </div>
              </div>
            </div>

            {/* Owner tools */}
            <div className="grid gap-4 sm:grid-cols-3">
              {OWNER_TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex flex-col rounded-3xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${tool.accent}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                    <h3 className="mt-4 text-sm font-bold group-hover:text-primary">{tool.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tool.desc}</p>
                  </Link>
                );
              })}
            </div>

            {/* Verified owner roster */}
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider">Verified Owner Emails</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Auto-granted OWNER on login — matches the backend allowlist.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-500">
                  {OWNER_EMAILS.length} allowlisted
                </span>
              </div>
              <div className="mt-4 space-y-2">
                {OWNER_EMAILS.map((email, i) => {
                  const isYou = email.toLowerCase() === user.email?.toLowerCase();
                  return (
                    <div
                      key={email}
                      className="flex items-center justify-between rounded-2xl border border-border/50 bg-muted/30 px-4 py-2.5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-[10px] font-extrabold text-amber-500">
                          {i + 1}
                        </span>
                        <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <span className="truncate text-xs font-semibold text-foreground">{email}</span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {isYou && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                            You
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                          <BadgeCheck className="h-3 w-3" />
                          Allowlisted
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Not signed in (pre-redirect fallback) */}
        {!isLoading && !user && (
          <div className="mt-10 rounded-3xl border border-border/70 bg-card p-8 text-center shadow-sm">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LogIn className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-lg font-bold">Sign in required</h2>
            <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
              This console is restricted. Sign in with an owner account to continue.
            </p>
            <Button onClick={() => router.push("/login")} className="mt-5 rounded-xl">
              Go to Sign In
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
