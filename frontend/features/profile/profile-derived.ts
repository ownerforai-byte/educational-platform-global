/**
 * Shared profile derivations — ONE source of truth for every number that the
 * private dashboard, the public profile and the You hub show.
 *
 * Pure functions only (no React, no fetch): the same input must always produce
 * the same figure in both experiences, so a visitor never sees a different
 * completion percentage than the owner does.
 *
 * Topic counts come from `summarizeJourney` / `groupJourney` (the progress
 * catalogue), achievements from `evaluateAchievements` (the badge rules), and
 * scholar level from `calculateScholarLevel`. Nothing here invents a stat.
 */
import type { ProgressEntry } from "@/types/api";
import type { PublicProgressCounts } from "@/lib/api/profile";
import { SYLLABUS } from "@/lib/core/syllabus";
import { entryStatus, groupJourney, summarizeJourney } from "@/lib/progress/catalog";
import {
  evaluateAchievements,
  nextMilestone,
  type Achievement,
} from "@/features/achievements";
import { calculateScholarLevel } from "@/features/progress/scholar-level";

// ── Streak ─────────────────────────────────────────────────────────────────

/**
 * Consecutive UTC days (ending today or yesterday) with any study activity.
 * Today may still be in progress — the streak survives until a full day is
 * missed, then it counts back from yesterday.
 */
export function computeStudyStreak(entries: ProgressEntry[]): number {
  const days = new Set<string>();
  for (const e of entries) {
    for (const ts of [e.lastViewedAt, e.startedAt, e.completedAt, e.updatedAt]) {
      if (ts) days.add(ts.slice(0, 10));
    }
  }
  return streakFromDays(days);
}

/** Same rule from an already-collected set of `YYYY-MM-DD` days. */
export function streakFromDays(days: Set<string>): number {
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const cursor = new Date();
  if (!days.has(iso(cursor))) cursor.setUTCDate(cursor.getUTCDate() - 1);
  let streak = 0;
  while (days.has(iso(cursor))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

/** The spark pools refill at 12:00 AM UTC. */
export function utcResetLabel(): string {
  const now = new Date();
  const next = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
  );
  const ms = Math.max(next.getTime() - now.getTime(), 0);
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return `${h}h ${m}m`;
}

// ── Identity completeness ──────────────────────────────────────────────────

export interface ProfileCompletionInput {
  avatarUrl: string | null;
  coverUrl: string | null;
  fullName: string | null | undefined;
  username: string | null | undefined;
  bio: string | null | undefined;
  location: string | null | undefined;
  website: string | null | undefined;
}

export const PROFILE_COMPLETION_FIELDS = [
  "avatar",
  "cover",
  "name",
  "username",
  "bio",
  "location",
  "website",
] as const;

export interface ProfileCompletion {
  /** 0–100, rounded. */
  percent: number;
  filled: number;
  total: number;
  missing: string[];
}

export function profileCompletion(input: ProfileCompletionInput): ProfileCompletion {
  const checks: Array<[string, boolean]> = [
    ["avatar", Boolean(input.avatarUrl)],
    ["cover", Boolean(input.coverUrl)],
    ["name", Boolean(input.fullName && input.fullName.trim() && input.fullName !== "Student")],
    ["username", Boolean(input.username)],
    ["bio", Boolean(input.bio && input.bio.trim())],
    ["location", Boolean(input.location && input.location.trim())],
    ["website", Boolean(input.website && input.website.trim())],
  ];
  const filled = checks.filter(([, has]) => has).length;
  return {
    percent: Math.round((filled / checks.length) * 100),
    filled,
    total: checks.length,
    missing: checks.filter(([, has]) => !has).map(([field]) => field),
  };
}

// ── Learning progress ──────────────────────────────────────────────────────

export interface SubjectProgressRow {
  subjectSlug: string;
  subjectName: string;
  completed: number;
  inProgress: number;
  total: number;
  /** Completed share of this subject's tracked catalogue, 0–100. */
  percent: number;
}

export interface LearningProgress {
  completed: number;
  inProgress: number;
  notStarted: number;
  total: number;
  /** Completed share of the whole catalogue, 0–100. */
  percent: number;
  subjects: SubjectProgressRow[];
}

/**
 * Overall + per-subject completion.
 *
 * `groupJourney` preserves catalogue order, so the subject rows always read in
 * the official NEB order and never in data-arrival order.
 */
export function learningProgress(entries: ProgressEntry[]): LearningProgress {
  const summary = summarizeJourney(entries);
  const subjects = groupJourney(entries).map((group) => ({
    subjectSlug: group.subjectSlug,
    subjectName: group.subjectName,
    completed: group.completed,
    inProgress: group.inProgress,
    total: group.total,
    percent: group.total > 0 ? Math.round((group.completed / group.total) * 100) : 0,
  }));
  return {
    completed: summary.completed,
    inProgress: summary.inProgress,
    notStarted: summary.notStarted,
    total: summary.total,
    percent: summary.percent,
    subjects,
  };
}

/**
 * Subject display name from the canonical syllabus, falling back to a titleized
 * slug only for a subject that is not in the shipped curriculum.
 */
export function subjectDisplayName(subjectSlug: string): string {
  for (const cls of SYLLABUS) {
    const subject = cls.subjects.find((s) => s.slug === subjectSlug);
    if (subject) return subject.name;
  }
  return subjectSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Total syllabus topics for one subject slug (units summed across classes). */
export function syllabusTopicCount(subjectSlug: string): number {
  return SYLLABUS.reduce(
    (sum, cls) =>
      sum +
      (cls.subjects.find((s) => s.slug === subjectSlug)?.units.reduce(
        (unitSum, unit) => unitSum + unit.topics.length,
        0,
      ) ?? 0),
    0,
  );
}

/**
 * Public-profile variant: the server sends counts, the syllabus supplies the
 * names, so a visitor reads the same subject labels as the owner.
 */
export function learningProgressFromCounts(
  counts: PublicProgressCounts | null,
): LearningProgress | null {
  if (!counts) return null;
  return {
    completed: counts.completed,
    inProgress: counts.inProgress,
    notStarted: counts.notStarted,
    total: counts.total,
    percent: counts.percent,
    subjects: counts.subjects.map((row) => ({
      subjectSlug: row.subjectSlug,
      subjectName: subjectDisplayName(row.subjectSlug),
      completed: row.completed,
      inProgress: row.inProgress,
      total: row.total,
      percent: row.total > 0 ? Math.round((row.completed / row.total) * 100) : 0,
    })),
  };
}

/** Completed topics in the order they were finished — the badge date source. */
export function completionTimeline(entries: ProgressEntry[]): Array<{ at: string; title: string }> {
  return entries
    .filter((entry) => entryStatus(entry) === "completed" && entry.completedAt)
    .map((entry) => ({
      at: entry.completedAt as string,
      title: entry.topic?.title ?? entry.topicSlug ?? "Topic",
    }))
    .sort((a, b) => a.at.localeCompare(b.at));
}

// ── Achievements ───────────────────────────────────────────────────────────

export interface EarnedAchievement extends Achievement {
  /**
   * When the milestone was actually crossed, when it is derivable from the
   * journey (topic-count milestones). Streak/percent milestones stay `null`
   * rather than inventing a date.
   */
  earnedAt: string | null;
}

export interface AchievementSummary {
  all: EarnedAchievement[];
  earned: EarnedAchievement[];
  next: EarnedAchievement | null;
}

/**
 * Badges come only from the shared rules — a topic counts once, a level is
 * never granted by hand. Dates are attached only where the journey proves one.
 */
export function deriveAchievements(
  entries: ProgressEntry[],
  streak: number,
): AchievementSummary {
  const progress = learningProgress(entries);
  const rules = evaluateAchievements({
    streak,
    topicsCompleted: progress.completed,
    topicsInProgress: progress.inProgress,
    percent: progress.percent,
  });
  const timeline = completionTimeline(entries);

  const all: EarnedAchievement[] = rules.map((rule) => ({
    ...rule,
    earnedAt: earnedAtFor(rule, timeline),
  }));
  const earned = all.filter((a) => a.earned);
  const next = nextFor(all);
  return { all, earned, next };
}

function earnedAtFor(
  rule: Achievement,
  timeline: Array<{ at: string; title: string }>,
): string | null {
  // Only the topic-count rules map to a specific completion moment.
  const topicTarget = TOPIC_MILESTONE_TARGETS[rule.id];
  if (!topicTarget) return null;
  const at = timeline[topicTarget - 1]?.at ?? null;
  return at;
}

const TOPIC_MILESTONE_TARGETS: Record<string, number> = {
  "first-topic": 1,
  "topics-10": 10,
  "topics-50": 50,
};

/**
 * Visitor-facing badges: the same shared rules, evaluated from the public
 * counts the server publishes.
 *
 * The study streak is owner-only activity, so it is passed as 0 — a streak
 * badge can therefore be earned in private and simply not claimed publicly.
 * Only `earned` badges are ever rendered to a visitor.
 */
export function publicAchievements(counts: PublicProgressCounts | null): AchievementSummary {
  if (!counts) return { all: [], earned: [], next: null };
  const rules = evaluateAchievements({
    streak: 0,
    topicsCompleted: counts.completed,
    topicsInProgress: counts.inProgress,
    percent: counts.percent,
  });
  const all: EarnedAchievement[] = rules.map((rule) => ({ ...rule, earnedAt: null }));
  return { all, earned: all.filter((a) => a.earned), next: nextFor(all) };
}

/** The nearest unearned badge, kept in the `EarnedAchievement` shape. */
function nextFor(all: EarnedAchievement[]): EarnedAchievement | null {
  const milestone = nextMilestone(all);
  if (!milestone) return null;
  return all.find((entry) => entry.id === milestone.id) ?? null;
}

// ── Scholar level ──────────────────────────────────────────────────────────

/**
 * Scholar level for a set of completed topics.
 *
 * `credits` is optional and deliberately omitted on the PUBLIC profile: credits
 * are owner-only, so a visitor's level is computed from completed topics alone
 * and never implies a balance.
 */
export function scholarLevelFor(completedTopics: number, credits = 0) {
  return calculateScholarLevel(completedTopics, credits);
}

// ── One call for both experiences ──────────────────────────────────────────

export interface ProfileOverview {
  streak: number;
  completion: ProfileCompletion;
  learning: LearningProgress;
  achievements: AchievementSummary;
}

/** Everything the profile surfaces need, derived exactly once. */
export function profileOverview(
  entries: ProgressEntry[],
  identity: ProfileCompletionInput,
): ProfileOverview {
  const streak = computeStudyStreak(entries);
  return {
    streak,
    completion: profileCompletion(identity),
    learning: learningProgress(entries),
    achievements: deriveAchievements(entries, streak),
  };
}
