"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        // ADDITIVE (perf pass, 2026-09-27): widen the retention window so a
        // revisited route serves from memory instead of refetching, and back
        // off the single retry so a cold-starting Render backend is not
        // hammered by parallel route mounts. Neither key overrides an
        // existing value — `staleTime`/`retry`/`refetchOnWindowFocus` above
        // keep behaving exactly as before.
        gcTime: 1000 * 60 * 30,
        retryDelay: (attemptIndex: number) => Math.min(4000, 400 * 2 ** attemptIndex),
      },
      // ADDITIVE: mutations previously had no declared defaults; making the
      // (already implicit) `retry: 0` explicit keeps a failed write from being
      // silently replayed and documents the intent.
      mutations: {
        retry: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

/* ------------------------------------------------------------------ *
 * ADDITIVE (perf pass): shared presets + imperative helpers.
 * Nothing above changed — these are new exports only.
 * ------------------------------------------------------------------ */

/**
 * Stale-time tiers, so a call site can express intent (`static`, `long`, …)
 * instead of hard-coding magic numbers next to every `useQuery`.
 */
export const QUERY_STALE_TIME = {
  /** Live data that must revalidate on every mount (credits, session). */
  realtime: 0,
  /** User activity feeds (progress, bookmarks). */
  short: 1000 * 30,
  /** Standard content lists — matches the historical default. */
  medium: 1000 * 60 * 5,
  /** Syllabus/notes data — matches the existing `hooks.ts` values. */
  long: 1000 * 60 * 10,
  /** Effectively static catalogues (subjects, syllabus snapshots). */
  static: 1000 * 60 * 60,
} as const;

/** Name of a {@link QUERY_STALE_TIME} tier. */
export type QueryStaleTimeTier = keyof typeof QUERY_STALE_TIME;

/**
 * The single client instance used by the app (server renders create a fresh,
 * non-shared client on purpose — same rule as React Query's own docs).
 */
export function getSharedQueryClient(): QueryClient {
  return getQueryClient();
}

/**
 * Invalidates every query whose key starts with `prefix` — the imperative
 * counterpart used by non-React code (auth sign-out, offline sync).
 */
export function invalidateQueriesByPrefix(
  prefix: readonly unknown[],
): Promise<void> {
  return getQueryClient().invalidateQueries({ queryKey: prefix });
}

/**
 * Warms a query from data that was already fetched, without an extra request.
 */
export function seedQueryData<T>(
  key: readonly unknown[],
  data: T,
  updatedAt?: number,
): T {
  getQueryClient().setQueryData(
    key,
    data,
    updatedAt === undefined ? undefined : { updatedAt },
  );
  return data;
}

