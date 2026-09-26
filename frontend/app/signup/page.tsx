import type { Metadata } from "next";
import { SignupForm } from "@/features/auth/components/signup-form";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { LoggedInRedirect } from "@/app/login/logged-in-redirect";

export const metadata: Metadata = {
  title: "Create Account — Ravikisan's Platform",
  description: "Create your Ravikisan account to save progress, bookmark notes, and track credits.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join to save progress, bookmark notes, and track credits across all NEB subjects."
    >
      {/* Signed-in users belong on the profile interface, never on a
          signup form — the two states can't coexist. */}
      <LoggedInRedirect />
      <SignupForm />
    </AuthShell>
  );
}
