import type { Metadata } from "next";
import { NoAccountScreen } from "@/features/auth/components/account-screen-gate";

export const metadata: Metadata = {
  title: "No Active Account — Ravikisan's Platform",
  description:
    "There is no record of your active account -- so create one to get access.",
};

/**
 * HARDCODED screen 1 of 4 — NORMAL (no account on this device).
 * Visitors with no signup token / outcome land here when checking status.
 */
export default function NoAccountPage() {
  return <NoAccountScreen />;
}
