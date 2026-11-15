"use client";

/**
 * Visitor-facing profile sections — the building blocks of the public profile.
 *
 * Every row reads its numbers from the frozen public foundations
 * (`profile-derived.ts`, `lib/api/profile.ts`) and NOTHING here may render a
 * credit figure: credits are owner-only, so the public surface shows learning
 * progress, scholar level and badges derived from completed topics alone.
 *
 * Sections are shared by the Overview tab (compact variants) and the dedicated
 * tabs (full variants), so the same table is never rendered twice.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Award,
  Briefcase,
  Check,
  Compass,
  ExternalLink,
  FileText,
  Flame,
  Globe,
  GraduationCap,
  Heart,
  MapPin,
  MessageSquare,
  Share2,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FollowButton } from "@/features/profile/follow-button";
import { ProfileAvatar, ProfileCover } from "@/features/profile/profile-media";
import {
  learningProgressFromCounts,
  publicAchievements,
  scholarLevelFor,
  type LearningProgress,
} from "@/features/profile/profile-derived";
import { ACHIEVEMENT_RULES } from "@/features/achievements";
import { attachmentFileUrl } from "@/lib/api/community-feed";import {
  formatBytes,
  profilePath,
  type ProfileListUser,
  type ProfileStats,
  type PublicProfile,
  type PublicProgressCounts,
} from "@/lib/api/profile";
import { cn } from "@/lib/utils";

// ── Tab registry (single source of truth for the public profile) ───────────

export const PUBLIC_PROFILE_TABS = [
  { id: "overview", label: "Overview" },
  { id: "about", label: "About" },
  { id: "progress", label: "Progress" },
  { id: "badges", label: "Badges" },
  { id: "posts", label: "Posts" },
  { id: "files", label: "Files" },
  { id: "followers", label: "Followers" },
  { id: "following", label: "Following" },
] as const;

export type PublicProfileTab = (typeof PUBLIC_PROFILE_TABS)[number]["id"];

/** `/profile/<username>` for Overview, `/profile/<username>/<tab>` otherwise. */
export function publicTabHref(username: string, tab: PublicProfileTab): string {
  const base = profilePath(username, username);
  return tab === "overview" ? base : `${base}/${tab}`;
}

// ── Small shared primitives ────────────────────────────────────────────────

function Section({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <div className="min-w-0">
          <CardTitle className="text-base">{title}</CardTitle>
          {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function QuietNote({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-primary underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}

function StatCell({
  label,
  value,
  href,
  icon: Icon,
}: {
  label: string;
  value: number;
  href?: string;
  icon?: typeof Users;
}) {
  const body = (
    <>
      <p className="flex items-center gap-1.5 text-lg font-semibold tabular-nums">
        {Icon ? <Icon className="h-4 w-4 text-muted-foreground" aria-hidden /> : null}
        {value.toLocaleString()}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </>
  );
  const className = "rounded-lg border border-border p-3 transition-colors";
  return href ? (
    <Link href={href} className={cn(className, "hover:bg-muted")}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}

const SOCIAL_KEYS: ReadonlyArray<{ key: string; label: string }> = [
  { key: "github", label: "GitHub" },
  { key: "twitter", label: "Twitter" },
  { key: "x", label: "X" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "youtube", label: "YouTube" },
  { key: "portfolio", label: "Portfolio" },
];

function extraString(extras: Record<string, unknown>, key: string): string | null {
  const value = extras[key];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function asHref(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function membershipLabel(plan: string | null): string | null {
  if (!plan) return null;
  const trimmed = plan.trim();
  if (!trimmed || trimmed.toLowerCase() === "free") return null;
  return trimmed.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Achievements carry no date publicly — only a provable milestone label. */
function verifiedMilestone(id: string): string | null {
  const rule = ACHIEVEMENT_RULES.find((entry) => entry.id === id);
  if (!rule) return null;
  if (id === "first-topic") return "Verified: first topic completed";
  if (id.startsWith("topics-")) return `Verified: ${rule.target} topics completed`;
  if (id === "explorer") return `Verified: ${rule.target} topics opened`;
  if (id === "quarter" || id === "half") {
    return `Verified: ${rule.target}% of the syllabus completed`;
  }
  return null;
}

const BADGE_ICONS: Record<string, typeof Award> = {
  "first-topic": Sparkles,
  "topics-10": Trophy,
  "topics-50": Award,
  explorer: Compass,
  quarter: Target,
  half: Star,
};

function badgeIcon(id: string): typeof Award {
  if (BADGE_ICONS[id]) return BADGE_ICONS[id];
  if (id.startsWith("streak")) return Flame;
  return Award;
}

// ── Row 1 · Public identity ────────────────────────────────────────────────

function ShareProfileButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      /* clipboard blocked — the link is still visible in the address bar */
    }
  };

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="min-h-11"
      aria-label={copied ? "Profile link copied" : "Copy profile link"}
      onClick={() => void copy()}
    >
      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Share2 className="h-4 w-4" aria-hidden />}
      {copied ? "Copied" : "Share"}
    </Button>
  );
}

export function PublicIdentityRow({
  profile,
  username,
  shareUrl,
  following,
  viewerId,
  completedTopics,
  onFollowingChange,
}: {
  profile: PublicProfile;
  username: string;
  /** Absolute link resolved by the shell through lib/site-url. */
  shareUrl: string;
  following: boolean;
  viewerId?: string | null;
  /** Public completed-topic count; credits are owner-only so they are not passed. */
  completedTopics?: number | null;
  onFollowingChange?: (following: boolean) => void;
}) {
  const handle = profile.username ?? username;
  const plan = membershipLabel(profile.plan);
  const website = profile.website ? asHref(profile.website) : null;
  const level = typeof completedTopics === "number" ? scholarLevelFor(completedTopics) : null;

  return (
    <header className="overflow-hidden rounded-xl border border-border bg-card">
      <ProfileCover url={profile.coverUrl} className="h-32 sm:h-40" />
      <div className="px-4 pb-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 items-end gap-3">
            <ProfileAvatar
              url={profile.avatarUrl}
              name={profile.fullName}
              className="-mt-12 h-20 w-20 shrink-0 rounded-full border-4 border-card sm:h-24 sm:w-24"
              textClassName="text-lg"
            />
            <div className="min-w-0 pb-1">
              <h1 className="truncate text-xl font-semibold sm:text-2xl">{profile.fullName}</h1>
              <p className="truncate text-sm text-muted-foreground">@{handle}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {profile.isYou ? (
              <Button size="sm" variant="outline" asChild className="min-h-11">
                <Link href="/profile/edit">Edit profile</Link>
              </Button>
            ) : (
              <FollowButton
                username={profile.username}
                targetUserId={profile.id}
                initialFollowing={following}
                viewerId={viewerId}
                onChange={onFollowingChange}
              />
            )}
            <ShareProfileButton url={shareUrl} />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {level ? (
            <Badge variant="secondary" className="gap-1" aria-label={`Scholar level ${level.level}, ${level.title}`}>
              <Award className="h-3 w-3" aria-hidden />
              Level {level.level} · {level.title}
            </Badge>
          ) : null}
          {plan ? (
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3" aria-hidden />
              {plan}
            </Badge>
          ) : null}
          {typeof profile.role === "string" && profile.role && profile.role !== "student" ? (
            <Badge variant="outline">{profile.role}</Badge>
          ) : null}
        </div>

        {profile.bio ? (
          <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{profile.bio}</p>
        ) : null}

        {profile.location || website ? (
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {profile.location ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {profile.location}
              </span>
            ) : null}
            {website ? (
              <a
                href={website}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
              >
                <Globe className="h-3.5 w-3.5" aria-hidden />
                {profile.website}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}

// ── Row 2 · Public statistics ──────────────────────────────────────────────

export function PublicStatsRow({
  stats,
  progress,
  username,
}: {
  stats: ProfileStats | null;
  progress: PublicProgressCounts | null;
  username: string;
}) {
  const cells: React.ReactNode[] = [];
  const handle = username;

  if (stats) {
    if (typeof stats.posts === "number") {
      cells.push(
        <StatCell
          key="posts"
          label="posts"
          value={stats.posts}
          href={publicTabHref(handle, "posts")}
          icon={FileText}
        />,
      );
    }
    if (typeof stats.comments === "number") {
      cells.push(
        <StatCell key="comments" label="comments" value={stats.comments} icon={MessageSquare} />,
      );
    }
    if (typeof stats.likesReceived === "number") {
      cells.push(<StatCell key="likes" label="likes received" value={stats.likesReceived} icon={Heart} />);
    }
    if (typeof stats.filesShared === "number") {
      cells.push(
        <StatCell
          key="files"
          label="files shared"
          value={stats.filesShared}
          href={publicTabHref(handle, "files")}
        />,
      );
    }
    if (typeof stats.followers === "number") {
      cells.push(
        <StatCell
          key="followers"
          label="followers"
          value={stats.followers}
          href={publicTabHref(handle, "followers")}
          icon={Users}
        />,
      );
    }
    if (typeof stats.following === "number") {
      cells.push(
        <StatCell
          key="following"
          label="following"
          value={stats.following}
          href={publicTabHref(handle, "following")}
        />,
      );
    }
  }

  // Progress-dependent stats only when the owner publishes progress.
  if (progress) {
    cells.push(
      <StatCell
        key="completed"
        label="topics completed"
        value={progress.completed}
        href={publicTabHref(handle, "progress")}
      />,
    );
    cells.push(
      <StatCell
        key="percent"
        label="syllabus %"
        value={progress.percent}
        href={publicTabHref(handle, "progress")}
      />,
    );
  }

  if (cells.length === 0) return null;

  return (
    <Section title="Public statistics">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">{cells}</div>
    </Section>
  );
}

// ── Row 3 · Public learning progress ───────────────────────────────────────

function ScholarLevelSummary({ completed }: { completed: number }) {
  // Credits are owner-only, so the visitor's level comes from topics alone.
  const level = scholarLevelFor(completed);
  const atMax = level.level >= 6;
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant="secondary" className="gap-1">
          <Award className="h-3 w-3" aria-hidden />
          Level {level.level} · {level.title}
        </Badge>
        <span className="text-xs text-muted-foreground tabular-nums">
          {level.currentXp.toLocaleString()} learning points
        </span>
      </div>
      <Progress value={level.progressPercent} className="mt-2" indicatorClassName="bg-primary" />
      <p className="mt-1 text-xs text-muted-foreground">
        {atMax
          ? "Highest scholar level reached."
          : `${level.progressPercent}% to the next level (${level.nextXp.toLocaleString()} points)`}
      </p>
    </div>
  );
}

function SubjectBars({ learning }: { learning: LearningProgress }) {
  if (learning.subjects.length === 0) {
    return <QuietNote>No subject progress shared yet.</QuietNote>;
  }
  return (
    <ul className="space-y-3">
      {learning.subjects.map((subject) => (
        <li key={subject.subjectSlug}>
          <div className="flex items-baseline justify-between gap-2 text-sm">
            <span className="truncate font-medium">{subject.subjectName}</span>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
              {subject.completed}/{subject.total} · {subject.percent}%
            </span>
          </div>
          <Progress
            value={subject.percent}
            className="mt-1.5"
            indicatorClassName="bg-primary/80"
          />
        </li>
      ))}
    </ul>
  );
}

export function PublicProgressRow({
  progress,
  username,
  compact = false,
}: {
  progress: PublicProgressCounts | null;
  username: string;
  compact?: boolean;
}) {
  const learning = learningProgressFromCounts(progress);
  const action = compact ? <TextLink href={publicTabHref(username, "progress")}>Details</TextLink> : null;

  if (!learning) {
    return (
      <Section title="Learning progress" action={action}>
        <QuietNote>Progress is private.</QuietNote>
      </Section>
    );
  }

  if (compact) {
    return (
      <Section title="Learning progress" action={action}>
        <div className="space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
            <span className="font-medium">{learning.percent}% of the syllabus</span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {learning.completed} completed · {learning.inProgress} in progress · {learning.total} topics
            </span>
          </div>
          <Progress value={learning.percent} indicatorClassName="bg-primary" />
          <ScholarLevelSummary completed={learning.completed} />
        </div>
      </Section>
    );
  }

  return (
    <Section
      title="Learning progress"
      description="Derived from the topics this learner has completed."
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-2xl font-semibold tabular-nums">{learning.percent}%</span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {learning.completed} of {learning.total} topics completed
            </span>
          </div>
          <Progress value={learning.percent} indicatorClassName="bg-primary" />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <StatCell label="completed" value={learning.completed} />
          <StatCell label="in progress" value={learning.inProgress} />
          <StatCell label="not started" value={learning.notStarted} />
        </div>

        <ScholarLevelSummary completed={learning.completed} />

        <div>
          <h3 className="mb-2 text-sm font-medium">By subject</h3>
          <SubjectBars learning={learning} />
        </div>
      </div>
    </Section>
  );
}

// ── Row 4 · Achievements & badges ──────────────────────────────────────────

export function PublicBadgesRow({
  progress,
  username,
  compact = false,
}: {
  progress: PublicProgressCounts | null;
  username: string;
  compact?: boolean;
}) {
  const action = compact ? <TextLink href={publicTabHref(username, "badges")}>All badges</TextLink> : null;

  if (!progress) {
    return (
      <Section title="Achievements & badges" action={action}>
        <QuietNote>Badges are private.</QuietNote>
      </Section>
    );
  }

  const earned = publicAchievements(progress).earned;
  if (earned.length === 0) {
    return (
      <Section title="Achievements & badges" action={action}>
        <QuietNote>No public badges yet.</QuietNote>
      </Section>
    );
  }

  const visible = compact ? earned.slice(0, 3) : earned;

  return (
    <Section
      title="Achievements & badges"
      description={compact ? undefined : "Only badges this learner has already earned are shown."}
      action={action}
    >
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((badge) => {
          const Icon = badgeIcon(badge.id);
          const milestone = verifiedMilestone(badge.id);
          return (
            <li key={badge.id} className="rounded-lg border border-border bg-muted/40 p-3">
              <Icon className="h-5 w-5 text-primary" aria-hidden />
              <p className="mt-2 text-sm font-medium">{badge.title}</p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
              {milestone ? <p className="mt-1 text-[11px] text-primary">{milestone}</p> : null}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

// ── Row 5 · About me ───────────────────────────────────────────────────────

export function PublicAboutRow({
  profile,
  username,
  compact = false,
}: {
  profile: PublicProfile;
  username: string;
  compact?: boolean;
}) {
  const extras = profile.extras ?? {};
  const fields: Array<{ label: string; value: string; icon?: typeof Users }> = [];
  const education = extraString(extras, "education");
  const occupation = extraString(extras, "occupation");
  const skills = extraString(extras, "skills");
  const interests = extraString(extras, "interests");
  const intro = extraString(extras, "intro");

  if (education) fields.push({ label: "Education", value: education, icon: GraduationCap });
  if (occupation) fields.push({ label: "Profession", value: occupation, icon: Briefcase });
  if (skills) fields.push({ label: "Skills", value: skills, icon: Sparkles });
  if (interests) fields.push({ label: "Interests", value: interests, icon: Heart });

  const socials = SOCIAL_KEYS.map((social) => ({
    label: social.label,
    value: extraString(extras, social.key),
  })).filter((social): social is { label: string; value: string } => Boolean(social.value));

  const website = profile.website ? asHref(profile.website) : null;
  const hasDetails =
    Boolean(profile.bio) ||
    fields.length > 0 ||
    Boolean(profile.location) ||
    Boolean(website) ||
    socials.length > 0 ||
    Boolean(intro);

  const action = compact ? <TextLink href={publicTabHref(username, "about")}>Read more</TextLink> : null;

  return (
    <Section title="About me" action={action}>
      {!hasDetails ? (
        <QuietNote>No public details yet.</QuietNote>
      ) : (
        <div className="space-y-3 text-sm">
          {profile.bio ? (
            <p className={cn("whitespace-pre-wrap text-muted-foreground", compact && "line-clamp-3")}>
              {profile.bio}
            </p>
          ) : null}
          {intro && !profile.bio ? (
            <p className={cn("whitespace-pre-wrap text-muted-foreground", compact && "line-clamp-3")}>
              {intro}
            </p>
          ) : null}

          {fields.length > 0 ? (
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.label} className="rounded-lg border border-border p-3">
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                    {field.icon ? <field.icon className="h-3.5 w-3.5" aria-hidden /> : null}
                    {field.label}
                  </dt>
                  <dd className="mt-1 break-words">{field.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {profile.location || website ? (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
              {profile.location ? (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {profile.location}
                </span>
              ) : null}
              {website ? (
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                >
                  <Globe className="h-3.5 w-3.5" aria-hidden />
                  {profile.website}
                </a>
              ) : null}
            </div>
          ) : null}

          {socials.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={asHref(social.value)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-11 items-center gap-1 rounded-full border border-border px-3 text-xs transition-colors hover:bg-muted"
                  >
                    {social.label}
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </Section>
  );
}

// ── Row 6 · Community contributions ────────────────────────────────────────

export type PublicPostRow = {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
};

export type PublicFileRow = {
  id: string;
  postId?: string;
  filename: string;
  contentType: string;
  byteSize: number;
};

export function PublicPostsList({
  posts,
  limit,
  emptyLabel = "No community posts yet.",
}: {
  posts: PublicPostRow[];
  limit?: number;
  emptyLabel?: string;
}) {
  if (posts.length === 0) return <QuietNote>{emptyLabel}</QuietNote>;
  const visible = typeof limit === "number" ? posts.slice(0, limit) : posts;
  return (
    <ul className="space-y-2">
      {visible.map((post) => (
        <li key={post.id} className="rounded-lg border border-border p-3 transition-colors hover:bg-muted/50">
          <Link
            href={`/ai/community/posts/${post.id}`}
            className="text-sm font-medium hover:underline"
          >
            {post.title}
          </Link>
          <p className="text-xs text-muted-foreground">{post.category}</p>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function PublicFilesList({
  files,
  limit,
  emptyLabel = "No shared files yet.",
}: {
  files: PublicFileRow[];
  limit?: number;
  emptyLabel?: string;
}) {
  if (files.length === 0) return <QuietNote>{emptyLabel}</QuietNote>;
  const visible = typeof limit === "number" ? files.slice(0, limit) : files;
  return (
    <ul className="space-y-2">
      {visible.map((file) => (
        <li key={file.id} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
          <a
            href={attachmentFileUrl(file.id)}
            target="_blank"
            rel="noreferrer"
            className="min-w-0 truncate text-sm text-primary underline-offset-4 hover:underline"
          >
            {file.filename}
          </a>
          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
            {formatBytes(file.byteSize)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function PublicContributionsRow({
  posts,
  files,
  stats,
  username,
  compact = false,
}: {
  posts: PublicPostRow[];
  files: PublicFileRow[];
  stats: ProfileStats | null;
  username: string;
  compact?: boolean;
}) {
  const postCount = stats?.posts ?? posts.length;
  const fileCount = stats?.filesShared ?? files.length;
  const hasLists = posts.length > 0 || files.length > 0;
  const hasCounts = postCount > 0 || fileCount > 0;
  return (
    <Section
      title="Community contributions"
      action={
        compact ? (
          <span className="flex flex-wrap gap-3">
            <TextLink href={publicTabHref(username, "posts")}>Posts</TextLink>
            <TextLink href={publicTabHref(username, "files")}>Files</TextLink>
          </span>
        ) : null
      }
    >
      <div className="space-y-4">
      {stats && !compact ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <StatCell label="posts" value={postCount} icon={FileText} />
            <StatCell label="comments" value={stats.comments} icon={MessageSquare} />
            <StatCell label="likes received" value={stats.likesReceived} icon={Heart} />
            <StatCell label="files shared" value={fileCount} icon={FileText} />
          </div>
        ) : null}

        {!hasLists && !hasCounts ? <QuietNote>No public contributions yet.</QuietNote> : null}
        {!hasLists && hasCounts ? (
          <QuietNote>Recent posts and files are not available.</QuietNote>
        ) : null}

        {hasLists ? (
          <div className={cn("grid gap-4", compact ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2")}>
            {posts.length > 0 ? (
              <div>
                <h3 className="mb-2 text-sm font-medium">Recent posts</h3>
                <PublicPostsList posts={posts} limit={compact ? 2 : undefined} />
              </div>
            ) : null}
            {files.length > 0 ? (
              <div>
                <h3 className="mb-2 text-sm font-medium">Shared files</h3>
                <PublicFilesList files={files} limit={compact ? 3 : undefined} />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

// ── Row 7 · Followers & following ──────────────────────────────────────────

export function PublicPeopleRow({
  people,
  title,
  emptyLabel,
  viewerId,
  onFollowToggle,
}: {
  people: ProfileListUser[];
  title: string;
  emptyLabel: string;
  viewerId?: string | null;
  onFollowToggle?: (personId: string, following: boolean) => void;
}) {
  return (
    <Section title={title}>
      {people.length === 0 ? (
        <QuietNote>{emptyLabel}</QuietNote>
      ) : (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => {
            const href = profilePath(person.username, person.id);
            return (
              <li
                key={person.id}
                className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
              >
                <Link href={href} className="flex min-w-0 flex-1 items-center gap-3">
                  <ProfileAvatar
                    url={person.avatarUrl}
                    name={person.fullName}
                    className="h-10 w-10 shrink-0 rounded-full"
                    textClassName="text-xs"
                    sizes="40px"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{person.fullName}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {person.username ? `@${person.username}` : person.id.slice(0, 8)}
                    </p>
                  </div>
                </Link>
                <FollowButton
                  username={person.username}
                  targetUserId={person.id}
                  initialFollowing={Boolean(person.followingByYou)}
                  viewerId={viewerId}
                  size="xs"
                  onChange={(next) => onFollowToggle?.(person.id, next)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </Section>
  );
}

// ── Tab navigation ─────────────────────────────────────────────────────────

export function PublicProfileTabs({
  username,
  activeTab,
}: {
  username: string;
  activeTab: PublicProfileTab;
}) {
  return (
    <nav aria-label="Profile sections" className="-mx-1 overflow-x-auto">
      <ul className="flex min-w-max gap-1 border-b border-border px-1 pb-2">
        {PUBLIC_PROFILE_TABS.map((tab) => {
          const active = tab.id === activeTab;
          return (
            <li key={tab.id}>
              <Link
                href={publicTabHref(username, tab.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-md px-3 text-sm transition-colors",
                  active
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ── Skeleton ───────────────────────────────────────────────────────────────

export function PublicProfileSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 p-4" aria-busy="true">
      <div className="h-40 w-full animate-pulse rounded-xl bg-muted" />
      <div className="h-24 w-full animate-pulse rounded-xl bg-muted" />
      <div className="h-24 w-full animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
