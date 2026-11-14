"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SessionUser } from "@/features/auth/types";
import {
  COMMUNITY_CATEGORIES,
  createPost,
  deleteAttachment,
  getPost,
  sharePath,
  updatePost,
  uploadAttachment,
  type FeedAttachment,
  type FeedPost,
  type PostInput,
} from "@/lib/api/community-feed";
import { AttachmentList } from "@/features/community/attachment-list";
import {
  ACCEPT,
  MAX_BYTES,
  MAX_FILES,
  messageOf,
  statusOf,
} from "@/features/community/community-helpers";
import {
  chipBtn,
  composerShell,
  ghostLink,
  inputClass,
  primaryCta,
  toolbarBtn,
} from "@/features/community/community-ui";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Bold,
  FileText,
  Heading2,
  Italic,
  List,
  Loader2,
  Paperclip,
  Pencil,
  Plus,
  Send,
  Trash2,
} from "lucide-react";

export function PostComposer({
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
    if (sessionLoading || busy) return;
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
          aria-label="Title"
          className={inputClass}
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Category</span>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Category"
          className={inputClass}
        >
          {COMMUNITY_CATEGORIES.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
      </label>
      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Formatting">
        <button type="button" className={cn(toolbarBtn, "min-h-11")} aria-label="Bold" onClick={() => insertMarkup("**", "**")}>
          <Bold className="h-3.5 w-3.5" aria-hidden />
          Bold
        </button>
        <button type="button" className={cn(toolbarBtn, "min-h-11")} aria-label="Italic" onClick={() => insertMarkup("*", "*")}>
          <Italic className="h-3.5 w-3.5" aria-hidden />
          Italic
        </button>
        <button type="button" className={cn(toolbarBtn, "min-h-11")} aria-label="Heading" onClick={() => insertMarkup("## ")}>
          <Heading2 className="h-3.5 w-3.5" aria-hidden />
          Heading
        </button>
        <button type="button" className={cn(toolbarBtn, "min-h-11")} aria-label="Bullet list" onClick={() => insertMarkup("- ")}>
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
          aria-label="Body"
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
            aria-label="Attach files"
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
                className={cn(chipBtn, "min-h-11 py-1")}
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
      <div className="flex flex-wrap items-center gap-2">
        <button type="submit" disabled={busy || sessionLoading} className={cn(primaryCta, "min-h-11")}>
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
        <button
          type="button"
          className={cn(chipBtn, "min-h-11 text-foreground")}
          disabled={busy}
          onClick={() => {
            const dirty =
              title !== (initial?.title ?? "") ||
              body !== (initial?.body ?? "") ||
              category !== (initial?.category ?? "general") ||
              files.length > 0;
            if (dirty && !window.confirm("Discard this post? Unsaved changes will be lost.")) return;
            if (redirectOnSuccess) {
              router.push(mode === "edit" && initial ? sharePath(initial.id) : "/ai/community");
              return;
            }
            setTitle("");
            setBody("");
            setCategory("general");
            setFiles([]);
            setError(null);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
