"use client";

import { useState } from "react";
import { Check, Gift, Link2 } from "lucide-react";
import { ComingSoon } from "@/components/content/coming-soon";

/**
 * /referrals — copy the app link to share (owner: "in it add copy link of
 * app"); reward tracking is still to come.
 */
export function ReferralsView() {
  const [copied, setCopied] = useState(false);

  const copyAppLink = async () => {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable — the link is still visible in the address bar. */
    }
  };

  return (
    <div className="container max-w-3xl py-8 space-y-4">
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Gift className="h-6 w-6" /> Referrals
      </h1>

      <button
        type="button"
        onClick={copyAppLink}
        className="inline-flex min-h-11 items-center gap-2 rounded-2xl border-2 border-border/80 bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-500" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
        {copied ? "App link copied!" : "Copy app link"}
      </button>

      <ComingSoon
        title="Referral and reward tracking"
        kind="Notes"
        message="Invite links, referred students and spark rewards will be tracked here once the referral data source is built. Nothing is recorded yet."
        backHref="/credits"
        backLabel="My Sparks"
      />
    </div>
  );
}
