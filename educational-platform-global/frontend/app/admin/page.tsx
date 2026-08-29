"use client";

import { useEffect, useState } from "react";
import {
  Coins, Crown, Users, TrendingUp, TrendingDown,
  ShieldCheck, Plus, Minus, UserCheck, UserX, RefreshCw,
  Search, Filter, FileText, DollarSign, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAdminUsers,
  getAdminStats,
  adjustUserCredits,
  updateUserRole,
  getPremiumRequests,
  approvePremiumRequest,
  rejectPremiumRequest,
  getAdminTransactions,
} from "@/lib/api/credits";
import type { AdminUser, PremiumRequest, CreditTransaction } from "@/lib/api/credits";

type Tab = "users" | "premium" | "transactions" | "stats";

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<Tab>("users");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [premiumRequests, setPremiumRequests] = useState<PremiumRequest[]>([]);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [premiumFilter, setPremiumFilter] = useState<string>("all");

  // Adjust modal state
  const [adjustingUser, setAdjustingUser] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [adjustAmount, setAdjustAmount] = useState(0);
  const [adjustReason, setAdjustReason] = useState("");
  const [userTxHistory, setUserTxHistory] = useState<CreditTransaction[]>([]);
  const [showUserTx, setShowUserTx] = useState(false);

  // Bulk grant state
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [bulkAmount, setBulkAmount] = useState(0);
  const [bulkReason, setBulkReason] = useState("");

  useEffect(() => {
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    try {
      setError(null);
      const [usersData, statsData, requestsData, txData] = await Promise.all([
        getAdminUsers(),
        getAdminStats(),
        getPremiumRequests(),
        getAdminTransactions(1, 50),
      ]);
      setUsers(usersData);
      setStats(statsData);
      setPremiumRequests(requestsData);
      setTransactions(txData.transactions ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admin data");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = !searchQuery ||
      (u.fullName?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.email?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesPremium = premiumFilter === "all" ||
      (premiumFilter === "true" && u.premiumStatus) ||
      (premiumFilter === "false" && !u.premiumStatus);
    return matchesSearch && matchesRole && matchesPremium;
  });

  const handleAdjustCredits = async (userId: string) => {
    if (!adjustAmount) return;
    try {
      await adjustUserCredits(userId, adjustAmount, adjustReason || undefined);
      setAdjustingUser(null);
      setSelectedUser(null);
      setAdjustAmount(0);
      setAdjustReason("");
      setShowUserTx(false);
      setUserTxHistory([]);
      loadData();
    } catch {
      setError("Failed to adjust credits");
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      await updateUserRole(userId, newRole);
      loadData();
    } catch {
      setError("Failed to update role");
    }
  };

  const handleApprove = async (requestId: string) => {
    try {
      await approvePremiumRequest(requestId);
      loadData();
    } catch {
      setError("Failed to approve request");
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await rejectPremiumRequest(requestId);
      loadData();
    } catch {
      setError("Failed to reject request");
    }
  };

  const handleViewUserTx = async (userId: string) => {
    try {
      const details = await getAdminUserDetails(userId);
      setUserTxHistory(details.creditHistory ?? []);
      setShowUserTx(true);
    } catch {
      setError("Failed to load transaction history");
    }
  };

  const toggleUserSelection = (userId: string) => {
    const next = new Set(selectedUsers);
    if (next.has(userId)) next.delete(userId);
    else next.add(userId);
    setSelectedUsers(next);
  };

  const handleBulkGrant = async () => {
    if (selectedUsers.size === 0 || !bulkAmount) return;
    try {
      const resp = await fetch("/api/admin/users/bulk-credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userIds: Array.from(selectedUsers),
          amount: bulkAmount,
          reason: bulkReason || "Bulk grant by admin",
        }),
      });
      if (!resp.ok) throw new Error("Bulk grant failed");
      setSelectedUsers(new Set());
      setBulkAmount(0);
      setBulkReason("");
      setBulkMode(false);
      loadData();
    } catch {
      setError("Failed to grant bulk credits");
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-6xl py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Admin Panel
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage users, credits, premium requests, and system stats.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive flex items-center gap-2">
          <span>{error}</span>
          <Button variant="ghost" size="sm" onClick={() => setError(null)} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={loadData} className="h-6 w-6 p-0">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.totalUsers ?? 0}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Crown className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.premiumUsers ?? 0}</p>
                <p className="text-xs text-muted-foreground">Premium Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Coins className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.pendingPremiumRequests ?? 0}</p>
                <p className="text-xs text-muted-foreground">Pending Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.totalCreditsGranted ?? 0}</p>
                <p className="text-xs text-muted-foreground">Credits Granted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b overflow-x-auto">
        <Button
          variant={activeTab === "users" ? "default" : "ghost"}
          onClick={() => setActiveTab("users")}
          className="shrink-0"
        >
          <Users className="h-4 w-4 mr-2" />
          Users ({users.length})
        </Button>
        <Button
          variant={activeTab === "premium" ? "default" : "ghost"}
          onClick={() => setActiveTab("premium")}
          className="shrink-0"
        >
          <Crown className="h-4 w-4 mr-2" />
          Premium ({premiumRequests.filter(r => r.status === "PENDING").length})
        </Button>
        <Button
          variant={activeTab === "transactions" ? "default" : "ghost"}
          onClick={() => setActiveTab("transactions")}
          className="shrink-0"
        >
          <FileText className="h-4 w-4 mr-2" />
          Transactions
        </Button>
        <Button
          variant={activeTab === "stats" ? "default" : "ghost"}
          onClick={() => setActiveTab("stats")}
          className="shrink-0"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Statistics
        </Button>
      </div>

      {/* Users Tab */}
      {activeTab === "users" && (
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <CardTitle className="flex-1">User Management</CardTitle>
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-9 w-40"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm"
              >
                <option value="all">All Roles</option>
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Teacher</option>
                <option value="ADMIN">Admin</option>
                <option value="OWNER">Owner</option>
              </select>
              <select
                value={premiumFilter}
                onChange={(e) => setPremiumFilter(e.target.value)}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm"
              >
                <option value="all">All</option>
                <option value="true">Premium Only</option>
                <option value="false">Non-Premium</option>
              </select>
              <Button
                variant={bulkMode ? "default" : "outline"}
                size="sm"
                onClick={() => { setBulkMode(!bulkMode); setSelectedUsers(new Set()); }}
              >
                {bulkMode ? <X className="h-4 w-4 mr-1" /> : <Filter className="h-4 w-4 mr-1" />}
                {bulkMode ? "Cancel" : "Bulk Grant"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {bulkMode && (
              <div className="mb-4 p-4 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/30 space-y-3">
                <p className="text-sm font-medium">Bulk Credit Grant — {selectedUsers.size} users selected</p>
                <div className="flex gap-2 flex-wrap">
                  <Input
                    type="number"
                    placeholder="Credits per user"
                    value={bulkAmount || ""}
                    onChange={(e) => setBulkAmount(Number(e.target.value))}
                    className="w-36"
                  />
                  <Input
                    placeholder="Reason (optional)"
                    value={bulkReason}
                    onChange={(e) => setBulkReason(e.target.value)}
                    className="flex-1 min-w-0"
                  />
                  <Button onClick={handleBulkGrant} disabled={selectedUsers.size === 0 || !bulkAmount}>
                    <Plus className="h-4 w-4 mr-1" />
                    Grant to {selectedUsers.size}
                  </Button>
                </div>
              </div>
            )}

            {filteredUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                {users.length === 0 ? "No users yet." : "No users match your filters."}
              </p>
            ) : (
              <div className="space-y-3">
                {filteredUsers.map((u) => (
                  <div key={u.id} className="flex items-center justify-between p-4 border rounded-lg gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {bulkMode && (
                        <input
                          type="checkbox"
                          checked={selectedUsers.has(u.id)}
                          onChange={() => toggleUserSelection(u.id)}
                          className="h-4 w-4 rounded border-border"
                        />
                      )}
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                        u.premiumStatus ? "bg-purple-100 text-purple-600" :
                        u.role === "OWNER" ? "bg-amber-100 text-amber-600" :
                        u.role === "ADMIN" ? "bg-blue-100 text-blue-600" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {u.premiumStatus ? <Crown className="h-5 w-5" /> :
                         u.role === "OWNER" ? <ShieldCheck className="h-5 w-5" /> :
                         u.role === "ADMIN" ? <UserCheck className="h-5 w-5" /> :
                         <Users className="h-5 w-5" />}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{u.fullName || u.email}</p>
                        <p className="text-sm text-muted-foreground truncate">{u.email}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            u.role === "OWNER" ? "bg-amber-100 text-amber-700" :
                            u.role === "ADMIN" ? "bg-blue-100 text-blue-700" :
                            u.premiumStatus ? "bg-purple-100 text-purple-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {u.role} {u.premiumStatus && "✓ Premium"}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Coins className="h-3 w-3" />
                            {u.credits} credits
                          </span>
                          {u.pendingPremiumRequests > 0 && (
                            <span className="text-xs text-amber-600">
                              {u.pendingPremiumRequests} pending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewUserTx(u.id)}
                        title="View transactions"
                        className="h-8 w-8 p-0"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <select
                        value={u.role}
                        onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                        className="text-sm border rounded px-2 py-1 h-8"
                      >
                        <option value="STUDENT">Student</option>
                        <option value="TEACHER">Teacher</option>
                        <option value="ADMIN">Admin</option>
                        <option value="OWNER">Owner</option>
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { setAdjustingUser(u.id); setSelectedUser(u); setAdjustAmount(0); setAdjustReason(""); setShowUserTx(false); setUserTxHistory([]); }}
                        className="h-8"
                      >
                        <Coins className="h-4 w-4 mr-1" />
                        Adjust
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Adjust Credits Modal */}
      {adjustingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Adjust Credits</CardTitle>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => { setAdjustingUser(null); setSelectedUser(null); }}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedUser && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{selectedUser.fullName || selectedUser.email}</span>
                  <span className="ml-2">· {selectedUser.credits} current credits</span>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(Number(e.target.value))}
                  placeholder="e.g., 100 or -50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason (optional)</label>
                <Input
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="e.g., Bonus for participation"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => { setAdjustingUser(null); setSelectedUser(null); }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleAdjustCredits(adjustingUser)}
                  className="flex-1"
                >
                  {adjustAmount >= 0 ? <Plus className="h-4 w-4 mr-1" /> : <Minus className="h-4 w-4 mr-1" />}
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* User Transaction History Modal */}
      {showUserTx && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between shrink-0">
              <CardTitle className="text-base">
                Credit History — {selectedUser.fullName || selectedUser.email}
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowUserTx(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              {userTxHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No transactions yet.</p>
              ) : (
                <div className="space-y-2">
                  {userTxHistory.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <span className={`text-sm font-medium ${tx.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {tx.amount >= 0 ? "+" : ""}{tx.amount}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">{tx.type}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{tx.reason ?? "—"}</p>
                        <p className="text-[10px] text-muted-foreground/60">
                          {new Date(tx.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Premium Requests Tab */}
      {activeTab === "premium" && (
        <Card>
          <CardHeader>
            <CardTitle>Premium Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {premiumRequests.filter(r => r.status === "PENDING").length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No pending premium requests.
              </p>
            ) : (
              <div className="space-y-3">
                {premiumRequests.filter(r => r.status === "PENDING").map((req) => (
                  <div key={req.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium">
                          {req.profiles?.full_name || req.profiles?.email || req.user_id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {req.profiles?.email} · {req.profiles?.role} · {req.profiles?.credits} credits
                        </p>
                        {req.message && (
                          <p className="text-sm mt-2 text-muted-foreground">{req.message}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          Requested: {new Date(req.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(req.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(req.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <Card>
          <CardHeader>
            <CardTitle>Credit Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No transactions yet.</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-medium ${tx.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {tx.amount >= 0 ? "+" : ""}{tx.amount}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tx.type}</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {tx.reason ?? "—"}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {new Date(tx.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <Card>
          <CardHeader>
            <CardTitle>System Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats?.totalUsers ?? 0}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Premium Users</p>
                <p className="text-2xl font-bold text-purple-600">{stats?.premiumUsers ?? 0}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold text-amber-600">{stats?.pendingPremiumRequests ?? 0}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Credits Granted</p>
                <p className="text-2xl font-bold text-green-600">{stats?.totalCreditsGranted ?? 0}</p>
                <p className="text-xs text-muted-foreground">≈ {stats?.totalCreditAmountGranted?.toLocaleString() ?? 0} tokens</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Credits Spent</p>
                <p className="text-2xl font-bold text-red-600">{stats?.totalCreditsSpent ?? 0}</p>
                <p className="text-xs text-muted-foreground">≈ {stats?.totalCreditAmountSpent?.toLocaleString() ?? 0} tokens</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Net Credits in Circulation</p>
                <p className="text-2xl font-bold text-blue-600">{(stats?.netCreditsIncirculation ?? 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
