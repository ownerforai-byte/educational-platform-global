"use client";

import type { ReactNode } from "react";
import { useSession } from "@/features/auth/hooks/use-session";
import { HomePublic } from "./home-public";

/** Session-aware home content. The page owns the member tree and its access gate. */
export function HomeAudience({ member }: { member: ReactNode }) {
  const { user, isLoading } = useSession();

  if (user) return <>{member}</>;
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return <HomePublic />;
}
