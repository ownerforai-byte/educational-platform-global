"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  ChevronRight,
  Download,
  Gift,
  NotebookPen,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "@/features/auth/hooks/use-session";
import { ACCESS_LABELS, accessLevelFor } from "@/lib/core/access-level";
import { ProfileAvatar, ProfileCover } from "@/features/profile/profile-media";
import { ProfileImageEditButton } from "@/features/profile/profile-image-editor";
import { profileCompletion } from "@/features/profile/profile-derived";
import { PrivateProfileDashboard } from "@/features/profile/private-profile-dashboard";
import {
  getMyProfile,
  type ProfileStats,
  type PublicProfile,
  type StorageInfo,
} from "@/lib/api/profile";

/**
 * THE YOU PAGE — the You tab converted (owner 2026-11-09: "convert the you
 * to info and add all footer there … keep the footer to limited place also,
 * not at all place, like all footer to 'info' page").
 *
 * The tab opens as You: one compact identity block whose "My Profile" button
 * opens the whole private profile dashboard, and ALL of the site footer
 * content (directory, legal, plan note, version) lives here — and only here.
 */
const YOU_MENU: Array<{ icon: typeof BookOpen; label: string; href: string; tint: string; subtitle?: string }> = [
  { icon: BookOpen, label: "Curriculum & Notes", href: "/subjects", tint: "bg-violet-500/10 text-violet-600 dark:text-violet-400", subtitle: "All subjects, notes and syllabus" },
  { icon: Users, label: "Community", href: "/ai/community", tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", subtitle: "Public study posts" },
  { icon: User, label: "Public profile", href: "/profile/edit", tint: "bg-primary/10 text-primary", subtitle: "Avatar, bio & storage" },
  { icon: Search, label: "Find students", href: "/users", tint: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  { icon: BarChart3, label: "Analytics", href: "/analytics", tint: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  { icon: Award, label: "Streaks and Badges", href: "/streaks", tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { icon: NotebookPen, label: "My Notes", href: "/my-notes", tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  { icon: Download, label: "Offline Study", href: "/downloads", tint: "bg-teal-500/10 text-teal-600 dark:text-teal-400" },
  { icon: Gift, label: "Referrals", href: "/referrals", tint: "bg-rose-500/10 text-rose-600 dark:text-rose-400", subtitle: "Copy your app link & earn" },
  { icon: Calendar, label: "Study Schedules", href: "/schedule", tint: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { icon: Settings, label: "App Settings", href: "/settings", tint: "bg-violet-500/10 text-violet-600 dark:text-violet-400", subtitle: "Version, rate this app & more" },
];

function YouHub({
  onOpenProfile,
  media,
  onMediaChanged,
}: {
  onOpenProfile: () => void;
  media: PublicProfile | null;
  onMediaChanged: (result: { profile: PublicProfile; storage: StorageInfo | null }) => void;
}) {
  const { user, isLoading } = useSession();

  // Session still resolving — same skeleton language as the profile view.
  if (isLoading) {
    return (
      <div className="container max-w-2xl space-y-4 py-8">
        <div className="h-40 animate-pulse rounded-3xl bg-muted/40" />
        <div className="h-28 animate-pulse rounded-3xl bg-muted/40" />
        <div className="h-40 animate-pulse rounded-3xl bg-muted/40" />
      </div>
    );
  }

  const tier = accessLevelFor(user);
  const displayName =
    media?.fullName || user?.fullName || (user?.email ? user.email.split("@")[0] : "Student");
  const avatarUrl = media?.avatarUrl ?? null;
  const coverUrl = media?.coverUrl ?? null;
  const completion = profileCompletion({
    avatarUrl,
    coverUrl,
    fullName: displayName,
    username: media?.username,
    bio: media?.bio,
    location: media?.location,
    website: media?.website,
  }).percent;

  return (
    <div>
      <div className="container max-w-2xl py-8">
        {/* Identity + the My Profile button — ONE compact block (owner
            2026-11-09: "optmize the block"). */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-extrabold tracking-tight">You</h1>
          <Link
            href="/settings"
            aria-label="Settings"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
          </Link>
        </div>
        <Card className="overflow-hidden border-primary/20 shadow-sm">
          <div className="relative">
            <ProfileCover url={coverUrl} className="h-20" priority />
            <ProfileImageEditButton
              kind="cover"
              currentUrl={coverUrl}
              displayName={displayName}
              hasImage={Boolean(coverUrl)}
              onChanged={onMediaChanged}
              className="absolute right-2 top-2 z-10"
            />
          </div>
          <CardContent className="pb-5 pt-0">
            <div className="flex items-center gap-4">
              <div className="relative -mt-9 shrink-0">
                <ProfileAvatar
                  url={avatarUrl}
                  name={displayName}
                  className="h-[72px] w-[72px] rounded-2xl border-4 border-background shadow-xl"
                  textClassName="text-lg"
                  priority
                />
                <ProfileImageEditButton
                  kind="avatar"
                  currentUrl={avatarUrl}
                  displayName={displayName}
                  hasImage={Boolean(avatarUrl)}
                  onChanged={onMediaChanged}
                  className="absolute -bottom-1 -right-1 z-10"
                />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-lg font-extrabold tracking-tight">{displayName}</h2>
                {media?.username ? (
                  <p className="truncate text-xs text-muted-foreground">@{media.username}</p>
                ) : null}
                <span className="mt-1 inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                  {ACCESS_LABELS[tier]}
                </span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">Profile {completion}% complete</p>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-primary" style={{ width: `${completion}%` }} />
            </div>
            <Button
              onClick={onOpenProfile}
              className="mt-4 h-12 w-full rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
            >
              My Profile
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* The "You" menu — every personal / feature destination as a working
          row (owner: "place them here as said and remove them from their
          place"). */}
      <div className="container max-w-2xl pb-2">
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/60">
          {YOU_MENU.map((entry) => {
            const Icon = entry.icon;
            return (
              <Link
                key={entry.href}
                href={entry.href}
                className="flex items-center gap-3 border-b border-border/40 px-3 py-3 transition-colors last:border-0 hover:bg-muted/50"
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${entry.tint}`}>
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-foreground">{entry.label}</p>
                  {entry.subtitle && (
                    <p className="truncate text-[11px] text-muted-foreground">{entry.subtitle}</p>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * /profile — the You tab. Opens as the hub; the whole private dashboard is
 * behind the "My Profile" button (owner 2026-11-09). Identity, stats and the
 * storage figure are loaded once here and handed to both views, so an upload
 * from either pencil refreshes both.
 */
export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useSession();
  const [view, setView] = useState<"you" | "profile">("you");
  const [media, setMedia] = useState<PublicProfile | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [storage, setStorage] = useState<StorageInfo | null>(null);

  // Guests: send to login and return here afterwards
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login?next=/profile");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    const load = () => {
      void getMyProfile()
        .then((me) => {
          if (!alive) return;
          setMedia(me.profile);
          setStats(me.stats);
          setStorage(me.storage);
        })
        .catch(() => {
          /* session-only fallback — initials until media loads */
        });
    };
    const useIdle = typeof requestIdleCallback === "function";
    const handle = useIdle
      ? requestIdleCallback(load, { timeout: 2000 })
      : setTimeout(load, 0);
    return () => {
      alive = false;
      if (useIdle && typeof cancelIdleCallback === "function") {
        cancelIdleCallback(handle as number);
      } else {
        clearTimeout(handle as ReturnType<typeof setTimeout>);
      }
    };
  }, [user]);

  const handleMediaChanged = useCallback(
    (result: { profile: PublicProfile; storage: StorageInfo | null }) => {
      setMedia(result.profile);
      if (result.storage) setStorage(result.storage);
    },
    [],
  );

  if (view === "profile") {
    return (
      <PrivateProfileDashboard
        media={media}
        stats={stats}
        storage={storage}
        onMediaChanged={handleMediaChanged}
        onBack={() => setView("you")}
      />
    );
  }
  return (
    <YouHub
      onOpenProfile={() => setView("profile")}
      media={media}
      onMediaChanged={handleMediaChanged}
    />
  );
}
