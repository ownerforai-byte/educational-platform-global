"use client";

import { Loader2 } from "lucide-react";
import { FeedPostRow } from "@/features/community/feed-post-row";
import { PostAuthorHeader } from "@/features/community/post-author-header";
import { useCommunityBoard } from "@/features/community/community-board-context";
import { CommunityBackLink, CommunityLoading } from "@/features/community/community-helpers";
import { chipBtn, emptyStatePanel, surfaceCardFlat } from "@/features/community/community-ui";
import { cn } from "@/lib/utils";

export function CommunityPersonView() {
  const {
    user,
    loading,
    person,
    personCursor,
    loadingMore,
    moderate,
    aiReplyBusyIds,
    threadPropsForPost,
    onLike,
    onRepost,
    onQuotePost,
    onToggleSave,
    onDeletePost,
    onAssistantReply,
    handlePrefetchPost,
    handleLoadMorePerson,
    patchAuthorFollowing,
  } = useCommunityBoard();

  return (
    <div className="space-y-4">
      {loading && !person ? <CommunityLoading /> : null}
      {person?.profile ? (
        <header className={cn(surfaceCardFlat, "space-y-3 p-4 sm:p-5")}>
          <CommunityBackLink href="/ai/community" label="Back to feed" />
          <PostAuthorHeader
            author={person.profile}
            viewerId={user?.id}
            onFollowChange={(following) => patchAuthorFollowing(person.profile!.id, following)}
          />
          <p className="text-[13px] text-muted-foreground">
            {person.posts.length} public {person.posts.length === 1 ? "post" : "posts"}
            {person.profile.role && person.profile.role !== "member" ? (
              <span> · {person.profile.role}</span>
            ) : null}
          </p>
        </header>
      ) : null}

      {person ? (
        person.posts.length === 0 ? (
          <p className={cn(emptyStatePanel, "p-8 text-center text-sm text-muted-foreground")}>
            No public posts yet.
          </p>
        ) : (
          <>
            <div className="space-y-3">
              {person.posts.map((item, idx) => (
                <FeedPostRow
                  key={item.id}
                  item={item}
                  isLeading={idx === 0}
                  viewerId={user?.id}
                  canModerate={moderate}
                  aiReplyBusy={aiReplyBusyIds.has(item.id)}
                  onLike={onLike}
                  onRepost={onRepost}
                  onQuotePost={onQuotePost}
                  onToggleSave={onToggleSave}
                  onDelete={(postId) => void onDeletePost(postId)}
                  onAssistantReply={onAssistantReply}
                  onPrefetch={handlePrefetchPost}
                  {...threadPropsForPost(item.id)}
                />
              ))}
            </div>
            {personCursor != null ? (
              <button
                type="button"
                disabled={loadingMore}
                onClick={handleLoadMorePerson}
                className={cn(
                  chipBtn,
                  "mx-auto flex min-h-11 w-full justify-center py-2.5 text-sm sm:w-auto sm:px-6",
                )}
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Loading…
                  </>
                ) : (
                  "Load more posts"
                )}
              </button>
            ) : null}
          </>
        )
      ) : null}
    </div>
  );
}