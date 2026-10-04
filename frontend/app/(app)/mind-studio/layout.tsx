"use client";

import { useEffect } from "react";
import { ImageIcon } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";

/**
 * Sign-in gate for the Image Hub.
 *
 * The hub was owner-only from 2026-10-01; owner request 2026-10-04 ("enable
 * saving of image for every user") opened it to EVERY student. What stays is
 * the session requirement: drawings burn the platform key and the saved
 * history is per-account, so signed-out visitors go to login and come back
 * here — there is no owner check anymore.
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
            Opening the Image Hub…
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="max-w-sm text-center space-y-3">
          <ImageIcon className="h-10 w-10 mx-auto text-sky-500" />
          <h1 className="text-xl font-bold tracking-tight">
            Sign in to draw
          </h1>
          <p className="text-sm text-muted-foreground">
            The Image Hub is open to every student — your account keeps the
            drawings and the saved history. Redirecting to login…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
