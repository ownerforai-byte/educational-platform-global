"use client";

import { useEffect } from "react";
import { Crown } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerUser } from "@/lib/owner";

/**
 * Owner gate for the Veer Studio Hub (/ai and every tab below it).
 *
 * Owner request 2026-10-05 (AI under owner emails only, like the Image Hub):
 * only allowlisted owner emails may open these routes. Signed-out visitors
 * go to login and come back here; signed-in non-owners bounce home.
 */
export default function AiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useSession();
  const isOwner = isOwnerUser(user);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      window.location.href = "/login?next=/ai";
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
            Opening Veer Studio…
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
            Veer Studio is restricted to the platform owner emails.
            Redirecting…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
