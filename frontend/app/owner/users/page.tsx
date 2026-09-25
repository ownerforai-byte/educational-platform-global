"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Coins,
  Crown,
  Search,
  Trash2,
  RefreshCw,
  Plus,
  Minus,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getOwnerUsers,
  getOwnerUserDetail,
  adjustOwnerUserCredits,
  updateOwnerUserRole,
  setOwnerUserPremium,
  deleteOwnerUser,
} from "@/lib/api/owner";
import type { OwnerUser, OwnerUserDetail } from "@/lib/api/owner";

const ROLES = ["STUDENT", "TEACHER", "ADMIN", "OWNER"] as const;

const roleBadge: Record<string, string> = {
  OWNER: "bg-amber-500/15 text-amber-600",
  ADMIN: "bg-rose-500/15 text-rose-600",
  TEACHER: "bg-blue-500/15 text-blue-600",
  STUDENT: "bg-muted text-muted-foreground",
};

export default function OwnerUsersPage() {
  const [users, setUsers] = useState<OwnerUser[]>([]);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  // Credit adjustment modal state
  const [adjustUser, setAdjustUser] = useState<OwnerUser | null>(null);
  const [adjustAmount, setAdjustAmount] = useState(0);
  const [adjustReason, setAdjustReason] = useState("");

  // Inline user detail expansion
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<OwnerUserDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const load = useCallback(async (q?: string) => {
    try {
      setError(null);
      setIsLoading(true);
      setUsers(await getOwnerUsers(q));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const runAction = async (fn: () => Promise<unknown>, successMsg: string) => {
    try {
      setError(null);
      await fn();
      return successMsg;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
      return null;
    }
  };

  const handleAdjust = async () => {
    if (!adjustUser || !adjustAmount) return;
    setBusyId(adjustUser.id);
    const msg = await runAction(
      () => adjustOwnerUserCredits(adjustUser.id, adjustAmount, adjustReason || undefined),
      "Credits updated"
    );
    setBusyId(null);
    if (msg) {
      setAdjustUser(null);
      setAdjustAmount(0);
      setAdjustReason("");
      load(appliedSearch || undefined);
    }
  };

  const handleRole = async (u: OwnerUser, role: string) => {
    setBusyId(u.id);
    await runAction(() => updateOwnerUserRole(u.id, role as any), "Role updated");
    setBusyId(null);
    load(appliedSearch || undefined);
  };

  const handlePremium = async (u: OwnerUser, premiumStatus: boolean) => {
    setBusyId(u.id);
    await runAction(() => setOwnerUserPremium(u.id, premiumStatus), "Premium updated");
    setBusyId(null);
    load(appliedSearch || undefined);
  };

  const handleDelete = async (u: OwnerUser) => {
    if (!window.confirm(`Permanently delete ${u.email}? This cannot be undone.`)) return;
    setBusyId(u.id);
    await runAction(() => deleteOwnerUser(u.id), "User deleted");
    setBusyId(null);
    load(appliedSearch || undefined);
  };

  const toggleDetail = async (userId: string) => {
    if (expandedId === userId) {
      setExpandedId(null);
      setDetail(null);
      return;
    }
    setExpandedId(userId);
    setDetail(null);
    setDetailLoading(true);
    try {
      setDetail(await getOwnerUserDetail(userId));
    } catch {
      setDetail(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const applySearch = () => {
    setAppliedSearch(search.trim());
    load(search.trim() || undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            User Control
          </h1>
          <p className="text-sm text-muted-foreground">
            Roles, credits, premium status, and account deletion.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => load(appliedSearch || undefined)} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applySearch()}
            placeholder="Search by email or name…"
            className="pl-9"
          />
        </div>
        <Button onClick={applySearch} disabled={isLoading}>
          Search
        </Button>
      </div>

      {/* User list */}
      <Card>
        <CardContent className="pt-6">
          {isLoading && users.length === 0 ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : users.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">No users found.</p>
          ) : (
            <div className="space-y-2">
              {users.map((u) => (
                <div key={u.id} className="rounded-lg border overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={() => toggleDetail(u.id)}
                        className="text-muted-foreground hover:text-foreground shrink-0"
                        aria-label="Toggle details"
                      >
                        {expandedId === u.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      <div className="min-w-0">
                        <p className="font-medium truncate flex items-center gap-2">
                          {u.full_name || u.email}
                          {u.premium_status && <Crown className="h-3.5 w-3.5 text-purple-500 shrink-0" />}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${roleBadge[u.role ?? "STUDENT"] ?? roleBadge.STUDENT}`}>
                            {u.role ?? "—"}
                          </span>
                          <span className="text-xs text-muted-foreground">{u.credits} credits</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      <select
                        value={u.role ?? "STUDENT"}
                        onChange={(e) => handleRole(u, e.target.value)}
                        disabled={busyId === u.id}
                        className="text-xs border rounded-md px-2 py-1.5 bg-background"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={busyId === u.id}
                        onClick={() => handlePremium(u, !u.premium_status)}
                      >
                        <Crown className="h-3.5 w-3.5 mr-1" />
                        {u.premium_status ? "Revoke" : "Grant"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={busyId === u.id}
                        onClick={() => {
                          setAdjustUser(u);
                          setAdjustAmount(0);
                          setAdjustReason("");
                        }}
                      >
                        <Coins className="h-3.5 w-3.5 mr-1" />
                        Credits
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={busyId === u.id}
                        onClick={() => handleDelete(u)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {expandedId === u.id && (
                    <div className="border-t bg-muted/30 p-4 space-y-4">
                      {detailLoading ? (
                        <Skeleton className="h-20" />
                      ) : detail ? (
                        <>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                            <div>
                              <p className="text-muted-foreground">User ID</p>
                              <p className="font-mono mt-0.5">{u.id}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Premium since</p>
                              <p className="mt-0.5">
                                {detail.profile.premium_approved_at
                                  ? new Date(detail.profile.premium_approved_at).toLocaleDateString()
                                  : "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Joined</p>
                              <p className="mt-0.5">
                                {detail.profile.created_at
                                  ? new Date(detail.profile.created_at).toLocaleDateString()
                                  : "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Credit limit</p>
                              <p className="mt-0.5">{detail.profile.credits_limit ?? "—"}</p>
                            </div>
                          </div>

                          {detail.creditHistory.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                                Recent credit history
                              </p>
                              <div className="space-y-1">
                                {detail.creditHistory.slice(0, 5).map((t) => (
                                  <div key={t.id} className="flex items-center justify-between text-xs">
                                    <span className="truncate text-muted-foreground">
                                      {t.reason || t.type} · {new Date(t.created_at).toLocaleDateString()}
                                    </span>
                                    <span className={`font-mono font-bold ${t.amount >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                                      {t.amount >= 0 ? "+" : ""}{t.amount}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {detail.premiumRequests.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                                Premium requests
                              </p>
                              <div className="space-y-1">
                                {detail.premiumRequests.slice(0, 5).map((r) => (
                                  <div key={r.id} className="flex items-center justify-between text-xs">
                                    <span className="truncate text-muted-foreground">
                                      {r.message || r.status} · {new Date(r.created_at).toLocaleDateString()}
                                    </span>
                                    <span className="font-semibold">{r.status}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">Could not load details.</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Adjust credits modal */}
      {adjustUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-base">Adjust Credits</CardTitle>
              <p className="text-xs text-muted-foreground">{adjustUser.email}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAdjustAmount((a) => a - 50)}
                  aria-label="Decrease by 50"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(Number(e.target.value))}
                  className="text-center font-mono"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAdjustAmount((a) => a + 50)}
                  aria-label="Increase by 50"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Input
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                placeholder="Reason (optional)"
              />
              {adjustAmount < 0 && (
                <p className="text-xs flex items-center gap-1.5 text-amber-600">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  This will remove {Math.abs(adjustAmount)} credits.
                </p>
              )}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setAdjustUser(null)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleAdjust} disabled={!adjustAmount}>
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
