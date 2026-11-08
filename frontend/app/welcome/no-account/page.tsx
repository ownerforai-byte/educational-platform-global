import type { Metadata } from "next";
import { NoAccountScreen } from "@/features/auth/components/account-screen-gate";

export const metadata: Metadata = {
  title: "No Active Account — Ravikisan's Platform",
  description:
    "There is no record of your active account -- so create one to get access.",
};

/**
 * Owner request 2026-11-08: the SECOND approval-status screen.
 *
 * A visitor who has NOT created an account but follows "Already created an
 * account? Check your approval status" lands here. The hardcoded
 * pending-signup identity decides between this page and the waiting page at
 * /welcome; both gates use the same identifier, so a refresh or a direct URL
 * visit always converges on the correct screen.
 */
export default function NoAccountPage() {
  return <NoAccountScreen />;
}
