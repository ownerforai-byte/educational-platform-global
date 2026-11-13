"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { profilePath } from "@/lib/api/profile";
import { publicUrl } from "@/lib/site-url";
import { useRouter } from "next/navigation";
import { useSession } from "@/features/auth/hooks/use-session";
import type { SessionUser } from "@/features/auth/types";
import {
  COMMUNITY_CATEGORIES,
  addComment,
  attachmentFileUrl,
  createPost,
  deleteAttachment,
  deleteComment,
  deletePost,
  getPerson,
  getPost,
  listFeed,
  listMine,
  sharePath,
  toggleLike,
  updateComment,
  updatePost,
  uploadAttachment,
  type FeedAttachment,
  type FeedAuthor,
  type FeedPost,
  type PersonResponse,
  type PostInput,
} from "@/lib/api/community-feed";
import { PostAuthorHeader } from "@/features/community/post-author-header";

const POLL_MS = 20_000;
const MAX_FILES = 4;
const MAX_BYTES = 3 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.png,.jpg,.jpeg";

type BoardView = "feed" | "new" | "post" | "edit" | "mine" | "person" | "unavailable";

function statusOf(err: unknown): number {
  return typeof (err as { status?: number })?.status === "number" ? (err as { status: number }).status : 0;
}

function messageOf(err: unknown, fallback = "Something went wrong."): string {
  return err instanceof Error && err.message ? err.message : fallback;
}

function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
}

function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function planLabel(plan: string | null): string | null {
  if (!plan) return null;
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

function mergeById(current: FeedPost[], incoming: FeedPost[]): FeedPost[] {
  const seen = new Set(incoming.map((post) => post.id));
  const fresh = incoming.map((post) => {
    const previous = current.find((item) => item.id === post.id);
    if (previous?.comments && !post.comments) return { ...post, comments: previous.comments };
    return post;
  });
  return [...fresh, ...current.filter((post) => !seen.has(post.id))];
}

function InlineText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const bold = match[2] || match[3];
    const italic = match[4] || match[5];
    if (bold) parts.push(<strong key={index}>{bold}</strong>);
    else if (italic) parts.push(<em key={index}>{italic}</em>);
    last = match.index + match[0].length;
    index += 1;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function MarkdownBody({ text }: { text: string }) {
  const lines = text.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flush = () => {
    if (!list) return;
    const key = `list-${blocks.length}`;
    const items = list.items.map((item, itemIndex) => (
      <li key={`${key}-${itemIndex}`}>
        <InlineText text={item} />
      </li>
    ));
    blocks.push(
      list.ordered
        ? <ol key={key} className="list-decimal space-y-1 pl-5">{items}</ol>
        : <ul key={key} className="list-disc space-y-1 pl-5">{items}</ul>,
    );
    list = null;
  };

  lines.forEach((line, index) => {
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    const bullet = /^[-*]\s+(.+)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.+)$/.exec(line);
    if (heading) {
      flush();
      const Tag = heading[1].length === 1 ? "h2" : heading[1].length === 2 ? "h3" : "h4";
      const className = heading[1].length === 1 ? "text-lg font-semibold" : "text-base font-semibold";
      blocks.push(
        <Tag key={`h-${index}`} className={className}>
          <InlineText text={heading[2]} />
        </Tag>,
      );
      return;
    }
    if (bullet) {
      if (list?.ordered) flush();
      list = list ?? { ordered: false, items: [] };
      list.items.push(bullet[1]);
      return;
    }
    if (numbered) {
      if (list && !list.ordered) flush();
      list = list ?? { ordered: true, items: [] };
      list.items.push(numbered[1]);
      return;
    }
    flush();
    if (!line.trim()) {
      blocks.push(<div key={`s-${index}`} className="h-2" />);
      return;
    }
    blocks.push(
      <p key={`p-${index}`}>
        <InlineText text={line} />
      </p>,
    );
  });
  flush();
  return <div className="space-y-1 text-sm leading-6 text-foreground">{blocks}</div>;
}

function AttachmentList({
  files,
  author,
  viewerId,
  onAuthorFollowChange,
  onRemove,
}: {
  files: FeedAttachment[];
  author?: FeedAuthor;
  viewerId?: string | null;
  onAuthorFollowChange?: (following: boolean) => void;
  onRemove?: (file: FeedAttachment) => void;
}) {
  if (files.length === 0) return null;
  return (
    <ul className="space-y-2">
      {files.map((file) => {
        const image = file.contentType.startsWith("image/");
        return (
          <li key={file.id} className="rounded-xl border border-border bg-background p-3">
            {author ? (
              <div className="mb-2 border-b border-border/60 pb-2">
                <PostAuthorHeader
                  author={author}
                  viewerId={viewerId}
                  compact
                  onFollowChange={onAuthorFollowChange}
                />
              </div>
            ) : null}
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="font-medium">{file.filename}</span>
              <span className="text-muted-foreground">
                {file.contentType} · {formatBytes(file.byteSize)}
              </span>
            </div>
            {image ? (
              <img
                src={attachmentFileUrl(file.id, "inline")}
                alt={file.filename}
                className="mt-2 max-h-64 rounded-lg border border-border"
              />
            ) : null}
            <div className="mt-2 flex gap-3 text-xs">
              <a className="font-medium text-primary hover:underline" href={attachmentFileUrl(file.id, "attachment")}>
                Download
              </a>
              {onRemove ? (
                <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => onRemove(file)}>
                  Remove
                </button>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function canModerate(user: SessionUser | null): boolean {
  return user?.role === "pro" || user?.role === "owner";
}

export function CommunityUnavailable() {
  return (
    <div className="mx-auto w-full max-w-3xl px-3 py-8 sm:px-4">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h1 className="text-xl font-semibold">This post is unavailable</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          It may have been removed, or you do not have access to edit it.
        </p>
        <Link href="/ai/community" className="mt-4 inline-flex text-sm font-medium text-primary hover:underline">
          Back to Community
        </Link>
      </div>
    </div>
  );
}

function Composer({
  user,
  sessionLoading,
  mode,
  initial,
  redirectOnSuccess,
  onPublished,
}: {
  user: SessionUser | null;
  sessionLoading: boolean;
  mode: "create" | "edit";
  initial?: FeedPost | null;
  redirectOnSuccess?: boolean;
  onPublished?: (post: FeedPost) => void;
}) {
  const router = useRouter();
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [category, setCategory] = useState(initial?.category ?? "general");
  const [files, setFiles] = useState<Array<{ id: string; file: File; progress: number }>>([]);
  const [existing, setExisting] = useState<FeedAttachment[]>(initial?.attachments ?? []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    if (!initial) return;
    setTitle(initial.title);
    setBody(initial.body);
    setCategory(initial.category);
    setExisting(initial.attachments);
  }, [initial]);

  function insertMarkup(before: string, after = "") {
    const el = bodyRef.current;
    const start = el?.selectionStart ?? body.length;
    const end = el?.selectionEnd ?? body.length;
    const selected = body.slice(start, end) || "text";
    const next = `${body.slice(0, start)}${before}${selected}${after}${body.slice(end)}`;
    setBody(next);
    requestAnimationFrame(() => {
      const cursor = start + before.length + selected.length + after.length;
      el?.focus();
      el?.setSelectionRange(cursor, cursor);
    });
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    for (const file of Array.from(list)) {
      if (next.length + existing.length >= MAX_FILES) {
        setError("A post can have at most 4 files.");
        break;
      }
      if (file.size > MAX_BYTES) {
        setError(`${file.name} is larger than 3 MB.`);
        continue;
      }
      next.push({ id: `${file.name}-${file.size}-${next.length}`, file, progress: 0 });
    }
    setFiles(next);
  }

  async function publish() {
    if (sessionLoading) return;
    if (!user) {
      setError(mode === "edit" ? "Sign in to edit posts." : "Sign in with a verified account to publish.");
      return;
    }
    const input: PostInput = { title: title.trim(), body: body.trim(), category };
    if (input.title.length < 4 || input.title.length > 160 || input.body.length < 1) {
      setError("Add a title (4–160 characters) and a body.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const saved = mode === "edit" && initial
        ? (await updatePost(initial.id, input)).post
        : (await createPost(input)).post;
      let uploadFailed = false;
      for (const item of files) {
        try {
          const attachment = await uploadAttachment(saved.id, item.file, (fraction) => {
            setFiles((current) => current.map((entry) => entry.id === item.id ? { ...entry, progress: fraction } : entry));
          });
          saved.attachments = [...(saved.attachments ?? []), attachment];
        } catch (err) {
          uploadFailed = true;
          setError(messageOf(err, "A file did not upload."));
        }
      }
      const full = await getPost(saved.id);
      const post = full.post ?? saved;
      onPublished?.(post);
      setFiles([]);
      setSavedId(post.id);
      if (redirectOnSuccess && !uploadFailed) router.push(sharePath(post.id));
      if (mode === "create" && !redirectOnSuccess) {
        setTitle("");
        setBody("");
        setCategory("general");
      }
    } catch (err) {
      if (statusOf(err) === 401) {
        setError(mode === "edit" ? "Sign in to edit posts." : "Sign in with a verified account to publish.");
      } else if (statusOf(err) === 403) {
        setError("You cannot change this post.");
      } else {
        setError(messageOf(err));
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      className="space-y-3 rounded-2xl border border-border bg-card p-4"
      onSubmit={(event) => {
        event.preventDefault();
        void publish();
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold">{mode === "edit" ? "Edit post" : "New post"}</h2>
        {!user && !sessionLoading ? (
          <p className="text-xs text-muted-foreground">Sign in with a verified account to publish.</p>
        ) : null}
      </div>
      <label className="block text-sm">
        <span className="mb-1 block text-muted-foreground">Title</span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={160}
          required
          className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-muted-foreground">Category</span>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {COMMUNITY_CATEGORIES.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
      </label>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="rounded-lg border border-border px-2 py-1 text-xs font-semibold" onClick={() => insertMarkup("**", "**")}>Bold</button>
        <button type="button" className="rounded-lg border border-border px-2 py-1 text-xs font-semibold" onClick={() => insertMarkup("*", "*")}>Italic</button>
        <button type="button" className="rounded-lg border border-border px-2 py-1 text-xs font-semibold" onClick={() => insertMarkup("## ")}>Heading</button>
        <button type="button" className="rounded-lg border border-border px-2 py-1 text-xs font-semibold" onClick={() => insertMarkup("- ")}>List</button>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block text-muted-foreground">Body</span>
        <textarea
          ref={bodyRef}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={6}
          maxLength={20000}
          required
          className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-muted-foreground">Files</span>
        <input
          type="file"
          accept={ACCEPT}
          multiple
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
          className="block w-full text-sm text-muted-foreground"
        />
      </label>
      {existing.length > 0 ? (
        <AttachmentList
          files={existing}
          author={initial?.author}
          viewerId={user?.id}
          onRemove={(file) => {
            if (!user) {
              setError("Sign in to remove files.");
              return;
            }
            if (!window.confirm(`Remove ${file.filename}?`)) return;
            void deleteAttachment(file.id)
              .then(() => setExisting((current) => current.filter((item) => item.id !== file.id)))
              .catch((err) => setError(statusOf(err) === 401 ? "Sign in to remove files." : messageOf(err)));
          }}
        />
      ) : null}
      {files.length > 0 ? (
        <ul className="space-y-2 text-sm">
          {files.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3">
              <span className="truncate">{item.file.name}</span>
              <span className="text-xs text-muted-foreground">{Math.round(item.progress * 100)}%</span>
              <button
                type="button"
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setFiles((current) => current.filter((entry) => entry.id !== item.id))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
      {savedId && error ? (
        <Link href={sharePath(savedId)} className="text-sm font-medium text-primary hover:underline">
          Open the post
        </Link>
      ) : null}
      <button
        type="submit"
        disabled={busy || sessionLoading}
        className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
      >
        {busy ? "Publishing…" : mode === "edit" ? "Save" : "Publish"}
      </button>
    </form>
  );
}

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

  function renderCard(item: FeedPost, detailed = false) {
    const own = user?.id === item.author.id;
    const moderate = canModerate(user);
    const plan = planLabel(item.author.plan);
    return (
      <article className="space-y-3 rounded-2xl border border-border bg-card p-4">
        <PostAuthorHeader
          author={item.author}
          createdAt={item.createdAt}
          viewerId={user?.id}
          onFollowChange={(following) => patchAuthorFollowing(item.author.id, following)}
        />
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">
              <Link href={sharePath(item.id)} className="hover:underline">{item.title}</Link>
            </h2>
            <p className="text-xs text-muted-foreground">
              {plan ? `${plan} · ` : ""}
              {item.category}
            </p>
          </div>
          <button type="button" className="text-xs font-medium text-primary" onClick={() => void copy(item.id)}>
            {copiedId === item.id ? "Link copied" : "Copy link"}
          </button>
        </div>
        {detailed ? <MarkdownBody text={item.body} /> : <p className="line-clamp-4 text-sm text-muted-foreground">{item.body}</p>}
        <AttachmentList
          files={item.attachments}
          author={item.author}
          viewerId={user?.id}
          onAuthorFollowChange={(following) => patchAuthorFollowing(item.author.id, following)}
        />
        <div className="flex flex-wrap gap-3 text-sm">
          <button type="button" className="font-medium text-primary" onClick={() => void onLike(item.id)}>
            {item.likedByYou ? "Liked" : "Like"} · {item.likeCount}
          </button>
          <Link href={sharePath(item.id)} className="text-muted-foreground hover:text-foreground">
            {item.commentCount} comments
          </Link>
          {(own || moderate) && (
            <Link href={`/ai/community/posts/${item.id}/edit`} className="text-muted-foreground hover:text-foreground">
              Edit
            </Link>
          )}
          {(own || moderate) && (
            <button type="button" className="text-muted-foreground hover:text-foreground" onClick={() => void onDeletePost(item.id)}>
              Delete
            </button>
          )}
        </div>
      </article>
    );
  }

  if (view === "unavailable") return <CommunityUnavailable />;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-3 py-6 sm:px-4">
      {view === "feed" || view === "mine" ? (
        <header className="space-y-3">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{view === "mine" ? "My posts" : "Community"}</h1>
              <p className="text-sm text-muted-foreground">
                {view === "mine"
                  ? "Posts you have published."
                  : "Read study posts. Verified members can publish."}
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href="/ai/community/new" className="font-medium text-primary hover:underline">New post</Link>
              <Link href="/ai/community/me" className="font-medium text-primary hover:underline">My posts</Link>
            </div>
          </div>
          {view === "feed" ? (
            <form
              className="flex flex-wrap gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                filters.current = { q: query.trim(), category };
                setLoading(true);
                loadList(false)
                  .catch((err) => setError(messageOf(err)))
                  .finally(() => setLoading(false));
              }}
            >
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search posts"
                aria-label="Search posts"
                className="min-w-[12rem] flex-1 rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
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
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm"
              >
                <option value="">All categories</option>
                {COMMUNITY_CATEGORIES.map((item) => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
              <button type="submit" className="rounded-xl border border-border px-3 py-2 text-sm font-medium">
                Search
              </button>
            </form>
          ) : null}
        </header>
      ) : null}

      {view === "new" ? <h1 className="text-2xl font-semibold tracking-tight">New post</h1> : null}
      {view === "person" && person?.profile ? (
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">{person.profile.fullName}</h1>
          <p className="text-sm text-muted-foreground">
            {[planLabel(person.profile.plan), person.profile.role].filter(Boolean).join(" · ") || "Member"}
          </p>
        </header>
      ) : null}

      {!migrated ? (
        <p className="rounded-xl border border-border bg-card p-3 text-sm text-muted-foreground">
          Community is waiting for database migration 018.
        </p>
      ) : null}
      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
      {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : null}

      {view === "feed" ? (
        <Composer
          user={user}
          sessionLoading={sessionLoading}
          mode="create"
          onPublished={(created) => setPosts((current) => [created, ...current.filter((item) => item.id !== created.id)])}
        />
      ) : null}
      {view === "new" ? (
        <Composer user={user} sessionLoading={sessionLoading} mode="create" redirectOnSuccess />
      ) : null}
      {view === "edit" && post ? (
        <Composer
          user={user}
          sessionLoading={sessionLoading}
          mode="edit"
          initial={post}
          redirectOnSuccess
        />
      ) : null}

      {view === "post" && post ? (
        <div className="space-y-4">
          {renderCard(post, true)}
          <section className="space-y-3">
            <h2 className="text-base font-semibold">Comments</h2>
            {(post.comments ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            ) : (
              <ul className="space-y-2">
                {(post.comments ?? []).map((comment) => (
                  <li key={comment.id} className="rounded-xl border border-border bg-card p-3">
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
                          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                        />
                        <button type="submit" className="text-sm font-medium text-primary">Save comment</button>
                      </form>
                    ) : (
                      <div className="mt-1">
                        <MarkdownBody text={comment.body} />
                      </div>
                    )}
                    {user && (user.id === comment.author.id || canModerate(user)) ? (
                      <div className="mt-2 flex gap-3 text-xs">
                        {user.id === comment.author.id ? (
                          <button
                            type="button"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => {
                              setEditingComment(comment.id);
                              setCommentDraft(comment.body);
                            }}
                          >
                            Edit
                          </button>
                        ) : null}
                        <button
                          type="button"
                          className="text-muted-foreground hover:text-foreground"
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
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
            <form className="space-y-2" onSubmit={(event) => void onComment(event)}>
              <label className="block text-sm">
                <span className="mb-1 block text-muted-foreground">
                  {user ? "Write a comment" : "Sign in to comment."}
                </span>
                <textarea
                  value={commentBody}
                  onChange={(event) => setCommentBody(event.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-border bg-card px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>
              <button type="submit" className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
                Comment
              </button>
            </form>
          </section>
        </div>
      ) : null}

      {(view === "feed" || view === "mine") && !loading && migrated && posts.length === 0 && !error ? (
        <p className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          {view === "mine" ? "You have not published a post yet." : "No posts yet. Be the first to share a study note."}
        </p>
      ) : null}
      {(view === "feed" || view === "mine") ? (
        <div className="space-y-3">
          {posts.map((item) => <div key={item.id}>{renderCard(item)}</div>)}
          {cursor != null ? (
            <button
              type="button"
              disabled={loadingMore}
              className="rounded-xl border border-border px-4 py-2 text-sm font-medium"
              onClick={() => {
                setLoadingMore(true);
                loadList(true, cursor)
                  .catch((err) => setError(messageOf(err)))
                  .finally(() => setLoadingMore(false));
              }}
            >
              {loadingMore ? "Loading…" : "Load more"}
            </button>
          ) : null}
        </div>
      ) : null}

      {view === "person" && person ? (
        <div className="space-y-3">
          {person.posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No public posts yet.</p>
          ) : person.posts.map((item) => <div key={item.id}>{renderCard(item)}</div>)}
        </div>
      ) : null}
    </div>
  );
}
