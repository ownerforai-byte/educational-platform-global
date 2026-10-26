"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getOwnerUsers, type OwnerUser } from "@/lib/api/owner";
import {
  computeUserDirectoryStats,
  DEFAULT_USER_DIRECTORY_FILTERS,
  filterAndSortOwnerUsers,
  type UserDirectoryFilters,
} from "@/lib/owner/user-directory";

export function useOwnerUserDirectory() {
  const [users, setUsers] = useState<OwnerUser[]>([]);
  const [filters, setFilters] = useState<UserDirectoryFilters>(DEFAULT_USER_DIRECTORY_FILTERS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      setUsers(await getOwnerUsers());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => computeUserDirectoryStats(users), [users]);

  const visibleUsers = useMemo(
    () => filterAndSortOwnerUsers(users, filters),
    [users, filters],
  );

  const patchFilters = useCallback((patch: Partial<UserDirectoryFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_USER_DIRECTORY_FILTERS);
  }, []);

  return {
    users,
    visibleUsers,
    stats,
    filters,
    setFilters,
    patchFilters,
    resetFilters,
    isLoading,
    error,
    setError,
    reload: load,
  };
}
