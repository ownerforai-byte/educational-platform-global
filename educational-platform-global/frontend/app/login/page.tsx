import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 py-10">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to track progress, save bookmarks, and manage credits.</p>
      </div>
      <LoginForm />
    </div>
  );
}
