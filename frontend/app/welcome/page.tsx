import type { Metadata } from "next";
import { ApprovalDispatch } from "@/features/auth/components/approval-dispatch";

export const metadata: Metadata = {
  title: "Account Status — Ravikisan's Platform",
  description:
    "Opens the correct account status screen for this device — normal, pending, approved, or denied.",
};

/**
 * Dispatcher only. The four content screens are:
 *   /welcome/no-account  (normal)
 *   /welcome/pending     (waiting)
 *   /welcome/approved
 *   /welcome/denied
 */
export default function WelcomeDispatchPage() {
  return <ApprovalDispatch />;
}
