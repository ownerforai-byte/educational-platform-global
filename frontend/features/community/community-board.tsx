"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import { publicUrl } from "@/lib/site-url";
import { useRouter } from "next/navigation";
import { useSession } from "@/features/auth/hooks/use-session";
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
  updateComment,
  type FeedPost,
  type PersonResponse,
} from "@/lib/api/community-feed";
import { PostAuthorHeader } from "@/features/community/post-author-header";
import { AttachmentList } from "@/features/community/attachment-list";
import { BotAnswerButton } from "@/features/community/bot-answer-button";
import { CommunityFeed } from "@/features/community/community-feed";
import { PostComposer } from "@/features/community/post-composer";
import { MarkdownBody } from "@/features/community/markdown-body";
import {
  POLL_MS,
  type BoardView,
  canModerate,
  CommunityBackLink,
  CommunityLoading,
  CommunityUnavailable,
  looksLikeQuestion,
  mergeById,
  messageOf,
  statusOf,
} from "@/features/community/community-helpers";
import {
  actionBtn,
  categoryLabel,
  chipBtn,
  emptyStatePanel,
  ghostLink,
  glassShell,
  inputClass,
  primaryCta,
  surfaceCard,
  surfaceCardFlat,
} from "@/features/community/community-ui";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Bot,
  Check,
  Heart,
  Link2,
  MessageCircle,
  MessageSquare,
  Pencil,
  Plus,
  Send,
  Trash2,
} from "lucide-react";

function useCopyLink() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copy = useCallback(async (id: string) => {
    const url = publicUrl(sharePath(id));
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 2000);
  }, []);
  return { copiedId, copy };
}

export { CommunityUnavailable };

export function CommunityBoard({ view, id }: { view: BoardView; id?: string }) {
  const router = useRouter();
  const { user, isLoading: sessionLoading } = useSession();
  const { copiedId, copy } = useCopyLink();
  const filters = useRef({ q: "", category: "" });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [post, setPost] = useState<FeedPost | null>(null);
  const [person, setPerson] = useState<PersonResponse | null>(null);
  const [cursor, setCursor] = useState<number | null>(null);
  const [migrated, setMigrated] = useState(true);
  const [loading, setLoading] = useState(view === "feed" || view === "mine" || view === "post" || view === "edit" || view === "person");
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentBody, setCommentBody] = useState("");
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState("");
  const [aiReplyBusy, setAiReplyBusy] = useState(false);

  const applyLike = useCallback((postId: string, likeCount: number, likedByYou: boolean) => {
    const patch = (item: FeedPost) => item.id === postId ? { ...item, likeCount, likedByYou } : item;
    setPosts((current) => current.map(patch));
    setPost((current) => (current ? patch(current) : current));
    setPerson((current) => current ? { ...current, posts: current.posts.map(patch) } : current);
  }, []);

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
    setPost((current) => (current ? patch(current) : current));
    setPerson((current) =>
      current ? { ...current, posts: current.posts.map(patch) } : current,
    );
  }, []);

  const loadList = useCallback(async (append: boolean, nextCursor?: number | null) => {
    if (view === "mine" && !user) return;
    const params = {
      q: filters.current.q,
      category: filters.current.category,
      cursor: append ? nextCursor ?? 0 : 0,
    };
    const result = view === "mine" ? await listMine(params) : await listFeed(params);
    setMigrated(result.migrated);
    setCursor(result.nextCursor);
    setPosts((current) => (append ? [...current, ...result.posts.filter((item) => !current.some((have) => have.id === item.id))] : result.posts));
  }, [user, view]);

  useEffect(() => {
    if (view !== "feed" && view !== "mine") return;
    if (view === "mine" && sessionLoading) return;
    if (view === "mine" && !user) {
      setLoading(false);
      setPosts([]);
      setError("Sign in to see your posts.");
      return;
    }
    let cancel = false;
    setLoading(true);
    setError(null);
    loadList(false)
      .catch((err) => {
        if (!cancel) setError(statusOf(err) === 401 ? "Sign in to see your posts." : messageOf(err));
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });
    return () => {
      cancel = true;
    };
  }, [view, user, sessionLoading, loadList]);

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
    setLoading(true);
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
      })
      .catch((err) => {
        if (cancel) return;
        if (statusOf(err) === 404 || statusOf(err) === 403) router.replace("/ai/community/unavailable");
        else if (statusOf(err) === 401) setError("Sign in to edit posts.");
        else setError(messageOf(err));
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });
    return () => {
      cancel = true;
    };
  }, [view, id, user, sessionLoading, router]);

  useEffect(() => {
    if (view !== "person" || !id) return;
    let cancel = false;
    setLoading(true);
    setError(null);
    getPerson(id)
      .then((result) => {
        if (cancel) return;
        if (!result.profile) {
          router.replace("/ai/community/unavailable");
          return;
        }
        setPerson(result);
        setMigrated(result.migrated);
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
  }, [view, id, router]);

  useEffect(() => {
    if (view !== "feed" && view !== "mine" && view !== "post" && view !== "person") return;
    const timer = window.setInterval(() => {
      if (view === "feed" || (view === "mine" && user)) {
        const params = { q: filters.current.q, category: filters.current.category };
        const request = view === "mine" ? listMine(params) : listFeed(params);
        request
          .then((result) => {
            setMigrated(result.migrated);
            setPosts((current) => mergeById(current, result.posts));
          })
          .catch(() => undefined);
        return;
      }
      if (view === "post" && id) {
        getPost(id)
          .then((detail) => {
            if (detail.post) setPost(detail.post);
          })
          .catch(() => undefined);
        return;
      }
      if (view === "person" && id) {
        getPerson(id)
          .then((result) => {
            setPerson((current) => {
              if (!current) return result;
              return { ...result, posts: mergeById(current.posts, result.posts) };
            });
          })
          .catch(() => undefined);
      }
    }, POLL_MS);
    return () => window.clearInterval(timer);
  }, [view, id, user]);

  async function onLike(postId: string) {
    if (!user) {
      setError("Sign in to like posts.");
      return;
    }
    try {
      const result = await toggleLike(postId);
      applyLike(postId, result.likeCount, result.likedByYou);
    } catch (err) {
      setError(statusOf(err) === 401 ? "Sign in to like posts." : messageOf(err));
    }
  }

  async function onDeletePost(postId: string) {
    if (!user) {
      setError("Sign in to delete posts.");
      return;
    }
    if (!window.confirm("Delete this post?")) return;
    try {
      await deletePost(postId);
      setPosts((current) => current.filter((item) => item.id !== postId));
      setPerson((current) => current ? { ...current, posts: current.posts.filter((item) => item.id !== postId) } : current);
      if (view === "post") router.push("/ai/community");
    } catch (err) {
      setError(statusOf(err) === 401 ? "Sign in to delete posts." : messageOf(err));
    }
  }

  async function onComment(event: FormEvent) {
    event.preventDefault();
    if (!post) return;
    if (!user) {
      setError("Sign in to comment.");
      return;
    }
    try {
      const result = await addComment(post.id, commentBody.trim());
      setCommentBody("");
      setPost({
        ...post,
        commentCount: post.commentCount + 1,
        comments: [...(post.comments ?? []), result.comment],
      });
    } catch (err) {
      setError(statusOf(err) === 401 ? "Sign in to comment." : messageOf(err));
    }
  }

  function onAssistantReply(target: FeedPost) {
    if (aiReplyBusy) return;
    setAiReplyBusy(true);
    setError(null);
    void Promise.resolve(publishAssistantReply(target.id))
      .then((result) => {
        setPost((current) => {
          const base = current && current.id === target.id ? current : target;
          return {
            ...base,
            commentCount: base.commentCount + 1,
            assistantReply: result.assistantReply,
            comments: [...(base.comments ?? []), result.comment],
          };
        });
        setPosts((current) =>
          current.map((item) =>
            item.id === target.id
              ? { ...item, commentCount: item.commentCount + 1, assistantReply: result.assistantReply }
              : item,
          ),
        );
      })
      .catch((err) =>
        setError(
          statusOf(err) === 401
            ? "Sign in to ask Veer to reply."
            : statusOf(err) === 409
              ? "A Community bot reply is already on this post."
              : statusOf(err) === 429
                ? "Too many Veer replies just now. Try again in a few minutes."
                : messageOf(err, "Could not publish the assistant reply."),
        ),
      )
      .finally(() => setAiReplyBusy(false));
  }

  function renderCard(item: FeedPost, detailed = false) {
    const own = user?.id === item.author.id;
    const moderate = canModerate(user);
    const canInvokeBot = Boolean(user && item.assistantReply?.canApprove && !item.assistantReply.posted);
    return (
      <article className={cn(surfaceCard, "space-y-3 p-4 sm:p-5")}>
        <PostAuthorHeader
          author={item.author}
          createdAt={item.createdAt}
          viewerId={user?.id}
          onFollowChange={(following) => patchAuthorFollowing(item.author.id, following)}
        />
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold leading-snug tracking-tight">
              <Link href={sharePath(item.id)} className="transition-colors hover:text-primary hover:underline">
                {item.title}
              </Link>
            </h2>
            <p className="mt-1">
              <span className="inline-flex items-center rounded-md border border-border/80 bg-muted/40 px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                {categoryLabel(item.category)}
              </span>
            </p>
          </div>
          <button
            type="button"
            className={cn(chipBtn, "min-h-11", copiedId === item.id && "border-primary/40 text-primary")}
            onClick={() => void copy(item.id)}
            aria-label={copiedId === item.id ? "Link copied" : "Copy post link"}
          >
            {copiedId === item.id ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden />
                Copied
              </>
            ) : (
              <>
                <Link2 className="h-3.5 w-3.5" aria-hidden />
                Copy link
              </>
            )}
          </button>
        </div>
        {detailed ? (
          <MarkdownBody text={item.body} />
        ) : (
          <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
        )}
        {item.attachments.length > 0 ? <AttachmentList files={item.attachments} /> : null}
        <div className="flex flex-wrap items-center gap-1 rounded-xl border-t border-border/60 bg-muted/[0.12] px-1 py-1 pt-3 sm:gap-2 sm:px-1.5">
          <button
            type="button"
            className={cn(
              actionBtn,
              "min-h-11 min-w-11",
              item.likedByYou
                ? "text-primary hover:bg-primary/10 motion-safe:hover:scale-105"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
            onClick={() => void onLike(item.id)}
            aria-pressed={item.likedByYou}
            aria-label={item.likedByYou ? "Unlike post" : "Like post"}
          >
            <Heart className={cn("h-4 w-4", item.likedByYou && "fill-current")} aria-hidden />
            <span>{item.likeCount}</span>
            <span className="sr-only">{item.likedByYou ? "Liked" : "Like"}</span>
          </button>
          <Link
            href={sharePath(item.id)}
            className={cn(actionBtn, "min-h-11 min-w-11 text-muted-foreground hover:bg-muted/60 hover:text-foreground")}
            aria-label={`${item.commentCount} comments`}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            {item.commentCount}
            <span className="hidden sm:inline">comments</span>
          </Link>
          {canInvokeBot && looksLikeQuestion(item) ? (
            <BotAnswerButton
              visible
              busy={aiReplyBusy}
              variant="comment"
              onPublish={() => onAssistantReply(item)}
            />
          ) : null}
          {(own || moderate) && (
            <Link
              href={`/ai/community/posts/${item.id}/edit`}
              className={cn(actionBtn, "min-h-11 min-w-11 text-muted-foreground hover:bg-muted/60 hover:text-foreground")}
              aria-label="Edit post"
            >
              <Pencil className="h-4 w-4" aria-hidden />
              Edit
            </Link>
          )}
          {(own || moderate) && (
            <button
              type="button"
              className={cn(actionBtn, "min-h-11 min-w-11 text-muted-foreground hover:bg-destructive/10 hover:text-destructive")}
              onClick={() => void onDeletePost(item.id)}
              aria-label="Delete post"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              Delete
            </button>
          )}
        </div>
      </article>
    );
  }

  if (view === "unavailable") return <CommunityUnavailable />;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5 px-3 py-6 sm:px-4 sm:py-8">
      {view === "feed" || view === "mine" ? (
        <CommunityFeed
          view={view}
          query={query}
          category={category}
          filters={filters}
          posts={posts}
          cursor={cursor}
          loading={loading}
          loadingMore={loadingMore}
          migrated={migrated}
          error={error}
          setQuery={setQuery}
          setCategory={setCategory}
          setLoading={setLoading}
          setLoadingMore={setLoadingMore}
          setError={setError}
          loadList={loadList}
          renderCard={(item) => renderCard(item)}
        />
      ) : null}

      {view === "new" ? (
        <header className="space-y-3">
          <CommunityBackLink href="/ai/community" label="Back to feed" />
          <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <Plus className="h-6 w-6 text-primary" aria-hidden />
            New post
          </h1>
        </header>
      ) : null}
      {view === "person" && person?.profile ? (
        <header className={cn(surfaceCard, "space-y-3 p-4 sm:p-5")}>
          <CommunityBackLink href="/ai/community" label="Back to feed" />
          <PostAuthorHeader
            author={person.profile}
            viewerId={user?.id}
            onFollowChange={(following) => patchAuthorFollowing(person.profile!.id, following)}
          />
          <p className="text-sm text-muted-foreground">
            {person.posts.length} public {person.posts.length === 1 ? "post" : "posts"}
            {person.profile.role && person.profile.role !== "member" ? (
              <span> · {person.profile.role}</span>
            ) : null}
          </p>
        </header>
      ) : null}

      {!migrated ? (
        <p className={cn(surfaceCard, "flex items-start gap-2 p-3 text-sm text-muted-foreground")}>
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          Community is waiting for database migration 018.
        </p>
      ) : null}
      {error ? (
        <p className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
      {loading && view !== "feed" && view !== "mine" ? <CommunityLoading /> : null}

      {view === "new" ? (
        <PostComposer user={user} sessionLoading={sessionLoading} mode="create" redirectOnSuccess />
      ) : null}
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
        <div className="space-y-4">
          <CommunityBackLink href="/ai/community" label="Back to feed" />
          {renderCard(post, true)}
          <BotAnswerButton
            visible={Boolean(user && post.assistantReply?.canApprove && !post.assistantReply.posted)}
            busy={aiReplyBusy}
            question={looksLikeQuestion(post)}
            onPublish={() => onAssistantReply(post)}
          />
          {post.assistantReply?.posted ? (
            <p
              className={cn(
                surfaceCard,
                "flex items-center gap-2 border-primary/25 bg-primary/5 p-3 text-sm text-muted-foreground shadow-none hover:shadow-none",
              )}
              role="status"
            >
              <Bot className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              Veer (verified AI) replied on this post.
            </p>
          ) : null}
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
                <MessageCircle className="h-5 w-5 text-primary" aria-hidden />
                Comments
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {(post.comments ?? []).length}
                </span>
              </h2>
              <BotAnswerButton
                visible={Boolean(user && post.assistantReply?.canApprove && !post.assistantReply.posted)}
                busy={aiReplyBusy}
                variant="comment"
                onPublish={() => onAssistantReply(post)}
              />
            </div>
            {(post.comments ?? []).length === 0 ? (
              <p className={cn(emptyStatePanel, "p-6 text-center text-sm text-muted-foreground")}>
                <MessageSquare className="mx-auto mb-2 h-8 w-8 text-primary/35" aria-hidden />
                No comments yet. Start the conversation.
              </p>
            ) : (
              <ul className="space-y-2">
                {(post.comments ?? []).map((comment, commentIndex) => (
                  <li
                    key={comment.id}
                    className={cn(
                      surfaceCardFlat,
                      "card-rise-in space-y-1 p-3 motion-safe:hover:shadow-sm sm:p-4",
                      comment.author.role === "assistant" &&
                        "border-primary/25 bg-primary/[0.04] shadow-sm shadow-primary/5 ring-1 ring-primary/10",
                    )}
                    style={{ animationDelay: `${Math.min(commentIndex * 45, 280)}ms` }}
                  >
                    <PostAuthorHeader
                      author={comment.author}
                      createdAt={comment.createdAt}
                      viewerId={user?.id}
                      compact
                      onFollowChange={(following) => patchAuthorFollowing(comment.author.id, following)}
                    />
                    {editingComment === comment.id ? (
                      <form
                        className="mt-2 space-y-2"
                        onSubmit={(event) => {
                          event.preventDefault();
                          if (!user) {
                            setError("Sign in to edit comments.");
                            return;
                          }
                          void updateComment(post.id, comment.id, commentDraft)
                            .then((result) => {
                              setPost({
                                ...post,
                                comments: (post.comments ?? []).map((item) => item.id === comment.id ? result.comment : item),
                              });
                              setEditingComment(null);
                            })
                            .catch((err) => setError(statusOf(err) === 401 ? "Sign in to edit comments." : messageOf(err)));
                        }}
                      >
                        <textarea
                          value={commentDraft}
                          onChange={(event) => setCommentDraft(event.target.value)}
                          rows={3}
                          aria-label="Edit comment"
                          className={cn(inputClass, "text-sm")}
                        />
                        <button type="submit" className={cn(ghostLink, "min-h-11")}>
                          <Check className="h-4 w-4" aria-hidden />
                          Save comment
                        </button>
                      </form>
                    ) : (
                      <div className="mt-1">
                        <MarkdownBody text={comment.body} />
                      </div>
                    )}
                    {user &&
                    ((user.id === comment.author.id && comment.author.role !== "assistant") ||
                      canModerate(user)) ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {user.id === comment.author.id && comment.author.role !== "assistant" ? (
                          <button
                            type="button"
                            className={cn(actionBtn, "min-h-11 text-xs text-muted-foreground hover:bg-muted/60 hover:text-foreground")}
                            onClick={() => {
                              setEditingComment(comment.id);
                              setCommentDraft(comment.body);
                            }}
                          >
                            <Pencil className="h-3.5 w-3.5" aria-hidden />
                            Edit
                          </button>
                        ) : null}
                        <button
                          type="button"
                          className={cn(actionBtn, "min-h-11 text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive")}
                          aria-label="Delete comment"
                          onClick={() => {
                            if (!window.confirm("Delete this comment?")) return;
                            void deleteComment(post.id, comment.id)
                              .then(() => {
                                setPost({
                                  ...post,
                                  commentCount: Math.max(0, post.commentCount - 1),
                                  comments: (post.comments ?? []).filter((item) => item.id !== comment.id),
                                });
                              })
                              .catch((err) => setError(statusOf(err) === 401 ? "Sign in to delete comments." : messageOf(err)));
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden />
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
            <form className={cn(glassShell, "space-y-3 p-4")} onSubmit={(event) => void onComment(event)}>
              <label className="block text-sm">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <MessageSquare className="h-3.5 w-3.5" aria-hidden />
                  {user ? "Write a comment" : "Sign in to comment."}
                </span>
                <textarea
                  value={commentBody}
                  onChange={(event) => setCommentBody(event.target.value)}
                  rows={3}
                  aria-label="Write a comment"
                  className={inputClass}
                />
              </label>
              <button type="submit" className={cn(primaryCta, "min-h-11 px-3 py-2")}>
                <Send className="h-4 w-4" aria-hidden />
                Comment
              </button>
            </form>
          </section>
        </div>
      ) : null}

      {view === "person" && person ? (
        <div className="space-y-4">
          {person.posts.length === 0 ? (
            <p className={cn(emptyStatePanel, "p-6 text-center text-sm text-muted-foreground")}>
              No public posts yet.
            </p>
          ) : person.posts.map((item, index) => (
            <div
              key={item.id}
              className="motion-safe:animate-fade-in motion-reduce:animate-none"
              style={{ animationDelay: index < 12 ? `${Math.min(index * 35, 300)}ms` : undefined }}
            >
              {renderCard(item)}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
