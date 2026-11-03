"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Receipt as ReceiptIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ComingSoon } from "@/components/content/coming-soon";
import { getUserCredits, getUserTransactions } from "@/lib/api/credits";
import type { CreditTransaction, UserCreditInfo } from "@/lib/api/credits";
import { buildReceipts, summarizeLedger } from "@/lib/billing";

/** /billing: spark balance, plan status and receipt history from lib/api/credits. */
export function BillingView() {
  const [info, setInfo] = useState<UserCreditInfo | null>(null);
  const [txs, setTxs] = useState<CreditTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getUserCredits(), getUserTransactions()])
      .then(([i, t]) => {
        setInfo(i);
        setTxs(t);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load billing"))
      .finally(() => setLoading(false));
  }, []);

  const receipts = buildReceipts(txs);
  const sum = summarizeLedger(receipts);

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <ReceiptIcon className="h-6 w-6" /> Billing
        </h1>
        <p className="text-sm text-muted-foreground">
          Your spark balance, plan status and receipt history. See <Link href="/credits" className="underline">My Sparks</Link>{" "}
          and <Link href="/plans" className="underline">Plans</Link> for how sparks and tiers work.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
      )}

      {loading ? (
        <Skeleton className="h-32" />
      ) : (
        info && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardDescription>Content sparks</CardDescription>
                <CardTitle className="text-3xl">{info.credits}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Plan</CardDescription>
                <CardTitle className="text-xl">{info.premiumStatus ? "Premium" : "Standard"}</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                {info.pendingRequests.length > 0
                  ? `${info.pendingRequests.length} premium request pending`
                  : info.premiumApprovedAt
                    ? `Approved ${new Date(info.premiumApprovedAt).toLocaleDateString()}`
                    : "No premium request open"}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Ledger</CardDescription>
                <CardTitle className="text-xl">
                  +{sum.granted} / -{sum.spent}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">{sum.count} entries</CardContent>
            </Card>
          </div>
        )
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Receipt history</CardTitle>
          <CardDescription>Every spark grant, unlock and adjustment on your account, newest first.</CardDescription>
        </CardHeader>
        <CardContent>
          {receipts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No receipts yet.</p>
          ) : (
            <ul className="divide-y text-sm">
              {receipts.map((r) => (
                <li key={r.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">{r.label}</p>
                    <p className="text-xs text-muted-foreground">{new Date(r.date).toLocaleString()}</p>
                  </div>
                  <span className={r.kind === "SPEND" ? "font-bold text-destructive" : "font-bold text-green-600"}>
                    {r.kind === "SPEND" ? "-" : "+"}
                    {Math.abs(r.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <ComingSoon
        title="Online payments"
        kind="Notes"
        message="Subscription and spark purchases by card or wallet are not available yet. Premium is granted after owner approval; payment invoices appear here once a payment provider is connected."
        backHref="/plans"
        backLabel="Plans"
      />
    </div>
  );
}
