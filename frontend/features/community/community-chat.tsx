"use client";

import { Radio } from "lucide-react";
import { CommunityBackLink } from "@/features/community/community-helpers";
import { LobbyChat } from "@/features/realtime-chat/lobby-chat";
import { glassShell } from "@/features/community/community-ui";
import { cn } from "@/lib/utils";

/** Platform-wide community chat opened from Community → Chat. */
export function CommunityChat() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 pb-8 pt-6">
      <CommunityBackLink href="/ai/community" label="Back to feed" />
      <header className={cn(glassShell, "space-y-1 p-4")}>
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-card text-emerald-600 shadow-sm ring-1 ring-emerald-500/15 dark:text-emerald-400">
            <Radio className="h-5 w-5" aria-hidden />
          </span>
          Chat
        </h1>
        <p className="text-sm text-muted-foreground">
          A chat room for everyone on the platform — say hello, share study updates, and help each other.
        </p>
      </header>
      <LobbyChat />
    </div>
  );
}