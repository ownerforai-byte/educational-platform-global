"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import {
  Coins,
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
  bulkUpdateOwnerUserRole,
  deleteOwnerUser,
  setOwnerUserAccessStatus,
  bulkOwnerUserAccessStatus,
} from "@/lib/api/owner";
import type { OwnerUser, OwnerUserDetail } from "@/lib/api/owner";
import { useOwnerUserDirectory } from "@/lib/hooks/use-owner-user-directory";
import {
  downloadTextFile,
  isOwnerUser,
  ownerUsersToCsv,
  partitionOwnerSystems,
  type OwnerSystem,
  type UserTierFilter,
  type UserSortKey,
} from "@/lib/owner/user-directory";
import { cn } from "@/lib/utils";
import { USER_ROLES, type UserRole } from "@/lib/auth/roles";
import { ACCESS_LABELS, TIER_SPARKS, type AccessLevel } from "@/lib/access-level";

const CREDIT_PRESETS = [50, 100, 250, 500] as const;

const tierBadge: Record<AccessLevel, string> = {
  guest: "bg-slate-500/15 text-slate-500",
  member: "bg-emerald-500/15 text-emerald-600",
  plus: "bg-blue-500/15 text-blue-600",
  pro: "bg-rose-500/15 text-rose-600",
  owner: "bg-amber-500/15 text-amber-600",
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
    users,
    visibleUsers,
    stats,
    filters,
    patchFilters,
    isLoading,
    error,
    setError,
    reload,
  } = useOwnerUserDirectory();

  // Two separate systems, recreated cleanly: Review (pending decisions)
  // and Approved (decided accounts). No overlap — an account is in one.
  const [system, setSystem] = useState<OwnerSystem>("review");
  // Access is owned by the partition, not the filter dropdown: Review =
  // PENDING, Approved = ACTIVE/REJECTED. Filters stay at "all" for access
  // so neither system can hide the other's rows.
  const switchSystem = useCallback((next: OwnerSystem) => {
    setSelected(new Set());
    setSystem(next);
  }, []);

  // Partition the *visible* (searched/tier/sorted) rows so search works
  // inside whichever system is open; owners are pulled out entirely.
  const partitioned = useMemo(() => partitionOwnerSystems(visibleUsers), [visibleUsers]);
  const systemUsers = system === "review" ? partitioned.review : partitioned.approved;
  // Plain owner roster: from the full load, never filtered into Review.
  const ownerRoster = useMemo(() => partitionOwnerSystems(users).owners, [users]);

  const [busyId, setBusyId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);
  const [bulkTier, setBulkTier] = useState<Exclude<UserRole, "owner">>("plus");
  const selectedSystemIds = useMemo(
    () => systemUsers.filter((user) => selected.has(user.id)).map((user) => user.id),
    [systemUsers, selected],
  );
  const updateFilters = useCallback((patch: Parameters<typeof patchFilters>[0]) => {
    setSelected(new Set());
    patchFilters(patch);
  }, [patchFilters]);

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

  const handleTier = async (u: OwnerUser, tier: string) => {
    setBusyId(u.id);
    const ok = await runAction(() => updateOwnerUserRole(u.id, tier as UserRole), "Tier updated");
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
    if (selectedSystemIds.length === systemUsers.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(systemUsers.map((u) => u.id)));
    }
  };

  const bulkAccess = async (status: "ACTIVE" | "REJECTED") => {
    const ids = selectedSystemIds;
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

  const bulkSetTier = async () => {
    const ids = selectedSystemIds;
    if (ids.length === 0 || system !== "approved") return;
    const tierLabel = ACCESS_LABELS[bulkTier];
    if (!window.confirm(`Set ${ids.length} selected account(s) to ${tierLabel}?`)) return;

    setBulkBusy(true);
    try {
      const res = await bulkUpdateOwnerUserRole(ids, bulkTier);
      toast.success(`Updated ${res.applied.length} of ${res.requested} account tiers`);
      if (res.skipped.length > 0) {
        toast.message(`${res.skipped.length} skipped (protected or missing)`);
      }
      setSelected(new Set());
      reload();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Bulk tier update failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setBulkBusy(false);
    }
  };

  const visiblePendingIds = partitioned.review.map((u) => u.id);

  const approveAllPending = async () => {
    if (visiblePendingIds.length === 0) {
      toast.message(
        stats.pending > 0
          ? "No pending accounts in this view. Switch the access filter to Pending."
          : "No pending accounts to approve.",
      );
      return;
    }
    if (
      !window.confirm(
        `Approve all ${visiblePendingIds.length} pending accounts in the current view?`,
      )
    ) {
      return;
    }
    setBulkBusy(true);
    try {
      const res = await bulkOwnerUserAccessStatus(visiblePendingIds, "ACTIVE");
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
    downloadTextFile(`platform-users-${system}-${stamp}.csv`, ownerUsersToCsv(systemUsers));
    toast.success(`Exported ${systemUsers.length} rows (${system})`);
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
            Two separate systems — Review decides pending accounts, Approved manages decided ones.
            Owner emails are a plain roster in Approved: visible, no buttons, never in Review.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={isLoading || systemUsers.length === 0}>
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
          label="Review"
          value={stats.pending}
          accent="text-amber-600"
          active={system === "review"}
          onClick={() => switchSystem("review")}
        />
        <StatChip
          label="Approved"
          value={stats.active + stats.rejected}
          accent="text-emerald-600"
          active={system === "approved"}
          onClick={() => switchSystem("approved")}
        />
        <StatChip
          label="Plus"
          value={stats.byTier.plus ?? 0}
          accent="text-blue-600"
          active={filters.tier === "plus"}
          onClick={() => updateFilters({ tier: filters.tier === "plus" ? "all" : "plus" })}
        />
        <StatChip label="Pro+" value={(stats.byTier.pro ?? 0) + (stats.byTier.owner ?? 0)} />
        <StatChip label="Showing" value={systemUsers.length} />
      </div>

      {/* Two systems — Review vs Approved, no overlap */}
      <div className="flex gap-2" role="tablist" aria-label="User systems">
        <Button
          role="tab"
          aria-selected={system === "review"}
          variant={system === "review" ? "default" : "outline"}
          size="sm"
          onClick={() => switchSystem("review")}
        >
          <Clock className="h-4 w-4 mr-1" />
          Review ({stats.pending})
        </Button>
        <Button
          role="tab"
          aria-selected={system === "approved"}
          variant={system === "approved" ? "default" : "outline"}
          size="sm"
          onClick={() => switchSystem("approved")}
        >
          <Users className="h-4 w-4 mr-1" />
          Approved ({stats.active + stats.rejected})
        </Button>
        <span className="ml-auto self-center text-xs text-muted-foreground">
          Owners: {ownerRoster.length} plain (Approved only)
        </span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card p-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={filters.query}
              onChange={(e) => updateFilters({ query: e.target.value })}
              placeholder="Filter by email, name, or user id…"
              className="pl-9"
            />
          </div>
          <select
            value={filters.tier}
            onChange={(e) => updateFilters({ tier: e.target.value as UserTierFilter })}
            className="text-sm border rounded-md px-3 py-2 bg-background min-w-[120px]"
            aria-label="Filter by tier"
          >
            <option value="all">All tiers</option>
            {USER_ROLES.map((r) => (
              <option key={r} value={r}>
                {ACCESS_LABELS[r]}
              </option>
            ))}
          </select>
          {/* Access is the system tab above — no separate access filter,
              so Review and Approved can never overlap. */}
          <select
            value={filters.sort}
            onChange={(e) => updateFilters({ sort: e.target.value as UserSortKey })}
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
          {system === "review" && visiblePendingIds.length > 0 && (
            <Button size="sm" variant="outline" disabled={bulkBusy} onClick={approveAllPending}>
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Approve all pending ({visiblePendingIds.length})
            </Button>
          )}
          {selectedSystemIds.length > 0 && (
            <>
              <span className="text-xs text-muted-foreground">{selectedSystemIds.length} selected</span>
              {system === "approved" && (
                <>
                  <select
                    value={bulkTier}
                    onChange={(e) => setBulkTier(e.target.value as Exclude<UserRole, "owner">)}
                    disabled={bulkBusy}
                    className="text-sm border rounded-md px-2 py-1.5 bg-background"
                    aria-label="Set selected accounts tier"
                  >
                    {USER_ROLES.filter((role) => role !== "owner").map((role) => (
                      <option key={role} value={role}>{ACCESS_LABELS[role]}</option>
                    ))}
                  </select>
                  <Button size="sm" variant="outline" disabled={bulkBusy} onClick={bulkSetTier}>
                    Set tier
                  </Button>
                </>
              )}
              <Button size="sm" disabled={bulkBusy} onClick={() => bulkAccess("ACTIVE")}>
                Bulk approve
              </Button>
              <Button size="sm" variant="outline" disabled={bulkBusy} onClick={() => bulkAccess("REJECTED")}>
                Bulk revoke
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm" onClick={selectAllVisible} className="ml-auto">
            {selectedSystemIds.length === systemUsers.length && systemUsers.length > 0 ? (
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

      {stats.pending > 0 && system === "approved" && (
        <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0" />
          <span>
            <strong>{stats.pending}</strong> account(s) awaiting approval — decide them in Review.
          </span>
          <Button size="sm" variant="outline" className="ml-auto" onClick={() => switchSystem("review")}>
            Open Review
          </Button>
        </div>
      )}

      {/* Owner roster — Approved only, plain emails, no buttons/links/actions */}
      {system === "approved" && ownerRoster.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Owner emails — plain roster (no actions, never in Review)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {ownerRoster.map((o) => (
                <li key={o.id} className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium">{o.full_name || o.email}</span>
                  <span className="text-muted-foreground">{o.email}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${tierBadge.owner}`}
                  >
                    OWNER
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            {system === "review" ? "Review — pending decisions" : "Approved — decided accounts"}
          </CardTitle>
          <span className="text-xs text-muted-foreground">Instant client-side filters · one API load</span>
        </CardHeader>
        <CardContent>
          {isLoading && systemUsers.length === 0 ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : systemUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              {system === "review"
                ? "No pending accounts to review. Owners never appear here."
                : "No approved accounts match these filters."}
            </p>
          ) : (
            <div className="space-y-2">
              {systemUsers.map((u) => (
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
                        <p className="font-medium truncate">
                          {u.full_name || u.email}
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
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${tierBadge[u.effectiveTier ?? "member"]}`}
                          >
                            {ACCESS_LABELS[u.effectiveTier ?? "member"]}
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
                      {/* Approved-only tools — Review decides access, nothing else */}
                      {system === "approved" && !isOwnerUser(u) && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/owner/tracking?user=${encodeURIComponent(u.id)}`}>
                            <MessageSquareText className="h-3.5 w-3.5 mr-1" />
                            Chats
                          </Link>
                        </Button>
                      )}
                      {u.access_status === "PENDING" ? (
                        <>
                          <Button
                            size="sm"
                            disabled={busyId === u.id}
                            onClick={() => handleAccess(u, "ACTIVE")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={busyId === u.id}
                            onClick={() => handleAccess(u, "REJECTED")}
                            className="text-red-600 hover:text-red-700 hover:bg-red-500/10 border-red-500/30"
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            Reject
                          </Button>
                        </>
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
                      {system === "approved" && !isOwnerUser(u) && (
                        <>
                          <div className="flex flex-col gap-0.5">
                            <select
                              value={u.effectiveTier ?? "member"}
                              onChange={(e) => handleTier(u, e.target.value)}
                              disabled={busyId === u.id || u.effectiveTier === "owner"}
                              className="text-xs border rounded-md px-2 py-1.5 bg-background disabled:opacity-50"
                              aria-label={`Tier for ${u.email}`}
                            >
                              {USER_ROLES.map((r) => (
                                <option key={r} value={r}>
                                  {ACCESS_LABELS[r]}
                                </option>
                              ))}
                            </select>
                            <span className="text-[10px] text-muted-foreground text-center">
                              Veer sparks: {TIER_SPARKS[u.effectiveTier ?? "member"]}
                            </span>
                          </div>
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
                        </>
                      )}
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
                              <p className="text-muted-foreground">Pro since</p>
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
