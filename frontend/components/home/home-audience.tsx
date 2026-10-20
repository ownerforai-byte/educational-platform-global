"use client";

import type { ReactNode } from "react";
import { useSession } from "@/features/auth/hooks/use-session";
import { HomePublic } from "./home-public";

/** Session-aware home content. The page owns the member tree and its access gate. */
export function HomeAudience({ member }: { member: ReactNode }) {
  const { user, isLoading } = useSession();

  if (user) return <>{member}</>;
  if (isLoading) return null;

  return <HomePublic />;
}
