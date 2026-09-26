import type { Metadata } from "next";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { WelcomeStatus } from "@/features/auth/components/welcome-status";
import { LoggedInRedirect } from "@/app/login/logged-in-redirect";

export const metadata: Metadata = {
  title: "Account Status — Ravikisan's Platform",
  description:
    "Your account was created — check whether access has been granted and sign in as soon as it's approved.",
};

/**
 * Post-signup status screen (owner-approval flow).
 *
 * Exactly one auth-related interface is visible at a time:
 *   - not logged in  → /login or /signup forms
 *   - just signed up → THIS status screen (no session yet)
 *   - logged in      → the app's profile interface (this page bounces away)
 */
export default function WelcomePage() {
  return (
    <AuthShell
      title="Your account is on its way"
      subtitle="Account created — track your access status here. You'll be able to sign in the moment it's approved."
    >
      <LoggedInRedirect />
      <WelcomeStatus />
    </AuthShell>
  );
}
