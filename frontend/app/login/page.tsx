import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";
import { AuthShell } from "@/features/auth/components/auth-shell";

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
      <LoginForm />
    </AuthShell>
  );
}
