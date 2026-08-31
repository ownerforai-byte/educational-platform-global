"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Database, Settings, Activity, Server, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type HealthStatus = {
  status: string;
  timestamp: string;
  uptime: number;
};

type ContentStats = {
  levels: number;
  classes: number;
  subjects: number;
  chapters: number;
  topics: number;
  resources: number;
  users: number;
};

export default function ControllerPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [stats, setStats] = useState<ContentStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [healthRes, statsRes] = await Promise.all([
          fetch("/api/controller/health", { credentials: "include" }),
          fetch("/api/controller/content-stats", { credentials: "include" }),
        ]);

        if (!healthRes.ok || !statsRes.ok) {
          setError("Failed to load controller data");
          return;
        }

        const [healthData, statsData] = await Promise.all([
          healthRes.json(),
          statsRes.json(),
        ]);

        setHealth(healthData);
        setStats(statsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load controller data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Admin Controller
        </h1>
        <p className="text-sm text-muted-foreground">
          System diagnostics and content statistics.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {health?.status === "ok" ? "Healthy" : "Unknown"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Uptime: {Math.floor(health?.uptime ?? 0)}s
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Server className="h-4 w-4 text-blue-500" />
                  Backend Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">Running</div>
                <p className="text-xs text-muted-foreground mt-1">Port 3001</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Database className="h-4 w-4 text-purple-500" />
                  Content Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Levels:</span>
                    <span className="ml-2 font-semibold">{stats?.levels ?? 0}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Classes:</span>
                    <span className="ml-2 font-semibold">{stats?.classes ?? 0}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Subjects:</span>
                    <span className="ml-2 font-semibold">{stats?.subjects ?? 0}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Chapters:</span>
                    <span className="ml-2 font-semibold">{stats?.chapters ?? 0}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Topics:</span>
                    <span className="ml-2 font-semibold">{stats?.topics ?? 0}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Resources:</span>
                    <span className="ml-2 font-semibold">{stats?.resources ?? 0}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Users:</span>
                    <span className="ml-2 font-semibold">{stats?.users ?? 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber-500" />
                  Platform Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Frontend:</span>{" "}
                    <span className="font-semibold">Next.js 16</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Backend:</span>{" "}
                    <span className="font-semibold">Express + Supabase</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Theme:</span>{" "}
                    <span className="font-semibold">System Default</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <a
                  href="/api/controller/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  <Activity className="h-4 w-4" />
                  Test Health Endpoint
                </a>
                <a
                  href="/api/controller/content-stats"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  <Database className="h-4 w-4" />
                  View Content Stats
                </a>
                <a
                  href="/api/subjects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  API Subjects
                </a>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
