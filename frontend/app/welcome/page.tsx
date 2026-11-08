import type { Metadata } from "next";
import { WelcomeStatus } from "@/features/auth/components/welcome-status";
import { WelcomeApprovalScreen } from "@/features/auth/components/account-screen-gate";

export const metadata: Metadata = {
  title: "Account Status — Ravikisan's Platform",
  description:
    "Your account was created and is awaiting approval — sign in after administrative and system approval.",
};

/**
 * Post-signup status screen (owner-approval flow).
 *
 * Owner request 2026-11-08: "your account is on its way ... this page is only
 * for them who has created account and waiting for approval". The screen is
 * therefore gated by the hardcoded pending-signup identity: a browser with no
 * account record is sent to /welcome/no-account instead, which says
 * "There is no record of your active account -- so create one to get access".
 *
 * Exactly one auth-related interface is visible at a time:
 *   - no account record → /welcome/no-account
 *   - just signed up    → THIS waiting screen (no session yet)
 *   - logged in         → the app's profile interface (LoggedInRedirect)
 */
export default function WelcomePage() {
  return <WelcomeApprovalScreen waiting={<WelcomeStatus />} />;
}
