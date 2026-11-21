"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/features/auth/hooks/use-session";
import { PrivateProfileDashboard } from "@/features/profile/private-profile-dashboard";
import { InfoOverviewBoard } from "@/features/profile/info-boards";
import { InfoWorkspace } from "@/features/profile/info-workspace";
import {
  getMyProfile,
  type ProfileStats,
  type PublicProfile,
  type StorageInfo,
} from "@/lib/api/profile";

/**
 * /profile — Info. The workspace classifies study, people, details and account
 * onto their own pages. "My Profile" opens the full private record.
 */
export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useSession();
  const [view, setView] = useState<"info" | "profile">("info");
  const [media, setMedia] = useState<PublicProfile | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [storage, setStorage] = useState<StorageInfo | null>(null);

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
        .catch(() => {});
    };
    const useIdle = typeof requestIdleCallback === "function";
    const handle = useIdle ? requestIdleCallback(load, { timeout: 2000 }) : setTimeout(load, 0);
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
        onBack={() => setView("info")}
      />
    );
  }

  return (
    <InfoWorkspace onOpenRecord={() => setView("profile")}>
      <InfoOverviewBoard />
    </InfoWorkspace>
  );
}
