"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { tierWelcomePathFor } from "@/lib/access-level";

/**
 * Renders nothing; when the session resolves and a user is present, bounce
 * them out of auth/status pages to their own tier welcome.
 */
export function LoggedInRedirect() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Auth screens never render to a signed-in viewer. Route only to that
      // viewer's resolved tier welcome; a ?next= path cannot bypass the flow.
      router.replace(tierWelcomePathFor(user));
    }
  }, [isLoading, user, router]);

  return null;
}
