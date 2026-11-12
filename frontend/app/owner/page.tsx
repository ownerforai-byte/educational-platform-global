"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Crown,
  ShieldCheck,
  Coins,
  ArrowRight,
  Loader2,
  Clock,
  Users,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getOwnerOverview, getOwnerUsers, type OwnerOverview } from "@/lib/api/owner";
import { computeUserDirectoryStats } from "@/lib/owner/user-directory";
import { useSession } from "@/features/auth/hooks/use-session";
import { OWNER_EMAIL } from "@/lib/owner";

const TOOLS = [
  {
    href: "/owner/users",
    icon: ShieldCheck,
    title: "Approvals",
    desc: "Approve or revoke live access. Grant Member, Plus, or Pro.",
    primary: true,
  },
  {
    href: "/owner/credits",
    icon: Coins,
    title: "Sparks",
    desc: "Grant or adjust content sparks for approved accounts.",
  },
  {
    href: "/owner/settings",
    icon: Settings,
    title: "Settings",
    desc: "Platform toggles stored in the live database.",
  },
];

export default function OwnerOverviewPage() {
  const { user } = useSession();
  const [overview, setOverview] = useState<OwnerOverview | null>(null);
  const [pendingCount, setPendingCount] = useState<number | null>(null);
  const [activeCount, setActiveCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const [ov, users] = await Promise.all([getOwnerOverview(), getOwnerUsers()]);
      setOverview(ov);
      const stats = computeUserDirectoryStats(users);
      setPendingCount(stats.pending);
      setActiveCount(stats.active);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load overview");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = overview?.stats;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600">
            <Crown className="h-3.5 w-3.5" />
            Owner control · {OWNER_EMAIL}
          </div>
          <h1 className="text-2xl font-bold tracking-tight mt-2">Control home</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Root owner is {OWNER_EMAIL}. You can assign another email the owner
            role so they can run this console too. Member access is live DB
            approval — nothing hardcoded for members.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
        </Button>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <Link
        href="/owner/users"
        className="block rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 transition-colors hover:bg-amber-500/15"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
              Main job
            </p>
            <h2 className="mt-1 text-lg font-bold">
              {isLoading && pendingCount === null
                ? "Loading pending…"
                : pendingCount === 0
                  ? "No pending approvals"
                  : `${pendingCount} account${pendingCount === 1 ? "" : "s"} waiting`}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeCount ?? 0} live approved · open Approvals to decide
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-amber-600 shrink-0 mt-1" />
        </div>
      </Link>

      <div className="grid gap-3 sm:grid-cols-3">
        {isLoading && !stats ? (
          [1, 2, 3].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)
        ) : (
          <>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tabular-nums text-amber-600">
                  {pendingCount ?? 0}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Live access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tabular-nums">{activeCount ?? 0}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Total profiles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tabular-nums">{stats?.totalUsers ?? 0}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className={
                tool.primary
                  ? "group flex flex-col rounded-2xl border border-primary/40 bg-primary/5 p-4 transition-all hover:border-primary/60"
                  : "group flex flex-col rounded-2xl border border-border/70 bg-card p-4 transition-all hover:border-primary/40"
              }
            >
              <div className="flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </div>
              <h3 className="mt-3 text-sm font-bold">{tool.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{tool.desc}</p>
            </Link>
          );
        })}
      </div>

      {overview && overview.recentUsers.length > 0 && (
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Recent signups</CardTitle>
            <Link href="/owner/users" className="text-xs text-primary hover:underline">
              Decide in Approvals
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {overview.recentUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm"
              >
                <div className="min-w-0">
                  <p className="font-medium truncate">{u.full_name || u.email}</p>
                  <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                </div>
                <span className="text-[10px] font-bold uppercase shrink-0">
                  {u.access_status ?? u.role ?? "pending"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        Signed in as {user?.email ?? "…"}. Secondary tools (premium queue, content,
        activity, diagnostics) remain at their old URLs if you need them.
      </p>
    </div>
  );
}
