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
  revokeAllOwnerAccess,
} from "@/lib/api/owner";
import type { OwnerUser, OwnerUserDetail } from "@/lib/api/owner";
import { useOwnerUserDirectory } from "@/lib/hooks/use-owner-user-directory";
import {
  downloadTextFile,
  isOwnerUser,
  ownerUsersToCsv,
  partitionOwnerSystems,
  GRANTABLE_TIERS,
  type GrantableTier,
  type OwnerSystem,
  type UserTierFilter,
  type UserSortKey,
} from "@/lib/owner/user-directory";
import { cn } from "@/lib/utils";
import { type UserRole } from "@/lib/auth/roles";
import { ACCESS_LABELS, type AccessLevel } from "@/lib/access-level";
import { aiSparkLimitLabel, type AiSparkTier } from "@/features/ai/ai-spark-tiers";
import { OWNER_EMAIL } from "@/lib/owner";

const CREDIT_PRESETS = [50, 100, 250, 500] as const;

/** Live plan label from profiles.plan (legacy plus_20 → Plus). */
function livePlanLabel(plan: string | null | undefined): string {
  const raw = (plan ?? "member").toLowerCase();
  if (raw === "plus" || raw === "plus_20") return "Plus";
  if (raw === "pro") return "Pro";
  if (raw === "owner") return "Owner";
  return "Member";
}

/** Prefer API sparkLimit; fall back to the live tier table. */
function liveSparkLabel(u: {
  sparkLimit?: number | null;
  effectiveTier?: AccessLevel | null;
}): string {
  if (u.sparkLimit === null) return "Unlimited / day";
  if (typeof u.sparkLimit === "number" && Number.isFinite(u.sparkLimit)) {
    return `${u.sparkLimit} / day`;
  }
  const tier = (u.effectiveTier ?? "member") as AiSparkTier;
  const label = aiSparkLimitLabel(tier);
  return label === "Unlimited" ? "Unlimited / day" : `${label} / day`;
}

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
  REJECTED: { label: "DENIED", className: "bg-red-500/15 text-red-600 border-red-500/30" },
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

  // Pending = waiting for your decision. Members = already decided (live DB).
  const [system, setSystem] = useState<OwnerSystem>("review");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);
  const [bulkTier, setBulkTier] = useState<GrantableTier>("plus");
  const [approvalTier, setApprovalTier] = useState<GrantableTier>("member");
  const [revokeBusy, setRevokeBusy] = useState(false);
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

  const selectedSystemIds = useMemo(
    () => systemUsers.filter((user) => selected.has(user.id)).map((user) => user.id),
    [systemUsers, selected],
  );
  const updateFilters = useCallback((patch: Parameters<typeof patchFilters>[0]) => {
    setSelected(new Set());
    patchFilters(patch);
  }, [patchFilters, setSelected]);

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

  const handleTier = async (u: OwnerUser, tier: UserRole) => {
    setBusyId(u.id);
    const ok = await runAction(() => updateOwnerUserRole(u.id, tier), "Tier updated");
    setBusyId(null);
    if (ok) reload();
  };

  const handleAccess = async (u: OwnerUser, status: "ACTIVE" | "REJECTED") => {
    // Approving a PENDING account grants the chosen tier in the same call.
    // Re-granting a REJECTED account only restores access — its tier stays.
    const approving = status === "ACTIVE" && (u.access_status ?? "ACTIVE") === "PENDING";
    setBusyId(u.id);
    const ok = await runAction(
      () =>
        setOwnerUserAccessStatus(u.id, status, approving ? approvalTier : undefined),
      status === "REJECTED"
        ? "Access revoked"
        : approving
          ? `Access granted at ${ACCESS_LABELS[approvalTier]}`
          : "Access granted",
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
    // The approval tier applies only while working Review. The same buttons
    // exist in Approved, where they must never rewrite an existing tier.
    const approves = status === "ACTIVE" && system === "review";
    const confirmText =
      status === "ACTIVE"
        ? approves
          ? `Approve ${ids.length} selected account(s) at ${ACCESS_LABELS[approvalTier]}?`
          : `Grant access to ${ids.length} selected account(s)?`
        : `Revoke access for ${ids.length} selected account(s)?`;
    if (!window.confirm(confirmText)) return;
    setBulkBusy(true);
    try {
      const res = await bulkOwnerUserAccessStatus(
        ids,
        status,
        approves ? approvalTier : undefined,
      );
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
          ? "No pending accounts in this view."
          : "No pending accounts to approve.",
      );
      return;
    }
    if (
      !window.confirm(
        `Approve all ${visiblePendingIds.length} pending accounts at ${ACCESS_LABELS[approvalTier]}?`,
      )
    ) {
      return;
    }
    setBulkBusy(true);
    try {
      const res = await bulkOwnerUserAccessStatus(visiblePendingIds, "ACTIVE", approvalTier);
      toast.success(
        `Approved ${res.applied.length} pending account(s) at ${ACCESS_LABELS[approvalTier]}`,
      );
      reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Bulk approve failed");
    } finally {
      setBulkBusy(false);
    }
  };

  const revokeEveryoneExceptOwner = async () => {
    if (
      !window.confirm(
        `Revoke LIVE access for every account except ${OWNER_EMAIL}?\n\n` +
          "Approved members lose access immediately. Pending signups stay pending.",
      )
    ) {
      return;
    }
    setRevokeBusy(true);
    try {
      const res = await revokeAllOwnerAccess();
      toast.success(`Revoked ${res.revoked} account(s). Only ${OWNER_EMAIL} kept access.`);
      setSelected(new Set());
      reload();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Revoke-all failed");
    } finally {
      setRevokeBusy(false);
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
            Approvals
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Approve pending signups or manage live members. Access lives in the database.
            You can set another email’s tier to Owner so they work as owner;
            the root address {OWNER_EMAIL} cannot be revoked or deleted.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={revokeEveryoneExceptOwner}
            disabled={isLoading || revokeBusy || bulkBusy}
          >
            <AlertTriangle className="h-4 w-4 mr-1" />
            {revokeBusy ? "Revoking…" : "Revoke all except owner"}
          </Button>
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        <StatChip label="Total" value={stats.total} />
        <StatChip
          label="Pending"
          value={stats.pending}
          accent="text-amber-600"
          active={system === "review"}
          onClick={() => switchSystem("review")}
        />
        <StatChip
          label="Live access"
          value={stats.active}
          accent="text-emerald-600"
          active={system === "approved"}
          onClick={() => switchSystem("approved")}
        />
        <StatChip label="Denied" value={stats.rejected} accent="text-red-600" />
        <StatChip label="Showing" value={systemUsers.length} />
      </div>

      <div className="flex gap-2" role="tablist" aria-label="Approval queues">
        <Button
          role="tab"
          aria-selected={system === "review"}
          variant={system === "review" ? "default" : "outline"}
          size="sm"
          onClick={() => switchSystem("review")}
        >
          <Clock className="h-4 w-4 mr-1" />
          Pending ({stats.pending})
        </Button>
        <Button
          role="tab"
          aria-selected={system === "approved"}
          variant={system === "approved" ? "default" : "outline"}
          size="sm"
          onClick={() => switchSystem("approved")}
        >
          <Users className="h-4 w-4 mr-1" />
          Members ({stats.active + stats.rejected})
        </Button>
        <span className="ml-auto self-center text-xs text-muted-foreground">
          Owner: {OWNER_EMAIL}
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
            {GRANTABLE_TIERS.map((r) => (
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
          {/* Approval tier — the rung granted by every approve action below. */}
          {system === "review" && (
            <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="whitespace-nowrap font-medium">Approval tier</span>
              <select
                value={approvalTier}
                onChange={(e) =>
                  setApprovalTier(e.target.value as GrantableTier)
                }
                disabled={bulkBusy}
                className="text-xs border rounded-md px-2 py-1.5 bg-background"
                aria-label="Tier granted when approving"
              >
                {GRANTABLE_TIERS.map((role) => (
                  <option key={role} value={role}>
                    {ACCESS_LABELS[role]} · {aiSparkLimitLabel(role)} Veer sparks / day
                  </option>
                ))}
              </select>
            </label>
          )}
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
                    onChange={(e) => setBulkTier(e.target.value as GrantableTier)}
                    disabled={bulkBusy}
                    className="text-sm border rounded-md px-2 py-1.5 bg-background"
                    aria-label="Set selected accounts tier"
                  >
                    {GRANTABLE_TIERS.map((role) => (
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
            <strong>{stats.pending}</strong> account(s) awaiting approval — open Pending.
          </span>
          <Button size="sm" variant="outline" className="ml-auto" onClick={() => switchSystem("review")}>
            Open Pending
          </Button>
        </div>
      )}

      {system === "approved" && ownerRoster.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Root owner · {OWNER_EMAIL} (cannot revoke or delete)
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
            {system === "review" ? "Pending — await your approval" : "Members — live access in the database"}
          </CardTitle>
          <span className="text-xs text-muted-foreground">Live from Supabase · one API load</span>
        </CardHeader>
        <CardContent>
          {isLoading && systemUsers.length === 0 ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : systemUsers.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              {/* A filtered-out queue must say so — an empty Review that hides
                  pending accounts reads as "nothing to approve". */}
              <p className="text-sm text-muted-foreground">
                {system === "review"
                  ? stats.pending > 0
                    ? `${stats.pending} account(s) are awaiting approval but hidden by the current filters.`
                    : "No pending accounts to review. Owners never appear here."
                  : stats.active + stats.rejected > 0
                    ? "No decided accounts match these filters."
                    : "No approved accounts yet."}
              </p>
              {((system === "review" && stats.pending > 0) ||
                (system === "approved" && stats.active + stats.rejected > 0)) && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateFilters({ query: "", tier: "all" })}
                >
                  Clear filters
                </Button>
              )}
            </div>
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
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-border/60 bg-muted/40 text-muted-foreground">
                            Plan · {livePlanLabel(u.plan)}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-primary/20 bg-primary/5 text-primary">
                            Sparks · {liveSparkLabel(u)}
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
                            title={`Approve and grant ${ACCESS_LABELS[approvalTier]} access`}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            Approve · {ACCESS_LABELS[approvalTier]}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={busyId === u.id}
                            onClick={() => handleAccess(u, "REJECTED")}
                            className="text-red-600 hover:text-red-700 hover:bg-red-500/10 border-red-500/30"
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            Deny
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
                              onChange={(e) =>
                                handleTier(u, e.target.value as GrantableTier)
                              }
                              disabled={busyId === u.id}
                              className="text-xs border rounded-md px-2 py-1.5 bg-background disabled:opacity-50"
                              aria-label={`Tier for ${u.email}`}
                            >
                              {GRANTABLE_TIERS.map((r) => (
                                <option key={r} value={r}>
                                  {ACCESS_LABELS[r]}
                                </option>
                              ))}
                            </select>
                            <span className="text-[10px] text-muted-foreground text-center">
                              Plan {livePlanLabel(u.plan)} · Sparks {liveSparkLabel(u)}
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
                              <p className="text-muted-foreground">Live plan</p>
                              <p className="mt-0.5">{livePlanLabel(detail.profile.plan ?? u.plan)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Live spark limit</p>
                              <p className="mt-0.5">
                                {liveSparkLabel({
                                  sparkLimit: detail.profile.sparkLimit ?? u.sparkLimit,
                                  effectiveTier: detail.profile.effectiveTier ?? u.effectiveTier,
                                })}
                              </p>
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
