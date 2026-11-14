"use client";

import { Plus } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { CommunityBackLink } from "@/features/community/community-helpers";
import { PostComposer } from "@/features/community/post-composer";

/** Dedicated /ai/community/new surface — composer is not mounted on the feed. */
export function CommunityNewPost() {
  const { user, isLoading } = useSession();
  return (
    <div className="mx-auto w-full max-w-3xl space-y-5 px-3 py-6 sm:px-4 sm:py-8">
      <header className="space-y-3">
        <CommunityBackLink href="/ai/community" label="Back to feed" />
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <Plus className="h-6 w-6 text-primary" aria-hidden />
          New post
        </h1>
      </header>
      <PostComposer user={user} sessionLoading={isLoading} mode="create" redirectOnSuccess />
    </div>
  );
}
