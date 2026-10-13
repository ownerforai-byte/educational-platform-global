import { apiFetch } from "../api-client";

/**
 * R1 layer client — shared types and the access check.
 *
 * R1 (the daily-life app: activities, plans, journal, habits) is owner +
 * owner-granted emails only. `getR1Access()` drives the role-aware root and
 * nav visibility; the module wrappers live in `r1-activities` / `r1-plans` /
 * `r1-journal` / `r1-habits` and are re-exported here for convenience.
 */

// ── Shared types ────────────────────────────────────────────────────────────

export interface R1Activity {
  id: string;
  activityDate: string;
  startTime: string | null;
  endTime: string | null;
  category: string;
  title: string;
  description: string | null;
  minutes: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface R1ActivityInput {
  activityDate: string;
  startTime?: string | null;
  endTime?: string | null;
  category?: string;
  title: string;
  description?: string | null;
  minutes?: number | null;
}

export type R1PlanStatus = "planned" | "in_progress" | "done" | "cancelled";
export type R1PlanPriority = "low" | "medium" | "high";

export interface R1Plan {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  status: R1PlanStatus;
  priority: R1PlanPriority;
  createdAt: string;
  updatedAt: string;
}

export interface R1PlanInput {
  title: string;
  description?: string | null;
  dueDate?: string | null;
  status?: R1PlanStatus;
  priority?: R1PlanPriority;
}

export interface R1JournalEntry {
  id: string;
  entryDate: string;
  title: string;
  body: string;
  mood: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface R1JournalInput {
  entryDate: string;
  title?: string;
  body: string;
  mood?: string | null;
  tags?: string[];
}

export interface R1Habit {
  id: string;
  name: string;
  color: string | null;
  archived: boolean;
  checkins: string[];
  createdAt: string;
}

export interface R1HabitInput {
  name: string;
  color?: string | null;
}

/** Optional date window shared by the list endpoints. */
export interface R1DateRange {
  from?: string;
  to?: string;
}

function rangeQuery(range?: R1DateRange): string {
  if (!range) return "";
  const params = new URLSearchParams();
  if (range.from) params.set("from", range.from);
  if (range.to) params.set("to", range.to);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

// ── Access ──────────────────────────────────────────────────────────────────

/** Does the signed-in email hold R1 access (owner or granted)? */
export async function getR1Access(): Promise<boolean> {
  const res = await apiFetch<{ r1: boolean }>("/api/r1/access");
  return res.r1 === true;
}

// ── Activities ──────────────────────────────────────────────────────────────

export function listActivities(range?: R1DateRange): Promise<R1Activity[]> {
  return apiFetch<R1Activity[]>(`/api/r1/activities${rangeQuery(range)}`);
}

export function createActivity(input: R1ActivityInput): Promise<R1Activity> {
  return apiFetch<R1Activity>("/api/r1/activities", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateActivity(
  id: string,
  input: Partial<R1ActivityInput>
): Promise<R1Activity> {
  return apiFetch<R1Activity>(`/api/r1/activities/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteActivity(id: string): Promise<{ deleted: boolean; id: string }> {
  return apiFetch(`/api/r1/activities/${id}`, { method: "DELETE" });
}

// ── Plans ───────────────────────────────────────────────────────────────────

export interface R1PlanQuery extends R1DateRange {
  status?: R1PlanStatus;
}

export function listPlans(query?: R1PlanQuery): Promise<R1Plan[]> {
  const params = new URLSearchParams();
  if (query?.from) params.set("from", query.from);
  if (query?.to) params.set("to", query.to);
  if (query?.status) params.set("status", query.status);
  const qs = params.toString();
  return apiFetch<R1Plan[]>(`/api/r1/plans${qs ? `?${qs}` : ""}`);
}

export function createPlan(input: R1PlanInput): Promise<R1Plan> {
  return apiFetch<R1Plan>("/api/r1/plans", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updatePlan(id: string, input: Partial<R1PlanInput>): Promise<R1Plan> {
  return apiFetch<R1Plan>(`/api/r1/plans/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deletePlan(id: string): Promise<{ deleted: boolean; id: string }> {
  return apiFetch(`/api/r1/plans/${id}`, { method: "DELETE" });
}

// ── Journal ─────────────────────────────────────────────────────────────────

export function listJournal(range?: R1DateRange): Promise<R1JournalEntry[]> {
  return apiFetch<R1JournalEntry[]>(`/api/r1/journal${rangeQuery(range)}`);
}

/** Create or replace the entry for one day. */
export function saveJournal(input: R1JournalInput): Promise<R1JournalEntry> {
  return apiFetch<R1JournalEntry>("/api/r1/journal", {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export function deleteJournal(id: string): Promise<{ deleted: boolean; id: string }> {
  return apiFetch(`/api/r1/journal/${id}`, { method: "DELETE" });
}

// ── Habits ──────────────────────────────────────────────────────────────────

export function listHabits(range?: R1DateRange): Promise<R1Habit[]> {
  return apiFetch<R1Habit[]>(`/api/r1/habits${rangeQuery(range)}`);
}

export function createHabit(input: R1HabitInput): Promise<R1Habit> {
  return apiFetch<R1Habit>("/api/r1/habits", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateHabit(
  id: string,
  input: Partial<R1HabitInput> & { archived?: boolean }
): Promise<R1Habit> {
  return apiFetch<R1Habit>(`/api/r1/habits/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteHabit(id: string): Promise<{ deleted: boolean; id: string }> {
  return apiFetch(`/api/r1/habits/${id}`, { method: "DELETE" });
}

export function setHabitCheckin(
  habitId: string,
  date: string,
  done: boolean
): Promise<{ habitId: string; date: string; done: boolean }> {
  return apiFetch(`/api/r1/habits/${habitId}/checkins`, {
    method: "POST",
    body: JSON.stringify({ date, done }),
  });
}
