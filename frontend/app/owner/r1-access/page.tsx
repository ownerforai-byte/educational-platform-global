"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Plus, RotateCcw, X } from "lucide-react";
import {
  getOwnerR1Grants,
  grantR1Access,
  revokeR1Access,
  type OwnerR1Grant,
} from "@/lib/api/owner";

/**
 * Owner console — R1 grants. Grant any email access to the R1 daily-life layer
 * (works before signup; revoking takes effect on the next request).
 */
export default function OwnerR1AccessPage() {
  const [grants, setGrants] = useState<OwnerR1Grant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await getOwnerR1Grants();
      setGrants(res.grants);
      setError(null);
    } catch {
      setError("Failed to load R1 grants");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const grant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      await grantR1Access(email.trim(), note.trim() || undefined);
      setResult(`Granted R1 access to ${email.trim()}`);
      setEmail("");
      setNote("");
      await load();
    } catch {
      setError("Failed to grant access — check the email format and try again");
    } finally {
      setBusy(false);
    }
  };

  const revoke = async (id: string) => {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      await revokeR1Access(id);
      setResult("Grant revoked");
      await load();
    } catch {
      setError("Failed to revoke grant");
    } finally {
      setBusy(false);
    }
  };

  const regrant = async (g: OwnerR1Grant) => {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      await grantR1Access(g.email, g.note ?? undefined);
      setResult(`Re-granted R1 access to ${g.email}`);
      await load();
    } catch {
      setError("Failed to re-grant access");
    } finally {
      setBusy(false);
    }
  };

  const active = grants.filter((g) => !g.revokedAt);
  const revoked = grants.filter((g) => g.revokedAt);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-bold tracking-tight">R1 Access</h1>
        <p className="text-sm text-muted-foreground">
          Grant owner-level R1 access (daily life: activities, plans, journal, habits) to any
          email. Grants work before signup and can be revoked anytime.
        </p>
      </header>

      <form
        onSubmit={grant}
        className="flex flex-wrap items-end gap-3 rounded-2xl border border-border/60 bg-card p-4"
      >
        <label className="text-xs text-muted-foreground">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="person@example.com"
            className="mt-1 block w-64 rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            required
          />
        </label>
        <label className="text-xs text-muted-foreground">
          Note (optional)
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Why / who"
            className="mt-1 block w-56 rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            maxLength={200}
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> Grant
        </button>
      </form>

      {error && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      {result && (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-600">
          {result}
        </p>
      )}

      <section>
        <h2 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Active grants ({active.length})
        </h2>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : active.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active grants yet.</p>
        ) : (
          <ul className="space-y-2">
            {active.map((g) => (
              <li
                key={g.id}
                className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3.5"
              >
                <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{g.email}</div>
                  {g.note && <div className="text-xs text-muted-foreground">{g.note}</div>}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(g.createdAt).toLocaleDateString()}
                </span>
                <button
                  type="button"
                  onClick={() => revoke(g.id)}
                  disabled={busy}
                  className="inline-flex items-center gap-1 rounded-lg border border-destructive/30 px-2.5 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
                >
                  <X className="h-3.5 w-3.5" /> Revoke
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {revoked.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Revoked ({revoked.length})
          </h2>
          <ul className="space-y-2">
            {revoked.map((g) => (
              <li
                key={g.id}
                className="flex items-center gap-3 rounded-2xl border border-border/40 bg-card/60 p-3.5 opacity-70"
              >
                <X className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{g.email}</div>
                  {g.note && <div className="text-xs text-muted-foreground">{g.note}</div>}
                </div>
                <button
                  type="button"
                  onClick={() => regrant(g)}
                  disabled={busy}
                  className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60 disabled:opacity-60"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Re-grant
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
