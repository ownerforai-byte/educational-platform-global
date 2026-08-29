import { SignupForm } from "@/features/auth/components/signup-form";

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 py-10">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">Join to save progress, bookmaark notes, and track credits.</p>
      </div>
      <SignupForm />
    </div>
  );
}
