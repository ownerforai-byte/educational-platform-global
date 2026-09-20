"use client";

import { useEffect, useState } from "react";
import { Coins, Crown, TrendingUp, TrendingDown, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserCredits, getUserTransactions } from "@/lib/api/credits";
import type { UserCreditInfo, CreditTransaction } from "@/lib/api/credits";
import { hasFullAccess, isUserRole, type UserRole } from "@/lib/auth/roles";

export default function CreditsPage() {
  const [credits, setCredits] = useState<UserCreditInfo | null>(null);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [creditsData, txData] = await Promise.all([
          getUserCredits(),
          getUserTransactions(),
        ]);
        setCredits(creditsData);
        setTransactions(txData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load credits");
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!credits) {
    return (
      <div className="container max-w-4xl py-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Coins className="h-6 w-6 text-amber-500" />
            My Credits
          </h1>
          <p className="text-sm text-muted-foreground">
            Guest Student Plan &bull; 50 free credits allocated daily for AI learning.
          </p>
        </div>

        {/* 3 Metric Cards for Guests */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                <Coins className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Available Credits</p>
                <p className="text-3xl font-black text-amber-600 dark:text-amber-400">50</p>
                <p className="text-[11px] text-muted-foreground">Free Guest Balance</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Daily Reset</p>
                <p className="text-2xl font-bold text-foreground">Every 24h</p>
                <p className="text-[11px] text-muted-foreground">Automatic daily replenish</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Crown className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account Status</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">Guest</p>
                <p className="text-[11px] text-muted-foreground">Free Student Tier</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Usage Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-indigo-500" />
              Feature Credit Cost &amp; Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border/60 text-sm">
              <div className="flex items-center justify-between py-2.5">
                <div>
                  <p className="font-semibold text-foreground">Interactive Mindmaps &amp; KaTeX Formulas</p>
                  <p className="text-xs text-muted-foreground">Explore isolated science branches, sub-branches &amp; exam traps</p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-green-500/10 text-green-600 dark:text-green-400">
                  FREE / Unlimited
                </span>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <div>
                  <p className="font-semibold text-foreground">118-Element CEE Periodic Table</p>
                  <p className="text-xs text-muted-foreground">Atomic radii, electron affinities &amp; high-yield chemistry traps</p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-green-500/10 text-green-600 dark:text-green-400">
                  FREE / Unlimited
                </span>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <div>
                  <p className="font-semibold text-foreground">Visual Theorems &amp; Derivations</p>
                  <p className="text-xs text-muted-foreground">Class 11 &amp; 12 NEB calculus proofs &amp; mechanics derivations</p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-green-500/10 text-green-600 dark:text-green-400">
                  FREE / Unlimited
                </span>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <div>
                  <p className="font-semibold text-foreground">AI Tutor Instant Explanations</p>
                  <p className="text-xs text-muted-foreground">Step-by-step problem solver &amp; doubt clearing</p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  2 Credits / Query
                </span>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <div>
                  <p className="font-semibold text-foreground">CEE / IOE Mock Test Generation</p>
                  <p className="text-xs text-muted-foreground">Full timed test with negative marking analysis</p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  5 Credits / Test
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA to Sign In or Unlock Premium */}
        <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-background to-purple-500/10">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-foreground text-base">Want to sync credits across devices?</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Sign in or create a free student account to save quiz progress, bookmark mindmaps, and earn credit bonuses.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="/login"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-border/80 bg-card hover:bg-muted/40 transition-colors"
                >
                  Register
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isPremium = hasFullAccess(
    isUserRole(credits.role) ? (credits.role as UserRole) : null,
    credits.premiumStatus,
  );

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Coins className="h-6 w-6 text-amber-500" />
          My Credits
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your credits and premium status.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Coins className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available Credits</p>
              <p className="text-3xl font-bold text-amber-600">{credits.credits}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Credits Limit</p>
              <p className="text-3xl font-bold">{credits.creditsLimit}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Crown className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Premium Status</p>
              <p className={`text-xl font-bold ${isPremium ? "text-green-600" : "text-orange-600"}`}>
                {isPremium ? "Active" : "Free"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {credits.pendingRequests.length > 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
              <div>
                <p className="font-medium">Premium Request Pending</p>
                <p className="text-sm text-muted-foreground">
                  Your premium request is being reviewed by the owner.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!isPremium && (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Want Premium Access?</p>
                <p className="text-sm text-muted-foreground">
                  Contact the owner to get premium status and unlimited features.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No transactions yet.
            </p>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      tx.amount > 0
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-red-100 dark:bg-red-900/30"
                    }`}>
                      {tx.amount > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.reason || tx.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
