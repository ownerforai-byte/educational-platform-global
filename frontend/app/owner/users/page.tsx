"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
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
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Users,
  Filter,
  MessageSquareText,
  CheckSquare,
  Square,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getOwnerUserDetail,
  adjustOwnerUserCredits,
  updateOwnerUserRole,
  setOwnerUserPremium,
  deleteOwnerUser,
  setOwnerUserAccessStatus,
  bulkOwnerUserAccessStatus,
} from "@/lib/api/owner";
import type { OwnerUser, OwnerUserDetail } from "@/lib/api/owner";
import { useOwnerUserDirectory } from "@/lib/hooks/use-owner-user-directory";
import {
  downloadTextFile,
  ownerUsersToCsv,
  type UserAccessFilter,
  type UserRoleFilter,
  type UserSortKey,
} from "@/lib/owner/user-directory";
import { cn } from "@/lib/utils";

const ROLES = ["member", "plus", "pro", "owner"] as const;
const CREDIT_PRESETS = [50, 100, 250, 500] as const;

const roleBadge: Record<string, string> = {
  owner: "bg-amber-500/15 text-amber-600",
  pro: "bg-rose-500/15 text-rose-600",
  plus: "bg-blue-500/15 text-blue-600",
  member: "bg-muted text-muted-foreground",
};

const accessBadge: Record<string, { label: string; className: string }> = {
  ACTIVE: { label: "ACCESS GRANTED", className: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30" },
  PENDING: { label: "PENDING APPROVAL", className: "bg-amber-500/15 text-amber-600 border-amber-500/30" },
  REJECTED: { label: "ACCESS REVOKED", className: "bg-red-500/15 text-red-600 border-red-500/30" },
};

function StatChip({
  label,
  value,
  active,
  onClick,
  accent,
}: {
  label: string;
  value: number;
  active?: boolean;
  onClick?: () => void;
  accent?: string;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "rounded-xl border px-3 py-2 text-left transition-colors",
        onClick && "hover:border-primary/40 hover:bg-muted/50 cursor-pointer",
        active ? "border-primary/50 bg-primary/5" : "border-border/70 bg-card",
      )}
    >
      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={cn("text-lg font-bold tabular-nums", accent)}>{value}</p>
    </Comp>
  );
}

export default function OwnerUsersPage() {
  const {
    visibleUsers,
    stats,
    filters,
    patchFilters,
    isLoading,
    error,
    setError,
    reload,
  } = useOwnerUserDirectory();

  const [busyId, setBusyId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);

  const [adjustUser, setAdjustUser] = useState<OwnerUser | null>(null);
  const [adjustAmount, setAdjustAmount] = useState(0);
  const [adjustReason, setAdjustReason] = useState("");

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<OwnerUserDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const runAction = useCallback(
    async (fn: () => Promise<unknown>, successMsg: string) => {
      try {
        setError(null);
        await fn();
        toast.success(successMsg);
        return true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Action failed";
        setError(msg);
        toast.error(msg);
        return false;
      }
    },
    [setError],
  );

  const handleAdjust = async () => {
    if (!adjustUser || !adjustAmount) return;
    setBusyId(adjustUser.id);
    const ok = await runAction(
      () => adjustOwnerUserCredits(adjustUser.id, adjustAmount, adjustReason || undefined),
      "Credits updated",
    );
    setBusyId(null);
    if (ok) {
      setAdjustUser(null);
      setAdjustAmount(0);
      setAdjustReason("");
      reload();
    }
  };

  const handleRole = async (u: OwnerUser, role: string) => {
    setBusyId(u.id);
    const ok = await runAction(() => updateOwnerUserRole(u.id, role as (typeof ROLES)[number]), "Role updated");
    setBusyId(null);
    if (ok) reload();
  };

  const handlePremium = async (u: OwnerUser, premiumStatus: boolean) => {
    setBusyId(u.id);
    const ok = await runAction(() => setOwnerUserPremium(u.id, premiumStatus), "Premium updated");
    setBusyId(null);
    if (ok) reload();
  };

  const handleAccess = async (u: OwnerUser, status: "ACTIVE" | "REJECTED") => {
    setBusyId(u.id);
    const ok = await runAction(
      () => setOwnerUserAccessStatus(u.id, status),
      status === "ACTIVE" ? "Access granted" : "Access revoked",
    );
    setBusyId(null);
    if (ok) reload();
  };

  const handleDelete = async (u: OwnerUser) => {
    if (!window.confirm(`Permanently delete ${u.email}? This cannot be undone.`)) return;
    setBusyId(u.id);
    const ok = await runAction(() => deleteOwnerUser(u.id), "User deleted");
    setBusyId(null);
    if (ok) {
      setSelected((s) => {
        const next = new Set(s);
        next.delete(u.id);
        return next;
      });
      reload();
    }
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

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllVisible = () => {
    if (selected.size === visibleUsers.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(visibleUsers.map((u) => u.id)));
    }
  };

  const bulkAccess = async (status: "ACTIVE" | "REJECTED") => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    const verb = status === "ACTIVE" ? "approve" : "revoke access for";
    if (!window.confirm(`${verb} ${ids.length} selected account(s)?`)) return;
    setBulkBusy(true);
    try {
      const res = await bulkOwnerUserAccessStatus(ids, status);
      toast.success(`Updated ${res.applied.length} of ${res.requested} accounts`);
      if (res.skipped.length > 0) {
        toast.message(`${res.skipped.length} skipped (protected or missing)`);
      }
      setSelected(new Set());
      reload();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Bulk update failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setBulkBusy(false);
    }
  };

  const approveAllPending = async () => {
    const pendingIds = visibleUsers
      .filter((u) => (u.access_status ?? "ACTIVE") === "PENDING")
      .map((u) => u.id);
    if (pendingIds.length === 0) return;
    if (!window.confirm(`Approve all ${pendingIds.length} pending accounts in the current view?`)) return;
    setBulkBusy(true);
    try {
      const res = await bulkOwnerUserAccessStatus(pendingIds, "ACTIVE");
      toast.success(`Approved ${res.applied.length} pending account(s)`);
      reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Bulk approve failed");
    } finally {
      setBulkBusy(false);
    }
  };

  const exportCsv = () => {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadTextFile(`platform-users-${stamp}.csv`, ownerUsersToCsv(visibleUsers));
    toast.success(`Exported ${visibleUsers.length} rows`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            User Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Approvals, tier grants, credits, premium, bulk actions, and exports.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={isLoading || visibleUsers.length === 0}>
            <Download className="h-4 w-4 mr-1" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => reload()} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <StatChip label="Total" value={stats.total} />
        <StatChip
          label="Pending"
          value={stats.pending}
          accent="text-amber-600"
          active={filters.access === "PENDING"}
          onClick={() => patchFilters({ access: filters.access === "PENDING" ? "all" : "PENDING" })}
        />
        <StatChip
          label="Active"
          value={stats.active}
          accent="text-emerald-600"
          active={filters.access === "ACTIVE"}
          onClick={() => patchFilters({ access: filters.access === "ACTIVE" ? "all" : "ACTIVE" })}
        />
        <StatChip
          label="Premium"
          value={stats.premium}
          accent="text-violet-600"
          active={filters.premium === "premium"}
          onClick={() =>
            patchFilters({ premium: filters.premium === "premium" ? "all" : "premium" })
          }
        />
        <StatChip label="Pro+" value={(stats.byRole.pro ?? 0) + (stats.byRole.owner ?? 0)} />
        <StatChip label="Showing" value={visibleUsers.length} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card p-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={filters.query}
              onChange={(e) => patchFilters({ query: e.target.value })}
              placeholder="Filter by email, name, or user id…"
              className="pl-9"
            />
          </div>
          <select
            value={filters.role}
            onChange={(e) => patchFilters({ role: e.target.value as UserRoleFilter })}
            className="text-sm border rounded-md px-3 py-2 bg-background min-w-[120px]"
            aria-label="Filter by role"
          >
            <option value="all">All roles</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            value={filters.access}
            onChange={(e) => patchFilters({ access: e.target.value as UserAccessFilter })}
            className="text-sm border rounded-md px-3 py-2 bg-background min-w-[140px]"
            aria-label="Filter by access"
          >
            <option value="all">All access</option>
            <option value="PENDING">Pending</option>
            <option value="ACTIVE">Active</option>
            <option value="REJECTED">Revoked</option>
          </select>
          <select
            value={filters.sort}
            onChange={(e) => patchFilters({ sort: e.target.value as UserSortKey })}
            className="text-sm border rounded-md px-3 py-2 bg-background min-w-[140px]"
            aria-label="Sort users"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="name">Name A–Z</option>
            <option value="credits_desc">Most credits</option>
            <option value="credits_asc">Least credits</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          {stats.pending > 0 && (
            <Button size="sm" variant="outline" disabled={bulkBusy} onClick={approveAllPending}>
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Approve all pending ({stats.pending})
            </Button>
          )}
          {selected.size > 0 && (
            <>
              <span className="text-xs text-muted-foreground">{selected.size} selected</span>
              <Button size="sm" disabled={bulkBusy} onClick={() => bulkAccess("ACTIVE")}>
                Bulk approve
              </Button>
              <Button size="sm" variant="outline" disabled={bulkBusy} onClick={() => bulkAccess("REJECTED")}>
                Bulk revoke
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm" onClick={selectAllVisible} className="ml-auto">
            {selected.size === visibleUsers.length && visibleUsers.length > 0 ? (
              <>
                <CheckSquare className="h-3.5 w-3.5 mr-1" />
                Clear selection
              </>
            ) : (
              <>
                <Square className="h-3.5 w-3.5 mr-1" />
                Select visible
              </>
            )}
          </Button>
        </div>
      </div>

      {stats.pending > 0 && filters.access !== "PENDING" && (
        <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0" />
          <span>
            <strong>{stats.pending}</strong> account(s) awaiting approval — use the Pending filter or bulk
            approve.
          </span>
        </div>
      )}

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Directory
          </CardTitle>
          <span className="text-xs text-muted-foreground">Instant client-side filters · one API load</span>
        </CardHeader>
        <CardContent>
          {isLoading && visibleUsers.length === 0 ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : visibleUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">No users match these filters.</p>
          ) : (
            <div className="space-y-2">
              {visibleUsers.map((u) => (
                <div key={u.id} className="rounded-lg border overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={() => toggleSelect(u.id)}
                        className="text-muted-foreground hover:text-foreground shrink-0"
                        aria-label={selected.has(u.id) ? "Deselect user" : "Select user"}
                      >
                        {selected.has(u.id) ? (
                          <CheckSquare className="h-4 w-4 text-primary" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        type="button"
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
                        <p className="text-xs text-muted-foreground truncate">
                          {u.email}
                          {u.created_at && (
                            <span className="ml-1.5 text-muted-foreground/70">
                              · Joined {new Date(u.created_at).toLocaleDateString()}
                            </span>
                          )}
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${roleBadge[u.role ?? "member"] ?? roleBadge.member}`}
                          >
                            {u.role ?? "—"}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                              (accessBadge[u.access_status ?? "ACTIVE"] ?? accessBadge.ACTIVE).className
                            }`}
                          >
                            {u.access_status === "PENDING" ? (
                              <Clock className="h-2.5 w-2.5" />
                            ) : u.access_status === "REJECTED" ? (
                              <XCircle className="h-2.5 w-2.5" />
                            ) : (
                              <CheckCircle2 className="h-2.5 w-2.5" />
                            )}
                            {(accessBadge[u.access_status ?? "ACTIVE"] ?? accessBadge.ACTIVE).label}
                          </span>
                          <span className="text-xs text-muted-foreground">{u.credits} credits</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/owner/tracking?user=${encodeURIComponent(u.id)}`}>
                          <MessageSquareText className="h-3.5 w-3.5 mr-1" />
                          Chats
                        </Link>
                      </Button>
                      {u.access_status === "PENDING" ? (
                        <Button
                          size="sm"
                          disabled={busyId === u.id}
                          onClick={() => handleAccess(u, "ACTIVE")}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          Approve
                        </Button>
                      ) : u.access_status === "REJECTED" ? (
                        <Button size="sm" disabled={busyId === u.id} onClick={() => handleAccess(u, "ACTIVE")}>
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          Grant Access
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={busyId === u.id}
                          onClick={() => handleAccess(u, "REJECTED")}
                          className="text-red-600 hover:text-red-700 hover:bg-red-500/10 border-red-500/30"
                        >
                          <XCircle className="h-3.5 w-3.5 mr-1" />
                          Revoke
                        </Button>
                      )}
                      <select
                        value={u.role ?? "member"}
                        onChange={(e) => handleRole(u, e.target.value)}
                        disabled={busyId === u.id}
                        className="text-xs border rounded-md px-2 py-1.5 bg-background"
                        aria-label={`Role for ${u.email}`}
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
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

                  {expandedId === u.id && (
                    <div className="border-t bg-muted/30 p-4 space-y-4">
                      {detailLoading ? (
                        <Skeleton className="h-20" />
                      ) : detail ? (
                        <>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                            <div>
                              <p className="text-muted-foreground">User ID</p>
                              <p className="font-mono mt-0.5 break-all">{u.id}</p>
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
                                {detail.creditHistory.slice(0, 8).map((t) => (
                                  <div key={t.id} className="flex items-center justify-between text-xs">
                                    <span className="truncate text-muted-foreground">
                                      {t.reason || t.type} · {new Date(t.created_at).toLocaleDateString()}
                                    </span>
                                    <span
                                      className={`font-mono font-bold ${t.amount >= 0 ? "text-emerald-600" : "text-red-500"}`}
                                    >
                                      {t.amount >= 0 ? "+" : ""}
                                      {t.amount}
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

      {adjustUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-base">Adjust Credits</CardTitle>
              <p className="text-xs text-muted-foreground">{adjustUser.email}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {CREDIT_PRESETS.map((n) => (
                  <Button
                    key={n}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setAdjustAmount((a) => a + n)}
                  >
                    +{n}
                  </Button>
                ))}
              </div>
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
