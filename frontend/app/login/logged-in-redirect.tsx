"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { tierWelcomePathFor } from "@/lib/access-level";

/**
 * Renders nothing; when the session resolves and a user is present, bounce
 * them out of the auth page to the app home.
 */
export function LoggedInRedirect() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      const params = new URLSearchParams(window.location.search);
      const next = params.get("next");
      // No ?next= → the viewer's own tier welcome page (never the login form,
      // never a foreign tier page).
      const target = next && next.startsWith("/") && !next.startsWith("//") ? next : tierWelcomePathFor(user);
      router.replace(target);
    }
  }, [isLoading, user, router]);

  return null;
}
