"use client";

import { useCallback, useEffect, useState } from "react";
import { Activity, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getOwnerActivity } from "@/lib/api/owner";
import type { OwnerActivity } from "@/lib/api/owner";

const typeBadge: Record<string, string> = {
  GRANT: "bg-emerald-500/15 text-emerald-600",
  SPEND: "bg-red-500/15 text-red-600",
  ADJUST: "bg-amber-500/15 text-amber-600",
};

export default function OwnerActivityPage() {
  const [rows, setRows] = useState<OwnerActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      setRows(await getOwnerActivity());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load activity");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            Activity Log
          </h1>
          <p className="text-sm text-muted-foreground">
            Every credit grant, spend, and adjustment — the audit trail.
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

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Last 100 transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && rows.length === 0 ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-10" />
              ))}
            </div>
          ) : rows.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">No activity yet.</p>
          ) : (
            <div className="space-y-1.5">
              {rows.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate">{t.reason || t.type}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t.userEmail ?? t.user_id.slice(0, 8)}
                      {t.actorEmail && t.actorEmail !== t.userEmail && ` · by ${t.actorEmail}`}
                      {" · "}
                      {new Date(t.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${typeBadge[t.type] ?? "bg-muted text-muted-foreground"}`}>
                      {t.type}
                    </span>
                    <span className={`font-mono text-sm font-bold ${t.amount >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {t.amount >= 0 ? "+" : ""}
                      {t.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
