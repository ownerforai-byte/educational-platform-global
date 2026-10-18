"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

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
      const target = next && next.startsWith("/") && !next.startsWith("//") ? next : "/home";
      router.replace(target);
    }
  }, [isLoading, user, router]);

  return null;
}
