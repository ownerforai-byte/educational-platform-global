"use client";

/**
 * Public (visitor) profile shell.
 *
 * A read-only window into another learner's profile: identity, statistics,
 * learning progress, badges, about, community contributions and the
 * follower/following lists. Navigation is link-based (each tab has its own
 * server page) and every number comes from the frozen public foundations, so a
 * visitor can never read a credit, wallet or owner-only figure here.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "@/features/auth/hooks/use-session";
import { profilePath } from "@/lib/api/profile";
import { publicUrl } from "@/lib/site-url";
import {
  getProfileFiles,
  getProfileProgress,
  getPublicProfile,
  getProfileFollowers,
  getProfileFollowing,
  getProfilePosts,
  type ProfileListUser,
  type ProfileStats,
  type PublicProfile,
  type PublicProgressCounts,
} from "@/lib/api/profile";
import {
  PUBLIC_PROFILE_TABS,
  PublicAboutRow,
  PublicBadgesRow,
  PublicContributionsRow,
  PublicFilesList,
  PublicIdentityRow,
  PublicPeopleRow,
  PublicPostsList,
  PublicProfileSkeleton,
  PublicProfileTabs,
  PublicProgressRow,
  PublicStatsRow,
  publicTabHref,
  type PublicProfileTab,
  type PublicFileRow,
  type PublicPostRow,
} from "@/features/profile/public-profile-sections";

type Tab = PublicProfileTab;

function activeTabFromPath(pathname: string | null, fallback: Tab): Tab {
  if (!pathname) return fallback;
  const match = PUBLIC_PROFILE_TABS.find(
    (tab) => tab.id !== "overview" && pathname.endsWith(`/${tab.id}`),
  );
  return match?.id ?? "overview";
}

const EMPTY_PROGRESS = { progress: null as PublicProgressCounts | null };

export function PublicProfileShell({
  username,
  initialTab = "overview",
}: {
  username: string;
  initialTab?: Tab;
}) {
  const pathname = usePathname();
  const { user } = useSession();

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [following, setFollowing] = useState(false);
  const [progress, setProgress] = useState<PublicProgressCounts | null>(null);
  const [posts, setPosts] = useState<PublicPostRow[]>([]);
  const [files, setFiles] = useState<PublicFileRow[]>([]);
  const [people, setPeople] = useState<ProfileListUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [baseReady, setBaseReady] = useState(false);
  const extrasLoaded = useRef({
    posts: false,
    files: false,
    followers: false,
    following: false,
  });

  const activeTab: Tab = activeTabFromPath(pathname, initialTab);

  useEffect(() => {
    let cancelled = false;
    setBaseReady(false);
    extrasLoaded.current = { posts: false, files: false, followers: false, following: false };
    setLoading(true);
    setError(null);
    setPosts([]);
    setFiles([]);
    setPeople([]);

    void Promise.all([
      getPublicProfile(username),
      getProfileProgress(username).catch(() => EMPTY_PROGRESS),
    ])
      .then(([base, progressRes]) => {
        if (cancelled) return;
        setProfile(base.profile);
        setStats(base.stats);
        setFollowing(base.following);
        setProgress(progressRes.progress ?? null);
        setBaseReady(true);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Could not load profile");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  useEffect(() => {
    if (!baseReady) return;
    let cancelled = false;
    const jobs: Array<Promise<void>> = [];

    if (
      (activeTab === "overview" || activeTab === "posts") &&
      !extrasLoaded.current.posts
    ) {
      jobs.push(
        getProfilePosts(username)
          .then((res) => {
            if (!cancelled) setPosts(res.posts);
          })
          .catch(() => {
            if (!cancelled) setPosts([]);
          })
          .finally(() => {
            extrasLoaded.current.posts = true;
          }),
      );
    }

    if (
      (activeTab === "overview" || activeTab === "files") &&
      !extrasLoaded.current.files
    ) {
      jobs.push(
        getProfileFiles(username)
          .then((res) => {
            if (!cancelled) setFiles(res.files);
          })
          .catch(() => {
            if (!cancelled) setFiles([]);
          })
          .finally(() => {
            extrasLoaded.current.files = true;
          }),
      );
    }

    if (activeTab === "followers" && !extrasLoaded.current.followers) {
      jobs.push(
        getProfileFollowers(username)
          .then((res) => {
            if (!cancelled) setPeople(res.users);
          })
          .catch(() => {
            if (!cancelled) setPeople([]);
          })
          .finally(() => {
            extrasLoaded.current.followers = true;
          }),
      );
    }

    if (activeTab === "following" && !extrasLoaded.current.following) {
      jobs.push(
        getProfileFollowing(username)
          .then((res) => {
            if (!cancelled) setPeople(res.users);
          })
          .catch(() => {
            if (!cancelled) setPeople([]);
          })
          .finally(() => {
            extrasLoaded.current.following = true;
          }),
      );
    }

    if (jobs.length === 0) return;
    void Promise.all(jobs);
    return () => {
      cancelled = true;
    };
  }, [username, activeTab, baseReady]);

  const handleFollowingChange = useCallback((next: boolean) => {
    setFollowing(next);
    setStats((current) =>
      current ? { ...current, followers: Math.max(0, current.followers + (next ? 1 : -1)) } : current,
    );
  }, []);

  if (loading && !profile) return <PublicProfileSkeleton />;

  if (error || !profile) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <p className="text-destructive">{error ?? "Profile not found"}</p>
        <Button variant="outline" asChild className="mt-4 min-h-11">
          <Link href="/users">Search users</Link>
        </Button>
      </div>
    );
  }

  const handle = profile.username ?? username;
  const viewerId = user?.id ?? null;
  // Resolve the public host once, through the single site-url owner.
  const shareUrl = publicUrl(profilePath(profile.username, profile.id));

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 p-4 pb-16">
      <PublicIdentityRow
        profile={profile}
        username={handle}
        shareUrl={shareUrl}
        following={following}
        viewerId={viewerId}
        completedTopics={progress?.completed ?? null}
        onFollowingChange={handleFollowingChange}
      />

      <PublicProfileTabs username={handle} activeTab={activeTab} />

      {activeTab === "overview" ? (
        <>
          <PublicStatsRow stats={stats} progress={progress} username={handle} />
          <PublicProgressRow progress={progress} username={handle} compact />
          <PublicBadgesRow progress={progress} username={handle} compact />
          <PublicAboutRow profile={profile} username={handle} compact />
          <PublicContributionsRow
            posts={posts}
            files={files}
            stats={stats}
            username={handle}
            compact
          />
        </>
      ) : null}

      {activeTab === "about" ? <PublicAboutRow profile={profile} username={handle} /> : null}

      {activeTab === "progress" ? <PublicProgressRow progress={progress} username={handle} /> : null}

      {activeTab === "badges" ? <PublicBadgesRow progress={progress} username={handle} /> : null}

      {activeTab === "posts" ? (
        <section className="rounded-xl border border-border bg-card p-4">
          <h2 className="text-base font-semibold">Community posts</h2>
          <p className="mb-3 mt-1 text-xs text-muted-foreground">
            {stats
              ? `${stats.posts} posts · ${stats.comments} comments · ${stats.likesReceived} likes received`
              : "Community contributions"}
          </p>
          <PublicPostsList posts={posts} />
        </section>
      ) : null}

      {activeTab === "files" ? (
        <section className="rounded-xl border border-border bg-card p-4">
          <h2 className="text-base font-semibold">Shared files</h2>
          <p className="mb-3 mt-1 text-xs text-muted-foreground">
            {stats ? `${stats.filesShared} files shared` : "Shared files"}
          </p>
          <PublicFilesList files={files} />
        </section>
      ) : null}

      {activeTab === "followers" ? (
        <PublicPeopleRow
          people={people}
          title="Followers"
          emptyLabel="No followers yet."
          viewerId={viewerId}
          onFollowToggle={(personId, next) =>
            setPeople((current) =>
              current.map((p) => (p.id === personId ? { ...p, followingByYou: next } : p)),
            )
          }
        />
      ) : null}

      {activeTab === "following" ? (
        <PublicPeopleRow
          people={people}
          title="Following"
          emptyLabel="Not following anyone yet."
          viewerId={viewerId}
          onFollowToggle={(personId, next) =>
            setPeople((current) =>
              current.map((p) => (p.id === personId ? { ...p, followingByYou: next } : p)),
            )
          }
        />
      ) : null}

      {following && !profile.isYou ? (
        <p className="text-xs text-muted-foreground">
          You are following @{handle}.{" "}
          <Link href={publicTabHref(handle, "following")} className="underline-offset-4 hover:underline">
            See who they follow
          </Link>
        </p>
      ) : null}
    </div>
  );
}
