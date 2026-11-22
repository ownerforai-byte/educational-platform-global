"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  ChevronDown,
  Loader2,
  Plus,
  Search,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  COMMUNITY_CATEGORIES,
  COMMUNITY_POST_KINDS,
  type CommunityFeedFilter,
  type CommunityPostKind,
  type FeedPost,
} from "@/lib/api/community-feed";
import { getSubjectVisual } from "@/lib/ui/subject-visuals";
import {
  chipActive,
  chipBtn,
  inputClass,
  primaryCta,
} from "@/features/community/community-ui";
import {
  CommunityBackLink,
  CommunityLoading,
  FeedEmpty,
} from "@/features/community/community-helpers";
import { FeedPostRow, type FeedPostRowThreadProps } from "@/features/community/feed-post-row";
import { cn } from "@/lib/utils";

const MOBILE_INLINE_CATEGORIES = 4;

export interface CommunityFeedProps {
  mode: "feed" | "saved" | "trending" | "mine";
  appliedQuery: string;
  category: string;
  postKind: CommunityPostKind | "";
  filter: CommunityFeedFilter;
  posts: FeedPost[];
  queuedNewCount: number;
  cursor: number | null;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  viewerId?: string | null;
  canModerate: boolean;
  copiedId: string | null;
  aiReplyBusyIds: ReadonlySet<string>;
  isSaved: (postId: string) => boolean;
  onApplySearch: (nextQuery: string) => void;
  onSelectCategory: (nextCategory: string) => void;
  onSelectPostKind: (nextKind: CommunityPostKind | "") => void;
  onSelectFilter: (nextFilter: CommunityFeedFilter) => void;
  onClearAllFilters: () => void;
  onRevealQueuedPosts: () => void;
  onLoadMore: () => void;
  onLike: (item: FeedPost) => void;
  onRepost?: (item: FeedPost) => void;
  onQuotePost?: (item: FeedPost) => void;
  onToggleSave: (postId: string) => void;
  threadPropsForPost: (postId: string) => FeedPostRowThreadProps;
  onCopyLink: (postId: string) => void;
  onDelete: (postId: string) => void;
  onAssistantReply: (item: FeedPost) => void;
  onPrefetchPost: (postId: string) => void;
}

export function CommunityFeed({
  mode,
  appliedQuery,
  category,
  postKind,
  filter,
  posts,
  queuedNewCount,
  cursor,
  loading,
  loadingMore,
  error,
  viewerId,
  canModerate,
  copiedId,
  aiReplyBusyIds,
  isSaved,
  onApplySearch,
  onSelectCategory,
  onSelectPostKind,
  onSelectFilter,
  onClearAllFilters,
  onRevealQueuedPosts,
  onLoadMore,
  onLike,
  onRepost,
  onQuotePost,
  onToggleSave,
  threadPropsForPost,
  onCopyLink,
  onDelete,
  onAssistantReply,
  onPrefetchPost,
}: CommunityFeedProps) {
  // Local input state keeps search keystrokes completely isolated from feed rows.
  const [searchInput, setSearchInput] = useState(appliedQuery);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    setSearchInput(appliedQuery);
  }, [appliedQuery]);

  useEffect(() => {
    return () => {
      if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
    };
  }, []);

  function handleSearchInputChange(next: string) {
    setSearchInput(next);
    if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      onApplySearch(next.trim());
    }, 260);
  }

  function flushSearchSubmit() {
    if (debounceRef.current !== null) {
      window.clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    onApplySearch(searchInput.trim());
  }

  const inlineCategories = COMMUNITY_CATEGORIES.slice(0, MOBILE_INLINE_CATEGORIES);
  const overflowCategories = COMMUNITY_CATEGORIES.slice(MOBILE_INLINE_CATEGORIES);
  const activeOverflowCategory = overflowCategories.find((item) => item.id === category);

  const hasActiveFilter = Boolean(appliedQuery.trim() || category || postKind || filter !== "latest");
  const heading =
    mode === "mine" ? "My posts" : mode === "saved" ? "Saved posts" : "Community";

  return (
    <div className="min-w-0 flex-1 space-y-2">
      <header className="space-y-2 rounded-lg border border-border bg-card p-3">
        {mode === "mine" || mode === "saved" ? (
          <CommunityBackLink href="/ai/community" label="Back to feed" />
        ) : null}

        {/* Row 1: Page heading & primary action (56px target) */}
        <div className="flex min-h-14 flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            {heading}
          </h1>
          <div className="flex items-center gap-2">
            <Link href="/ai/community/new" className={cn(primaryCta, "min-h-11 px-4 py-2")}>
              <Plus className="h-4 w-4" aria-hidden />
              New post
            </Link>
          </div>
        </div>

        {/* Row 2: Search & Latest / No-comments server filter (44px controls) */}
        <form
          className="flex flex-col gap-2 sm:flex-row sm:items-center"
          onSubmit={(event) => {
            event.preventDefault();
            flushSearchSubmit();
          }}
        >
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              value={searchInput}
              onChange={(event) => handleSearchInputChange(event.target.value)}
              placeholder="Search posts"
              aria-label="Search posts"
              className={cn(inputClass, "min-h-11 pl-10 pr-9 text-base sm:text-sm")}
            />
            {searchInput ? (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
                  onApplySearch("");
                }}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            ) : null}
          </div>

          <div
            role="group"
            aria-label="Filter posts"
            className="inline-flex min-h-11 shrink-0 items-center rounded-xl border border-border/80 bg-card p-1"
          >
            <button
              type="button"
              onClick={() => onSelectFilter("latest")}
              aria-pressed={filter === "latest"}
              className={cn(
                "min-h-9 rounded-lg px-3 text-[13px] font-medium transition-colors",
                filter === "latest"
                  ? "bg-primary/12 font-semibold text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Latest
            </button>
            <button
              type="button"
              onClick={() => onSelectFilter("unanswered")}
              aria-pressed={filter === "unanswered"}
              className={cn(
                "min-h-9 rounded-lg px-3 text-[13px] font-medium transition-colors",
                filter === "unanswered"
                  ? "bg-primary/12 font-semibold text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              No comments
            </button>
            <button
              type="button"
              onClick={() => onSelectFilter("following")}
              aria-pressed={filter === "following"}
              className={cn(
                "min-h-9 rounded-lg px-3 text-[13px] font-medium transition-colors",
                filter === "following"
                  ? "bg-primary/12 font-semibold text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Following
            </button>
            <button
              type="button"
              onClick={() => onSelectFilter("solved")}
              aria-pressed={filter === "solved"}
              className={cn(
                "min-h-9 rounded-lg px-3 text-[13px] font-medium transition-colors",
                filter === "solved"
                  ? "bg-primary/12 font-semibold text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Solved
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Browse by content type">
          <button
            type="button"
            className={cn(chipBtn, "min-h-9 text-[12px]", chipActive(!postKind))}
            onClick={() => onSelectPostKind("")}
          >
            All types
          </button>
          {COMMUNITY_POST_KINDS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn(chipBtn, "min-h-9 text-[12px]", chipActive(postKind === item.id))}
              onClick={() => onSelectPostKind(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Row 3: Category strip (44px controls, responsive overflow on mobile) */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Browse by category">
          <button
            type="button"
            className={cn(chipBtn, "min-h-[22px] px-2 py-0.5 text-[10px]", chipActive(!category))}
            onClick={() => onSelectCategory("")}
          >
            All
          </button>

          {inlineCategories.map((item) => {
            const visual = item.id !== "general" ? getSubjectVisual(item.id) : null;
            return (
              <button
                key={item.id}
                type="button"
                className={cn(chipBtn, "min-h-[22px] px-2 py-0.5 text-[10px]", chipActive(category === item.id))}
                onClick={() => onSelectCategory(item.id)}
              >
                {visual ? <span aria-hidden>{visual.glyph}</span> : null}
                {item.label}
              </button>
            );
          })}

          {/* Desktop shows remaining categories directly */}
          {overflowCategories.map((item) => {
            const visual = item.id !== "general" ? getSubjectVisual(item.id) : null;
            return (
              <button
                key={item.id}
                type="button"
                className={cn(
                  chipBtn,
                  "hidden min-h-11 text-[13px] md:inline-flex",
                  chipActive(category === item.id),
                )}
                onClick={() => onSelectCategory(item.id)}
              >
                {visual ? <span aria-hidden>{visual.glyph}</span> : null}
                {item.label}
              </button>
            );
          })}

          {/* Mobile sheet/menu for overflow categories so chips never wrap into 3 rows */}
          {overflowCategories.length > 0 ? (
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      chipBtn,
                      "min-h-11 text-[13px]",
                      chipActive(Boolean(activeOverflowCategory)),
                    )}
                  >
                    {activeOverflowCategory ? activeOverflowCategory.label : "More categories"}
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 rounded-xl p-1 shadow-elev-3">
                  {overflowCategories.map((item) => {
                    const visual = item.id !== "general" ? getSubjectVisual(item.id) : null;
                    const active = category === item.id;
                    return (
                      <DropdownMenuItem
                        key={item.id}
                        onSelect={() => onSelectCategory(item.id)}
                        className={cn(
                          "min-h-10 cursor-pointer rounded-lg px-3 text-[13px]",
                          active && "bg-primary/10 font-semibold text-primary",
                        )}
                      >
                        {visual ? <span aria-hidden>{visual.glyph}</span> : null}
                        {item.label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : null}
        </div>
      </header>

      {/* Non-disruptive arrival banner when background poll discovers newer posts */}
      {queuedNewCount > 0 ? (
        <button
          type="button"
          onClick={onRevealQueuedPosts}
          className={cn(
            chipBtn,
            "min-h-11 w-full justify-center border-primary/35 bg-primary/10 text-sm font-semibold text-primary hover:bg-primary/15",
          )}
        >
          <ArrowUp className="h-4 w-4" aria-hidden />
          Show {queuedNewCount} new {queuedNewCount === 1 ? "post" : "posts"}
        </button>
      ) : null}

      {loading && posts.length === 0 ? <CommunityLoading /> : null}

      {!loading && posts.length === 0 && !error ? (
        <FeedEmpty
          kind={
            hasActiveFilter
              ? "filtered"
              : mode === "saved"
                ? "saved"
                : mode === "mine"
                  ? "mine"
                  : "default"
          }
          onClearFilters={hasActiveFilter ? onClearAllFilters : undefined}
        />
      ) : null}

      {posts.length > 0 ? (
        <div className="space-y-2">
          {posts.map((item, index) => (
            <FeedPostRow
              key={item.id}
              item={item}
              isLeading={index === 0}
              viewerId={viewerId}
              canModerate={canModerate}
              copied={copiedId === item.id}
              aiReplyBusy={aiReplyBusyIds.has(item.id)}
              onLike={onLike}
              onRepost={onRepost}
              onQuotePost={onQuotePost}
              onToggleSave={onToggleSave}
              onCopyLink={onCopyLink}
              onDelete={onDelete}
              onAssistantReply={onAssistantReply}
              onPrefetch={onPrefetchPost}
              {...threadPropsForPost(item.id)}
            />
          ))}
        </div>
      ) : null}

      {cursor != null ? (
        <div className="pt-1">
          <button
            type="button"
            disabled={loadingMore}
            className={cn(chipBtn, "mx-auto flex min-h-11 w-full justify-center py-2.5 text-sm sm:w-auto sm:px-6")}
            onClick={onLoadMore}
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
        </div>
      ) : null}
    </div>
  );
}
