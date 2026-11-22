"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  addComment,
  deleteComment,
  deletePost,
  getPerson,
  getPost,
  listFeed,
  listMine,
  listSaved,
  listTrending,
  publishAssistantReply,
  setAcceptedComment,
  toggleLike,
  toggleRepost,
  toggleSave as toggleSaveRequest,
  updateComment,
  COMMUNITY_POST_KINDS,
  type CommunityFeedFilter,
  type CommunityPostKind,
  type FeedDetail,
  type FeedList,
  type FeedPost,
  type PersonResponse,
} from "@/lib/api/community-feed";
import { isCommunityBot } from "@/lib/community-bot";
import {
  feedListCacheKey,
  feedPersonCacheKey,
  feedPostCacheKey,
  invalidateCommunityCacheWhere,
  peekCommunityCache,
  prefetchCommunityResource,
  writeCommunityCache,
} from "@/features/community/community-cache";
import { useSavedPosts } from "@/features/community/saved-posts";
import {
  POLL_MS,
  type BoardView,
  canModerate,
  mergeById,
  mergePostSnapshot,
  messageOf,
  statusOf,
} from "@/features/community/community-helpers";
import { optimisticComment, useCopyLink } from "@/features/community/community-board-utils";
import type { CommunitySuccessAction } from "@/features/community/community-action-success";

export function useCommunityBoardController(view: BoardView, id?: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: sessionLoading } = useSession();
  const { copiedId, copy: copyLink } = useCopyLink();
  const celebrationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [celebration, setCelebration] = useState<{
    kind: CommunitySuccessAction;
    postId?: string;
    at: number;
  } | null>(null);

  const dismissCelebration = useCallback(() => {
    if (celebrationTimerRef.current) {
      clearTimeout(celebrationTimerRef.current);
      celebrationTimerRef.current = null;
    }
    setCelebration(null);
  }, []);

  const showCelebration = useCallback(
    (kind: CommunitySuccessAction, postId?: string) => {
      const at = Date.now();
      setCelebration({ kind, postId, at });
      if (celebrationTimerRef.current) clearTimeout(celebrationTimerRef.current);
      celebrationTimerRef.current = setTimeout(() => {
        setCelebration((current) => (current?.at === at ? null : current));
        celebrationTimerRef.current = null;
      }, 5000);
    },
    [],
  );

  const copy = useCallback(
    async (id: string) => {
      await copyLink(id);
    },
    [copyLink],
  );
  const { savedIds, savedCount, isSaved, reconcile: reconcileSaved } = useSavedPosts(user?.id);

  const savedView = view === "feed" && searchParams.get("view") === "saved";
  const trendingView = view === "feed" && searchParams.get("view") === "trending";
  const listMode: "feed" | "saved" | "trending" | "mine" =
    view === "mine" ? "mine" : savedView ? "saved" : trendingView ? "trending" : "feed";

  const [appliedQuery, setAppliedQuery] = useState("");
  const [category, setCategory] = useState("");
  const [postKind, setPostKind] = useState<CommunityPostKind | "">("");
  const [filter, setFilter] = useState<CommunityFeedFilter>("latest");

  useEffect(() => {
    const nextCategory = searchParams.get("category");
    const nextKind = searchParams.get("kind");
    const nextFilter = searchParams.get("filter");
    if (nextCategory) setCategory(nextCategory);
    if (nextKind && COMMUNITY_POST_KINDS.some((item) => item.id === nextKind)) {
      setPostKind(nextKind as CommunityPostKind);
    }
    if (
      nextFilter === "solved" ||
      nextFilter === "unanswered" ||
      nextFilter === "following" ||
      nextFilter === "latest"
    ) {
      setFilter(nextFilter);
    }
  }, [searchParams]);

  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [queuedNewPosts, setQueuedNewPosts] = useState<FeedPost[]>([]);
  const [post, setPost] = useState<FeedPost | null>(null);
  const [person, setPerson] = useState<PersonResponse | null>(null);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [threadStates, setThreadStates] = useState<Record<string, { post: FeedPost | null; loading: boolean; error: string | null }>>({});
  const [cursor, setCursor] = useState<number | null>(null);
  const [personCursor, setPersonCursor] = useState<number | null>(null);
  const [migrated, setMigrated] = useState(true);
  const [loading, setLoading] = useState(
    view === "feed" || view === "mine" || view === "post" || view === "edit" || view === "person",
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [aiReplyBusyIds, setAiReplyBusyIds] = useState<Set<string>>(() => new Set());
  const [followUpBotCommentId, setFollowUpBotCommentId] = useState<string | null>(null);
  const [commentComposerOpen, setCommentComposerOpen] = useState(false);
  const [composerFocusTrigger, setComposerFocusTrigger] = useState(0);

  const likeInFlight = useRef(new Set<string>());
  const saveInFlight = useRef(new Set<string>());
  const likeSeqRef = useRef(new Map<string, number>());
  const listRequestSeqRef = useRef(0);
  const listAbortRef = useRef<AbortController | null>(null);
  const savedIdsKey = savedIds.join(",");

  const openAndFocusComposer = useCallback((botCommentId?: string | null) => {
    if (botCommentId !== undefined) {
      setFollowUpBotCommentId(botCommentId);
    }
    setCommentComposerOpen(true);
    setComposerFocusTrigger((n) => n + 1);
  }, []);

  useEffect(() => {
    if (view !== "post") {
      setCommentComposerOpen(false);
      setFollowUpBotCommentId(null);
      return;
    }
    if (searchParams.get("comment") === "1") {
      setCommentComposerOpen(true);
      setComposerFocusTrigger((n) => n + 1);
    }
  }, [view, searchParams]);

  const patchPostEverywhere = useCallback((postId: string, patch: (item: FeedPost) => FeedPost) => {
    setPosts((current) => current.map((item) => (item.id === postId ? patch(item) : item)));
    setQueuedNewPosts((current) => current.map((item) => (item.id === postId ? patch(item) : item)));
    setPost((current) => {
      if (current?.id !== postId) return current;
      const updated = patch(current);
      writeCommunityCache<FeedDetail>(feedPostCacheKey(user?.id, postId), {
        post: updated,
        migrated: true,
      });
      return updated;
    });
    setPerson((current) =>
      current
        ? { ...current, posts: current.posts.map((item) => (item.id === postId ? patch(item) : item)) }
        : current,
    );
    setThreadStates((current) => {
      const thread = current[postId];
      if (!thread?.post) return current;
      return { ...current, [postId]: { ...thread, post: patch(thread.post) } };
    });
  }, [user?.id]);

  // Wait specifically for a newly arrived bot comment (never stop early on the student's own comment).
  const refreshPostForBotReply = useCallback(
    async (postId: string, beforeBotCommentIds: Set<string>) => {
      for (let attempt = 0; attempt < 10; attempt += 1) {
        await new Promise((resolve) => window.setTimeout(resolve, 2_500));
        try {
          const fresh = await getPost(postId);
          const incoming = fresh.post;
          if (!incoming) continue;
          const botRows = (incoming.comments ?? []).filter(
            (row) => row.author.role === "assistant" || isCommunityBot(row.author.id),
          );
          const gainedBotReply = botRows.some((row) => !beforeBotCommentIds.has(row.id));
          if (gainedBotReply) {
            patchPostEverywhere(postId, (item) => mergePostSnapshot(item, incoming));
            return;
          }
        } catch {
          /* polling is best-effort */
        }
      }
    },
    [patchPostEverywhere],
  );

  const patchAuthorFollowing = useCallback((authorId: string, following: boolean) => {
    const patchAuthor = (item: FeedPost) =>
      item.author.id === authorId
        ? { ...item, author: { ...item.author, followingByYou: following } }
        : item;
    const patchComments = (item: FeedPost) =>
      item.comments
        ? {
            ...item,
            comments: item.comments.map((c) =>
              c.author.id === authorId
                ? { ...c, author: { ...c.author, followingByYou: following } }
                : c,
            ),
          }
        : item;
    const patch = (item: FeedPost) => patchComments(patchAuthor(item));
    setPosts((current) => current.map(patch));
    setQueuedNewPosts((current) => current.map(patch));
    setPost((current) => (current ? patch(current) : current));
    setThreadStates((current) => {
      let changed = false;
      const next = { ...current };
      for (const [postId, state] of Object.entries(current)) {
        if (!state.post) continue;
        next[postId] = { ...state, post: patch(state.post) };
        changed = true;
      }
      return changed ? next : current;
    });
    setPerson((current) =>
      current
        ? {
            ...current,
            profile:
              current.profile?.id === authorId
                ? { ...current.profile, followingByYou: following }
                : current.profile,
            posts: current.posts.map(patch),
          }
        : current,
    );
  }, []);

  const fetchFeedPage = useCallback(
    async (opts: {
      q: string;
      category: string;
      kind: CommunityPostKind | "";
      filter: CommunityFeedFilter;
      mode: "feed" | "saved" | "trending" | "mine";
      ids: string[];
      cursor: number;
      signal?: AbortSignal;
    }): Promise<FeedList> => {
      if (opts.mode === "saved") {
        return listSaved({ cursor: opts.cursor, signal: opts.signal });
      }
      if (opts.mode === "trending") {
        const trending = await listTrending();
        return { posts: trending.posts, nextCursor: null, migrated: trending.migrated };
      }
      if (opts.mode === "mine") {
        return listMine({
          q: opts.q,
          category: opts.category,
          kind: opts.kind,
          filter: opts.filter,
          cursor: opts.cursor,
          signal: opts.signal,
        });
      }
      return listFeed({
        q: opts.q,
        category: opts.category,
        kind: opts.kind,
        filter: opts.filter,
        cursor: opts.cursor,
        signal: opts.signal,
      });
    },
    [],
  );

  // Primary list loader with SWR warm-cache hydration + request-version superseding.
  useEffect(() => {
    if (view !== "feed" && view !== "mine") return;
    if (view === "mine" && sessionLoading) return;
    if (view === "mine" && !user) {
      setLoading(false);
      setPosts([]);
      setCursor(null);
      setError("Sign in to see your posts.");
      return;
    }
    if (listMode === "saved" && !user) {
      setLoading(false);
      setPosts([]);
      setCursor(null);
      setError("Sign in to see saved posts.");
      return;
    }

    const seq = ++listRequestSeqRef.current;
    listAbortRef.current?.abort();
    const controller = new AbortController();
    listAbortRef.current = controller;

    const currentSavedIds = savedIdsKey ? savedIdsKey.split(",") : [];
    const cacheKey = feedListCacheKey(user?.id, listMode, {
      q: appliedQuery,
      category,
      kind: postKind,
      filter,
      idsKey: listMode === "saved" ? "server-saved" : "",
    });

    const warm = peekCommunityCache<FeedList>(cacheKey);
    if (warm) {
      setPosts(warm.value.posts);
      setCursor(warm.value.nextCursor);
      setMigrated(warm.value.migrated);
      setLoading(false);
    } else {
      setLoading(true);
    }
    setQueuedNewPosts([]);
    setError(null);

    fetchFeedPage({
      q: appliedQuery,
      category,
      kind: postKind,
      filter,
      mode: listMode,
      ids: currentSavedIds,
      cursor: 0,
      signal: controller.signal,
    })
      .then((result) => {
        if (seq !== listRequestSeqRef.current) return;
        setMigrated(result.migrated);
        setCursor(result.nextCursor);
        setPosts(result.posts);
        writeCommunityCache(cacheKey, result);
      })
      .catch((err) => {
        if (controller.signal.aborted || seq !== listRequestSeqRef.current) return;
        // Keep stale cached content visible on transient failures; still surface error.
        setError(statusOf(err) === 401 ? "Sign in to see your posts." : messageOf(err));
      })
      .finally(() => {
        if (seq === listRequestSeqRef.current) setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [
    view,
    listMode,
    appliedQuery,
    category,
    postKind,
    filter,
    savedIdsKey,
    user,
    sessionLoading,
    fetchFeedPage,
  ]);

  // Post detail & edit loader with warm-cache hydration.
  useEffect(() => {
    if (view !== "post" && view !== "edit") return;
    if (!id) return;
    if (view === "edit" && sessionLoading) return;
    if (view === "edit" && !user) {
      setLoading(false);
      setError("Sign in to edit posts.");
      return;
    }

    let cancel = false;
    const cacheKey = feedPostCacheKey(user?.id, id);
    const warm = view === "post" ? peekCommunityCache<FeedDetail>(cacheKey) : undefined;
    if (warm?.value.post) {
      setPost(warm.value.post);
      setMigrated(warm.value.migrated);
      setLoading(false);
    } else {
      setLoading(true);
    }
    setError(null);

    getPost(id)
      .then((detail) => {
        if (cancel) return;
        if (!detail.migrated && !detail.post) {
          setMigrated(false);
          setPost(null);
          return;
        }
        if (!detail.post) {
          router.replace("/ai/community/unavailable");
          return;
        }
        if (view === "edit") {
          const allowed = detail.post.author.id === user?.id;
          if (!allowed) {
            router.replace("/ai/community/unavailable");
            return;
          }
        }
        setPost(detail.post);
        setMigrated(detail.migrated);
        writeCommunityCache(cacheKey, detail);
      })
      .catch((err) => {
        if (cancel) return;
        if (statusOf(err) === 404 || statusOf(err) === 403) {
          router.replace("/ai/community/unavailable");
        } else if (statusOf(err) === 401) {
          setError("Sign in to edit posts.");
        } else {
          setError(messageOf(err));
        }
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [view, id, user, sessionLoading, router]);

  // Person profile loader with warm-cache hydration.
  useEffect(() => {
    if (view !== "person" || !id) return;
    let cancel = false;
    const cacheKey = feedPersonCacheKey(user?.id, id);
    const warm = peekCommunityCache<PersonResponse>(cacheKey);
    if (warm?.value.profile) {
      setPerson(warm.value);
      setPersonCursor(warm.value.nextCursor ?? null);
      setMigrated(warm.value.migrated);
      setLoading(false);
    } else {
      setLoading(true);
    }
    setError(null);

    getPerson(id)
      .then((result) => {
        if (cancel) return;
        if (!result.profile) {
          router.replace("/ai/community/unavailable");
          return;
        }
        setPerson(result);
        setPersonCursor(result.nextCursor ?? null);
        setMigrated(result.migrated);
        writeCommunityCache(cacheKey, result);
      })
      .catch((err) => {
        if (cancel) return;
        if (statusOf(err) === 404) router.replace("/ai/community/unavailable");
        else if (statusOf(err) === 401) setError("Sign in to view your profile.");
        else setError(messageOf(err));
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [view, id, user?.id, router]);

  // Non-disruptive background polling: queues newly arrived feed posts behind a button
  // and pauses while hidden or while composition is open.
  useEffect(() => {
    if (view !== "feed" && view !== "mine" && view !== "post" && view !== "person") return;
    const timer = window.setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      if (commentComposerOpen || expandedPostId) return;

      if ((view === "feed" || (view === "mine" && user)) && listMode !== "saved" && listMode !== "trending") {
        fetchFeedPage({
          q: appliedQuery,
          category,
          kind: postKind,
          filter,
          mode: listMode,
          ids: [],
          cursor: 0,
        })
          .then((result) => {
            setMigrated(result.migrated);
            setPosts((current) => {
              if (current.length === 0) return result.posts;
              const knownIds = new Set(current.map((p) => p.id));
              const newlyArrived = result.posts.filter((p) => !knownIds.has(p.id));
              const existingUpdates = result.posts.filter(
                (p) => knownIds.has(p.id) && !likeInFlight.current.has(p.id),
              );
              if (newlyArrived.length > 0) {
                setQueuedNewPosts((queued) => {
                  const seen = new Set(queued.map((q) => q.id));
                  const fresh = newlyArrived.filter((p) => !seen.has(p.id));
                  return fresh.length > 0 ? [...fresh, ...queued] : queued;
                });
              }
              return existingUpdates.length > 0 ? mergeById(current, existingUpdates) : current;
            });
          })
          .catch(() => undefined);
        return;
      }

      if (view === "post" && id) {
        if (likeInFlight.current.has(id)) return;
        getPost(id)
          .then((detail) => {
            if (!detail.post) return;
            setPost((current) =>
              current && current.id === detail.post!.id
                ? mergePostSnapshot(current, detail.post!)
                : detail.post!,
            );
          })
          .catch(() => undefined);
      }
    }, POLL_MS);

    return () => window.clearInterval(timer);
  }, [
    view,
    listMode,
    appliedQuery,
    category,
    postKind,
    filter,
    id,
    user,
    commentComposerOpen,
    expandedPostId,
    fetchFeedPage,
  ]);

  const knownPost = useCallback(
    (postId: string) =>
      threadStates[postId]?.post ??
      posts.find((item) => item.id === postId) ??
      person?.posts.find((item) => item.id === postId) ??
      (post?.id === postId ? post : null),
    [person?.posts, post, posts, threadStates],
  );

  const handlePrefetchPost = useCallback(
    (postId: string) => {
      const cacheKey = feedPostCacheKey(user?.id, postId);
      prefetchCommunityResource<FeedDetail>(cacheKey, () => getPost(postId), (res) => Boolean(res.post));
    },
    [user?.id],
  );

  const toggleInlineComments = useCallback((postId: string) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
      return;
    }
    setExpandedPostId(postId);
    setFollowUpBotCommentId(null);
    setComposerFocusTrigger((n) => n + 1);
    const cachedThread = threadStates[postId]?.post;
    const cached = cachedThread ?? knownPost(postId);
    if (cachedThread?.comments !== undefined) {
      setThreadStates((current) => ({ ...current, [postId]: { post: cachedThread, loading: false, error: null } }));
      return;
    }
    if (threadStates[postId]?.loading) return;
    setThreadStates((current) => ({ ...current, [postId]: { post: current[postId]?.post ?? cached ?? null, loading: true, error: null } }));
    void getPost(postId)
      .then((detail) => {
        if (!detail.post) throw new Error("Comments are unavailable for this post.");
        setThreadStates((current) => ({ ...current, [postId]: { post: detail.post, loading: false, error: null } }));
        patchPostEverywhere(postId, (item) => mergePostSnapshot(item, detail.post!));
      })
      .catch((err) => setThreadStates((current) => ({
        ...current,
        [postId]: { post: current[postId]?.post ?? cached ?? null, loading: false, error: messageOf(err, "Could not load comments.") },
      })));
  }, [expandedPostId, knownPost, patchPostEverywhere, threadStates]);

  const onToggleSave = useCallback((postId: string) => {
    if (!user) {
      setError("Sign in to save posts.");
      return;
    }
    if (saveInFlight.current.has(postId)) return;
    saveInFlight.current.add(postId);
    const target = knownPost(postId);
    const previousSaved = target?.savedByYou ?? isSaved(postId);
    const nextSaved = !previousSaved;
    reconcileSaved(postId, nextSaved);
    if (target) {
      patchPostEverywhere(postId, (item) => ({
        ...item,
        saveCount: Math.max(0, item.saveCount + (nextSaved ? 1 : -1)),
        savedByYou: nextSaved,
      }));
    }
    void toggleSaveRequest(postId)
      .then((result) => {
        reconcileSaved(postId, result.savedByYou);
        patchPostEverywhere(postId, (item) => ({ ...item, saveCount: result.saveCount, savedByYou: result.savedByYou }));
        if (result.savedByYou) showCelebration("saved", postId);
        invalidateCommunityCacheWhere((key) => key.startsWith("feed-list::"));
      })
      .catch((err) => {
        reconcileSaved(postId, previousSaved);
        if (target) {
          patchPostEverywhere(postId, (item) => ({ ...item, saveCount: target.saveCount, savedByYou: previousSaved }));
        }
        setError(statusOf(err) === 401 ? "Sign in to save posts." : messageOf(err));
      })
      .finally(() => saveInFlight.current.delete(postId));
  }, [isSaved, knownPost, patchPostEverywhere, reconcileSaved, showCelebration, user]);

  const onLike = useCallback(
    (target: FeedPost) => {
      if (!user) {
        setError("Sign in to like posts.");
        return;
      }
      if (likeInFlight.current.has(target.id)) return;

      const prevLiked = target.likedByYou;
      const prevCount = target.likeCount;
      const nextLiked = !prevLiked;
      const nextCount = Math.max(0, prevCount + (nextLiked ? 1 : -1));
      const seq = (likeSeqRef.current.get(target.id) ?? 0) + 1;
      likeSeqRef.current.set(target.id, seq);

      likeInFlight.current.add(target.id);
      patchPostEverywhere(target.id, (item) => ({
        ...item,
        likedByYou: nextLiked,
        likeCount: nextCount,
      }));

      void toggleLike(target.id)
        .then((result) => {
          if (likeSeqRef.current.get(target.id) !== seq) return;
          patchPostEverywhere(target.id, (item) => ({
            ...item,
            likeCount: result.likeCount,
            likedByYou: result.likedByYou,
          }));
          invalidateCommunityCacheWhere((k) => k.startsWith("feed-list::"));
        })
        .catch((err) => {
          if (likeSeqRef.current.get(target.id) !== seq) return;
          patchPostEverywhere(target.id, (item) => ({
            ...item,
            likedByYou: prevLiked,
            likeCount: prevCount,
          }));
          setError(statusOf(err) === 401 ? "Sign in to like posts." : messageOf(err));
        })
        .finally(() => {
          likeInFlight.current.delete(target.id);
        });
    },
    [patchPostEverywhere, user],
  );

  const onRepost = useCallback(
    (target: FeedPost) => {
      if (!user) {
        setError("Sign in to repost.");
        return;
      }
      const prev = target.repostedByYou ?? false;
      const prevCount = target.repostCount ?? 0;
      const next = !prev;
      patchPostEverywhere(target.id, (item) => ({
        ...item,
        repostedByYou: next,
        repostCount: Math.max(0, prevCount + (next ? 1 : -1)),
      }));
      void toggleRepost(target.id)
        .then((result) => {
          if (result.repostedByYou) showCelebration("reposted", target.id);
          patchPostEverywhere(target.id, (item) => ({
            ...item,
            repostCount: result.repostCount,
            repostedByYou: result.repostedByYou,
          }));
        })
        .catch((err) => {
          patchPostEverywhere(target.id, (item) => ({
            ...item,
            repostedByYou: prev,
            repostCount: prevCount,
          }));
          setError(statusOf(err) === 401 ? "Sign in to repost." : messageOf(err));
        });
    },
    [patchPostEverywhere, showCelebration, user],
  );

  const onQuotePost = useCallback(
    (target: FeedPost) => {
      if (!user) {
        setError("Sign in to quote a post.");
        return;
      }
      router.push(`/ai/community/new?quote=${encodeURIComponent(target.id)}`);
    },
    [router, user],
  );

  const onDeletePost = useCallback(
    async (postId: string) => {
      if (!user) {
        setError("Sign in to delete posts.");
        return;
      }
      if (!window.confirm("Delete this post?")) return;

      let postsBackup: FeedPost[] | null = null;
      let personBackup: PersonResponse | null = null;
      let postBackup: FeedPost | null = null;

      setPosts((current) => {
        postsBackup = current;
        return current.filter((item) => item.id !== postId);
      });
      setPerson((current) => {
        if (!current) return current;
        personBackup = current;
        return { ...current, posts: current.posts.filter((item) => item.id !== postId) };
      });
      setPost((current) => {
        if (current?.id === postId) postBackup = current;
        return current?.id === postId ? null : current;
      });

      try {
        await deletePost(postId);
        invalidateCommunityCacheWhere((k) => k.startsWith("feed-"));
        if (view === "post") router.push("/ai/community");
      } catch (err) {
        if (postsBackup) setPosts(postsBackup);
        if (personBackup) setPerson(personBackup);
        if (postBackup) setPost(postBackup);
        setError(statusOf(err) === 401 ? "Sign in to delete posts." : messageOf(err));
      }
    },
    [router, user, view],
  );

  const handleSubmitComment = useCallback(
    async (
      postId: string,
      body: string,
      followUpToBot: boolean,
      replyToCommentId?: string,
    ): Promise<{ ok: boolean; error?: string }> => {
      const targetPost = knownPost(postId);
      if (!targetPost || !user) return { ok: false, error: "Sign in to reply." };
      const parent = replyToCommentId
        ? (targetPost.comments ?? []).find((row) => row.id === replyToCommentId)
        : undefined;
      const pending = optimisticComment(
        body,
        user,
        parent
          ? {
              parentId: parent.id,
              replyTo: {
                id: parent.author.id,
                fullName: parent.author.fullName,
                username: parent.author.username,
              },
            }
          : undefined,
      );
      const beforeBotCommentIds = new Set(
        (targetPost.comments ?? [])
          .filter((row) => row.author.role === "assistant" || isCommunityBot(row.author.id))
          .map((row) => row.id),
      );

      setFollowUpBotCommentId(null);
      patchPostEverywhere(postId, (item) => ({
        ...item,
        commentCount: item.commentCount + 1,
        comments: [...(item.comments ?? []), pending],
      }));

      try {
        const result = await addComment(postId, body, { followUpToBot, replyToCommentId });
        const added = [result.comment, ...(result.botComment ? [result.botComment] : [])];
        patchPostEverywhere(postId, (item) => {
          const withoutPending = (item.comments ?? []).filter((c) => c.id !== pending.id);
          const hadCommentsLoaded = item.comments !== undefined;
          return {
            ...item,
            commentCount: hadCommentsLoaded
              ? withoutPending.length + added.length
              : Math.max(0, item.commentCount - 1) + added.length,
            comments: [...withoutPending, ...added],
          };
        });
        invalidateCommunityCacheWhere((k) => k.startsWith("feed-list::"));
        if (result.botReplyPending) void refreshPostForBotReply(postId, beforeBotCommentIds);
        showCelebration("comment", postId);
        return { ok: true };
      } catch (err) {
        patchPostEverywhere(postId, (item) => ({
          ...item,
          commentCount: Math.max(0, item.commentCount - 1),
          comments: (item.comments ?? []).filter((c) => c.id !== pending.id),
        }));
        return { ok: false, error: statusOf(err) === 401 ? "Sign in to reply." : messageOf(err) };
      }
    },
    [knownPost, patchPostEverywhere, refreshPostForBotReply, showCelebration, user],
  );

  const handleSaveCommentEdit = useCallback(
    async (postId: string, commentId: string, nextBody: string): Promise<{ ok: boolean; error?: string }> => {
      if (!knownPost(postId) || !user) return { ok: false, error: "Sign in to edit comments." };
      try {
        const result = await updateComment(postId, commentId, nextBody);
        patchPostEverywhere(postId, (item) => ({
          ...item,
          comments: (item.comments ?? []).map((entry) =>
            entry.id === commentId
              ? {
                  ...result.comment,
                  // The PATCH response may omit thread linkage; preserve it so
                  // editing a reply keeps its "Replying to @X" label.
                  replyTo: result.comment.replyTo ?? entry.replyTo,
                  parentId: result.comment.parentId ?? entry.parentId,
                }
              : entry,
          ),
        }));
        return { ok: true };
      } catch (err) {
        return { ok: false, error: statusOf(err) === 401 ? "Sign in to edit comments." : messageOf(err) };
      }
    },
    [knownPost, patchPostEverywhere, user],
  );

  const handleDeleteComment = useCallback(
    (postId: string, commentId: string) => {
      const targetPost = knownPost(postId);
      if (!targetPost || !user || !window.confirm("Delete this comment?")) return;
      const prevComments = targetPost.comments ?? [];
      const prevCount = targetPost.commentCount;
      patchPostEverywhere(postId, (item) => ({
        ...item,
        commentCount: Math.max(0, item.commentCount - 1),
        comments: (item.comments ?? []).filter((entry) => entry.id !== commentId),
      }));
      void deleteComment(postId, commentId)
        .then(() => invalidateCommunityCacheWhere((k) => k.startsWith("feed-list::")))
        .catch((err) => {
          patchPostEverywhere(postId, (item) => ({ ...item, commentCount: prevCount, comments: prevComments }));
          setError(statusOf(err) === 401 ? "Sign in to delete comments." : messageOf(err));
        });
    },
    [knownPost, patchPostEverywhere, user],
  );

  const handleAcceptAnswer = useCallback(
    (postId: string, commentId: string) => {
      const target = knownPost(postId);
      const next = target?.acceptedCommentId === commentId ? null : commentId;
      void setAcceptedComment(postId, next)
        .then((result) => {
          if (result.post) {
            patchPostEverywhere(postId, () => result.post!);
          } else {
            patchPostEverywhere(postId, (item) => ({
              ...item,
              acceptedCommentId: next,
              solved: Boolean(next),
            }));
          }
          invalidateCommunityCacheWhere((k) => k.startsWith("feed-list::"));
        })
        .catch((err) =>
          setError(statusOf(err) === 401 ? "Sign in to mark an accepted answer." : messageOf(err)),
        );
    },
    [knownPost, patchPostEverywhere],
  );

  const threadPropsForPost = useCallback((postId: string) => {
    const state = threadStates[postId];
    const threadPost = state?.post ?? knownPost(postId);
    const commentsExpanded = expandedPostId === postId;
    return {
      viewer: user,
      commentsExpanded,
      threadComments: threadPost?.comments ?? [],
      threadLoading: Boolean(commentsExpanded && state?.loading),
      threadError: commentsExpanded ? state?.error ?? null : null,
      followUpBotCommentId: commentsExpanded ? followUpBotCommentId : null,
      composerFocusTrigger: commentsExpanded ? composerFocusTrigger : 0,
      onToggleComments: toggleInlineComments,
      onSelectFollowUp: (commentId: string) => {
        setFollowUpBotCommentId((current) => current === commentId ? null : commentId);
        setComposerFocusTrigger((n) => n + 1);
      },
      onClearFollowUp: () => setFollowUpBotCommentId(null),
      onFollowChange: patchAuthorFollowing,
      onSubmitComment: handleSubmitComment,
      onSaveCommentEdit: handleSaveCommentEdit,
      onDeleteComment: handleDeleteComment,
      onAcceptAnswer: handleAcceptAnswer,
    };
  }, [composerFocusTrigger, expandedPostId, followUpBotCommentId, handleAcceptAnswer, handleDeleteComment, handleSaveCommentEdit, handleSubmitComment, knownPost, patchAuthorFollowing, threadStates, toggleInlineComments, user]);

  const onAssistantReply = useCallback(
    (target: FeedPost) => {
      if (aiReplyBusyIds.has(target.id)) return;
      setAiReplyBusyIds((prev) => new Set(prev).add(target.id));
      setError(null);

      void Promise.resolve(publishAssistantReply(target.id))
        .then((result) => {
          patchPostEverywhere(target.id, (item) => ({
            ...item,
            commentCount: item.commentCount + 1,
            assistantReply: result.assistantReply,
            comments: item.comments ? [...item.comments, result.comment] : item.comments,
          }));
          invalidateCommunityCacheWhere((k) => k.startsWith("feed-list::"));
        })
        .catch((err) =>
          setError(
            statusOf(err) === 401
              ? "Sign in to ask the community assistant."
              : statusOf(err) === 409
                ? "The community assistant already answered this question."
                : statusOf(err) === 429
                  ? "Too many Ask AI requests right now. Try again in a few minutes."
                    : messageOf(err, "Could not publish the assistant reply."),
          ),
        )
        .finally(() => {
          setAiReplyBusyIds((prev) => {
            const next = new Set(prev);
            next.delete(target.id);
            return next;
          });
        });
    },
    [aiReplyBusyIds, patchPostEverywhere],
  );

  const handleLoadMoreFeed = useCallback(() => {
    if (cursor == null || loadingMore) return;
    setLoadingMore(true);
    const currentSavedIds = savedIdsKey ? savedIdsKey.split(",") : [];
    fetchFeedPage({
      q: appliedQuery,
      category,
      kind: postKind,
      filter,
      mode: listMode,
      ids: currentSavedIds,
      cursor,
    })
      .then((result) => {
        setMigrated(result.migrated);
        setCursor(result.nextCursor);
        setPosts((current) => [
          ...current,
          ...result.posts.filter((item) => !current.some((have) => have.id === item.id)),
        ]);
      })
      .catch((err) => setError(messageOf(err)))
      .finally(() => setLoadingMore(false));
  }, [appliedQuery, category, postKind, cursor, fetchFeedPage, filter, listMode, loadingMore, savedIdsKey]);

  const handleLoadMorePerson = useCallback(() => {
    if (!id || personCursor == null || loadingMore) return;
    setLoadingMore(true);
    getPerson(id, { cursor: personCursor })
      .then((result) => {
        setPersonCursor(result.nextCursor ?? null);
        setPerson((current) =>
          current
            ? {
                ...current,
                posts: [
                  ...current.posts,
                  ...result.posts.filter(
                    (item) => !current.posts.some((have) => have.id === item.id),
                  ),
                ],
              }
            : result,
        );
      })
      .catch((err) => setError(messageOf(err)))
      .finally(() => setLoadingMore(false));
  }, [id, loadingMore, personCursor]);

  const moderate = canModerate(user);

  return {
    view,
    id,
    user,
    sessionLoading,
    savedView,
    trendingView,
    listMode,
    migrated,
    error,
    celebration,
    dismissCelebration,
    setError,
    loading,
    loadingMore,
    post,
    person,
    personCursor,
    appliedQuery,
    setAppliedQuery,
    category,
    setCategory,
    postKind,
    setPostKind,
    filter,
    setFilter,
    posts,
    setPosts,
    queuedNewPosts,
    setQueuedNewPosts,
    cursor,
    moderate,
    copiedId,
    copy,
    isSaved,
    savedCount,
    aiReplyBusyIds,
    followUpBotCommentId,
    setFollowUpBotCommentId,
    composerFocusTrigger,
    openAndFocusComposer,
    threadPropsForPost,
    onLike,
    onRepost,
    onQuotePost,
    onToggleSave,
    onDeletePost,
    onAssistantReply,
    handlePrefetchPost,
    handleLoadMoreFeed,
    handleLoadMorePerson,
    patchAuthorFollowing,
    handleSubmitComment,
    handleSaveCommentEdit,
    handleDeleteComment,
    handleAcceptAnswer,
  };
}

export type CommunityBoardController = ReturnType<typeof useCommunityBoardController>;
