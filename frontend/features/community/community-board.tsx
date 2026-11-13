"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MutableRefObject,
  type ReactNode,
} from "react";
import Link from "next/link";
import { publicUrl } from "@/lib/site-url";
import { useRouter } from "next/navigation";
import { useSession } from "@/features/auth/hooks/use-session";
import type { SessionUser } from "@/features/auth/types";
import {
  COMMUNITY_CATEGORIES,
  addComment,
  approveAssistantReply,
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
import {
  actionBtn,
  assistantPanel,
  categoryLabel,
  chipActive,
  chipBtn,
  chipCopied,
  composerShell,
  emptyStatePanel,
  ghostLink,
  glassShell,
  inputClass,
  primaryCta,
  surfaceCard,
  surfaceCardFlat,
  toolbarBtn,
} from "@/features/community/community-ui";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  ArrowLeft,
  Bot,
  Bold,
  Check,
  Download,
  FileText,
  Filter,
  Heart,
  Heading2,
  ImageIcon,
  Italic,
  Link2,
  List,
  Loader2,
  MessageCircle,
  MessageSquare,
  Paperclip,
  Pencil,
  Plus,
  Search,
  Send,
  Sparkles,
  Trash2,
  UserRound,
} from "lucide-react";

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

function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function looksLikeQuestion(post: Pick<FeedPost, "title" | "body">): boolean {
  const title = post.title.trim();
  const combined = `${title} ${post.body}`.trim();
  if (combined.includes("?")) return true;
  return /^(how|what|why|when|where|which|can|could|should|is|are|do|does|explain|define)\b/i.test(title);
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
  return <div className="space-y-2 text-sm leading-relaxed text-foreground">{blocks}</div>;
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
        const FileKindIcon = image ? ImageIcon : FileText;
        return (
          <li
            key={file.id}
            className="rounded-xl border border-border/80 bg-muted/30 p-3 shadow-sm transition-[border-color,box-shadow,transform] duration-250 ease-out motion-safe:hover:-translate-y-px motion-safe:hover:border-primary/30 motion-safe:hover:shadow-md motion-reduce:hover:translate-y-0"
          >
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
            <div className="flex flex-wrap items-start justify-between gap-2 text-sm">
              <div className="flex min-w-0 items-start gap-2">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-card text-primary">
                  <FileKindIcon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-medium text-foreground">{file.filename}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {file.contentType} · {formatBytes(file.byteSize)}
                  </span>
                </span>
              </div>
            </div>
            {image ? (
              <img
                src={attachmentFileUrl(file.id, "inline")}
                alt={file.filename}
                className="mt-3 max-h-64 w-full rounded-xl border border-border object-cover shadow-sm"
              />
            ) : null}
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                className={cn(chipBtn, "text-primary hover:text-primary")}
                href={attachmentFileUrl(file.id, "attachment")}
              >
                <Download className="h-3.5 w-3.5" aria-hidden />
                Download
              </a>
              {onRemove ? (
                <button
                  type="button"
                  className={cn(chipBtn, "hover:text-destructive")}
                  onClick={() => onRemove(file)}
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
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

function CommunityBackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link href={href} className={ghostLink}>
      <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
      {label}
    </Link>
  );
}

function CommunityLoading({ label = "Loading community…" }: { label?: string }) {
  return (
    <div className="space-y-4" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      {[0, 1, 2].map((row) => (
        <div
          key={row}
          className={cn(surfaceCardFlat, "space-y-3 p-4 sm:p-5 motion-safe:animate-pulse motion-reduce:animate-none")}
          style={row > 0 ? { animationDelay: `${row * 120}ms` } : undefined}
        >
          <div className="flex gap-3">
            <div className="h-11 w-11 shrink-0 rounded-full bg-muted/70" />
            <div className="min-w-0 flex-1 space-y-2 pt-1">
              <div className="h-3.5 w-32 rounded-md bg-muted/60" />
              <div className="h-2.5 w-24 rounded-md bg-muted/50" />
            </div>
          </div>
          <div className="h-4 w-3/4 max-w-md rounded-md bg-muted/60" />
          <div className="space-y-2">
            <div className="h-2.5 w-full rounded-md bg-muted/45" />
            <div className="h-2.5 w-5/6 rounded-md bg-muted/40" />
          </div>
          <div className="flex gap-2 border-t border-border/50 pt-3">
            <div className="h-7 w-14 rounded-lg bg-muted/50" />
            <div className="h-7 w-20 rounded-lg bg-muted/45" />
          </div>
        </div>
      ))}
    </div>
  );
}

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

export function CommunityUnavailable() {
  return (
    <div className="mx-auto w-full max-w-3xl px-3 py-8 sm:px-4">
      <div className={cn(surfaceCard, "p-6 sm:p-8")}>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-muted/50 text-primary">
          <AlertCircle className="h-5 w-5" aria-hidden />
        </div>
        <h1 className="mt-4 text-xl font-semibold tracking-tight">This post is unavailable</h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          It may have been removed, or you do not have access to edit it.
        </p>
        <Link href="/ai/community" className={cn(ghostLink, "mt-5")}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
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
  const [uploadDrag, setUploadDrag] = useState(false);

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
      className={cn(composerShell, "space-y-4 p-4 sm:p-5")}
      onSubmit={(event) => {
        event.preventDefault();
        void publish();
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {mode === "edit" ? <Pencil className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
          </span>
          {mode === "edit" ? "Edit post" : "New post"}
        </h2>
        {!user && !sessionLoading ? (
          <p className="text-xs text-muted-foreground">Sign in with a verified account to publish.</p>
        ) : null}
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Title</span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={160}
          required
          className={inputClass}
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Category</span>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className={inputClass}
        >
          {COMMUNITY_CATEGORIES.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
      </label>
      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Formatting">
        <button type="button" className={toolbarBtn} aria-label="Bold" onClick={() => insertMarkup("**", "**")}>
          <Bold className="h-3.5 w-3.5" aria-hidden />
          Bold
        </button>
        <button type="button" className={toolbarBtn} aria-label="Italic" onClick={() => insertMarkup("*", "*")}>
          <Italic className="h-3.5 w-3.5" aria-hidden />
          Italic
        </button>
        <button type="button" className={toolbarBtn} aria-label="Heading" onClick={() => insertMarkup("## ")}>
          <Heading2 className="h-3.5 w-3.5" aria-hidden />
          Heading
        </button>
        <button type="button" className={toolbarBtn} aria-label="Bullet list" onClick={() => insertMarkup("- ")}>
          <List className="h-3.5 w-3.5" aria-hidden />
          List
        </button>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Body</span>
        <textarea
          ref={bodyRef}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={6}
          maxLength={20000}
          required
          className={cn(inputClass, "min-h-[9rem] resize-y")}
        />
      </label>
      <div className="block text-sm">
        <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Paperclip className="h-3.5 w-3.5" aria-hidden />
          Files
        </span>
        <div
          className={cn(
            "rounded-xl border border-dashed bg-muted/20 px-3 py-2.5 transition-[border-color,box-shadow,background-color] duration-250 ease-out",
            uploadDrag
              ? "border-primary/50 bg-primary/[0.06] shadow-[0_0_0_3px] shadow-primary/10 community-upload-pulse"
              : "border-border/80 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/15",
          )}
          onDragEnter={(event) => {
            event.preventDefault();
            setUploadDrag(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setUploadDrag(true);
          }}
          onDragLeave={(event) => {
            if (event.currentTarget.contains(event.relatedTarget as Node)) return;
            setUploadDrag(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setUploadDrag(false);
            addFiles(event.dataTransfer.files);
          }}
        >
          <input
            type="file"
            accept={ACCEPT}
            multiple
            onChange={(event) => {
              addFiles(event.target.files);
              event.target.value = "";
            }}
            className="block w-full cursor-pointer text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-primary motion-safe:transition-transform motion-safe:file:hover:scale-[1.02]"
          />
        </div>
      </div>
      {existing.length > 0 ? (
        <AttachmentList
          files={existing}
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
            <li
              key={item.id}
              className="space-y-2 rounded-xl border border-border/80 bg-muted/30 px-3 py-2.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2 truncate text-sm">
                  <FileText className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {item.file.name}
                </span>
                <span className="text-xs font-medium tabular-nums text-muted-foreground">
                  {item.progress > 0 ? `${Math.round(item.progress * 100)}%` : "Queued"}
                </span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(item.progress * 100)}
                aria-label={`Upload progress for ${item.file.name}`}
              >
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-300"
                  style={{ width: `${Math.max(item.progress * 100, 4)}%` }}
                />
              </div>
              <button
                type="button"
                className={cn(chipBtn, "py-1")}
                aria-label={`Remove ${item.file.name}`}
                onClick={() => setFiles((current) => current.filter((entry) => entry.id !== item.id))}
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? (
        <p className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
      {savedId && error ? (
        <Link href={sharePath(savedId)} className={ghostLink}>
          Open the post
        </Link>
      ) : null}
      <button type="submit" disabled={busy || sessionLoading} className={primaryCta}>
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Publishing…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden />
            {mode === "edit" ? "Save changes" : "Publish"}
          </>
        )}
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

  function renderCard(item: FeedPost, detailed = false) {
    const own = user?.id === item.author.id;
    const moderate = canModerate(user);
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
            className={cn(chipBtn, copiedId === item.id && "border-primary/40 text-primary")}
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
            className={cn(actionBtn, "text-muted-foreground hover:bg-muted/60 hover:text-foreground")}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            {item.commentCount}
            <span className="hidden sm:inline">comments</span>
          </Link>
          {(own || moderate) && (
            <Link
              href={`/ai/community/posts/${item.id}/edit`}
              className={cn(actionBtn, "text-muted-foreground hover:bg-muted/60 hover:text-foreground")}
            >
              <Pencil className="h-4 w-4" aria-hidden />
              Edit
            </Link>
          )}
          {(own || moderate) && (
            <button
              type="button"
              className={cn(actionBtn, "text-muted-foreground hover:bg-destructive/10 hover:text-destructive")}
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
        <header className="space-y-4">
          {view === "mine" ? (
            <CommunityBackLink href="/ai/community" label="Back to feed" />
          ) : null}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-card text-primary shadow-sm shadow-primary/10 ring-1 ring-primary/10">
                  <MessageSquare className="h-5 w-5" aria-hidden />
                </span>
                {view === "mine" ? "My posts" : "Community"}
              </h1>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                {view === "mine"
                  ? "Posts you have published."
                  : "Read study posts. Verified members can publish."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/ai/community/new" className={cn(primaryCta, "px-3 py-2")}>
                <Plus className="h-4 w-4" aria-hidden />
                New post
              </Link>
              <Link
                href="/ai/community/me"
                className={cn(chipBtn, "text-foreground")}
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
                  className={cn(inputClass, "pl-9")}
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
                className={cn(inputClass, "w-auto min-w-[10rem] pr-8")}
              >
                <option value="">All categories</option>
                {COMMUNITY_CATEGORIES.map((item) => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
              <button type="submit" className={cn(chipBtn, "shrink-0 text-foreground")}>
                <Filter className="h-3.5 w-3.5" aria-hidden />
                Apply
              </button>
            </form>
          ) : null}
          {view === "feed" ? (
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Browse by category">
              <button
                type="button"
                className={cn(chipBtn, chipActive(!category))}
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
                  className={cn(chipBtn, chipActive(category === item.id))}
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
      {loading ? <CommunityLoading /> : null}

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
        <>
          <header className="space-y-3">
            <CommunityBackLink href={sharePath(post.id)} label="Back to post" />
          </header>
          <Composer
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
          {user?.id === post.author.id && post.assistantReply?.canApprove ? (
            <div className={cn(assistantPanel(), "space-y-3 p-4 sm:p-5")}>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 space-y-1">
                  <h2 className="text-base font-semibold tracking-tight">Invite Community bot</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {looksLikeQuestion(post)
                      ? "This post reads like a question. Approve once and Community bot will search curriculum material, then publish a public reply as a comment."
                      : "Approve once and Community bot will search curriculum material when relevant, then publish a public reply as a comment."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={aiReplyBusy}
                className={cn(primaryCta, "w-full sm:w-auto")}
                onClick={() => {
                  if (
                    !window.confirm(
                      "Publish a Community bot reply on this post? This uses one AI generation and cannot be re-run on the same post.",
                    )
                  ) {
                    return;
                  }
                  setAiReplyBusy(true);
                  setError(null);
                  void approveAssistantReply(post.id)
                    .then((result) => {
                      setPost({
                        ...post,
                        commentCount: post.commentCount + 1,
                        assistantReply: result.assistantReply,
                        comments: [...(post.comments ?? []), result.comment],
                      });
                    })
                    .catch((err) =>
                      setError(
                        statusOf(err) === 403
                          ? "Only the post author can approve the assistant reply."
                          : statusOf(err) === 409
                            ? "A Community bot reply is already on this post."
                            : messageOf(err, "Could not publish the assistant reply."),
                      ),
                    )
                    .finally(() => setAiReplyBusy(false));
                }}
              >
                {aiReplyBusy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Generating reply…
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4" aria-hidden />
                    Approve Community bot reply
                  </>
                )}
              </button>
            </div>
          ) : null}
          {post.assistantReply?.posted ? (
            <p
              className={cn(
                surfaceCard,
                "flex items-center gap-2 border-primary/25 bg-primary/5 p-3 text-sm text-muted-foreground shadow-none hover:shadow-none",
              )}
              role="status"
            >
              <Bot className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              Community bot replied on this post.
            </p>
          ) : null}
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
              <MessageCircle className="h-5 w-5 text-primary" aria-hidden />
              Comments
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {(post.comments ?? []).length}
              </span>
            </h2>
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
                          className={cn(inputClass, "text-sm")}
                        />
                        <button type="submit" className={ghostLink}>
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
                            className={cn(actionBtn, "text-xs text-muted-foreground hover:bg-muted/60 hover:text-foreground")}
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
                          className={cn(actionBtn, "text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive")}
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
                  className={inputClass}
                />
              </label>
              <button type="submit" className={cn(primaryCta, "px-3 py-2")}>
                <Send className="h-4 w-4" aria-hidden />
                Comment
              </button>
            </form>
          </section>
        </div>
      ) : null}

      {(view === "feed" || view === "mine") && !loading && migrated && posts.length === 0 && !error ? (
        <p className={cn(emptyStatePanel, "p-8 text-center text-sm text-muted-foreground")}>
          <MessageSquare className="mx-auto mb-3 h-10 w-10 text-primary/40" aria-hidden />
          {view === "mine" ? "You have not published a post yet." : "No posts yet. Be the first to share a study note."}
        </p>
      ) : null}
      {(view === "feed" || view === "mine") ? (
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
              className={cn(chipBtn, "mx-auto w-full justify-center py-2.5 text-sm sm:w-auto")}
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
