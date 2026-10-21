"use client";

/**
 * Veer chat rooms layout (/chat, /chat/nepali, /chat/grammar).
 *
 * Access policy (owner 2026-10-13, superseding the 2026-10-05 owner-only
 * gate): chat is OPEN to every tier and metered by AI sparks — guest 3/day,
 * member 7/day, plus 25/day, pro 50/day, owner unlimited
 * (frontend/lib/ai/ai-spark-tiers.ts mirrors backend utils/aiSpark.ts).
 */
export default function ChatRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
