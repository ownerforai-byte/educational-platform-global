"use client";

import Link from "next/link";
import {
  Award,
  Bell,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  Info,
  Languages,
  Landmark,
  Palette,
  School,
  Scale,
  Smartphone,
  Star,
  Sun,
  Target,
  Trash2,
  Type,
  User,
  Users,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DAILY_MINUTES_OPTIONS, type StudyPreferences } from "@/lib/study-goals";
import { useStudyGoals } from "./use-study-goals";
import { GuestGoalsPrompt } from "./guest-goals-prompt";
import { toast } from "sonner";
import { DEPLOY_VERSION } from "@/lib/deploy-version";
import { useSession } from "@/features/auth/hooks/use-session";
import { Footer } from "@/components/layout/footer";

/**
 * /settings — grouped like the reference Settings list: each group is a card
 * with a coloured icon-chip header and its options are rows (icon chip +
 * label + subtitle + control). Everything here saves on this device only, so
 * the owner asked for "many things inside it" without a server round-trip.
 */

type IconType = typeof Sun;

function GroupCard({
  icon: Icon,
  tint,
  label,
  children,
}: {
  icon: IconType;
  tint: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/60 bg-card/60">
      <div className="flex items-center gap-2.5 px-2.5 py-2">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tint}`}>
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-[12px] font-bold text-foreground">{label}</span>
      </div>
      <div className="space-y-0.5 px-1.5 pb-1.5">{children}</div>
    </section>
  );
}

function Row({
  icon: Icon,
  tint,
  label,
  subtitle,
  children,
}: {
  icon: IconType;
  tint: string;
  label: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl px-2 py-2">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tint}`}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-medium text-foreground">{label}</p>
        {subtitle && <p className="truncate text-[10px] text-muted-foreground">{subtitle}</p>}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
}

function RowLink({
  icon: Icon,
  tint,
  label,
  subtitle,
  href,
}: {
  icon: IconType;
  tint: string;
  label: string;
  subtitle?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
    >
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tint}`}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-medium">{label}</p>
        {subtitle && <p className="truncate text-[10px] text-muted-foreground">{subtitle}</p>}
      </div>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
    </Link>
  );
}

const SELECT = "h-9 rounded-lg border border-border/80 bg-background px-2 text-xs font-medium";

/** /settings: language, theme, study goals, notifications, accessibility. */
export function SettingsView() {
  const { goals, save, guest, adoptGuest, dropGuest, dismissGuest } = useStudyGoals();
  const { user } = useSession();
  const prefs = goals.preferences;
  const setPrefs = (patch: Partial<StudyPreferences>) =>
    save({ ...goals, preferences: { ...prefs, ...patch } });

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Saved on this device only.</p>
      </div>

      <GuestGoalsPrompt guest={guest} onTransfer={adoptGuest} onDiscard={dropGuest} onLater={dismissGuest} />

      <div className="space-y-3">
        <GroupCard icon={Palette} tint="bg-violet-500/10 text-violet-600 dark:text-violet-400" label="Appearance">
          <Row icon={Sun} tint="bg-amber-500/10 text-amber-600 dark:text-amber-400" label="Theme">
            <ThemeToggle variant="inline" />
          </Row>
          <Row icon={Type} tint="bg-blue-500/10 text-blue-600 dark:text-blue-400" label="Text size" subtitle="Larger text across the app">
            <Switch checked={prefs.largeText} onCheckedChange={(checked) => setPrefs({ largeText: checked })} />
          </Row>
          <Row icon={Languages} tint="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" label="Language" subtitle="UI, tutor and Ask AI answers">
            <select
              aria-label="Language"
              className={SELECT}
              value={prefs.language}
              onChange={(e) => setPrefs({ language: e.target.value === "ne" ? "ne" : "en" })}
            >
              <option value="en">English</option>
              <option value="ne">नेपाली</option>
            </select>
          </Row>
        </GroupCard>

        <GroupCard icon={Target} tint="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" label="Study goals">
          <Row icon={Calendar} tint="bg-sky-500/10 text-sky-600 dark:text-sky-400" label="Exam date">
            <Input
              aria-label="Exam date"
              type="date"
              className="h-9 w-40 text-xs"
              value={goals.examDate ?? ""}
              onChange={(e) => save({ ...goals, examDate: e.target.value || null })}
            />
          </Row>
          <Row icon={Target} tint="bg-rose-500/10 text-rose-600 dark:text-rose-400" label="Target %">
            <Input
              aria-label="Target percent"
              type="number"
              min={0}
              max={100}
              className="h-9 w-24 text-xs"
              value={goals.targetPercent ?? ""}
              onChange={(e) =>
                save({ ...goals, targetPercent: e.target.value === "" ? null : Number(e.target.value) })
              }
            />
          </Row>
          <Row icon={Clock} tint="bg-teal-500/10 text-teal-600 dark:text-teal-400" label="Daily study time">
            <select
              aria-label="Daily study time"
              className={SELECT}
              value={goals.dailyMinutes}
              onChange={(e) => save({ ...goals, dailyMinutes: Number(e.target.value) })}
            >
              {DAILY_MINUTES_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m} minutes
                </option>
              ))}
            </select>
          </Row>
        </GroupCard>

        <GroupCard icon={User} tint="bg-sky-500/10 text-sky-600 dark:text-sky-400" label="Account">
          <RowLink icon={User} tint="bg-violet-500/10 text-violet-600 dark:text-violet-400" label="My profile" subtitle="Identity, progress and saved work" href="/profile" />
          <RowLink icon={Trash2} tint="bg-rose-500/10 text-rose-600 dark:text-rose-400" label="Request account deletion" subtitle="Verified by support before deletion" href="/legal/delete-account" />
        </GroupCard>

        <GroupCard icon={Bell} tint="bg-rose-500/10 text-rose-600 dark:text-rose-400" label="Notifications & accessibility">
          <Row icon={Bell} tint="bg-amber-500/10 text-amber-600 dark:text-amber-400" label="Daily study reminder">
            <Switch checked={prefs.notifyDailyReminder} onCheckedChange={(checked) => setPrefs({ notifyDailyReminder: checked })} />
          </Row>
          <Row icon={Award} tint="bg-violet-500/10 text-violet-600 dark:text-violet-400" label="Streak & achievement alerts">
            <Switch checked={prefs.notifyStreakAlerts} onCheckedChange={(checked) => setPrefs({ notifyStreakAlerts: checked })} />
          </Row>
          <Row icon={Sun} tint="bg-blue-500/10 text-blue-600 dark:text-blue-400" label="Reduce motion" subtitle="Calmer transitions and animations">
            <Switch checked={prefs.reduceMotion} onCheckedChange={(checked) => setPrefs({ reduceMotion: checked })} />
          </Row>
        </GroupCard>

        <GroupCard icon={Building2} tint="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" label="For institutions">
          <Row icon={School} tint="bg-sky-500/10 text-sky-600 dark:text-sky-400" label="For Schools" subtitle="Enterprise · Email: sahrocky81@gmail.com">
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[8.5px] font-bold text-muted-foreground">Confidential</span>
          </Row>
          <Row icon={Users} tint="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" label="For Teachers" subtitle="Enterprise · Email: sahrocky81@gmail.com">
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[8.5px] font-bold text-muted-foreground">Confidential</span>
          </Row>
        </GroupCard>

        <GroupCard icon={Scale} tint="bg-amber-500/10 text-amber-600 dark:text-amber-400" label="Sources & disclaimers">
          <RowLink
            icon={Landmark}
            tint="bg-rose-500/10 text-rose-600 dark:text-rose-400"
            label="Official sources"
            subtitle="NEB, CDC, MoEST · not affiliated"
            href="/official-sources"
          />
        </GroupCard>

        <GroupCard icon={Smartphone} tint="bg-violet-500/10 text-violet-600 dark:text-violet-400" label="App">
          <Row icon={Info} tint="bg-sky-500/10 text-sky-600 dark:text-sky-400" label="App version" subtitle="Current build">
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">v{DEPLOY_VERSION}</span>
          </Row>
          <Row icon={Star} tint="bg-amber-500/10 text-amber-600 dark:text-amber-400" label="Rate this app" subtitle="Enjoying it? Leave a rating">
            <button type="button" onClick={() => toast.success("Thanks for rating Ravikisan's Platform!")} className="rounded-md bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground transition hover:opacity-90">
              Rate
            </button>
          </Row>
        </GroupCard>
      </div>

      <Footer user={user} />
    </div>
  );
}
