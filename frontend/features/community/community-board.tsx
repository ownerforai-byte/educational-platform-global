"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  Bookmark,
  Check,
  Ellipsis,
  Heart,
  Link2,
  Loader2,
  MessageCircle,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { publicUrl } from "@/lib/site-url";
import { useSession } from "@/features/auth/hooks/use-session";
import type { SessionUser } from "@/features/auth/types";
import {
  addComment,
  deleteComment,
  deletePost,
  getPerson,
  getPost,
  listFeed,
  listMine,
  publishAssistantReply,
  sharePath,
  toggleLike,
  toggleSave as toggleSaveRequest,
  updateComment,
  type CommunityFeedFilter,
  type FeedComment,
  type FeedDetail,
  type FeedList,
  type FeedPost,
  type PersonResponse,
} from "@/lib/api/community-feed";
import { isCommunityBot } from "@/lib/community-bot";
import { getSubjectVisual } from "@/lib/ui/subject-visuals";
import { PostAuthorHeader } from "@/features/community/post-author-header";
import { AttachmentList } from "@/features/community/attachment-list";
import { BotAnswerButton } from "@/features/community/bot-answer-button";
import { CommunityFeed } from "@/features/community/community-feed";
import { CommunitySubnav } from "@/features/community/community-subnav";
import { FeedPostRow } from "@/features/community/feed-post-row";
import { CommentList } from "@/features/community/comment-list";
import { CommentComposer } from "@/features/community/comment-composer";
import { PostComposer } from "@/features/community/post-composer";
import { MarkdownBody } from "@/features/community/markdown-body";
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
  CommunityBackLink,
  CommunityLoading,
  CommunityUnavailable,
  looksLikeQuestion,
  mergeById,
  mergePostSnapshot,
  messageOf,
  statusOf,
} from "@/features/community/community-helpers";
import {
  actionBtn,
  categoryLabel,
  chipBtn,
  emptyStatePanel,
  surfaceCard,
  surfaceCardFlat,
} from "@/features/community/community-ui";
import { cn } from "@/lib/utils";

function useCopyLink() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copy = useCallback(async (id: string) => {
    const url = publicUrl(sharePath(id));
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      const input = document.createElement("textarea");
      input.value = url;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      const copied = document.execCommand("copy");
      input.remove();
      if (!copied) throw new Error("Clipboard access is unavailable.");
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 2000);
  }, []);
  return { copiedId, copy };
}

function optimisticCommentId(): string {
  return `pending-comment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function optimisticComment(body: string, user: SessionUser): FeedComment {
  const now = new Date().toISOString();
  return {
    id: optimisticCommentId(),
    body,
    createdAt: now,
    updatedAt: now,
    author: {
      id: user.id,
      fullName: user.fullName?.trim() || "You",
      username: null,
      plan: user.plan ?? null,
      role: user.role ?? null,
    },
  };
}

export { CommunityUnavailable };

export function CommunityBoard({ view, id }: { view: BoardView; id?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: sessionLoading } = useSession();
  const { copiedId, copy } = useCopyLink();
  const { savedIds, savedCount, isSaved, reconcile: reconcileSaved } = useSavedPosts(user?.id);

  const savedView = view === "feed" && searchParams.get("view") === "saved";
  const listMode: "feed" | "saved" | "mine" =
    view === "mine" ? "mine" : savedView ? "saved" : "feed";

  const [appliedQuery, setAppliedQuery] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState<CommunityFeedFilter>("latest");

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
      filter: CommunityFeedFilter;
      mode: "feed" | "saved" | "mine";
      ids: string[];
      cursor: number;
      signal?: AbortSignal;
    }): Promise<FeedList> => {
      if (opts.mode === "saved") {
        if (opts.ids.length === 0) {
          return { posts: [], nextCursor: null, migrated: true };
        }
        return listFeed({
          q: opts.q,
          category: opts.category,
          filter: opts.filter,
          ids: opts.ids.slice(0, 50),
          cursor: opts.cursor,
          signal: opts.signal,
        });
      }
      if (opts.mode === "mine") {
        return listMine({
          q: opts.q,
          category: opts.category,
          filter: opts.filter,
          cursor: opts.cursor,
          signal: opts.signal,
        });
      }
      return listFeed({
        q: opts.q,
        category: opts.category,
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

    const seq = ++listRequestSeqRef.current;
    listAbortRef.current?.abort();
    const controller = new AbortController();
    listAbortRef.current = controller;

    const currentSavedIds = savedIdsKey ? savedIdsKey.split(",") : [];
    const cacheKey = feedListCacheKey(user?.id, listMode, {
      q: appliedQuery,
      category,
      filter,
      idsKey: listMode === "saved" ? savedIdsKey : "",
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
          const allowed = detail.post.author.id === user?.id || canModerate(user);
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

      if ((view === "feed" || (view === "mine" && user)) && listMode !== "saved") {
        fetchFeedPage({
          q: appliedQuery,
          category,
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
  }, [isSaved, knownPost, patchPostEverywhere, reconcileSaved, user]);

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
    async (postId: string, body: string, followUpToBot: boolean): Promise<{ ok: boolean; error?: string }> => {
      const targetPost = knownPost(postId);
      if (!targetPost || !user) return { ok: false, error: "Sign in to comment." };
      const pending = optimisticComment(body, user);
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
        const result = await addComment(postId, body, { followUpToBot });
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
        return { ok: true };
      } catch (err) {
        patchPostEverywhere(postId, (item) => ({
          ...item,
          commentCount: Math.max(0, item.commentCount - 1),
          comments: (item.comments ?? []).filter((c) => c.id !== pending.id),
        }));
        return { ok: false, error: statusOf(err) === 401 ? "Sign in to comment." : messageOf(err) };
      }
    },
    [knownPost, patchPostEverywhere, refreshPostForBotReply, user],
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
    };
  }, [composerFocusTrigger, expandedPostId, followUpBotCommentId, handleDeleteComment, handleSaveCommentEdit, handleSubmitComment, knownPost, patchAuthorFollowing, threadStates, toggleInlineComments, user]);

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
              ? "Sign in to ask Veer to reply."
              : statusOf(err) === 403
                ? "Only the post author or a platform owner can publish a Veer reply on this post."
                : statusOf(err) === 409
                  ? "A Veer reply is already on this post."
                  : statusOf(err) === 429
                    ? "Too many Veer replies right now. Try again in a few minutes."
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
  }, [appliedQuery, category, cursor, fetchFeedPage, filter, listMode, loadingMore, savedIdsKey]);

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

  if (view === "unavailable") return <CommunityUnavailable />;

  const moderate = canModerate(user);

  // Dedicated centered reading/writing column (max 800px) for post, new, and edit views
  if (view === "new" || view === "edit" || view === "post") {
    return (
      <div className="mx-auto w-full max-w-[800px] space-y-5 px-4 py-6 sm:px-6">
        {view === "new" ? (
          <>
            <header className="space-y-3">
              <CommunityBackLink href="/ai/community" label="Back to feed" />
              <h1 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
                <Plus className="h-6 w-6 text-primary" aria-hidden />
                New post
              </h1>
            </header>
            <PostComposer user={user} sessionLoading={sessionLoading} mode="create" redirectOnSuccess />
          </>
        ) : null}

        {!migrated ? (
          <p className={cn(surfaceCard, "flex items-start gap-2 p-3.5 text-sm text-muted-foreground")}>
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            Community posts are not set up on this deployment yet.
          </p>
        ) : null}

        {error ? (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {error}
          </p>
        ) : null}

        {loading && !post && view !== "new" ? <CommunityLoading /> : null}

        {view === "edit" && post ? (
          <>
            <header className="space-y-3">
              <CommunityBackLink href={sharePath(post.id)} label="Back to post" />
            </header>
            <PostComposer
              user={user}
              sessionLoading={sessionLoading}
              mode="edit"
              initial={post}
              redirectOnSuccess
            />
          </>
        ) : null}

        {view === "post" && post ? (
          <div className="space-y-6">
            <CommunityBackLink href="/ai/community" label="Back to feed" />

            <article className={cn(surfaceCardFlat, "space-y-4 p-5 sm:p-6")}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {(() => {
                      const visual =
                        post.category !== "general" ? getSubjectVisual(post.category) : null;
                      return (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
                            visual
                              ? visual.badge
                              : "border border-border/80 bg-muted/50 text-foreground",
                          )}
                        >
                          {visual ? <span aria-hidden>{visual.glyph}</span> : null}
                          {categoryLabel(post.category)}
                        </span>
                      );
                    })()}
                  </div>
                  <h1 className="font-display text-xl font-bold leading-snug tracking-tight text-foreground sm:text-2xl">
                    {post.title}
                  </h1>
                </div>

                {(user?.id === post.author.id || moderate) ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        aria-label="Post options"
                        className={cn(
                          actionBtn,
                          "min-h-11 min-w-11 justify-center px-2 text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                        )}
                      >
                        <Ellipsis className="h-4 w-4" aria-hidden />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44 rounded-xl p-1 shadow-elev-3">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/ai/community/posts/${post.id}/edit`}
                          className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2.5 text-[13px]"
                        >
                          <Pencil className="h-4 w-4" aria-hidden />
                          Edit post
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => void onDeletePost(post.id)}
                        className="min-h-10 cursor-pointer rounded-lg px-2.5 text-[13px] text-destructive focus:bg-destructive/10 focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                        Delete post
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </div>

              <PostAuthorHeader
                author={post.author}
                createdAt={post.createdAt}
                viewerId={user?.id}
                onFollowChange={(following) => patchAuthorFollowing(post.author.id, following)}
              />

              <MarkdownBody text={post.body} className="text-base leading-relaxed text-foreground" />

              {post.attachments.length > 0 ? <AttachmentList files={post.attachments} /> : null}

              {/* Clean single action line */}
              <div className="flex flex-wrap items-center gap-1.5 border-t border-border/60 pt-3">
                <button
                  type="button"
                  onClick={() => onLike(post)}
                  aria-pressed={post.likedByYou}
                  aria-label={post.likedByYou ? "Unlike post" : "Like post"}
                  className={cn(
                    actionBtn,
                    "min-h-11 px-3 text-[13px] tabular-nums",
                    post.likedByYou
                      ? "bg-primary/10 font-semibold text-primary hover:bg-primary/15"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <Heart className={cn("h-4 w-4", post.likedByYou && "fill-current")} aria-hidden />
                  <span>{post.likeCount}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleSave(post.id)}
                  aria-pressed={post.savedByYou || isSaved(post.id)}
                  aria-label={post.savedByYou || isSaved(post.id) ? "Saved post" : "Save post"}
                  className={cn(
                    actionBtn,
                    "min-h-11 px-3 text-[13px]",
                    (post.savedByYou || isSaved(post.id))
                      ? "bg-primary/12 font-semibold text-primary hover:bg-primary/18"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  <Bookmark
                    className={cn("h-4 w-4", (post.savedByYou || isSaved(post.id)) && "fill-current")}
                    aria-hidden
                  />
                  <span className="tabular-nums">{post.saveCount}</span>
                </button>

                <button
                  type="button"
                  onClick={() => void copy(post.id)}
                  aria-label={copiedId === post.id ? "Link copied" : "Copy post link"}
                  className={cn(
                    actionBtn,
                    "min-h-11 px-3 text-[13px]",
                    copiedId === post.id
                      ? "text-primary"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  {copiedId === post.id ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden />
                      Copied
                    </>
                  ) : (
                    <>
                      <Link2 className="h-4 w-4" aria-hidden />
                      Copy link
                    </>
                  )}
                </button>

                <span className="ml-auto inline-flex items-center gap-1.5 px-2 text-[13px] tabular-nums text-muted-foreground">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {(post.comments ?? []).length}{" "}
                  {(post.comments ?? []).length === 1 ? "comment" : "comments"}
                </span>
              </div>
            </article>

            {/* Comments & single Answer-with-Veer entry point */}
            <section aria-labelledby="post-comments-heading" className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2
                  id="post-comments-heading"
                  className="flex items-center gap-2 text-base font-semibold tracking-tight"
                >
                  Comments
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold tabular-nums text-muted-foreground">
                    {(post.comments ?? []).length}
                  </span>
                </h2>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Single Answer-with-Veer control (never repeated, hidden once posted) */}
                  <BotAnswerButton
                    visible={Boolean(
                      user &&
                        !isCommunityBot(post.author.id) &&
                        post.assistantReply?.canApprove &&
                        !post.assistantReply.posted,
                    )}
                    busy={aiReplyBusyIds.has(post.id)}
                    question={looksLikeQuestion(post)}
                    variant="comment"
                    onPublish={() => onAssistantReply(post)}
                  />
                </div>
              </div>

              {aiReplyBusyIds.has(post.id) ? (
                <div
                  role="status"
                  className="flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/5 px-3.5 py-2.5 text-[13px] font-medium text-primary"
                >
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Generating Veer reply…
                </div>
              ) : null}

              <CommentList
                comments={post.comments ?? []}
                viewer={user}
                followUpBotCommentId={followUpBotCommentId}
                onSelectFollowUp={(commentId) => {
                  const next = followUpBotCommentId === commentId ? null : commentId;
                  setFollowUpBotCommentId(next);
                  setError(null);
                  if (next) {
                    openAndFocusComposer(next);
                  }
                }}
                onOpenComposer={() => openAndFocusComposer()}
                onFollowChange={patchAuthorFollowing}
                onSaveEdit={(commentId, body) => handleSaveCommentEdit(post.id, commentId, body)}
                onDelete={(commentId) => handleDeleteComment(post.id, commentId)}
              />

              <CommentComposer
                signedIn={Boolean(user)}
                isBotPost={isCommunityBot(post.author.id)}
                followUpCommentId={followUpBotCommentId}
                focusTrigger={composerFocusTrigger}
                onClearFollowUp={() => setFollowUpBotCommentId(null)}
                onSubmitComment={(body, followUp) => handleSubmitComment(post.id, body, followUp)}
              />
            </section>
          </div>
        ) : null}
      </div>
    );
  }

  // Two-column layout with local community rail for feed / saved / mine / person
  return (
    <div className="mx-auto w-full max-w-[1216px] px-4 py-4 sm:px-6 sm:py-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        <CommunitySubnav
          active={view === "mine" ? "mine" : savedView ? "saved" : "feed"}
          savedCount={savedCount}
        />

        <div className="min-w-0 flex-1 space-y-4">
          {!migrated ? (
            <p className={cn(surfaceCard, "flex items-start gap-2 p-3.5 text-sm text-muted-foreground")}>
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              Community posts are not set up on this deployment yet.
            </p>
          ) : null}

          {error ? (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {error}
            </p>
          ) : null}

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
              onToggleSave={onToggleSave}
              onCopyLink={(postId) => void copy(postId)}
              onDelete={(postId) => void onDeletePost(postId)}
              onAssistantReply={onAssistantReply}
              onPrefetchPost={handlePrefetchPost}
            />
          ) : null}

          {view === "person" ? (
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
                          copied={copiedId === item.id}
                          aiReplyBusy={aiReplyBusyIds.has(item.id)}
                          onLike={onLike}
                          onToggleSave={onToggleSave}
                          onCopyLink={(postId) => void copy(postId)}
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
          ) : null}
        </div>
      </div>
    </div>
  );
}
