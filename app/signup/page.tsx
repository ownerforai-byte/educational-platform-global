import { SignupForm } from "@/features/auth/components/signup-form";

export const runtime = "edge";

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 py-10">
      <SignupForm />
    </div>
  );
}
