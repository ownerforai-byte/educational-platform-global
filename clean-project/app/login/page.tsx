import { LoginForm } from "@/features/auth/components/login-form";

export const runtime = "edge";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 py-10">
      <LoginForm />
    </div>
  );
}
