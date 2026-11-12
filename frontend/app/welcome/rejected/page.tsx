import type { Metadata } from "next";
import { RejectedScreen } from "@/features/auth/components/account-screen-gate";

export const metadata: Metadata = {
  title: "Account Not Approved — Ravikisan's Platform",
  description:
    "This device's account was not granted access. Continue as a guest or create a new account.",
};

/**
 * HARDCODED screen 4 of 4 — REJECTED.
 * Shown only when this device's last live access outcome is REJECTED.
 * "Continue to the app" opens normal guest browsing; status checks still
 * return here until a new signup overwrites the outcome.
 */
export default function WelcomeRejectedPage() {
  return <RejectedScreen />;
}
