"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/features/auth/hooks/use-session";
import { ProfileAvatar, ProfileCover } from "@/features/profile/profile-media";
import { ACCESS_LABELS, accessLevelFor } from "@/lib/core/access-level";
import { getMyProfile, profilePath, type PublicProfile, type StorageInfo } from "@/lib/api/profile";
import { INFO_NAV, type InfoLink } from "@/features/profile/info-catalog";
import { cn } from "@/lib/utils";

export function InfoWorkspace({
  children,
  onOpenRecord,
}: {
  children: ReactNode;
  onOpenRecord?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useSession();
  const [media, setMedia] = useState<PublicProfile | null>(null);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login?next=/profile");
  }, [isLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    void getMyProfile()
      .then((me) => {
        if (alive) setMedia(me.profile);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [user]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-8 md:px-8">
        <div className="h-28 animate-pulse rounded-lg bg-muted/50" />
        <div className="h-10 animate-pulse rounded-lg bg-muted/40" />
        <div className="h-64 animate-pulse rounded-lg bg-muted/30" />
      </div>
    );
  }

  const tier = accessLevelFor(user);
  const displayName =
    media?.fullName || user?.fullName || (user?.email ? user.email.split("@")[0] : "Student");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <header className="overflow-hidden rounded-lg border border-border bg-card">
        <ProfileCover url={media?.coverUrl} className="h-24 md:h-32" priority />
        <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-end sm:justify-between md:px-6">
          <div className="flex min-w-0 items-end gap-4">
            <ProfileAvatar
              url={media?.avatarUrl}
              name={displayName}
              className="-mt-12 h-16 w-16 rounded-lg border-4 border-card md:h-20 md:w-20"
              textClassName="text-lg"
              priority
            />
            <div className="min-w-0 pb-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Info
              </p>
              <h1 className="truncate text-xl font-semibold tracking-tight md:text-2xl">{displayName}</h1>
              <p className="truncate text-sm text-muted-foreground">
                {media?.username ? `@${media.username}` : user?.email || "Sign in to continue"} · {ACCESS_LABELS[tier]}
              </p>
            </div>
          </div>
          {onOpenRecord ? (
            <Button onClick={onOpenRecord} className="h-10 shrink-0 rounded-md px-4">
              My Profile
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          ) : media?.username || media?.id ? (
            <Button variant="outline" className="h-10 shrink-0 rounded-md" asChild>
              <Link href={profilePath(media.username, media.id)}>Public page</Link>
            </Button>
          ) : null}
        </div>
      </header>

      <nav aria-label="Info sections" className="mt-4 flex gap-1 overflow-x-auto border-b border-border">
        {INFO_NAV.map((tab) => {
          const active = tab.exact ? pathname === tab.href : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <div className="py-6">{children}</div>
    </div>
  );
}

export function InfoLinkGrid({
  title,
  lede,
  links,
  columns = 2,
}: {
  title: string;
  lede: string;
  links: InfoLink[];
  columns?: 2 | 3;
}) {
  return (
    <section>
      <header className="mb-3">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{lede}</p>
      </header>
      <ul
        className={cn(
          "grid gap-px overflow-hidden rounded-lg border border-border bg-border",
          columns === 3 ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2",
        )}
      >
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href} className="bg-card">
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50"
              >
                <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{item.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">{item.detail}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/70" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function useInfoMedia(): { media: PublicProfile | null; storage: StorageInfo | null } {
  const { user } = useSession();
  const [media, setMedia] = useState<PublicProfile | null>(null);
  const [storage, setStorage] = useState<StorageInfo | null>(null);
  useEffect(() => {
    if (!user) return;
    let alive = true;
    void getMyProfile()
      .then((me) => {
        if (!alive) return;
        setMedia(me.profile);
        setStorage(me.storage);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [user]);
  return { media, storage };
}
