"use client";

/**
 * Private (owner-only) profile dashboard.
 *
 * One dense, responsive owner view: identity hero, real quick statistics,
 * learning & progress, personal/account settings and the activity feed — all
 * numbers derived from `profile-derived` so the owner and a visitor never
 * read a different figure.
 *
 * Every statistic comes from live data:
 *   - completed / in-progress / overall % → `learningProgress(progressEntries)`
 *   - XP / level → `scholarLevelFor(completedTopics, credits)`
 *   - streak → `computeStudyStreak` (inside `profileOverview`)
 *   - posts / followers → `getMyProfile().stats`
 *   - storage → `getStorage()` / `getMyProfile().storage`
 * No placeholder numbers.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coins,
  Crown,
  Filter,
  Flame,
  GraduationCap,
  History,
  Layers,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Pencil,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  User,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProgressPanel } from "@/components/progress/progress-panel";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerAccount } from "@/lib/owner";
import { getAiSparkUsage, type AiSparkUsage } from "@/lib/api/ai";
import { AI_SPARK_LIMITS } from "@/lib/ai/ai-spark-tiers";
import { ACCESS_LABELS, accessLevelFor, hasLevel, type AccessLevel } from "@/lib/core/access-level";
import { entryStatus, topicHref } from "@/lib/progress/catalog";
import { getProgress } from "@/lib/api/progress";
import { SYLLABUS } from "@/lib/core/syllabus";
import type { ProgressEntry } from "@/types/api";
import { key } from "@/lib/scoped-storage";
import { PREFERENCES_NAMESPACE, scheduleNamespacePush } from "@/lib/state/user-state";
import { ProfileAvatar, ProfileCover } from "@/features/profile/profile-media";
import { ProfileImageEditButton } from "@/features/profile/profile-image-editor";
import { StorageMeter } from "@/features/profile/storage-meter";
import {
  formatBytes,
  getStorage,
  updateMyProfile,
  type ProfileStats,
  type PublicProfile,
  type StorageInfo,
} from "@/lib/api/profile";
import {
  computeStudyStreak,
  deriveAchievements,
  learningProgress,
  profileOverview,
  scholarLevelFor,
  subjectDisplayName,
  syllabusTopicCount,
  utcResetLabel,
} from "@/features/profile/profile-derived";

const tierBadgeConfig: Record<AccessLevel, { className: string; icon: typeof Crown }> = {
  guest: { className: "bg-muted border-border text-muted-foreground", icon: User },
  member: { className: "bg-emerald-500/15 border-emerald-500/30 text-emerald-500", icon: User },
  plus: { className: "bg-blue-500/15 border-blue-500/30 text-blue-500", icon: GraduationCap },
  pro: { className: "bg-rose-500/15 border-rose-500/30 text-rose-500", icon: ShieldCheck },
  owner: { className: "bg-amber-500/15 border-amber-500/30 text-amber-500", icon: Crown },
};

const GRADES = ["Class 11 Science", "Class 12 Science", "Combined (+2 Both)"];

/**
 * Level rungs mirror the frozen `calculateScholarLevel` tiers (100 XP per
 * completed topic — perks in `features/progress/scholar-level.ts` are the
 * canonical boundaries: 2 / 5 / 10 / 20 / 35 topics).
 */
const SCHOLAR_LADDER = [
  { lvl: 1, title: "Novice Scholar", req: "0 - 1 topics", desc: "First steps into NEB syllabus" },
  { lvl: 2, title: "Curious Explorer", req: "2 - 4 topics", desc: "Solid conceptual foundation" },
  { lvl: 3, title: "Active Scholar", req: "5 - 9 topics", desc: "Core derivations & problem solving" },
  { lvl: 4, title: "Academic Achiever", req: "10 - 19 topics", desc: "Advanced cross-topic mastery" },
  { lvl: 5, title: "Master Scholar", req: "20 - 34 topics", desc: "Near-total syllabus mastery" },
  { lvl: 6, title: "NEB Grandmaster", req: "35+ topics", desc: "Board exam excellence tier" },
];

const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public — anyone with the link", icon: Users },
  { value: "members", label: "Members only — signed-in students", icon: UserCheck },
  { value: "private", label: "Private — only you", icon: Lock },
] as const;

/** "3h ago" / "5d ago" / a date — the activity feed's right column. */
function relativeTime(iso: string): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const diff = Date.now() - t;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(t).toLocaleDateString();
}

/** The moment a topic was last touched — the sort/filter key for the feed. */
function activityStamp(entry: ProgressEntry): string | null {
  return entry.lastViewedAt ?? entry.updatedAt ?? entry.completedAt ?? entry.startedAt ?? null;
}

/** Epoch-ms cut-off for a time-range filter (call from event handlers only). */
function rangeCutoffMs(value: ActivityRange): number {
  return value === "all" ? 0 : Date.now() - Number(value) * 86_400_000;
}

const activityDurationLabel = (iso: string | null): string => (iso ? relativeTime(iso) : "");

const focusRingClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const filterChipClass = (active: boolean) =>
  `rounded-full border px-3 py-1 text-xs font-medium transition-colors ${focusRingClass} ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border bg-card text-foreground hover:border-primary/50"
  }`;

// ── Activity filters ────────────────────────────────────────────────────────

type ActivityStatus = "all" | "completed" | "in_progress";
type ActivityRange = "all" | "7" | "30";

const ACTIVITY_STATUS_FILTERS: Array<{ value: ActivityStatus; label: string }> = [
  { value: "all", label: "All activity" },
  { value: "completed", label: "Completed" },
  { value: "in_progress", label: "In progress" },
];

const ACTIVITY_RANGE_FILTERS: Array<{ value: ActivityRange; label: string }> = [
  { value: "all", label: "Any time" },
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
];

const ACTIVITY_PAGE_SIZE = 10;

/**
 * Searchable, filterable, paginated study feed.
 *
 * `compact` renders the Overview teaser (no filter bar, first few rows) and
 * hands the full list to the Activity tab through "View all activity".
 */
function ActivityFeed({
  entries,
  compact = false,
  onViewAll,
}: {
  entries: ProgressEntry[];
  compact?: boolean;
  onViewAll?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ActivityStatus>("all");
  const [subject, setSubject] = useState("all");
  const [range, setRange] = useState<ActivityRange>("all");
  const [cutoffMs, setCutoffMs] = useState(0);
  const [page, setPage] = useState(0);

  const rows = useMemo(
    () =>
      entries
        .map((entry) => ({ entry, at: activityStamp(entry) }))
        .filter((row): row is { entry: ProgressEntry; at: string } => Boolean(row.at))
        .sort((a, b) => b.at.localeCompare(a.at)),
    [entries],
  );

  const subjects = useMemo(() => {
    const seen = new Map<string, string>();
    for (const { entry } of rows) {
      const slug = entry.subjectSlug ?? "general";
      if (!seen.has(slug)) {
        seen.set(slug, entry.topic?.chapter?.subject?.name ?? subjectDisplayName(slug));
      }
    }
    return [...seen.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(({ entry, at }) => {
      const entryState: ActivityStatus =
        entryStatus(entry) === "completed" ? "completed" : "in_progress";
      if (status !== "all" && entryState !== status) return false;
      if (subject !== "all" && (entry.subjectSlug ?? "general") !== subject) return false;
      if (cutoffMs && new Date(at).getTime() < cutoffMs) return false;
      if (q) {
        const haystack = [
          entry.topic?.title,
          entry.topicSlug,
          entry.topic?.chapter?.title,
          entry.topic?.chapter?.subject?.name,
          entry.subjectSlug,
          entry.unitSlug,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [rows, query, status, subject, cutoffMs]);

  const filtersActive =
    query.trim() !== "" || status !== "all" || subject !== "all" || range !== "all";

  const clearFilters = () => {
    setQuery("");
    setStatus("all");
    setSubject("all");
    setRange("all");
    setCutoffMs(0);
    setPage(0);
  };

  const pageCount = Math.max(1, Math.ceil(filtered.length / ACTIVITY_PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visible = compact
    ? filtered.slice(0, 5)
    : filtered.slice(safePage * ACTIVITY_PAGE_SIZE, safePage * ACTIVITY_PAGE_SIZE + ACTIVITY_PAGE_SIZE);

  if (compact) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <History className="h-4 w-4 text-primary" />
              Recent Study Activity
            </CardTitle>
            {onViewAll ? (
              <button
                type="button"
                onClick={onViewAll}
                className={`inline-flex items-center gap-0.5 rounded text-[11px] font-semibold text-primary transition-colors hover:underline ${focusRingClass}`}
              >
                View All
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <CardDescription className="text-xs">
            Pick up where you left off.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {visible.length === 0 ? (
            <p className="rounded-xl border border-dashed px-3 py-6 text-center text-xs text-muted-foreground">
              No activity yet — open any topic and it shows up here.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {visible.map(({ entry, at }) => (
                <li key={entry.id}>
                  <ActivityRowLink entry={entry} at={at} />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <History className="h-4 w-4 text-primary" />
          Recent Study Activity
        </CardTitle>
        <CardDescription className="text-xs">
          Your latest topic sessions — pick up where you left off.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="relative">
          <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Search activity — topic, subject, or unit…"
            aria-label="Search activity"
            className="h-9 rounded-full pl-9 pr-8"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setPage(0);
              }}
              aria-label="Clear search"
              className={`absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground ${focusRingClass}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <Filter className="mr-0.5 h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
          {ACTIVITY_STATUS_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => {
                setStatus(filter.value);
                setPage(0);
              }}
              aria-pressed={status === filter.value}
              className={filterChipClass(status === filter.value)}
            >
              {filter.label}
            </button>
          ))}
          <span className="mx-1 text-muted-foreground/40">•</span>
          {ACTIVITY_RANGE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => {
                setRange(filter.value);
                setCutoffMs(rangeCutoffMs(filter.value));
                setPage(0);
              }}
              aria-pressed={range === filter.value}
              className={filterChipClass(range === filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {subjects.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setSubject("all");
                setPage(0);
              }}
              aria-pressed={subject === "all"}
              className={filterChipClass(subject === "all")}
            >
              All subjects
            </button>
            {subjects.map(([slug, name]) => (
              <button
                key={slug}
                type="button"
                onClick={() => {
                  setSubject(subject === slug ? "all" : slug);
                  setPage(0);
                }}
                aria-pressed={subject === slug}
                className={filterChipClass(subject === slug)}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <span>
            {filtered.length} of {rows.length} sessions
            {filtersActive && " match your filters"}
          </span>
          {filtersActive && (
            <button
              type="button"
              onClick={clearFilters}
              className={`inline-flex items-center gap-1 rounded font-semibold text-primary hover:underline ${focusRingClass}`}
            >
              <X className="h-3 w-3" aria-hidden="true" />
              Clear filters
            </button>
          )}
        </div>

        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-10 text-center">
            <History className="mb-3 h-10 w-10 text-muted-foreground/50" />
            {filtersActive ? (
              <>
                <p className="text-sm font-semibold">No sessions match these filters</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try a different search or clear the filters.
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="mt-3 rounded-xl text-xs"
                  onClick={clearFilters}
                >
                  Clear filters
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold">No activity yet</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Open any topic and it will show up here.
                </p>
              </>
            )}
          </div>
        ) : (
          <ul className="space-y-1.5">
            {visible.map(({ entry, at }) => (
              <li key={entry.id}>
                <ActivityRowLink entry={entry} at={at} />
              </li>
            ))}
          </ul>
        )}

        {filtered.length > ACTIVITY_PAGE_SIZE && (
          <div className="flex items-center justify-between gap-2 border-t pt-2">
            <span className="text-[11px] text-muted-foreground" aria-live="polite">
              Page {safePage + 1} of {pageCount}
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 rounded-lg px-2 text-xs"
                aria-label="Previous activity page"
                disabled={safePage === 0}
                onClick={() => setPage(Math.max(0, safePage - 1))}
              >
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Prev
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 rounded-lg px-2 text-xs"
                aria-label="Next activity page"
                disabled={safePage >= pageCount - 1}
                onClick={() => setPage(Math.min(pageCount - 1, safePage + 1))}
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ActivityRowLink({ entry, at }: { entry: ProgressEntry; at: string }) {
  const done = entryStatus(entry) === "completed";
  const title = entry.topic?.title || entry.topicSlug || "Topic";
  return (
    <Link
      href={topicHref(entry)}
      className={`flex items-center justify-between gap-3 rounded-xl border border-border/50 px-3 py-2 transition-colors hover:border-primary/30 hover:bg-muted/50 ${focusRingClass}`}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        {done ? (
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
        ) : (
          <BookOpen className="h-4 w-4 shrink-0 text-sky-500" aria-hidden="true" />
        )}
        <span className="min-w-0">
          <span className="block truncate text-xs font-semibold text-foreground">{title}</span>
          <span className="block truncate text-[11px] capitalize text-muted-foreground">
            {[
              entry.topic?.chapter?.subject?.name ?? entry.subjectSlug?.replace(/-/g, " "),
              entry.unitSlug?.replace(/-/g, " "),
            ]
              .filter(Boolean)
              .join(" · ")}{" "}
            · {done ? "completed" : "in progress"}
          </span>
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-2 text-[11px] text-muted-foreground">
        {activityDurationLabel(at)}
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

/** Live-ish countdown to the UTC spark reset (ticks twice a minute). */
function useUtcResetCountdown(): string {
  const [label, setLabel] = useState(utcResetLabel);
  useEffect(() => {
    const t = setInterval(() => setLabel(utcResetLabel()), 30_000);
    return () => clearInterval(t);
  }, []);
  return label;
}

export interface PrivateProfileDashboardProps {
  media: PublicProfile | null;
  stats: ProfileStats | null;
  storage: StorageInfo | null;
  /** Fired after an image upload/removal so the page can refresh identity. */
  onMediaChanged: (result: { profile: PublicProfile; storage: StorageInfo | null }) => void;
  onBack?: () => void;
}

export function PrivateProfileDashboard({
  media,
  stats,
  storage,
  onMediaChanged,
  onBack,
}: PrivateProfileDashboardProps) {
  const router = useRouter();
  const { user, isLoading, logoutUser } = useSession();

  const [tab, setTab] = useState("overview");
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);
  const [targetGrade, setTargetGrade] = useState(GRADES[0]);
  const [sparkUsage, setSparkUsage] = useState<AiSparkUsage | null>(null);
  const [storageOverride, setStorageOverride] = useState<StorageInfo | null>(null);
  const [visibilityOverride, setVisibilityOverride] = useState<string | null>(null);
  const [savingVisibility, setSavingVisibility] = useState(false);
  const [visibilityError, setVisibilityError] = useState(false);

  // Derived, never mirrored: the freshest server value wins, and an optimistic
  // edit only overrides until the PATCH answers.
  const storageInfo = storageOverride ?? storage ?? null;
  const visibility = visibilityOverride ?? media?.visibility ?? "public";

  /**
   * Own the fresh quota from an upload/removal locally as well as forwarding it
   * up: a caller is not guaranteed to re-render with new props, and a stale
   * storage meter after deleting a picture would be a lie.
   */
  const handleMediaChanged = useCallback(
    (result: { profile: PublicProfile; storage: StorageInfo | null }) => {
      if (result.storage) setStorageOverride(result.storage);
      onMediaChanged(result);
    },
    [onMediaChanged],
  );

  // Overview needs the journey up front (the Progress tab's panel refetches).
  useEffect(() => {
    let alive = true;
    getProgress()
      .then((entries) => {
        if (alive) setProgressEntries(entries);
      })
      .catch(() => {
        /* offline / signed out — cards show zeros until the panel loads */
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    getAiSparkUsage()
      .then((usage) => {
        if (alive) setSparkUsage(usage);
      })
      .catch(() => {
        /* the plan card falls back to the tier allowance */
      });
    return () => {
      alive = false;
    };
  }, [user]);

  useEffect(() => {
    let alive = true;
    getStorage()
      .then((info) => {
        if (alive) setStorageOverride(info);
      })
      .catch(() => {
        /* keep the storage figure that came with the profile payload */
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    // Deferred so the synchronous setState lands outside the effect body.
    queueMicrotask(() => {
      try {
        const saved = localStorage.getItem(key("neb_target_grade"));
        if (saved) setTargetGrade(saved);
      } catch {
        /* storage unavailable / private mode */
      }
    });
  }, []);

  const handleProgressLoaded = useCallback((entries: ProgressEntry[]) => {
    setProgressEntries(entries);
  }, []);

  const owner = isOwnerAccount(user);
  const tier = accessLevelFor(user);
  const veerUnlocked = hasLevel(user, "plus");
  const tierLimit = AI_SPARK_LIMITS[tier];
  const tierMetered = Number.isFinite(tierLimit) && tierLimit > 0;
  const sparkUsed = sparkUsage?.used ?? 0;
  const resetCountdown = useUtcResetCountdown();

  const learning = useMemo(() => learningProgress(progressEntries), [progressEntries]);
  const streak = useMemo(() => computeStudyStreak(progressEntries), [progressEntries]);
  const scholarLevel = useMemo(
    () => scholarLevelFor(learning.completed, user?.credits ?? 0),
    [learning.completed, user?.credits],
  );
  const achievements = useMemo(
    () => deriveAchievements(progressEntries, streak),
    [progressEntries, streak],
  );
  const overview = useMemo(
    () =>
      profileOverview(progressEntries, {
        avatarUrl: media?.avatarUrl ?? null,
        coverUrl: media?.coverUrl ?? null,
        fullName: media?.fullName ?? user?.fullName ?? null,
        username: media?.username ?? null,
        bio: media?.bio ?? null,
        location: media?.location ?? null,
        website: media?.website ?? null,
      }),
    [progressEntries, media, user?.fullName],
  );

  const handleSelectGrade = (grade: string) => {
    setTargetGrade(grade);
    try {
      localStorage.setItem(key("neb_target_grade"), grade);
      scheduleNamespacePush(PREFERENCES_NAMESPACE, { targetGrade: grade });
    } catch {
      /* ignore storage errors */
    }
  };

  const handleVisibility = async (next: string) => {
    if (next === visibility) return;
    setVisibilityOverride(next);
    setSavingVisibility(true);
    setVisibilityError(false);
    try {
      const result = await updateMyProfile({
        visibility: next as "public" | "members" | "private",
      });
      onMediaChanged({ profile: result.profile, storage: null });
      // The server now owns the value — drop the optimistic override.
      setVisibilityOverride(null);
    } catch {
      // Keep the chosen value and surface the error — the user can retry
      // without re-picking (QA contract: an error never loses the selection).
      setVisibilityError(true);
    } finally {
      setSavingVisibility(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="container max-w-6xl space-y-6 py-8">
        <Skeleton className="h-44 w-full" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const email = user.email || "";
  const displayName = media?.fullName || user.fullName || email.split("@")[0] || "User";
  const avatarUrl = media?.avatarUrl ?? null;
  const coverUrl = media?.coverUrl ?? null;
  const username = media?.username ?? null;
  const publicHref = username ? `/profile/${encodeURIComponent(username)}` : "/profile/edit";
  const badge = tierBadgeConfig[tier];
  const RoleIcon = badge.icon;
  const LevelIcon = scholarLevel.icon;

  const handleLogout = async () => {
    await logoutUser();
    router.push("/home");
  };

  const statCards = [
    {
      key: "completed",
      label: "Topics completed",
      value: learning.completed,
      icon: CheckCircle2,
      tint: "text-emerald-500",
      onClick: () => setTab("progress"),
    },
    {
      key: "in-progress",
      label: "In progress",
      value: learning.inProgress,
      icon: BookOpen,
      tint: "text-sky-500",
      onClick: () => setTab("progress"),
    },
    {
      key: "xp",
      label: "Scholar XP",
      value: scholarLevel.currentXp,
      icon: Trophy,
      tint: "text-violet-500",
      onClick: () => setTab("achievements"),
    },
    {
      key: "streak",
      label: "Day streak",
      value: streak,
      icon: Flame,
      tint: "text-orange-500",
      onClick: () => setTab("activity"),
    },
    {
      key: "posts",
      label: "Community posts",
      value: stats?.posts ?? 0,
      icon: MessageSquare,
      tint: "text-fuchsia-500",
      onClick: () => setTab("activity"),
    },
    {
      key: "followers",
      label: "Followers",
      value: stats?.followers ?? 0,
      icon: Users,
      tint: "text-teal-500",
      onClick: () => setTab("activity"),
    },
  ];

  const curriculumSubjects = (SYLLABUS.find((c) => c.slug === "class-11-notes")?.subjects ?? []).map(
    (subject) => ({
      slug: subject.slug,
      name: subject.name,
      href: `/class-11-notes/${subject.slug}`,
      topicCount: syllabusTopicCount(subject.slug),
    }),
  );

  return (
    <div className="container max-w-6xl space-y-5 py-8">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to You
        </button>
      ) : null}

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid max-w-3xl grid-cols-3 sm:grid-cols-6">
          <TabsTrigger value="overview" className="gap-1.5">
            <User className="h-4 w-4" aria-hidden="true" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="progress" className="gap-1.5">
            <UserCheck className="h-4 w-4" aria-hidden="true" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="achievements" className="gap-1.5">
            <Award className="h-4 w-4" aria-hidden="true" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="curriculum" className="gap-1.5">
            <Layers className="h-4 w-4" aria-hidden="true" />
            Curriculum
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-1.5">
            <History className="h-4 w-4" aria-hidden="true" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-1.5">
            <Settings className="h-4 w-4" aria-hidden="true" />
            Account
          </TabsTrigger>
        </TabsList>

        {/* ── Overview: rows 1–4 summary + activity teaser ──────────────── */}
        <TabsContent value="overview" className="space-y-5 pt-2">
          {/* ROW 1 — identity hero */}
          <Card className="overflow-hidden border-primary/20 shadow-sm">
            <div className="relative">
              <ProfileCover url={coverUrl} className="h-32 sm:h-40" priority />
              <ProfileImageEditButton
                kind="cover"
                currentUrl={coverUrl}
                displayName={displayName}
                hasImage={Boolean(coverUrl)}
                onChanged={handleMediaChanged}
                className="absolute right-3 top-3 z-10"
              />
            </div>

            <CardContent className="pb-6 pt-0">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="relative -mt-12 shrink-0 self-start sm:-mt-14">
                    <ProfileAvatar
                      url={avatarUrl}
                      name={displayName}
                      className="h-24 w-24 rounded-2xl border-4 border-background shadow-xl"
                      textClassName="text-2xl"
                      priority
                    />
                    <ProfileImageEditButton
                      kind="avatar"
                      currentUrl={avatarUrl}
                      displayName={displayName}
                      hasImage={Boolean(avatarUrl)}
                      onChanged={handleMediaChanged}
                      className="absolute -bottom-1.5 -right-1.5 z-10"
                    />
                    <div
                      role="img"
                      aria-label={`Scholar level ${scholarLevel.level}: ${scholarLevel.badgeName}`}
                      className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-amber-500 text-xs font-black text-amber-950 shadow"
                      title={scholarLevel.badgeName}
                    >
                      {scholarLevel.level}
                    </div>
                  </div>

                  <div className="min-w-0 sm:pb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="truncate text-2xl font-extrabold tracking-tight">
                        {displayName}
                      </h1>
                      <span
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold ${badge.className}`}
                      >
                        <RoleIcon className="h-3 w-3" aria-hidden="true" />
                        {ACCESS_LABELS[tier]}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        <Award className="h-3 w-3 text-amber-500" aria-hidden="true" />
                        Level {scholarLevel.level} · {scholarLevel.title}
                      </span>
                    </div>
                    {username ? (
                      <p className="mt-1 truncate text-sm text-muted-foreground">@{username}</p>
                    ) : null}
                    <p className="mt-1 flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{email}</span>
                    </p>
                    {media?.bio ? (
                      <p className="mt-1.5 line-clamp-2 max-w-xl text-xs text-muted-foreground">
                        {media.bio}
                      </p>
                    ) : null}
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Flame className="h-3.5 w-3.5 text-orange-500" aria-hidden="true" />
                        <span className="font-semibold text-foreground">{streak}-day</span> streak
                      </span>
                      <span className="text-muted-foreground/40">•</span>
                      <span className="inline-flex items-center gap-1">
                        <Coins className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
                        <span className="font-semibold text-foreground">{user.credits ?? 0}</span>
                        {user.creditsLimit !== undefined && ` / ${user.creditsLimit}`} credits
                      </span>
                      <span className="text-muted-foreground/40">•</span>
                      <span className="inline-flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                        <span className="font-semibold text-foreground">
                          {scholarLevel.currentXp}
                        </span>{" "}
                        XP
                      </span>
                      <span className="text-muted-foreground/40">•</span>
                      <span className="inline-flex items-center gap-1">
                        <GraduationCap className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                        {targetGrade}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Button asChild size="sm" className="rounded-xl">
                    <Link href="/profile/edit">
                      <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="rounded-xl">
                    <Link href={publicHref}>
                      <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      View Public Profile
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button asChild size="sm" variant="outline" className="rounded-xl">
                  <Link href="/credits">
                    <Coins className="h-3.5 w-3.5" aria-hidden="true" />
                    Wallet
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-xl">
                  <Link href="/bookmarks">
                    <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                    Bookmarks
                  </Link>
                </Button>
                {owner && (
                  <Button
                    asChild
                    size="sm"
                    className="rounded-xl bg-amber-500 font-semibold text-amber-950 hover:bg-amber-600"
                  >
                    <Link href="/owner">
                      <Crown className="h-3.5 w-3.5" aria-hidden="true" />
                      Owner Console
                    </Link>
                  </Button>
                )}
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-medium">
                  <span className="text-muted-foreground">
                    Profile {overview.completion.percent}% complete ·{" "}
                    {overview.completion.filled}/{overview.completion.total} fields
                  </span>
                  <Link href="/profile/edit" className={`rounded font-semibold text-primary hover:underline ${focusRingClass}`}>
                    Complete profile
                  </Link>
                </div>
                <Progress value={overview.completion.percent} className="h-1.5" />
              </div>
            </CardContent>
          </Card>

          {/* ROW 2 — quick statistics */}
          <h2 className="sr-only">Overview</h2>
          <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            data-testid="stat-grid"
          >
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.key}
                  data-testid="stat-card"
                  className="transition-colors hover:border-primary/40"
                >
                  <CardContent className="px-3 py-4">
                    <button
                      type="button"
                      onClick={stat.onClick}
                      className={`w-full rounded-lg text-left ${focusRingClass}`}
                      aria-label={`${stat.label}: ${stat.value}`}
                    >
                      <Icon className={`h-4 w-4 ${stat.tint}`} aria-hidden="true" />
                      <p className="mt-1 text-2xl font-black tabular-nums text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-[11px] font-semibold text-muted-foreground">
                        {stat.label}
                      </p>
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* ROW 3 — learning & progress */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <Target className="h-4 w-4 text-primary" aria-hidden="true" />
                  Learning Progress
                </CardTitle>
                <CardDescription className="text-xs">
                  Completed share of your tracked syllabus.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-black tabular-nums text-foreground">
                  {learning.percent}%
                </p>
                <Progress value={learning.percent} className="h-2" />
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                  <span>
                    <span className="font-semibold text-foreground">{learning.completed}</span>{" "}
                    completed
                  </span>
                  <span>
                    <span className="font-semibold text-foreground">{learning.inProgress}</span> in
                    progress
                  </span>
                  <span>
                    <span className="font-semibold text-foreground">{learning.total}</span> tracked
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full rounded-xl text-xs"
                  onClick={() => setTab("progress")}
                >
                  Open progress tracker
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-card to-card">
              <CardContent className="space-y-2 pt-5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Scholar Rank
                  </span>
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                    Level {scholarLevel.level}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <LevelIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="text-base font-bold text-foreground">{scholarLevel.title}</h3>
                </div>
                <p className="text-[11px] text-muted-foreground">Total Scholar XP</p>
                <p className="text-2xl font-black tabular-nums text-foreground">
                  {scholarLevel.currentXp}{" "}
                  <span className="text-xs font-normal text-muted-foreground">XP</span>
                </p>
                <Progress value={scholarLevel.progressPercent} className="h-2" />
                <p className="text-[11px] text-muted-foreground">
                  {scholarLevel.level === 6
                    ? "Mastery max reached"
                    : `${scholarLevel.currentXp - scholarLevel.minXp} / ${
                        scholarLevel.nextXp - scholarLevel.minXp
                      } XP to level ${scholarLevel.level + 1}`}
                </p>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Target className="h-3 w-3 text-primary" aria-hidden="true" />
                  {scholarLevel.nextPerk}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
                  Subject Progress
                </CardTitle>
                <CardDescription className="text-xs">
                  Per-subject completion across your notes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {learning.subjects.length === 0 ? (
                  <p className="rounded-xl border border-dashed px-3 py-4 text-center text-xs text-muted-foreground">
                    No tracked subjects yet.
                  </p>
                ) : (
                  learning.subjects.slice(0, 6).map((row) => (
                    <Link
                      key={row.subjectSlug}
                      href={`/class-11-notes/${row.subjectSlug}`}
                      className={`block space-y-1 rounded-lg p-1 transition-colors hover:bg-muted/50 ${focusRingClass}`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="truncate font-semibold text-foreground">
                          {row.subjectName}
                        </span>
                        <span className="tabular-nums text-muted-foreground">
                          {row.completed}/{row.total}
                        </span>
                      </div>
                      <Progress value={row.percent} className="h-1.5" />
                    </Link>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <Award className="h-4 w-4 text-amber-500" aria-hidden="true" />
                  Achievements
                </CardTitle>
                <CardDescription className="text-xs">
                  {achievements.earned.length} of {achievements.all.length} badges earned.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {achievements.earned.length === 0 ? (
                  <p className="rounded-xl border border-dashed px-3 py-4 text-center text-xs text-muted-foreground">
                    No badges yet — finish your first topic to start.
                  </p>
                ) : (
                  <ul className="flex flex-wrap gap-1.5">
                    {achievements.earned.slice(0, 6).map((badgeRow) => (
                      <li key={badgeRow.id}>
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                          <Trophy className="h-3 w-3" aria-hidden="true" />
                          {badgeRow.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {achievements.next ? (
                  <div className="space-y-1 border-t pt-2">
                    <p className="text-[11px] font-semibold text-foreground">
                      Next: {achievements.next.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {achievements.next.description}
                    </p>
                    <Progress value={achievements.next.progress} className="h-1.5" />
                  </div>
                ) : null}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full rounded-xl text-xs"
                  onClick={() => setTab("achievements")}
                >
                  All badges &amp; ladder
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* ROW 4 — personal & account */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <GraduationCap className="h-4 w-4 text-indigo-500" aria-hidden="true" />
                  Curriculum
                </CardTitle>
                <CardDescription className="text-xs">
                  Grade focus drives notes, PYQs and practice sets.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid gap-1.5">
                  {GRADES.map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => handleSelectGrade(grade)}
                      aria-pressed={targetGrade === grade}
                      className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${focusRingClass} ${
                        targetGrade === grade
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-foreground hover:border-primary/40"
                      }`}
                    >
                      {grade}
                      {targetGrade === grade ? (
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : null}
                    </button>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full rounded-xl text-xs"
                  onClick={() => setTab("curriculum")}
                >
                  Curriculum details
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <User className="h-4 w-4 text-primary" aria-hidden="true" />
                  Account details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between gap-3 border-b py-1">
                  <span className="text-muted-foreground">Access tier</span>
                  <span
                    className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold ${badge.className}`}
                  >
                    <RoleIcon className="h-3 w-3" aria-hidden="true" />
                    {ACCESS_LABELS[tier]}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-b py-1">
                  <span className="text-muted-foreground">Credits</span>
                  <span className="font-medium tabular-nums">
                    {user.credits ?? 0}
                    {user.creditsLimit !== undefined && ` / ${user.creditsLimit}`}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 py-1">
                  <span className="text-muted-foreground">Daily reset</span>
                  <span className="text-[11px] text-muted-foreground">in {resetCountdown}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-1 w-full rounded-xl text-xs"
                  onClick={() => setTab("account")}
                >
                  Account &amp; settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <Layers className="h-4 w-4 text-primary" aria-hidden="true" />
                  Storage usage
                </CardTitle>
                <CardDescription className="text-xs">
                  Avatars, covers and shared files.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {storageInfo ? (
                  <StorageMeter storage={storageInfo} />
                ) : (
                  <p className="text-xs text-muted-foreground">Storage figures loading…</p>
                )}
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>
                    {storageInfo
                      ? `${formatBytes(storageInfo.remainingBytes)} free`
                      : "—"}
                  </span>
                  <Link href="/profile/edit" className={`rounded font-semibold text-primary hover:underline ${focusRingClass}`}>
                    Manage media
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <Pencil className="h-4 w-4 text-primary" aria-hidden="true" />
                  Personal information
                </CardTitle>
                <CardDescription className="text-xs">
                  Shown on your public profile when it is visible.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
                {[
                  { label: "Full name", value: displayName },
                  { label: "Username", value: username ? `@${username}` : "—" },
                  { label: "Email", value: email, verified: true },
                  { label: "Location", value: media?.location ?? "—" },
                  { label: "Website", value: media?.website ?? "—" },
                  { label: "Bio", value: media?.bio ?? "—" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 border-b py-1.5 text-xs last:border-0"
                  >
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="flex min-w-0 items-center gap-1 truncate text-right font-medium">
                      <span className="truncate">{row.value}</span>
                      {row.verified ? (
                        <ShieldCheck
                          className="h-3.5 w-3.5 shrink-0 text-emerald-500"
                          aria-label="Verified"
                        />
                      ) : null}
                    </span>
                  </div>
                ))}
                <Button asChild size="sm" variant="outline" className="mt-1 rounded-xl text-xs">
                  <Link href="/profile/edit">Edit personal information</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <Lock className="h-4 w-4 text-primary" aria-hidden="true" />
                  Privacy settings
                </CardTitle>
                <CardDescription className="text-xs">
                  Who can open your public profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* SelectTrigger drops aria-label (shared ui/select forwards only
                    id), so the distinct accessible name comes from a label. */}
                <label htmlFor="profile-visibility-overview" className="sr-only">
                  Profile visibility (Overview)
                </label>
                <Select value={visibility} onValueChange={handleVisibility}>
                  <SelectTrigger id="profile-visibility-overview" className="h-9 text-xs">
                    <SelectValue>
                      {VISIBILITY_OPTIONS.find((option) => option.value === visibility)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {VISIBILITY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p role="status" className="text-[11px] text-muted-foreground">
                  {savingVisibility
                    ? "Saving…"
                    : visibilityError
                      ? "Couldn't save visibility — try again."
                      : "Progress, badges and credits stay private to you."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Plan & spark pools — credits are owner-only, the tiers are not. */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-violet-500/30 bg-gradient-to-br from-violet-500/[0.07] via-card to-card shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-violet-500" aria-hidden="true" />
                  Plan &amp; AI Spark
                </CardTitle>
                <CardDescription className="text-xs">
                  Your tier&apos;s daily Veer (AI chat) allowance — resets at 12:00 AM UTC.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-xs font-bold text-violet-600 dark:text-violet-400">
                    <Crown className="h-3.5 w-3.5" aria-hidden="true" />
                    {ACCESS_LABELS[tier]} plan
                  </span>
                  <span className="text-xs text-muted-foreground">
                    <span className="font-bold text-foreground">
                      {tierMetered ? `${sparkUsed}/${tierLimit}` : "∞"}
                    </span>{" "}
                    used today
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all"
                    style={{
                      width: tierMetered ? `${Math.min(100, (sparkUsed / tierLimit) * 100)}%` : "100%",
                    }}
                  />
                </div>
                <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    Resets in {resetCountdown}
                  </span>
                  <span className="inline-flex items-center gap-0.5 font-semibold">
                    Plus {AI_SPARK_LIMITS.plus} · Pro {AI_SPARK_LIMITS.pro}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/[0.07] via-card to-card shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <Coins className="h-4 w-4 text-amber-500" aria-hidden="true" />
                  Content Spark Wallet
                </CardTitle>
                <CardDescription className="text-xs">
                  Spent only on note/PYQ unlocks — Veer uses AI sparks, not this wallet.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-2xl font-black leading-none text-foreground">
                      {user.credits ?? 0}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      content sparks available
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-foreground">
                      {tier === "pro" || tier === "owner" ? "Unlimited" : "Daily pool active"}
                    </p>
                    <p className="text-[11px] text-muted-foreground">refills in {resetCountdown}</p>
                  </div>
                </div>
                <Button asChild size="sm" variant="outline" className="w-full rounded-xl text-xs">
                  <Link href="/credits">
                    <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                    Spark Wallet
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* ROW 5 — activity teaser + community */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2">
              <ActivityFeed
                entries={progressEntries}
                compact
                onViewAll={() => setTab("activity")}
              />
            </div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <Users className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  Community
                </CardTitle>
                <CardDescription className="text-xs">
                  Public study posts and replies.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-lg border bg-muted/30 px-2 py-2">
                    <p className="text-lg font-black tabular-nums text-foreground">
                      {stats?.posts ?? 0}
                    </p>
                    <p className="text-[10px] font-semibold text-muted-foreground">posts</p>
                  </div>
                  <div className="rounded-lg border bg-muted/30 px-2 py-2">
                    <p className="text-lg font-black tabular-nums text-foreground">
                      {stats?.comments ?? 0}
                    </p>
                    <p className="text-[10px] font-semibold text-muted-foreground">comments</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {stats?.followers ?? 0} followers · {stats?.following ?? 0} following ·{" "}
                  {stats?.likesReceived ?? 0} likes received
                </p>
                <Button asChild size="sm" variant="outline" className="w-full rounded-xl text-xs">
                  <Link href="/ai/community">Open community</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Progress: the full shared tracker ─────────────────────────── */}
        <TabsContent value="progress" className="space-y-4 pt-2">
          <div className="mb-2 space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">My Progress</h2>
            <p className="text-sm text-muted-foreground">
              Track your learning journey across all subjects.
            </p>
          </div>
          <ProgressPanel
            onProgressLoaded={handleProgressLoaded}
            onProgressChange={handleProgressLoaded}
          />
        </TabsContent>

        {/* ── Achievements: earned badges + the level ladder ────────────── */}
        <TabsContent value="achievements" className="space-y-4 pt-2">
          <h2 className="sr-only">Achievements</h2>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <Award className="h-5 w-5 text-amber-500" aria-hidden="true" />
                Scholar Level &amp; Academic Hierarchy
              </CardTitle>
              <CardDescription>
                Your academic progression tier based on completed topics and study milestones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1 rounded-xl border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">Current Level</p>
                  <p className="flex items-center gap-1.5 text-xl font-bold">
                    <LevelIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                    Level {scholarLevel.level}
                  </p>
                  <p className="text-xs font-medium text-foreground">{scholarLevel.title}</p>
                </div>
                <div className="space-y-1 rounded-xl border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">Topics Mastered</p>
                  <p className="flex items-center gap-1.5 text-xl font-bold">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />
                    {learning.completed}
                  </p>
                  <p className="text-xs text-muted-foreground">100 XP per completed topic</p>
                </div>
              </div>

              <div className="space-y-2 border-t pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Earned badges ({achievements.earned.length}/{achievements.all.length})
                </h4>
                {achievements.earned.length === 0 ? (
                  <p className="rounded-xl border border-dashed px-3 py-4 text-center text-xs text-muted-foreground">
                    No badges yet — complete a topic or study a few days in a row.
                  </p>
                ) : (
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {achievements.earned.map((badgeRow) => (
                      <li
                        key={badgeRow.id}
                        className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/[0.07] p-2.5"
                      >
                        <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-foreground">
                            {badgeRow.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {badgeRow.description}
                          </p>
                          {badgeRow.earnedAt ? (
                            <p className="text-[10px] text-muted-foreground/80">
                              Earned {new Date(badgeRow.earnedAt).toLocaleDateString()}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-2 border-t pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Scholar Progression Roadmap
                </h4>
                <div className="space-y-2">
                  {SCHOLAR_LADDER.map((rung) => {
                    const isCurrent = scholarLevel.level === rung.lvl;
                    const isUnlocked = scholarLevel.level >= rung.lvl;
                    return (
                      <div
                        key={rung.lvl}
                        className={`flex items-center justify-between rounded-lg border p-2.5 text-xs transition-colors ${
                          isCurrent
                            ? "border-primary bg-primary/10 font-medium"
                            : isUnlocked
                              ? "border-muted bg-muted/20 opacity-80"
                              : "border-dashed opacity-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                              isCurrent
                                ? "bg-primary text-primary-foreground"
                                : isUnlocked
                                  ? "bg-muted text-foreground"
                                  : "bg-muted/40 text-muted-foreground"
                            }`}
                          >
                            {rung.lvl}
                          </span>
                          <div>
                            <span className="font-semibold">{rung.title}</span>
                            <span className="ml-2 text-[11px] text-muted-foreground">
                              — {rung.desc}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-muted-foreground">{rung.req}</span>
                          {isUnlocked ? (
                            <CheckCircle2
                              className="h-3.5 w-3.5 text-emerald-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <span className="text-[11px] font-semibold text-muted-foreground/50">
                              —
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Curriculum ────────────────────────────────────────────────── */}
        <TabsContent value="curriculum" className="space-y-4 pt-2">
          <h2 className="sr-only">Curriculum</h2>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <Layers className="h-5 w-5 text-primary" aria-hidden="true" />
                Academic Grade &amp; Curriculum Settings
              </CardTitle>
              <CardDescription>
                Personalize your grade focus for NEB Higher Secondary examinations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-3 rounded-xl border bg-muted/30 p-3">
                <div>
                  <p className="text-xs text-muted-foreground">Target Board</p>
                  <p className="flex items-center gap-1.5 text-sm font-semibold">
                    <GraduationCap className="h-4 w-4 text-indigo-500" aria-hidden="true" />
                    NEB +2
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">CDC Nepal Curriculum</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">
                  Select Current Grade Focus
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {GRADES.map((grade) => (
                    <Button
                      key={grade}
                      type="button"
                      aria-pressed={targetGrade === grade}
                      variant={targetGrade === grade ? "default" : "outline"}
                      className="justify-start rounded-xl text-xs font-semibold"
                      onClick={() => handleSelectGrade(grade)}
                    >
                      <GraduationCap className="mr-2 h-4 w-4" aria-hidden="true" />
                      {grade}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  NEB Curriculum Subjects ({targetGrade})
                </h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {curriculumSubjects.map((subject) => (
                    <Link
                      key={subject.slug}
                      href={subject.href}
                      className={`group flex items-center justify-between rounded-xl border bg-muted/20 p-2.5 text-xs transition-colors hover:bg-muted/40 ${focusRingClass}`}
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                        <span className="font-semibold text-foreground">{subject.name}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground group-hover:text-foreground">
                        <span>{subject.topicCount} topics</span>
                        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Per-subject progress rows live on the Overview "Subject Progress"
              card — kept out of this tab so one statistic never appears twice. */}
        </TabsContent>

        {/* ── Activity: full feed + community + Veer ────────────────────── */}
        <TabsContent value="activity" className="space-y-4 pt-2">
          <h2 className="sr-only">Activity</h2>
          <ActivityFeed entries={progressEntries} />

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-emerald-500/30 bg-emerald-500/[0.06]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <Users className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  Community activity
                </CardTitle>
                <CardDescription className="text-xs">
                  Public study posts and replies — every question helps the batch.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button asChild size="sm" className="rounded-xl text-xs">
                  <Link href="/ai/community">Open community</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-xl text-xs">
                  <Link href="/profile/edit">Manage public profile</Link>
                </Button>
              </CardContent>
            </Card>

            {veerUnlocked ? (
              <Card className="border-fuchsia-500/30 bg-fuchsia-500/[0.06]">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Sparkles className="h-4 w-4 text-fuchsia-500" aria-hidden="true" />
                    Continue with Veer
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Chat with your AI study buddy — powered by daily AI sparks.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button asChild size="sm" className="rounded-xl text-xs">
                    <Link href="/chat">Open Chat</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="rounded-xl text-xs">
                    <Link href="/ai/history">Chat History</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </TabsContent>

        {/* ── Account ───────────────────────────────────────────────────── */}
        <TabsContent value="account" className="space-y-4 pt-2">
          <h2 className="sr-only">Account</h2>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <User className="h-5 w-5 text-primary" aria-hidden="true" />
                Account Details
              </CardTitle>
              <CardDescription>
                Your authenticated account profile and security credentials.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-2 text-sm">
              <div className="flex items-center justify-between gap-4 border-b py-1.5">
                <span className="text-muted-foreground">Full name</span>
                <span className="truncate text-right font-medium">{displayName}</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b py-1.5">
                <span className="text-muted-foreground">Email</span>
                <span className="flex items-center gap-1.5 truncate text-right font-medium">
                  {email}
                  <span title="Verified">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" aria-label="Verified" />
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5">
                <span className="text-muted-foreground">Access tier</span>
                <span className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold ${badge.className}`}
                  >
                    <RoleIcon className="h-3 w-3" aria-hidden="true" />
                    {ACCESS_LABELS[tier]}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {veerUnlocked
                      ? tierMetered
                        ? `${tierLimit} Veer sparks/day`
                        : "Unlimited Veer sparks"
                      : "Veer chat on Plus"}
                  </span>
                </span>
              </div>
              {/* Level, credit balance and daily reset are summary rows on the
                  Overview tab — not repeated here so one statistic never shows
                  up in several tabs. */}
              <div className="space-y-1 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-muted-foreground">Profile visibility</span>
                  <label htmlFor="profile-visibility-account" className="sr-only">
                    Profile visibility (Account)
                  </label>
                  <Select value={visibility} onValueChange={handleVisibility}>
                    <SelectTrigger id="profile-visibility-account" className="h-8 w-52 text-xs">
                      <SelectValue>
                        {VISIBILITY_OPTIONS.find((option) => option.value === visibility)?.label}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {VISIBILITY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p role="status" className="text-right text-[11px] text-muted-foreground">
                  {savingVisibility
                    ? "Saving…"
                    : visibilityError
                      ? "Couldn't save visibility — try again."
                      : ""}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Storage lives on the Overview "Storage usage" card — one meter,
              not two. */}

          {owner && (
            <Card className="border-amber-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <Crown className="h-4 w-4 text-amber-500" aria-hidden="true" />
                  Platform Administration (Owner Email)
                </CardTitle>
                <CardDescription className="text-xs">
                  Quick switches for platform-wide settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  Access is decided by SparkGate and the tier section registry — there is no owner
                  ON/OFF billing switch any more.
                </p>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline" className="rounded-xl text-xs">
                    <Link href="/owner/settings">Platform Settings</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="rounded-xl text-xs">
                    <Link href="/owner/users">User Management</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild size="sm" variant="outline" className="rounded-xl">
              <Link href="/progress">
                <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                Full Progress Page
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="rounded-xl">
              <Link href="/settings">
                <Settings className="h-3.5 w-3.5" aria-hidden="true" />
                App settings
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl border-rose-500/40 text-rose-500 hover:bg-rose-500/10"
              onClick={handleLogout}
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              Log out
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
