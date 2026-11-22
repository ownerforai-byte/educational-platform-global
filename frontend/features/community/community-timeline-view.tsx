"use client";

import { CommunityFeed } from "@/features/community/community-feed";
import { CommunityPersonView } from "@/features/community/community-person-view";
import { useCommunityBoard } from "@/features/community/community-board-context";
import { CommunityErrorAlert } from "@/features/community/community-alerts";
import { CommunityCelebrationBanner } from "@/features/community/community-action-success";
import { mergeById } from "@/features/community/community-helpers";

export function CommunityTimelineView() {
  const ctx = useCommunityBoard();
  const {
    view,
    listMode,
    error,
    celebration,
    dismissCelebration,
    appliedQuery,
    category,
    postKind,
    filter,
    posts,
    queuedNewPosts,
    cursor,
    loading,
    loadingMore,
    user,
    moderate,
    aiReplyBusyIds,
    isSaved,
    threadPropsForPost,
    setAppliedQuery,
    setCategory,
    setPostKind,
    setFilter,
    onLike,
    onQuotePost,
    onRepost,
    onToggleSave,
    onDeletePost,
    onAssistantReply,
    handlePrefetchPost,
    handleLoadMoreFeed,
    setPosts,
    setQueuedNewPosts,
  } = ctx;

  return (
    <>
      <CommunityErrorAlert error={error} />
      {celebration ? (
        <CommunityCelebrationBanner
          action={celebration.kind}
          postId={celebration.postId}
          onDismiss={dismissCelebration}
        />
      ) : null}

      {view === "feed" || view === "mine" ? (
        <CommunityFeed
          mode={listMode}
          appliedQuery={appliedQuery}
          category={category}
          postKind={postKind}
          filter={filter}
          posts={posts}
          queuedNewCount={queuedNewPosts.length}
          cursor={cursor}
          loading={loading}
          loadingMore={loadingMore}
          error={error}
          viewerId={user?.id}
          canModerate={moderate}
          aiReplyBusyIds={aiReplyBusyIds}
          isSaved={isSaved}
          threadPropsForPost={threadPropsForPost}
          onApplySearch={(nextQuery) => setAppliedQuery(nextQuery)}
          onSelectCategory={(nextCategory) => setCategory(nextCategory)}
          onSelectPostKind={(nextKind) => setPostKind(nextKind)}
          onSelectFilter={(nextFilter) => setFilter(nextFilter)}
          onClearAllFilters={() => {
            setAppliedQuery("");
            setCategory("");
            setPostKind("");
            setFilter("latest");
          }}
          onRevealQueuedPosts={() => {
            setPosts((current) => mergeById(current, [...queuedNewPosts, ...current]));
            setQueuedNewPosts([]);
          }}
          onLoadMore={handleLoadMoreFeed}
          onLike={onLike}
          onRepost={onRepost}
          onQuotePost={onQuotePost}
          onToggleSave={onToggleSave}
          onDelete={(postId) => void onDeletePost(postId)}
          onAssistantReply={onAssistantReply}
          onPrefetchPost={handlePrefetchPost}
        />
      ) : null}

      {view === "person" ? <CommunityPersonView /> : null}
    </>
  );
}