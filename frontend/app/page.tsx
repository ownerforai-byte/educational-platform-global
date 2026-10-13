"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { useR1Access } from "@/features/r1/hooks";
import { isOwnerUser } from "@/lib/owner";

/**
 * Role-aware root (`/`):
 *   owner / R1-granted emails → /r1  (the daily-life R1 home, which holds the
 *                                  "Fun" opening into the learning platform)
 *   everyone else             → /home (Fun — the current experience, unchanged)
 */
export default function RootEntry() {
  const router = useRouter();
  const { user, isLoading } = useSession();
  const { data: r1, isLoading: r1Loading } = useR1Access(!!user);

  const r1User = isOwnerUser(user) || r1 === true;

  useEffect(() => {
    if (isLoading || (user && r1Loading)) return;
    router.replace(r1User ? "/r1" : "/home");
  }, [isLoading, r1Loading, user, r1User, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <Sparkles className="h-8 w-8 animate-pulse text-primary" />
        <p className="text-sm font-medium text-muted-foreground">Opening…</p>
      </div>
    </div>
  );
}
