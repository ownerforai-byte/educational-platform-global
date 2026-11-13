"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  followUser,
  getProfileFiles,
  getProfileFollowers,
  getProfileFollowing,
  getProfilePosts,
  getPublicProfile,
  profilePath,
  unfollowUser,
  type ProfileListUser,
  type ProfileStats,
  type PublicProfile,
} from "@/lib/api/profile";
import { attachmentFileUrl } from "@/lib/api/community-feed";
import { cn } from "@/lib/utils";

const TABS = ["posts", "about", "files", "followers", "following"] as const;
type Tab = (typeof TABS)[number];

function tabHref(username: string, tab: Tab): string {
  if (tab === "posts") return profilePath(username, username);
  return `${profilePath(username, username)}/${tab}`;
}

export function PublicProfileShell({
  username,
  initialTab = "posts",
}: {
  username: string;
  initialTab?: Tab;
}) {
  const pathname = usePathname();
  const { user } = useSession();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Array<{ id: string; title: string; body: string; category: string; createdAt: string }>>([]);
  const [files, setFiles] = useState<Array<{ id: string; filename: string; byteSize: number; contentType: string }>>([]);
  const [people, setPeople] = useState<ProfileListUser[]>([]);

  const activeTab: Tab = TABS.find((t) => pathname.endsWith(`/${t}`)) ?? initialTab;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const base = await getPublicProfile(username);
      setProfile(base.profile);
      setStats(base.stats);
      setFollowing(base.following);
      if (activeTab === "posts") {
        const p = await getProfilePosts(username);
        setPosts(p.posts);
      }
      if (activeTab === "files") {
        const f = await getProfileFiles(username);
        setFiles(f.files);
      }
      if (activeTab === "followers") {
        const f = await getProfileFollowers(username);
        setPeople(f.users);
      }
      if (activeTab === "following") {
        const f = await getProfileFollowing(username);
        setPeople(f.users);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load profile");
    } finally {
      setLoading(false);
    }
  }, [username, activeTab]);

  useEffect(() => {
    void load();
  }, [load]);

  const toggleFollow = async () => {
    if (!profile?.username) return;
    if (following) {
      await unfollowUser(profile.username);
      setFollowing(false);
    } else {
      await followUser(profile.username);
      setFollowing(true);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + profilePath(username, username));
    } catch {
      /* ignore */
    }
  };

  if (loading && !profile) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-4 p-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <p className="text-destructive">{error ?? "Profile not found"}</p>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/users">Search users</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 p-4 pb-16">
      <MotionHero profile={profile} />
      <p className="text-sm text-muted-foreground">
        @{profile.username ?? username}
        {stats ? (
          <span className="ml-2">
            · {stats.posts} posts · {stats.comments} comments · {stats.likesReceived} likes · {stats.filesShared} files
          </span>
        ) : null}
      </p>
      <div className="flex flex-wrap gap-2">
        {user && profile.id !== user.id && profile.username ? (
          <Button size="sm" variant={following ? "outline" : "default"} onClick={() => void toggleFollow()}>
            {following ? "Following" : "Follow"}
          </Button>
        ) : null}
        {profile.isYou ? (
          <Button size="sm" variant="outline" asChild>
            <Link href="/profile/edit">Edit profile</Link>
          </Button>
        ) : null}
        <Button size="sm" variant="outline" onClick={() => void copyLink()}>
          Copy link
        </Button>
      </div>

      <nav className="flex flex-wrap gap-1 border-b pb-2">
        {TABS.map((tab) => (
          <Link
            key={tab}
            href={tabHref(profile.username ?? username, tab)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm capitalize",
              activeTab === tab ? "bg-muted font-medium" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
          </Link>
        ))}
      </nav>

      {activeTab === "about" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="whitespace-pre-wrap">{profile.bio || "No bio yet."}</p>
            {profile.location ? <p>📍 {profile.location}</p> : null}
            {profile.website ? (
              <a href={profile.website} className="text-primary underline" target="_blank" rel="noreferrer">
                {profile.website}
              </a>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      {activeTab === "posts" ? (
        <div className="space-y-3">
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No community posts yet.</p>
          ) : (
            posts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="pb-2">
                  <Link href={`/ai/community/posts/${post.id}`} className="font-medium hover:underline">
                    {post.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{post.category}</p>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-4 text-sm text-muted-foreground">{post.body}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      ) : null}

      {activeTab === "files" ? (
        <ul className="space-y-2">
          {files.length === 0 ? (
            <li className="text-sm text-muted-foreground">No shared files yet.</li>
          ) : (
            files.map((file) => (
              <li key={file.id}>
                <a
                  href={attachmentFileUrl(file.id)}
                  className="text-sm text-primary underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {file.filename}
                </a>
                <span className="ml-2 text-xs text-muted-foreground">({Math.round(file.byteSize / 1024)} KB)</span>
              </li>
            ))
          )}
        </ul>
      ) : null}

      {(activeTab === "followers" || activeTab === "following") ? (
        <ProfilePeopleList people={people} emptyLabel={`No ${activeTab} yet.`} />
      ) : null}
    </div>
  );
}

function ProfilePeopleList({ people, emptyLabel }: { people: ProfileListUser[]; emptyLabel: string }) {
  if (people.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>;
  }
  return (
    <ul className="space-y-2">
      {people.map((person) => {
        const href = profilePath(person.username, person.id);
        return (
          <li key={person.id}>
            <Link href={href} className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/40">
              <div
                className="h-10 w-10 shrink-0 rounded-full bg-muted bg-cover bg-center"
                style={person.avatarUrl ? { backgroundImage: `url(${person.avatarUrl})` } : undefined}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="truncate font-medium">{person.fullName}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {person.username ? `@${person.username}` : person.id.slice(0, 8)}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function MotionHero({ profile }: { profile: PublicProfile }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div
        className="h-28 bg-muted bg-cover bg-center"
        style={profile.coverUrl ? { backgroundImage: `url(${profile.coverUrl})` } : undefined}
      />
      <div className="flex items-end gap-3 px-4 pb-4">
        <div
          className="-mt-10 h-20 w-20 shrink-0 rounded-full border-4 border-card bg-muted bg-cover"
          style={profile.avatarUrl ? { backgroundImage: `url(${profile.avatarUrl})` } : undefined}
          role="img"
          aria-label={profile.fullName}
        />
        <div>
          <h1 className="text-xl font-semibold">{profile.fullName}</h1>
        </div>
      </div>
    </div>
  );
}
