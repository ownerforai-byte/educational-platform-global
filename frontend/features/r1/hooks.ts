import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  createActivity,
  createHabit,
  createPlan,
  deleteActivity,
  deleteHabit,
  deleteJournal,
  deletePlan,
  getR1Access,
  listActivities,
  listHabits,
  listJournal,
  listPlans,
  saveJournal,
  setHabitCheckin,
  updateActivity,
  updateHabit,
  updatePlan,
  type R1Activity,
  type R1ActivityInput,
  type R1DateRange,
  type R1Habit,
  type R1HabitInput,
  type R1JournalEntry,
  type R1JournalInput,
  type R1Plan,
  type R1PlanInput,
  type R1PlanQuery,
} from "@/lib/api/r1";

/**
 * React Query hooks for the R1 layer (pattern: `features/syllabus/hooks.ts`).
 * All queries are per-user and enabled only with a signed-in session.
 */

const R1_KEY = ["r1"] as const;
const ACTIVITIES_KEY = (range?: R1DateRange) => [...R1_KEY, "activities", range ?? {}] as const;
const PLANS_KEY = (query?: R1PlanQuery) => [...R1_KEY, "plans", query ?? {}] as const;
const JOURNAL_KEY = (range?: R1DateRange) => [...R1_KEY, "journal", range ?? {}] as const;
const HABITS_KEY = (range?: R1DateRange) => [...R1_KEY, "habits", range ?? {}] as const;

const STALE_60S = 1000 * 60;

// ── Access ──────────────────────────────────────────────────────────────────

// Provider-free cached fetch (pattern: features/credits/use-coin-gate.ts): the
// nav surfaces render outside any QueryClientProvider in tests and in the
// bare-shell paths, so this hook must never depend on React Query.
const ACCESS_TTL_MS = 60_000;
const accessCache: { at: number; value: boolean | null } = { at: 0, value: null };

export function useR1Access(
  enabled = true,
): { data: boolean | undefined; isLoading: boolean } {
  const cached =
    accessCache.value !== null && Date.now() - accessCache.at < ACCESS_TTL_MS
      ? accessCache.value
      : undefined;
  const [state, setState] = useState<{ data: boolean | undefined; isLoading: boolean }>({
    data: cached,
    isLoading: enabled && cached === undefined,
  });

  useEffect(() => {
    if (!enabled) {
      setState({ data: cached ?? false, isLoading: false });
      return;
    }
    if (cached !== undefined) {
      setState({ data: cached, isLoading: false });
      return;
    }
    let cancelled = false;
    getR1Access()
      .then((value) => {
        accessCache.at = Date.now();
        accessCache.value = value;
        if (!cancelled) setState({ data: value, isLoading: false });
      })
      .catch(() => {
        if (!cancelled) setState({ data: false, isLoading: false });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return state;
}

// ── Activities ──────────────────────────────────────────────────────────────

export function useR1Activities(range?: R1DateRange, enabled = true) {
  return useQuery({
    queryKey: ACTIVITIES_KEY(range),
    queryFn: () => listActivities(range),
    staleTime: STALE_60S,
    enabled,
  });
}

function useInvalidateR1() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: R1_KEY });
}

export function useCreateR1Activity() {
  const invalidate = useInvalidateR1();
  return useMutation({
    mutationFn: (input: R1ActivityInput) => createActivity(input),
    onSuccess: invalidate,
  });
}

export function useUpdateR1Activity() {
  const invalidate = useInvalidateR1();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<R1ActivityInput> }) =>
      updateActivity(id, input),
    onSuccess: invalidate,
  });
}

export function useDeleteR1Activity() {
  const invalidate = useInvalidateR1();
  return useMutation({
    mutationFn: (id: string) => deleteActivity(id),
    onSuccess: invalidate,
  });
}

// ── Plans ───────────────────────────────────────────────────────────────────

export function useR1Plans(query?: R1PlanQuery, enabled = true) {
  return useQuery({
    queryKey: PLANS_KEY(query),
    queryFn: () => listPlans(query),
    staleTime: STALE_60S,
    enabled,
  });
}

export function useCreateR1Plan() {
  const invalidate = useInvalidateR1();
  return useMutation({
    mutationFn: (input: R1PlanInput) => createPlan(input),
    onSuccess: invalidate,
  });
}

export function useUpdateR1Plan() {
  const invalidate = useInvalidateR1();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<R1PlanInput> }) =>
      updatePlan(id, input),
    onSuccess: invalidate,
  });
}

export function useDeleteR1Plan() {
  const invalidate = useInvalidateR1();
  return useMutation({
    mutationFn: (id: string) => deletePlan(id),
    onSuccess: invalidate,
  });
}

// ── Journal ─────────────────────────────────────────────────────────────────

export function useR1Journal(range?: R1DateRange, enabled = true) {
  return useQuery({
    queryKey: JOURNAL_KEY(range),
    queryFn: () => listJournal(range),
    staleTime: STALE_60S,
    enabled,
  });
}

export function useSaveR1Journal() {
  const invalidate = useInvalidateR1();
  return useMutation({
    mutationFn: (input: R1JournalInput) => saveJournal(input),
    onSuccess: invalidate,
  });
}

export function useDeleteR1Journal() {
  const invalidate = useInvalidateR1();
  return useMutation({
    mutationFn: (id: string) => deleteJournal(id),
    onSuccess: invalidate,
  });
}

// ── Habits ──────────────────────────────────────────────────────────────────

export function useR1Habits(range?: R1DateRange, enabled = true) {
  return useQuery({
    queryKey: HABITS_KEY(range),
    queryFn: () => listHabits(range),
    staleTime: STALE_60S,
    enabled,
  });
}

export function useCreateR1Habit() {
  const invalidate = useInvalidateR1();
  return useMutation({
    mutationFn: (input: R1HabitInput) => createHabit(input),
    onSuccess: invalidate,
  });
}

export function useUpdateR1Habit() {
  const invalidate = useInvalidateR1();
  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: Partial<R1HabitInput> & { archived?: boolean };
    }) => updateHabit(id, input),
    onSuccess: invalidate,
  });
}

export function useDeleteR1Habit() {
  const invalidate = useInvalidateR1();
  return useMutation({
    mutationFn: (id: string) => deleteHabit(id),
    onSuccess: invalidate,
  });
}

export function useSetR1HabitCheckin() {
  const invalidate = useInvalidateR1();
  return useMutation({
    mutationFn: ({ habitId, date, done }: { habitId: string; date: string; done: boolean }) =>
      setHabitCheckin(habitId, date, done),
    onSuccess: invalidate,
  });
}
