"use client";

import type { MutableRefObject, ReactNode } from "react";
import Link from "next/link";
import {
  COMMUNITY_CATEGORIES,
  type FeedPost,
} from "@/lib/api/community-feed";
import {
  chipActive,
  chipBtn,
  glassShell,
  inputClass,
  primaryCta,
} from "@/features/community/community-ui";
import {
  CommunityBackLink,
  CommunityLoading,
  FeedEmpty,
  messageOf,
} from "@/features/community/community-helpers";
import { cn } from "@/lib/utils";
import { Filter, Loader2, MessageSquare, Plus, Radio, Search, UserRound } from "lucide-react";

function applyCategoryFilter(
  nextCategory: string,
  query: string,
  filters: MutableRefObject<{ q: string; category: string }>,
  setCategory: (value: string) => void,
  setLoading: (value: boolean) => void,
  loadList: (append: boolean) => Promise<void>,
  setError: (value: string | null) => void,
) {
  setCategory(nextCategory);
  filters.current = { q: query.trim(), category: nextCategory };
  setLoading(true);
  loadList(false)
    .catch((err) => setError(messageOf(err)))
    .finally(() => setLoading(false));
}

export function CommunityFeed({
  view,
  query,
  category,
  filters,
  posts,
  cursor,
  loading,
  loadingMore,
  migrated,
  error,
  setQuery,
  setCategory,
  setLoading,
  setLoadingMore,
  setError,
  loadList,
  renderCard,
}: {
  view: "feed" | "mine";
  query: string;
  category: string;
  filters: MutableRefObject<{ q: string; category: string }>;
  posts: FeedPost[];
  cursor: number | null;
  loading: boolean;
  loadingMore: boolean;
  migrated: boolean;
  error: string | null;
  setQuery: (value: string) => void;
  setCategory: (value: string) => void;
  setLoading: (value: boolean) => void;
  setLoadingMore: (value: boolean) => void;
  setError: (value: string | null) => void;
  loadList: (append: boolean, nextCursor?: number | null) => Promise<void>;
  renderCard: (item: FeedPost) => ReactNode;
}) {
  return (
    <>
      <header className="space-y-3">
        {view === "mine" ? (
          <CommunityBackLink href="/ai/community" label="Back to feed" />
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-card text-primary shadow-sm ring-1 ring-primary/10 sm:h-10 sm:w-10 sm:rounded-xl">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
              </span>
              <span className="truncate">{view === "mine" ? "My posts" : "Community"}</span>
            </h1>
            {view === "feed" ? (
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                Bot study notes, member questions, and quick visuals.
              </p>
            ) : (
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Posts you have published.</p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap gap-1.5 sm:gap-2">
            <Link href="/ai/community/new" className={cn(primaryCta, "min-h-11 px-3 py-2")}>
              <Plus className="h-4 w-4" aria-hidden />
              New post
            </Link>
            <Link
              href="/ai/community/chat"
              className={cn(chipBtn, "min-h-11 text-foreground")}
              data-testid="community-chat-link"
            >
              <Radio className="h-3.5 w-3.5" aria-hidden />
              Chat
            </Link>
            <Link
              href="/ai/community/me"
              className={cn(chipBtn, "min-h-11 text-foreground")}
            >
              <UserRound className="h-3.5 w-3.5" aria-hidden />
              My posts
            </Link>
          </div>
        </div>
        {view === "feed" ? (
          <form
            className={cn(glassShell, "flex flex-wrap items-center gap-2 p-3 sm:p-4")}
            onSubmit={(event) => {
              event.preventDefault();
              filters.current = { q: query.trim(), category };
              setLoading(true);
              loadList(false)
                .catch((err) => setError(messageOf(err)))
                .finally(() => setLoading(false));
            }}
          >
            <div className="relative min-w-[12rem] flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search posts"
                aria-label="Search posts"
                className={cn(inputClass, "min-h-11 pl-9")}
              />
            </div>
            <select
              value={category}
              aria-label="Category"
              onChange={(event) => {
                const next = event.target.value;
                setCategory(next);
                filters.current = { q: query.trim(), category: next };
                setLoading(true);
                loadList(false)
                  .catch((err) => setError(messageOf(err)))
                  .finally(() => setLoading(false));
              }}
              className={cn(inputClass, "min-h-11 w-auto min-w-[10rem] pr-8")}
            >
              <option value="">All categories</option>
              {COMMUNITY_CATEGORIES.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
            <button type="submit" className={cn(chipBtn, "min-h-11 shrink-0 text-foreground")}>
              <Filter className="h-3.5 w-3.5" aria-hidden />
              Apply
            </button>
          </form>
        ) : null}
        {view === "feed" ? (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Browse by category">
            <button
              type="button"
              className={cn(chipBtn, "min-h-11", chipActive(!category))}
              onClick={() =>
                applyCategoryFilter("", query, filters, setCategory, setLoading, () => loadList(false), setError)
              }
            >
              All
            </button>
            {COMMUNITY_CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(chipBtn, "min-h-11", chipActive(category === item.id))}
                onClick={() =>
                  applyCategoryFilter(
                    item.id,
                    query,
                    filters,
                    setCategory,
                    setLoading,
                    () => loadList(false),
                    setError,
                  )
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </header>

      {loading ? <CommunityLoading /> : null}
      {!loading && migrated && posts.length === 0 && !error ? <FeedEmpty mine={view === "mine"} /> : null}
      <div className="space-y-4">
        {posts.map((item, index) => (
          <div
            key={item.id}
            className="motion-safe:animate-fade-in motion-reduce:animate-none"
            style={{ animationDelay: index < 12 ? `${Math.min(index * 35, 300)}ms` : undefined }}
          >
            {renderCard(item)}
          </div>
        ))}
        {cursor != null ? (
          <button
            type="button"
            disabled={loadingMore}
            className={cn(chipBtn, "mx-auto min-h-11 w-full justify-center py-2.5 text-sm sm:w-auto")}
            onClick={() => {
              setLoadingMore(true);
              loadList(true, cursor)
                .catch((err) => setError(messageOf(err)))
                .finally(() => setLoadingMore(false));
            }}
          >
            {loadingMore ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Loading…
              </>
            ) : (
              "Load more"
            )}
          </button>
        ) : null}
      </div>
    </>
  );
}
