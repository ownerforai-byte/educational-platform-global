"use client";

import { useEffect } from "react";
import { Crown } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerUser } from "@/lib/owner";

/**
 * Owner-only gate for Mind Studio (owner request 2026-10-01: "hide the mind
 * studio for owner emails only").
 *
 * Mirrors app/owner/layout.tsx: signed-out visitors go to login (coming back
 * here afterwards), signed-in non-owners are bounced home, and only the
 * allowlisted owner emails (frontend/lib/owner) ever see the workspace. The
 * home launcher is hidden the same way, so the route is the last way in.
 *
 * The backend gate for /api/owner/* remains the real security boundary; this
 * is the UX hide + bounce for the client-side workspace itself.
 */
export default function MindStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useSession();
  const isOwner = isOwnerUser(user);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      window.location.href = "/login?next=/mind-studio";
    } else if (!isOwner) {
      window.location.href = "/home";
    }
  }, [isLoading, user, isOwner]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground">
            Verifying Mind Studio access…
          </p>
        </div>
      </div>
    );
  }

  if (!user || !isOwner) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="max-w-sm text-center space-y-3">
          <Crown className="h-10 w-10 mx-auto text-amber-500" />
          <h1 className="text-xl font-bold tracking-tight">
            Owner Access Only
          </h1>
          <p className="text-sm text-muted-foreground">
            Mind Studio is limited to the platform owner emails. Redirecting…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
