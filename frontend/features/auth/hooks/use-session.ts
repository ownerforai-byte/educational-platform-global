"use client";

import { useAuth } from "@/providers/auth-provider";

export function useSession() {
  const { user, isLoading, refresh, logoutUser } = useAuth();

  return { user, isLoading, refresh, logoutUser };
}
