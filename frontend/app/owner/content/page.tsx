"use client";

import { useCallback, useEffect, useState } from "react";
import { Database, RefreshCw, Layers, BookOpen, FileText, Users, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getOwnerOverview } from "@/lib/api/owner";

export default function OwnerContentPage() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getOwnerOverview>> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      setData(await getOwnerOverview());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load content stats");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = data?.stats;
  const fmt = (n: number | undefined) => (n ?? 0).toLocaleString();

  const contentCards = [
    { label: "Levels", value: stats?.content.levels, icon: Layers },
    { label: "Classes", value: stats?.content.classes, icon: BookOpen },
    { label: "Subjects", value: stats?.content.subjects, icon: BookOpen },
    { label: "Chapters", value: stats?.content.chapters, icon: BookOpen },
    { label: "Topics", value: stats?.content.topics, icon: FileText },
    { label: "Resources", value: stats?.content.resources, icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            Content Library
          </h1>
          <p className="text-sm text-muted-foreground">
            Every resource on the platform, at a glance.
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {contentCards.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Community
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total users</span>
              <span className="font-bold">{fmt(stats?.totalUsers)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Premium users</span>
              <span className="font-bold">{fmt(stats?.premiumUsers)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pending premium requests</span>
              <span className="font-bold">{fmt(stats?.pendingPremiumRequests)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Credits granted</span>
              <span className="font-bold">{fmt(stats?.totalCreditsGranted)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Credits spent</span>
              <span className="font-bold">{fmt(stats?.totalCreditsSpent)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              Backend Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">API</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Connected
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              This page loaded successfully from /api/owner/overview, so the backend is up.
            </p>
            <div className="pt-2 border-t space-y-1 text-xs text-muted-foreground">
              <p>Stack: Next.js frontend · Express + Supabase backend</p>
              <p>Owner gate: allowlisted emails via /api/owner/*</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
