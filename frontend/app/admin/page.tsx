"use client";

import { useEffect, useState } from "react";
import {
  Coins, Crown, Users, TrendingUp, TrendingDown,
  ShieldCheck, Plus, Minus, UserCheck, UserX, RefreshCw
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
} from "@/lib/api/credits";
import type { AdminUser, PremiumRequest } from "@/lib/api/credits";

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<"users" | "premium" | "stats">("users");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [premiumRequests, setPremiumRequests] = useState<PremiumRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adjustingUser, setAdjustingUser] = useState<string | null>(null);
  const [adjustAmount, setAdjustAmount] = useState(0);
  const [adjustReason, setAdjustReason] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersData, statsData, requestsData] = await Promise.all([
        getAdminUsers(),
        getAdminStats(),
        getPremiumRequests(),
      ]);
      setUsers(usersData);
      setStats(statsData);
      setPremiumRequests(requestsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admin data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdjustCredits = async (userId: string) => {
    if (!adjustAmount) return;
    try {
      await adjustUserCredits(userId, adjustAmount, adjustReason || undefined);
      setAdjustingUser(null);
      setAdjustAmount(0);
      setAdjustReason("");
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
          Manage users, credits, and premium requests.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive flex items-center gap-2">
          <span>{error}</span>
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
      <div className="flex gap-2 border-b">
        <Button
          variant={activeTab === "users" ? "default" : "ghost"}
          onClick={() => setActiveTab("users")}
        >
          <Users className="h-4 w-4 mr-2" />
          Users ({users.length})
        </Button>
        <Button
          variant={activeTab === "premium" ? "default" : "ghost"}
          onClick={() => setActiveTab("premium")}
        >
          <Crown className="h-4 w-4 mr-2" />
          Premium Requests ({premiumRequests.filter(r => r.status === "PENDING").length})
        </Button>
        <Button
          variant={activeTab === "stats" ? "default" : "ghost"}
          onClick={() => setActiveTab("stats")}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Statistics
        </Button>
      </div>

      {/* Users Tab */}
      {activeTab === "users" && (
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No users yet.
              </p>
            ) : (
              <div className="space-y-3">
                {users.map((u) => (
                  <div key={u.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
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
                      <div>
                        <p className="font-medium">{u.fullName || u.email}</p>
                        <p className="text-sm text-muted-foreground">{u.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            u.role === "OWNER" ? "bg-amber-100 text-amber-700" :
                            u.role === "ADMIN" ? "bg-blue-100 text-blue-700" :
                            u.premiumStatus ? "bg-purple-100 text-purple-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {u.role} {u.premiumStatus && "✓ Premium"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {u.credits} credits
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={u.role}
                        onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                        className="text-sm border rounded px-2 py-1"
                      >
                        <option value="STUDENT">Student</option>
                        <option value="TEACHER">Teacher</option>
                        <option value="ADMIN">Admin</option>
                        <option value="OWNER">Owner</option>
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAdjustingUser(u.id)}
                      >
                        <Coins className="h-4 w-4 mr-1" />
                        Adjust Credits
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-sm m-4">
            <CardHeader>
              <CardTitle>Adjust Credits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  onClick={() => setAdjustingUser(null)}
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
                    <div className="flex items-start justify-between">
                      <div>
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
                      <div className="flex gap-2">
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

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <Card>
          <CardHeader>
            <CardTitle>System Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Credits Granted</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats?.totalCreditsGranted ?? 0}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Credits Spent</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats?.totalCreditsSpent ?? 0}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Premium Users</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats?.premiumUsers ?? 0}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold text-amber-600">
                  {stats?.pendingPremiumRequests ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
