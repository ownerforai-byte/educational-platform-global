"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Crown,
  ShieldCheck,
  Coins,
  Sparkles,
  ArrowRight,
  LayoutDashboard,
  Activity,
  Users,
  Database,
  Settings,
  MessageSquareText,
  Timer,
  Stethoscope,
  Loader2,
  UserPlus,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getOwnerOverview, type OwnerOverview } from "@/lib/api/owner";
import { useSession } from "@/features/auth/hooks/use-session";

const QUICK_LINKS = [
  { href: "/owner/users", icon: ShieldCheck, title: "User Management", desc: "Approvals, tiers, bulk actions" },
  { href: "/owner/premium", icon: Crown, title: "Premium Queue", desc: "Review premium requests" },
  { href: "/owner/credits", icon: Coins, title: "Spark Grants", desc: "Bulk and everyone credits" },
  { href: "/owner/sections", icon: LayoutDashboard, title: "Section Minimums", desc: "Per-section tier gates" },
  { href: "/owner/tracking", icon: MessageSquareText, title: "Chat Tracking", desc: "Veer session audit" },
  { href: "/owner/r1-access", icon: Sparkles, title: "R1 Access", desc: "Daily-life layer grants" },
  { href: "/r1/activities", icon: Timer, title: "Time Tracker", desc: "R1 activity log" },
  { href: "/owner/content", icon: Database, title: "Content", desc: "Corpus and resources" },
  { href: "/owner/activity", icon: Activity, title: "Credit Activity", desc: "Grant and spend audit" },
  { href: "/owner/settings", icon: Settings, title: "Settings", desc: "Platform toggles" },
  { href: "/controller", icon: Stethoscope, title: "Diagnostics", desc: "Health and AI sources" },
];

export default function OwnerOverviewPage() {
  const { user } = useSession();
  const [overview, setOverview] = useState<OwnerOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      setOverview(await getOwnerOverview());
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
            Owner Console
          </div>
          <h1 className="text-2xl font-bold tracking-tight mt-2">Platform overview</h1>
          <p className="text-sm text-muted-foreground">
            Live stats and shortcuts — signed in as{" "}
            <span className="font-medium text-foreground">{user?.email ?? "…"}</span>
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh stats"}
        </Button>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading && !stats ? (
          [1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)
        ) : (
          <>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Total users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tabular-nums">{stats?.totalUsers ?? 0}</p>
                <Link href="/owner/users" className="text-xs text-primary hover:underline mt-1 inline-block">
                  Open user management →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Crown className="h-3.5 w-3.5" />
                  Premium
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tabular-nums">{stats?.premiumUsers ?? 0}</p>
                <Link href="/owner/premium" className="text-xs text-primary hover:underline mt-1 inline-block">
                  Review requests ({stats?.pendingPremiumRequests ?? 0} pending) →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <CreditCard className="h-3.5 w-3.5" />
                  Credit events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  <span className="font-bold text-emerald-600">{stats?.totalCreditsGranted ?? 0}</span> grants ·{" "}
                  <span className="font-bold text-red-500">{stats?.totalCreditsSpent ?? 0}</span> spends
                </p>
                <Link href="/owner/activity" className="text-xs text-primary hover:underline mt-1 inline-block">
                  Full activity log →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5" />
                  Content index
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {stats?.content.topics ?? 0} topics · {stats?.content.resources ?? 0} resources
                </p>
                <Link href="/owner/content" className="text-xs text-primary hover:underline mt-1 inline-block">
                  Content console →
                </Link>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_LINKS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40"
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
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Recent signups
            </CardTitle>
            <Link href="/owner/users" className="text-xs text-primary hover:underline">
              View all
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
                <span className="text-[10px] font-bold uppercase shrink-0">{u.role ?? "member"}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
