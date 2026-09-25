"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Coins,
  Crown,
  Users,
  TrendingUp,
  Database,
  RefreshCw,
  ArrowUpRight,
  BookOpen,
  Layers,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { getOwnerOverview } from "@/lib/api/owner";
import type { OwnerOverview } from "@/lib/api/owner";

export default function OwnerOverviewPage() {
  const [data, setData] = useState<OwnerOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setError(null);
      setIsLoading(true);
      setData(await getOwnerOverview());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load overview");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoading && !data) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive flex items-center gap-3">
        <span>{error}</span>
        <Button variant="outline" size="sm" onClick={load}>
          <RefreshCw className="h-4 w-4 mr-1" /> Retry
        </Button>
      </div>
    );
  }

  const stats = data?.stats;
  const fmt = (n: number | undefined) => (n ?? 0).toLocaleString();

  const userCards = [
    { label: "Total Users", value: stats?.totalUsers, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Premium Users", value: stats?.premiumUsers, icon: Crown, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Pending Requests", value: stats?.pendingPremiumRequests, icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Credits Granted", value: stats?.totalCreditsGranted, icon: Coins, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  const contentCards = [
    { label: "Levels", value: stats?.content.levels, icon: Layers },
    { label: "Subjects", value: stats?.content.subjects, icon: BookOpen },
    { label: "Chapters", value: stats?.content.chapters, icon: BookOpen },
    { label: "Resources", value: stats?.content.resources, icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Crown className="h-6 w-6 text-amber-500" />
            Platform Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Full control of users, content, credits, and settings.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* User stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {userCards.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${c.bg}`}>
                    <Icon className={`h-5 w-5 ${c.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{fmt(c.value)}</p>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content stats */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            Content Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {contentCards.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="flex items-center gap-2.5 rounded-lg border p-3">
                  <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-lg font-bold leading-none">{fmt(c.value)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>Recent Users</span>
              <Link href="/owner/users" className="text-xs text-primary flex items-center gap-0.5 hover:underline">
                All users <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {(data?.recentUsers ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">No users yet.</p>
            )}
            {(data?.recentUsers ?? []).map((u) => (
              <div key={u.id} className="flex items-center justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="font-medium truncate">{u.full_name || u.email}</p>
                  <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {u.premium_status && <Crown className="h-3.5 w-3.5 text-purple-500" />}
                  <span className="text-xs text-muted-foreground">{u.credits} cr</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>Recent Credit Activity</span>
              <Link href="/owner/activity" className="text-xs text-primary flex items-center gap-0.5 hover:underline">
                Full log <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {(data?.recentTransactions ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">No transactions yet.</p>
            )}
            {(data?.recentTransactions ?? []).map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate">{t.reason || t.type}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.userEmail ?? t.user_id.slice(0, 8)} · {new Date(t.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`shrink-0 font-mono text-xs font-bold ${
                    t.amount >= 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {t.amount >= 0 ? "+" : ""}
                  {t.amount}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
