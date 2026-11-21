"use client";

import { CommunityFeed } from "@/features/community/community-feed";
import { CommunityPersonView } from "@/features/community/community-person-view";
import { useCommunityBoard } from "@/features/community/community-board-context";
import { CommunityErrorAlert, CommunityMigrationNotice } from "@/features/community/community-alerts";
import { mergeById } from "@/features/community/community-helpers";

export function CommunityTimelineView() {
  const ctx = useCommunityBoard();
  const {
    view,
    listMode,
    migrated,
    error,
    appliedQuery,
    category,
    filter,
    posts,
    queuedNewPosts,
    cursor,
    loading,
    loadingMore,
    user,
    moderate,
    copiedId,
    aiReplyBusyIds,
    isSaved,
    threadPropsForPost,
    setAppliedQuery,
    setCategory,
    setFilter,
    onLike,
    onRepost,
    onToggleSave,
    copy,
    onDeletePost,
    onAssistantReply,
    handlePrefetchPost,
    handleLoadMoreFeed,
    setPosts,
    setQueuedNewPosts,
  } = ctx;

  return (
    <>
      <CommunityMigrationNotice migrated={migrated} />
      <CommunityErrorAlert error={error} />

      {view === "feed" || view === "mine" ? (
        <CommunityFeed
          mode={listMode}
          appliedQuery={appliedQuery}
          category={category}
          filter={filter}
          posts={posts}
          queuedNewCount={queuedNewPosts.length}
          cursor={cursor}
          loading={loading}
          loadingMore={loadingMore}
          migrated={migrated}
          error={error}
          viewerId={user?.id}
          canModerate={moderate}
          copiedId={copiedId}
          aiReplyBusyIds={aiReplyBusyIds}
          isSaved={isSaved}
          threadPropsForPost={threadPropsForPost}
          onApplySearch={(nextQuery) => setAppliedQuery(nextQuery)}
          onSelectCategory={(nextCategory) => setCategory(nextCategory)}
          onSelectFilter={(nextFilter) => setFilter(nextFilter)}
          onClearAllFilters={() => {
            setAppliedQuery("");
            setCategory("");
            setFilter("latest");
          }}
          onRevealQueuedPosts={() => {
            setPosts((current) => mergeById(current, [...queuedNewPosts, ...current]));
            setQueuedNewPosts([]);
          }}
          onLoadMore={handleLoadMoreFeed}
          onLike={onLike}
          onRepost={onRepost}
          onToggleSave={onToggleSave}
          onCopyLink={(postId) => void copy(postId)}
          onDelete={(postId) => void onDeletePost(postId)}
          onAssistantReply={onAssistantReply}
          onPrefetchPost={handlePrefetchPost}
        />
      ) : null}

      {view === "person" ? <CommunityPersonView /> : null}
    </>
  );
}