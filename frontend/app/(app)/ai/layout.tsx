"use client";

/**
 * Veer Studio layout (/ai and every tab below it).
 *
 * Access policy (owner 2026-10-13, superseding the 2026-10-05 owner-only
 * gate): Veer chat is open to signed-in tiers and metered by AI sparks —
 * member 13/day, plus 25/day, pro 50/day, owner unlimited; guests get the
 * home guide widget only (frontend/lib/ai/ai-spark-tiers.ts mirrors backend
 * utils/aiSpark.ts). The daily allowance — not an allowlist — decides how
 * much anyone chats.
 */
export default function AiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
