import type { Metadata } from "next";
import { WelcomeStatus } from "@/features/auth/components/welcome-status";
import { WelcomeApprovalScreen } from "@/features/auth/components/account-screen-gate";

export const metadata: Metadata = {
  title: "Account Status — Ravikisan's Platform",
  description:
    "After signing, the account is approved by the system verification and administrative approval.",
};

/**
 * HARDCODED screen 2 of 4 — WAITING (PENDING).
 * Only devices with a signup token and a non-terminal outcome land here.
 * Live poll may move the device to /welcome/approved or /welcome/denied.
 */
export default function WelcomePendingPage() {
  return <WelcomeApprovalScreen waiting={<WelcomeStatus />} />;
}
