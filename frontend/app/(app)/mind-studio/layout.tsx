"use client";

import { useEffect } from "react";
import { useSession } from "@/features/auth/hooks/use-session";

/**
 * Diagram Hub route guard.
 *
 * Owner request 2026-10-06: the hub sits under the coin gate priced at 5
 * coins, opens free for owner emails, and is reserved to owner emails —
 * non-owners are refused the unlock itself (credit provider + the server
 * unlock route), so this layout no longer bounces signed-in non-owners.
 * They reach the route and the RouteCreditGate renders the lock.
 *
 * Signed-out visitors still go to login and come back here.
 */
export default function MindStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useSession();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      window.location.href = "/login?next=/mind-studio";
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground">
            Opening the Diagram Hub…
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
