import type { Metadata } from "next";
import { SignupForm } from "@/features/auth/components/signup-form";
import { AuthShell } from "@/features/auth/components/auth-shell";

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
      <SignupForm />
    </AuthShell>
  );
}
