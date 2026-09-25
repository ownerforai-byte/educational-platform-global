"use client";

import { useCallback, useEffect, useState } from "react";
import { Crown, RefreshCw, UserCheck, UserX, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getOwnerPremiumRequests,
  approveOwnerPremiumRequest,
  rejectOwnerPremiumRequest,
} from "@/lib/api/owner";
import type { OwnerPremiumRequest } from "@/lib/api/owner";

const statusConfig: Record<string, { label: string; className: string; icon: typeof Clock }> = {
  PENDING: { label: "Pending", className: "bg-amber-500/15 text-amber-600", icon: Clock },
  APPROVED: { label: "Approved", className: "bg-emerald-500/15 text-emerald-600", icon: CheckCircle2 },
  REJECTED: { label: "Rejected", className: "bg-red-500/15 text-red-600", icon: XCircle },
};

export default function OwnerPremiumPage() {
  const [requests, setRequests] = useState<OwnerPremiumRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"PENDING" | "APPROVED" | "REJECTED" | "ALL">("PENDING");

  const load = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      setRequests(await getOwnerPremiumRequests());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load requests");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleApprove = async (id: string) => {
    setBusyId(id);
    try {
      await approveOwnerPremiumRequest(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Approve failed");
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (id: string) => {
    setBusyId(id);
    try {
      await rejectOwnerPremiumRequest(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reject failed");
    } finally {
      setBusyId(null);
    }
  };

  const pendingCount = requests.filter((r) => r.status === "PENDING").length;
  const shown = filter === "ALL" ? requests : requests.filter((r) => r.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Crown className="h-6 w-6 text-purple-500" />
            Premium Requests
          </h1>
          <p className="text-sm text-muted-foreground">
            Approve to grant premium status + 500 bonus credits.
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

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["PENDING", "APPROVED", "REJECTED", "ALL"] as const).map((f) => {
          const count =
            f === "ALL" ? requests.length : requests.filter((r) => r.status === f).length;
          return (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === "ALL" ? "All" : statusConfig[f].label}
              <span className="ml-1.5 text-xs opacity-70">({count})</span>
            </Button>
          );
        })}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            {pendingCount > 0
              ? `${pendingCount} pending request${pendingCount === 1 ? "" : "s"}`
              : "Nothing pending"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && requests.length === 0 ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : shown.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              No {filter === "ALL" ? "" : filter.toLowerCase() + " "}requests.
            </p>
          ) : (
            <div className="space-y-2">
              {shown.map((req) => {
                const cfg = statusConfig[req.status];
                const Icon = cfg.icon;
                return (
                  <div key={req.id} className="rounded-lg border p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">
                          {req.profiles?.full_name || req.profiles?.email || req.user_id}
                        </p>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${cfg.className}`}>
                          <Icon className="h-3 w-3" />
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {req.profiles?.email} · {req.profiles?.role} · {req.profiles?.credits} credits
                      </p>
                      {req.message && (
                        <p className="text-sm mt-1.5 text-muted-foreground italic">“{req.message}”</p>
                      )}
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Requested {new Date(req.created_at).toLocaleString()}
                        {req.reviewed_at && ` · Reviewed ${new Date(req.reviewed_at).toLocaleString()}`}
                      </p>
                    </div>

                    {req.status === "PENDING" && (
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="sm"
                          disabled={busyId === req.id}
                          onClick={() => handleApprove(req.id)}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={busyId === req.id}
                          onClick={() => handleReject(req.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
