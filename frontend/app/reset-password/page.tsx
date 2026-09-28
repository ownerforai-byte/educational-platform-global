import type { Metadata } from "next";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password — Ravikisan's Platform",
  description: "Choose a new password for your Ravikisan account.",
};

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Set a new password"
      subtitle="Pick something you'll remember — at least 8 characters."
    >
      <ResetPasswordForm />
    </AuthShell>
  );
}
