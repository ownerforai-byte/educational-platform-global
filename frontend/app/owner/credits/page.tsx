"use client";

import { useCallback, useEffect, useState } from "react";
import { Coins, Users, RefreshCw, AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  bulkOwnerCredits,
  creditEveryone,
  getOwnerActivity,
  getOwnerUsers,
  type OwnerActivity,
  type OwnerUser,
} from "@/lib/api/owner";

interface GrantLine {
  email: string;
  amount: number;
  raw: string;
}

/** Parse "user@gmail.com, 120" / "user@gmail.com 120" / "user@gmail.com" (uses default). */
function parseLines(text: string, defaultAmount: number): { grants: GrantLine[]; invalid: string[] } {
  const grants: GrantLine[] = [];
  const invalid: string[] = [];
  for (const rawLine of text.split("\n")) {
    const raw = rawLine.trim();
    if (!raw) continue;
    const m = raw.match(/^([^,\s]+@[^,\s]+)[\s,]+(-?\d+)$/);
    if (m) {
      grants.push({ email: m[1].toLowerCase(), amount: parseInt(m[2], 10), raw });
      continue;
    }
    if (/^[^,\s]+@[^,\s]+$/.test(raw)) {
      grants.push({ email: raw.toLowerCase(), amount: defaultAmount, raw });
      continue;
    }
    invalid.push(raw);
  }
  return { grants, invalid };
}

export default function OwnerCreditsPage() {
  const [users, setUsers] = useState<OwnerUser[]>([]);
  const [activity, setActivity] = useState<OwnerActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [bulkText, setBulkText] = useState("");
  const [defaultAmount, setDefaultAmount] = useState(100);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState<"bulk" | "everyone" | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [everyoneAmount, setEveryoneAmount] = useState(50);
  const [everyoneReason, setEveryoneReason] = useState("");

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [u, a] = await Promise.all([getOwnerUsers(), getOwnerActivity()]);
      setUsers(u);
      setActivity(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const parsed = parseLines(bulkText, defaultAmount);
  const totalOut = parsed.grants.reduce((s, g) => s + Math.max(0, g.amount), 0);
  const knownEmails = new Set(users.map((u) => u.email.toLowerCase()));
  const unknownCount = parsed.grants.filter((g) => !knownEmails.has(g.email)).length;

  const runBulk = async () => {
    if (!parsed.grants.length) return;
    setBusy("bulk");
    setError(null);
    setResult(null);
    try {
      const res = await bulkOwnerCredits(
        parsed.grants.map(({ email, amount }) => ({ email, amount })),
        reason || undefined
      );
      const parts = [`${res.applied.length} user(s) updated`];
      if (res.notFound.length) parts.push(`${res.notFound.length} not found: ${res.notFound.slice(0, 3).join(", ")}${res.notFound.length > 3 ? "…" : ""}`);
      setResult(parts.join(" · "));
      setBulkText("");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bulk grant failed");
    } finally {
      setBusy(null);
    }
  };

  const runEveryone = async () => {
    if (!everyoneAmount) return;
    if (!window.confirm(`Grant ${everyoneAmount >= 0 ? "+" : ""}${everyoneAmount} credits to ALL ${users.length} users?`)) return;
    setBusy("everyone");
    setError(null);
    setResult(null);
    try {
      const res = await creditEveryone(everyoneAmount, everyoneReason || undefined);
      setResult(`Granted to ${res.applied}/${res.total} users`);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Grant failed");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Coins className="h-6 w-6 text-amber-500" />
            Credit Division
          </h1>
          <p className="text-sm text-muted-foreground">
            Divide credits across individual Gmails, or grant everyone at once.
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
      {result && (
        <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-600 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {result}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bulk division by Gmail */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Coins className="h-4 w-4 text-amber-500" />
              Divide by Gmail
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              One per line: <code className="font-mono">user@gmail.com, 120</code> — or just the email
              (uses the default amount below).
            </p>
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              rows={8}
              placeholder={"ramesh@gmail.com, 500\nsita@gmail.com, 250\nhari@gmail.com"}
              className="w-full rounded-xl border border-border/80 bg-card p-3 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Default amount</span>
              <Input
                type="number"
                value={defaultAmount}
                onChange={(e) => setDefaultAmount(Number(e.target.value))}
                className="w-28 font-mono"
              />
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason (optional)"
                className="flex-1"
              />
            </div>

            <div className="rounded-lg bg-muted/40 px-3 py-2 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Parsed grants</span>
                <span className="font-mono font-semibold">{parsed.grants.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total credits out</span>
                <span className="font-mono font-semibold text-amber-600">{totalOut}</span>
              </div>
              {unknownCount > 0 && (
                <div className="flex justify-between text-amber-600">
                  <span>Unknown Gmails (will be reported)</span>
                  <span className="font-mono font-semibold">{unknownCount}</span>
                </div>
              )}
              {parsed.invalid.length > 0 && (
                <div className="flex items-start gap-1.5 text-destructive">
                  <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span>Unparseable: {parsed.invalid.slice(0, 3).join(" | ")}</span>
                </div>
              )}
            </div>

            <Button
              className="w-full"
              disabled={!parsed.grants.length || busy !== null}
              onClick={runBulk}
            >
              {busy === "bulk" ? "Applying…" : `Apply to ${parsed.grants.length} user(s)`}
            </Button>
          </CardContent>
        </Card>

        {/* Grant everyone + snapshot */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Grant Everyone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={everyoneAmount}
                  onChange={(e) => setEveryoneAmount(Number(e.target.value))}
                  className="w-32 font-mono"
                />
                <span className="text-xs text-muted-foreground">
                  credits × {users.length} users ={" "}
                  <strong className="font-mono text-amber-600">
                    {everyoneAmount * users.length}
                  </strong>
                </span>
              </div>
              <Input
                value={everyoneReason}
                onChange={(e) => setEveryoneReason(e.target.value)}
                placeholder="Reason (optional)"
              />
              <Button
                variant="default"
                className={`w-full ${everyoneAmount < 0 ? "bg-red-600 hover:bg-red-700 text-white" : ""}`}
                disabled={busy !== null || users.length === 0}
                onClick={runEveryone}
              >
                <Sparkles className="h-4 w-4 mr-1.5" />
                {busy === "everyone"
                  ? "Granting…"
                  : `Grant ${everyoneAmount >= 0 ? "+" : ""}${everyoneAmount} to everyone`}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Credit Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-10" />
                  ))}
                </div>
              ) : activity.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">No credit activity yet.</p>
              ) : (
                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {activity.slice(0, 20).map((t) => (
                    <div key={t.id} className="flex items-center justify-between text-xs rounded-md border border-border/50 px-2.5 py-1.5">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{t.userEmail ?? t.user_id.slice(0, 8)}</p>
                        <p className="truncate text-muted-foreground text-[11px]">
                          {t.reason || t.type} · {new Date(t.created_at).toLocaleString()}
                        </p>
                      </div>
                      <span className={`font-mono font-bold ml-2 shrink-0 ${t.amount >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                        {t.amount >= 0 ? "+" : ""}
                        {t.amount}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
