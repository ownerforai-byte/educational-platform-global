import type { Metadata } from "next";
import { DeniedScreen } from "@/features/auth/components/account-screen-gate";

export const metadata: Metadata = {
  title: "Access denied — Ravikisan's Platform",
  description:
    "This signup wasn't approved — you can create a new account or continue as a guest.",
};

/**
 * Screen 4 of 4 — DENIED (live access_status REJECTED).
 * After denial the device may create a new account.
 */
export default function WelcomeDeniedPage() {
  return <DeniedScreen />;
}
