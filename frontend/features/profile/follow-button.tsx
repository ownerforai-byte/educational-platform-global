"use client";

import { useCallback, useState } from "react";
import { Check, Plus } from "lucide-react";
import { followUser, unfollowUser } from "@/lib/api/profile";
import { cn } from "@/lib/utils";

export type FollowButtonProps = {
  username: string | null | undefined;
  targetUserId: string;
  initialFollowing: boolean;
  viewerId?: string | null;
  size?: "sm" | "xs";
  className?: string;
  onChange?: (following: boolean) => void;
};

export function FollowButton({
  username,
  targetUserId,
  initialFollowing,
  viewerId,
  size = "sm",
  className,
  onChange,
}: FollowButtonProps) {
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Local opinion wins over the server value, but only for THIS target and
  // THIS incoming value — no state mirroring in an effect.
  const stateKey = `${targetUserId}:${String(initialFollowing)}`;
  const [override, setOverride] = useState<{ key: string; following: boolean } | null>(null);
  const following = override?.key === stateKey ? override.following : initialFollowing;

  const toggle = useCallback(async () => {
    if (!username || pending) return;
    const prev = following;
    setOverride({ key: stateKey, following: !prev });
    setPending(true);
    setNotice(null);
    try {
      if (prev) await unfollowUser(username);
      else await followUser(username);
      onChange?.(!prev);
    } catch {
      setOverride({ key: stateKey, following: prev });
      setNotice("Could not update follow");
    } finally {
      setPending(false);
    }
  }, [username, pending, following, onChange, stateKey]);

  if (!viewerId || viewerId === targetUserId || !username) return null;

  const compact = size === "xs";

  return (
    <div className={cn("inline-flex flex-col items-start gap-0.5", className)}>
      <button
        type="button"
        disabled={pending}
        onClick={() => void toggle()}
        aria-pressed={following}
        aria-label={following ? `Unfollow @${username}` : `Follow @${username}`}
        className={cn(
          "inline-flex min-h-11 min-w-11 shrink-0 items-center gap-1 rounded-full border font-medium transition-colors",
          compact ? "h-11 px-3 text-[11px]" : "h-11 px-3 text-xs",
          following
            ? "border-border bg-muted/50 text-foreground hover:bg-muted"
            : "border-primary/40 bg-primary/10 text-primary hover:bg-primary/15",
          pending && "opacity-60",
        )}
      >
        {following ? (
          <Check className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden />
        ) : (
          <Plus className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden />
        )}
        {following ? "Following" : "Follow"}
      </button>
      {notice ? <span className="text-[10px] text-destructive">{notice}</span> : null}
    </div>
  );
}
