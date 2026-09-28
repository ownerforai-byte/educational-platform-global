import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { LoggedInRedirect } from "@/app/login/logged-in-redirect";

export const metadata: Metadata = {
  title: "Sign In — Ravikisan's Platform",
  description: "Sign in to your Ravikisan account to track progress, save bookmarks, and manage credits.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to track progress, save bookmarks, and manage credits."
    >
      {/* Signed-in users belong on the profile interface, never on a
          sign-in form — the two states can't coexist. */}
      <LoggedInRedirect />
      <LoginForm />
    </AuthShell>
  );
}
