"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coins,
  Compass,
  Crown,
  Flame,
  GraduationCap,
  History,
  Layers,
  Lock,
  LogOut,
  Mail,
  Power,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  User,
  UserCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { ProgressPanel } from "@/components/progress/progress-panel";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerUser } from "@/lib/owner";
import { getOwnerSettings, updateOwnerSettings } from "@/lib/api/owner";
import { broadcastCoinGate, parseCoinGateEnabled } from "@/lib/coin-gate";
import { CoinGateDot } from "@/features/credits/coin-gate-dot";
import { getAiSparkUsage, type AiSparkUsage } from "@/lib/api/ai";
import {
  AI_SPARK_LIMITS,
  AI_SPARK_TIER_LABELS,
  aiSparkTierFor,
} from "@/lib/ai/ai-spark-tiers";
import { topicHref } from "@/lib/progress/catalog";
import type { ProgressEntry } from "@/types/api";

const roleBadgeConfig: Record<
  string,
  { label: string; className: string; icon: typeof Crown }
> = {
  OWNER: { label: "Owner", className: "bg-amber-500/15 border-amber-500/30 text-amber-500", icon: Crown },
  ADMIN: { label: "Admin", className: "bg-rose-500/15 border-rose-500/30 text-rose-500", icon: ShieldCheck },
  TEACHER: { label: "Teacher", className: "bg-blue-500/15 border-blue-500/30 text-blue-500", icon: GraduationCap },
  STUDENT: { label: "Student", className: "bg-emerald-500/15 border-emerald-500/30 text-emerald-500", icon: User },
};

// ── Profile features (owner request 2026-10-13: "add more features in
// profile") — study streak, UTC reset countdown and recent-activity feed. ──

/** Consecutive UTC days (ending today or yesterday) with any study activity. */
function computeStudyStreak(entries: ProgressEntry[]): number {
  const days = new Set<string>();
  for (const e of entries) {
    for (const ts of [e.lastViewedAt, e.startedAt, e.completedAt, e.updatedAt]) {
      if (ts) days.add(ts.slice(0, 10));
    }
  }
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const cursor = new Date();
  // Today may still be in progress — the streak survives until a full day is
  // missed, then it counts back from yesterday.
  if (!days.has(iso(cursor))) cursor.setUTCDate(cursor.getUTCDate() - 1);
  let streak = 0;
  while (days.has(iso(cursor))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

/** "7h 12m" until the next UTC midnight — every spark pool refills then. */
function utcResetLabel(): string {
  const now = new Date();
  const next = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
  );
  const ms = Math.max(next.getTime() - now.getTime(), 0);
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return `${h}h ${m}m`;
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

export interface ScholarLevelInfo {
  level: number;
  title: string;
  description: string;
  currentXp: number;
  minXp: number;
  nextXp: number;
  progressPercent: number;
  badgeName: string;
  nextPerk: string;
  icon: typeof Award;
}

export function calculateScholarLevel(completedTopics: number, credits: number = 0): ScholarLevelInfo {
  const baseTopicXp = completedTopics * 100;
  const bonusXp = Math.min(100, (credits || 0) * 5);
  const currentXp = baseTopicXp + bonusXp;

  const tiers = [
    { level: 1, title: "Novice Scholar", minXp: 0, nextXp: 200, desc: "Embarking on the NEB academic path", perk: "Complete 2 topics to unlock Level 2 Explorer", icon: BookOpen },
    { level: 2, title: "Curious Explorer", minXp: 200, nextXp: 500, desc: "Developing solid foundation across science topics", perk: "Complete 5 topics to reach Level 3 Scholar", icon: Compass },
    { level: 3, title: "Active Scholar", minXp: 500, nextXp: 1000, desc: "Mastering formulas, theorems, and core exam units", perk: "Complete 10 topics to reach Level 4 Achiever", icon: Zap },
    { level: 4, title: "Academic Achiever", minXp: 1000, nextXp: 2000, desc: "Commanding deep comprehension across curriculum", perk: "Complete 20 topics to reach Level 5 Master", icon: Target },
    { level: 5, title: "Master Scholar", minXp: 2000, nextXp: 3500, desc: "Top-tier mastery of Class 11 & 12 curriculum", perk: "Complete 35 topics to reach Grandmaster", icon: Trophy },
    { level: 6, title: "NEB Grandmaster", minXp: 3500, nextXp: 5000, desc: "Elite conceptual & numerical mastery", perk: "Maximum level achieved! Ready for Board Exams", icon: Crown },
  ];

  let currentTier = tiers[0];
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (currentXp >= tiers[i].minXp) {
      currentTier = tiers[i];
      break;
    }
  }

  const range = currentTier.nextXp - currentTier.minXp;
  const inTier = Math.max(0, currentXp - currentTier.minXp);
  const progressPercent = currentTier.level === 6 ? 100 : Math.min(100, Math.round((inTier / range) * 100));

  return {
    level: currentTier.level,
    title: currentTier.title,
    description: currentTier.desc,
    currentXp,
    minXp: currentTier.minXp,
    nextXp: currentTier.nextXp,
    progressPercent,
    badgeName: `Level ${currentTier.level} · ${currentTier.title}`,
    nextPerk: currentTier.perk,
    icon: currentTier.icon,
  };
}

const subjectsOverview = [
  { name: "Physics", href: "/class-11-notes/physics", code: "Phy.11/12", topicsCount: "12 Units", color: "from-blue-500/20 to-cyan-500/10 border-blue-500/30" },
  { name: "Chemistry", href: "/class-11-notes/chemistry", code: "Chem.11/12", topicsCount: "14 Units", color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30" },
  { name: "Biology", href: "/class-11-notes/biology", code: "Bio.11/12", topicsCount: "16 Units", color: "from-green-500/20 to-emerald-500/10 border-green-500/30" },
  { name: "Mathematics", href: "/class-11-notes/mathematics", code: "Math.11/12", topicsCount: "11 Units", color: "from-amber-500/20 to-yellow-500/10 border-amber-500/30" },
  { name: "English", href: "/class-11-notes/english", code: "Eng.11/12", topicsCount: "Language & Lit", color: "from-indigo-500/20 to-purple-500/10 border-indigo-500/30" },
  { name: "Nepali", href: "/class-11-notes/nepali", code: "Nep.11/12", topicsCount: "Language & Byakaran", color: "from-rose-500/20 to-pink-500/10 border-rose-500/30" },
];

/**
 * /profile — the account and learning home.
 *
 * Opens straight into the Progress tab so the profile doubles as the
 * learning-progress view. Includes detailed Scholar Level & XP progression,
 * Academic Curriculum details for NEB Class 11/12, and the owner-only Coin
 * Gate toggle: ON → owners pay coins like students; OFF → owners free.
 * Students/customers ALWAYS pay regardless of the toggle.
 */
export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logoutUser } = useSession();

  // Progress entries loaded via ProgressPanel
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);

  // Owner Coin Gate state (for all owner emails)
  const [coinGate, setCoinGate] = useState<boolean | null>(null);
  const [isLoadingGate, setIsLoadingGate] = useState(false);
  const [isSavingGate, setIsSavingGate] = useState(false);
  const [gateMsg, setGateMsg] = useState<string | null>(null);
  const [gateErr, setGateErr] = useState<string | null>(null);

  // Preferred grade level focus (saved in localStorage)
  const [targetGrade, setTargetGrade] = useState<string>("Class 11 Science");

  // Load target grade preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("neb_target_grade");
      if (saved) setTargetGrade(saved);
    } catch {
      // Storage unavailable / private mode
    }
  }, []);

  const handleSelectGrade = (grade: string) => {
    setTargetGrade(grade);
    try {
      localStorage.setItem("neb_target_grade", grade);
    } catch {
      // Ignore storage errors
    }
  };

  // Guests: send to login and return here afterwards
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login?next=/profile");
    }
  }, [isLoading, user, router]);

  const owner = isOwnerUser(user);

  // Load coin gate setting for owner accounts (GLOBAL for all owner emails)
  const loadCoinGate = useCallback(async () => {
    if (!owner) return;
    setIsLoadingGate(true);
    setGateErr(null);
    try {
      const res = await getOwnerSettings();
      setCoinGate(parseCoinGateEnabled(res.settings));
    } catch (err) {
      // Default to true (safe billing fallback)
      setCoinGate((prev) => (prev !== null ? prev : true));
    } finally {
      setIsLoadingGate(false);
    }
  }, [owner]);

  useEffect(() => {
    if (owner) {
      loadCoinGate();
    }
  }, [owner, loadCoinGate]);

  const toggleCoinGate = async () => {
    if (coinGate === null || isSavingGate) return;
    const next = !coinGate;
    setIsSavingGate(true);
    setGateErr(null);
    setGateMsg(null);
    try {
      await updateOwnerSettings([{ key: "coin_gate_enabled", value: next }]);
      setCoinGate(next);
      // Global switch: tell every chat surface immediately (all owner gmails).
      broadcastCoinGate(next);
      // The long ON/OFF announcements are gone (owner request 2026-10-04):
      // the windy dot in the card carries the state now.
      setGateMsg("Spark gate saved.");
    } catch (err) {
      setGateErr(err instanceof Error ? err.message : "Failed to toggle spark gate");
    } finally {
      setIsSavingGate(false);
    }
  };

  // ── AI-spark usage for the Plan card (server is the source of truth) ──
  const [sparkUsage, setSparkUsage] = useState<AiSparkUsage | null>(null);
  useEffect(() => {
    if (!user) return;
    let alive = true;
    getAiSparkUsage()
      .then((s) => {
        if (alive) setSparkUsage(s);
      })
      .catch(() => {
        /* signed out / offline — the card shows the tier allowance only */
      });
    return () => {
      alive = false;
    };
  }, [user]);

  // Callback passed to ProgressPanel so parent receives entries without duplicate getProgress calls
  const handleProgressLoaded = useCallback((entries: ProgressEntry[]) => {
    setProgressEntries(entries);
  }, []);

  const handleProgressChange = useCallback((entries: ProgressEntry[]) => {
    setProgressEntries(entries);
  }, []);

  // Calculate dynamic scholar level based on completed topics & credits
  const completedCount = useMemo(
    () => progressEntries.filter((p) => p.completed).length,
    [progressEntries]
  );

  const scholarLevel = useMemo(
    () => calculateScholarLevel(completedCount, user?.credits ?? 0),
    [completedCount, user?.credits]
  );

  // ── AI-spark tier + study stats (profile features 2026-10-13) ──
  const tier = aiSparkTierFor(user);
  const tierLimit = AI_SPARK_LIMITS[tier];
  const tierMetered = Number.isFinite(tierLimit);
  const sparkUsed = sparkUsage?.used ?? 0;
  const resetCountdown = useUtcResetCountdown();
  const inProgressCount = useMemo(
    () => progressEntries.filter((p) => p.status === "in_progress").length,
    [progressEntries]
  );
  const streakDays = useMemo(
    () => computeStudyStreak(progressEntries),
    [progressEntries]
  );
  const recentActivity = useMemo(
    () =>
      [...progressEntries]
        .sort((a, b) =>
          (b.lastViewedAt ?? b.updatedAt ?? "").localeCompare(
            a.lastViewedAt ?? a.updatedAt ?? "",
          ),
        )
        .slice(0, 8),
    [progressEntries]
  );

  const LevelIcon = scholarLevel.icon;

  if (isLoading || !user) {
    return (
      <div className="container max-w-4xl py-8 space-y-6">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const email = user.email || "";
  const displayName = user.fullName || email.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const role = (user.role || "STUDENT").toUpperCase();
  const badge = roleBadgeConfig[role] || roleBadgeConfig.STUDENT;
  const RoleIcon = badge.icon;

  const handleLogout = async () => {
    await logoutUser();
    router.push("/home");
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      {/* ── Identity header ─────────────────────────────────────────────── */}
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative">
                <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-tr from-primary/20 via-primary/10 to-primary/30 border border-primary/30 flex items-center justify-center text-xl font-extrabold text-primary shadow-inner">
                  {initials}
                </div>
                <div
                  className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-background border-2 border-background flex items-center justify-center text-[10px] font-black text-amber-500 shadow"
                  title={scholarLevel.badgeName}
                >
                  {scholarLevel.level}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold tracking-tight truncate">{displayName}</h1>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${badge.className}`}
                  >
                    <RoleIcon className="h-3 w-3" />
                    {badge.label}
                  </span>
                  {user.premiumStatus && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border bg-violet-500/15 border-violet-500/30 text-violet-500">
                      <Crown className="h-3 w-3" />
                      PRO
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border bg-primary/10 border-primary/20 text-primary">
                    <Award className="h-3 w-3 text-amber-500" />
                    Level {scholarLevel.level} · {scholarLevel.title}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate flex items-center gap-1.5 mt-0.5">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {email}
                </p>
                <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                  {owner && coinGate === false && !user.premiumStatus ? (
                    <CoinGateDot />
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <Coins className="h-3.5 w-3.5 text-amber-500" />
                      <span className="font-semibold text-foreground">{user.credits ?? 0}</span>
                      {user.creditsLimit !== undefined && ` / ${user.creditsLimit}`} credits
                    </span>
                  )}
                  <span className="text-muted-foreground/40">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="font-semibold text-foreground">{scholarLevel.currentXp}</span> XP
                  </span>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="inline-flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-primary" />
                    {targetGrade}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Button asChild size="sm" variant="outline" className="rounded-xl">
                <Link href="/credits">
                  <Coins className="h-3.5 w-3.5" />
                  Wallet
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-xl">
                <Link href="/bookmarks">
                  <Bookmark className="h-3.5 w-3.5" />
                  Bookmarks
                </Link>
              </Button>
              {owner && (
                <Button asChild size="sm" className="rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  <Link href="/owner">
                    <Crown className="h-3.5 w-3.5" />
                    Owner Console
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Plan & AI spark + content-spark wallet (profile features
          2026-10-13) — the tier allowance and both spark pools at a glance. */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Plan & AI spark — daily Veer allowance for the member's tier */}
        <Card className="border-violet-500/30 bg-gradient-to-br from-violet-500/[0.07] via-card to-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-500" />
              Plan &amp; AI Spark
            </CardTitle>
            <CardDescription className="text-xs">
              Your tier's daily Veer (AI chat) allowance — resets at 12:00 AM UTC.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-600 dark:text-violet-400">
                <Crown className="h-3.5 w-3.5" />
                {AI_SPARK_TIER_LABELS[tier]} plan
              </span>
              <span className="text-xs text-muted-foreground">
                <span className="font-bold text-foreground">
                  {tierMetered ? `${sparkUsed}/${tierLimit}` : "∞"}
                </span>{" "}
                used today
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all"
                style={{
                  width: tierMetered
                    ? `${Math.min(100, (sparkUsed / tierLimit) * 100)}%`
                    : "100%",
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Resets in {resetCountdown}
              </span>
              <Link
                href="/pro-plan"
                className="inline-flex items-center gap-0.5 font-semibold text-primary hover:underline"
              >
                Plus 25 · Pro 50 <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Content-spark wallet — spent only on note/content unlocks */}
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/[0.07] via-card to-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Coins className="h-4 w-4 text-amber-500" />
              Content Spark Wallet
            </CardTitle>
            <CardDescription className="text-xs">
              Spent only on actual note/content unlocks — labs, visuals and Veer chat never draw from it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-2xl font-black text-foreground leading-none">
                  {user.credits ?? 0}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  content sparks available
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-foreground">
                  {user.premiumStatus ? "Unlimited (PRO)" : "Daily pool active"}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  refills in {resetCountdown}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="outline" className="rounded-xl text-xs flex-1">
                <Link href="/credits">
                  <Zap className="h-3.5 w-3.5" />
                  Spark Wallet
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-xl text-xs flex-1">
                <Link href="/pro-plan">
                  <Crown className="h-3.5 w-3.5" />
                  Upgrade Plan
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── OWNER EXCLUSIVE: Coin Gate Controller (for all owner emails) ── */}
      {owner && (
        <Card className="border-amber-500/40 bg-gradient-to-r from-amber-500/5 via-background to-amber-500/10 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500">
                  <Crown className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    Owner Spark Gate Control
                    {/* The only place the ON/OFF state shows now — a small
                        windy dot (owner request 2026-10-04). */}
                    <CoinGateDot />
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Owner-only switch — the whole spark library (note/content unlocks).
                  </CardDescription>
                </div>
              </div>

              {/* Instant On/Off Toggle Button */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-background/80 px-3 py-1.5 rounded-xl border">
                  <span className="text-xs font-medium text-muted-foreground">
                    {coinGate ? "Enabled" : "Disabled"}
                  </span>
                  <Switch
                    id="coin-gate-toggle"
                    aria-label="Toggle Spark Gate"
                    checked={!!coinGate}
                    disabled={isSavingGate || coinGate === null}
                    onCheckedChange={toggleCoinGate}
                  />
                </div>
                <Button
                  size="sm"
                  variant={coinGate ? "default" : "outline"}
                  onClick={toggleCoinGate}
                  disabled={isSavingGate || coinGate === null}
                  className="rounded-xl shrink-0"
                >
                  <Power className={`h-3.5 w-3.5 mr-1.5 ${isSavingGate ? "animate-spin" : ""}`} />
                  {isSavingGate
                    ? "Updating…"
                    : coinGate
                    ? "Turn Gate OFF (Free)"
                    : "Turn Gate ON (Require Sparks)"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-1 text-xs space-y-2">
            {gateMsg && (
              <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-600 font-medium">
                {gateMsg}
              </div>
            )}
            {gateErr && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-xs text-destructive">
                {gateErr}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Profile tabs — Progress opens first ─────────────────────────── */}
      <Tabs defaultValue="progress">
        <TabsList className="grid grid-cols-4 max-w-2xl">
          <TabsTrigger value="progress" className="gap-1.5">
            <UserCheck className="h-4 w-4" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="level" className="gap-1.5">
            <Sparkles className="h-4 w-4" />
            Level Details
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-1.5">
            <History className="h-4 w-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-1.5">
            <User className="h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>

        {/* ── Tab 1: Progress (Default) ─────────────────────────────────── */}
        <TabsContent value="progress" className="space-y-4 pt-2">
          {/* Study stats & streak (profile feature 2026-10-13) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="border-orange-500/30 bg-orange-500/[0.06]">
              <CardContent className="pt-5 pb-4 text-center">
                <Flame className="h-5 w-5 mx-auto text-orange-500" />
                <p className="mt-1 text-2xl font-black text-foreground">{streakDays}</p>
                <p className="text-[11px] font-semibold text-muted-foreground">day streak</p>
              </CardContent>
            </Card>
            <Card className="border-emerald-500/30 bg-emerald-500/[0.06]">
              <CardContent className="pt-5 pb-4 text-center">
                <CheckCircle2 className="h-5 w-5 mx-auto text-emerald-500" />
                <p className="mt-1 text-2xl font-black text-foreground">{completedCount}</p>
                <p className="text-[11px] font-semibold text-muted-foreground">topics completed</p>
              </CardContent>
            </Card>
            <Card className="border-sky-500/30 bg-sky-500/[0.06]">
              <CardContent className="pt-5 pb-4 text-center">
                <BookOpen className="h-5 w-5 mx-auto text-sky-500" />
                <p className="mt-1 text-2xl font-black text-foreground">{inProgressCount}</p>
                <p className="text-[11px] font-semibold text-muted-foreground">in progress</p>
              </CardContent>
            </Card>
            <Card className="border-violet-500/30 bg-violet-500/[0.06]">
              <CardContent className="pt-5 pb-4 text-center">
                <Trophy className="h-5 w-5 mx-auto text-violet-500" />
                <p className="mt-1 text-2xl font-black text-foreground">{scholarLevel.currentXp}</p>
                <p className="text-[11px] font-semibold text-muted-foreground">scholar XP</p>
              </CardContent>
            </Card>
          </div>

          {/* Scholar Progression Overview */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-card to-background">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                    <LevelIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Scholar Rank</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
                        Level {scholarLevel.level}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{scholarLevel.title}</h3>
                    <p className="text-xs text-muted-foreground">{scholarLevel.description}</p>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <p className="text-xs text-muted-foreground">Total Scholar XP</p>
                  <p className="text-2xl font-black text-foreground">{scholarLevel.currentXp} <span className="text-xs font-normal text-muted-foreground">XP</span></p>
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Level {scholarLevel.level} Progress</span>
                  <span className="text-foreground">
                    {scholarLevel.level === 6
                      ? "Mastery Max"
                      : `${scholarLevel.currentXp - scholarLevel.minXp} / ${scholarLevel.nextXp - scholarLevel.minXp} XP (${scholarLevel.progressPercent}%)`}
                  </span>
                </div>
                <Progress value={scholarLevel.progressPercent} className="h-2" />
                <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
                  <Target className="h-3 w-3 text-primary" />
                  {scholarLevel.nextPerk}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-1 mb-2">
            <h2 className="text-lg font-semibold tracking-tight">My Progress</h2>
            <p className="text-sm text-muted-foreground">
              Track your learning journey across all subjects.
            </p>
          </div>
          <ProgressPanel
            onProgressLoaded={handleProgressLoaded}
            onProgressChange={handleProgressChange}
          />
        </TabsContent>

        {/* ── Tab 2: Level Details & Curriculum ───────────────────────────── */}
        <TabsContent value="level" className="space-y-4 pt-2">
          {/* Detailed Level & Tier Breakdown */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                Scholar Level & Academic Hierarchy
              </CardTitle>
              <CardDescription>
                Your academic progression tier based on completed topics and study milestones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl border bg-muted/30 space-y-1">
                  <p className="text-xs text-muted-foreground">Current Level</p>
                  <p className="text-xl font-bold flex items-center gap-1.5">
                    <LevelIcon className="h-5 w-5 text-primary" />
                    Level {scholarLevel.level}
                  </p>
                  <p className="text-xs font-medium text-foreground">{scholarLevel.title}</p>
                </div>
                <div className="p-3 rounded-xl border bg-muted/30 space-y-1">
                  <p className="text-xs text-muted-foreground">Topics Mastered</p>
                  <p className="text-xl font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    {completedCount}
                  </p>
                  <p className="text-xs text-muted-foreground">100 XP per completed topic</p>
                </div>
                <div className="p-3 rounded-xl border bg-muted/30 space-y-1">
                  <p className="text-xs text-muted-foreground">Target Board</p>
                  <p className="text-xl font-bold flex items-center gap-1.5">
                    <GraduationCap className="h-5 w-5 text-indigo-500" />
                    NEB +2
                  </p>
                  <p className="text-xs text-muted-foreground">CDC Nepal Curriculum</p>
                </div>
              </div>

              {/* Level Milestones Ladder */}
              <div className="space-y-2 border-t pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Scholar Progression Roadmap
                </h4>
                <div className="space-y-2">
                  {[
                    { lvl: 1, title: "Novice Scholar", req: "0 - 2 topics", desc: "First steps into NEB syllabus" },
                    { lvl: 2, title: "Curious Explorer", req: "3 - 5 topics", desc: "Solid conceptual foundation" },
                    { lvl: 3, title: "Active Scholar", req: "6 - 10 topics", desc: "Core derivations & problem solving" },
                    { lvl: 4, title: "Academic Achiever", req: "11 - 20 topics", desc: "Advanced cross-topic mastery" },
                    { lvl: 5, title: "Master Scholar", req: "21 - 35 topics", desc: "Near-total syllabus mastery" },
                    { lvl: 6, title: "NEB Grandmaster", req: "36+ topics", desc: "Board exam excellence tier" },
                  ].map((tier) => {
                    const isCurrent = scholarLevel.level === tier.lvl;
                    const isUnlocked = scholarLevel.level >= tier.lvl;
                    return (
                      <div
                        key={tier.lvl}
                        className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-colors ${
                          isCurrent
                            ? "border-primary bg-primary/10 font-medium"
                            : isUnlocked
                            ? "border-muted bg-muted/20 opacity-80"
                            : "border-dashed opacity-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isCurrent
                                ? "bg-primary text-primary-foreground"
                                : isUnlocked
                                ? "bg-muted text-foreground"
                                : "bg-muted/40 text-muted-foreground"
                            }`}
                          >
                            {tier.lvl}
                          </span>
                          <div>
                            <span className="font-semibold">{tier.title}</span>
                            <span className="text-muted-foreground ml-2 text-[11px]">— {tier.desc}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-[11px]">{tier.req}</span>
                          {isUnlocked ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                          ) : (
                            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Grade Focus & Curriculum Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Academic Grade & Curriculum Settings
              </CardTitle>
              <CardDescription>
                Personalize your grade focus for NEB Higher Secondary examinations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Select Current Grade Focus</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {["Class 11 Science", "Class 12 Science", "Combined (+2 Both)"].map((grade) => (
                    <Button
                      key={grade}
                      type="button"
                      variant={targetGrade === grade ? "default" : "outline"}
                      className="rounded-xl text-xs font-semibold justify-start"
                      onClick={() => handleSelectGrade(grade)}
                    >
                      <GraduationCap className="h-4 w-4 mr-2" />
                      {grade}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Subject units overview */}
              <div className="space-y-2 border-t pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  NEB Curriculum Subjects ({targetGrade})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {subjectsOverview.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="flex items-center justify-between p-2.5 rounded-xl border bg-muted/20 hover:bg-muted/40 transition-colors text-xs group"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-3.5 w-3.5 text-primary" />
                        <span className="font-semibold text-foreground">{sub.name}</span>
                        <span className="text-[10px] text-muted-foreground">({sub.code})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] group-hover:text-foreground">
                        <span>{sub.topicsCount}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab 3: Account & Settings ───────────────────────────────────── */}
        <TabsContent value="account" className="space-y-4 pt-2">
          {/* Identity & Account Details */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Account Details
              </CardTitle>
              <CardDescription>
                Your authenticated account profile and security credentials.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4 py-1.5 border-b">
                <span className="text-muted-foreground">Full name</span>
                <span className="font-medium text-right truncate">{displayName}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5 border-b">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium text-right truncate flex items-center gap-1.5">
                  {email}
                  <span title="Verified">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5 border-b">
                <span className="text-muted-foreground">Role</span>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded ${badge.className}`}>
                  <RoleIcon className="h-3 w-3" />
                  {badge.label}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5 border-b">
                <span className="text-muted-foreground">Scholar Level</span>
                <span className="font-medium text-right">
                  Level {scholarLevel.level} ({scholarLevel.title})
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5 border-b">
                <span className="text-muted-foreground">Daily Credits</span>
                {owner && coinGate === false && !user.premiumStatus ? (
                  <span className="font-medium text-emerald-500">Free — gate OFF for owners</span>
                ) : (
                  <span className="font-medium">
                    {user.credits ?? 0}
                    {user.creditsLimit !== undefined && ` / ${user.creditsLimit}`}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5 border-b">
                <span className="text-muted-foreground">Plan</span>
                <span className={`font-semibold ${user.premiumStatus ? "text-violet-500" : "text-muted-foreground"}`}>
                  {user.premiumStatus ? "PRO — Active" : "Free tier"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1.5">
                <span className="text-muted-foreground">Daily Reset Rule</span>
                <span className="text-xs text-muted-foreground">
                  4 platform credits replenished at 12:00 AM UTC
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Owner Platform Setting shortcut if owner */}
          {owner && (
            <Card className="border-amber-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Crown className="h-4 w-4 text-amber-500" />
                  Platform Administration (Owner Email)
                </CardTitle>
                <CardDescription className="text-xs">
                  Quick switches for platform-wide settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between gap-3 p-3 rounded-lg border bg-muted/20">
                  <div>
                    <p className="text-xs font-semibold flex items-center gap-1.5">
                      Spark Gate — owner emails only
                      <CoinGateDot />
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={coinGate ? "default" : "outline"}
                    onClick={toggleCoinGate}
                    disabled={isSavingGate || coinGate === null}
                    className="rounded-xl text-xs shrink-0"
                  >
                    {isSavingGate ? "Saving…" : coinGate ? "Disable Gate" : "Enable Gate"}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline" className="rounded-xl text-xs">
                    <Link href="/owner/settings">
                      Platform Settings
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="rounded-xl text-xs">
                    <Link href="/owner/users">
                      User Management
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild size="sm" variant="outline" className="rounded-xl">
              <Link href="/progress">
                <GraduationCap className="h-3.5 w-3.5" />
                Full Progress Page
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl text-rose-500 border-rose-500/40 hover:bg-rose-500/10"
              onClick={handleLogout}
            >
              <LogOut className="h-3.5 w-3.5" />
              Log out
            </Button>
          </div>
        </TabsContent>

        {/* ── Tab 3: Activity (profile feature 2026-10-13) ────────────────── */}
        <TabsContent value="activity" className="space-y-4 pt-2">
          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
                Recent Study Activity
              </CardTitle>
              <CardDescription className="text-xs">
                Your latest topic sessions — pick up where you left off.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentActivity.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No activity yet — open any topic and it will show up here.
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {recentActivity.map((entry) => {
                    const href = topicHref(entry);
                    const title = entry.topic?.title || entry.topicSlug || "Topic";
                    return (
                      <li key={entry.id}>
                        <Link
                          href={href}
                          className="flex items-center justify-between gap-3 rounded-xl border border-border/50 px-3 py-2 hover:bg-muted/50 transition-colors"
                        >
                          <span className="flex items-center gap-2.5 min-w-0">
                            {entry.completed ? (
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                            ) : (
                              <BookOpen className="h-4 w-4 shrink-0 text-sky-500" />
                            )}
                            <span className="min-w-0">
                              <span className="block truncate text-xs font-semibold text-foreground">
                                {title}
                              </span>
                              <span className="block truncate text-[11px] text-muted-foreground capitalize">
                                {entry.subjectSlug?.replace(/-/g, " ")} ·{" "}
                                {entry.completed ? "completed" : "in progress"}
                              </span>
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card className="border-fuchsia-500/30 bg-fuchsia-500/[0.06]">
            <CardContent className="pt-5 pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-fuchsia-500" />
                  Continue with Veer
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {tierMetered
                    ? `${sparkUsed} of ${tierLimit} AI sparks used today.`
                    : "Unlimited AI sparks on the owner plan."}
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" className="rounded-xl text-xs">
                  <Link href="/chat">Open Chat</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-xl text-xs">
                  <Link href="/ai/history">Chat History</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
