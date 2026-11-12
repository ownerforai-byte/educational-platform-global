import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { CreatedAccountGate } from "@/features/auth/components/created-account-gate";
import { LoggedInRedirect } from "@/app/login/logged-in-redirect";

export const metadata: Metadata = {
  title: "Welcome back — your notes are waiting",
  description: "Sign in to your Ravikisan account to track progress, save bookmarks, and manage credits.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to track progress, save bookmarks, and manage credits."
    >
      <LoggedInRedirect />
      <CreatedAccountGate mode="login">
        <LoginForm />
      </CreatedAccountGate>
    </AuthShell>
  );
}
