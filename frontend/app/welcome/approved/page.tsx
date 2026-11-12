import type { Metadata } from "next";
import { ApprovedScreen } from "@/features/auth/components/account-screen-gate";

export const metadata: Metadata = {
  title: "Access Granted — Ravikisan's Platform",
  description:
    "Sign in to open the study library.",
};

/**
 * HARDCODED screen 3 of 4 — APPROVED.
 * Shown only when this device's last live access outcome is ACTIVE.
 */
export default function WelcomeApprovedPage() {
  return <ApprovedScreen />;
}
