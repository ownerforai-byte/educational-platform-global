"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { SessionUser } from "@/features/auth/types";
import {
  COMMUNITY_CATEGORIES,
  COMMUNITY_POST_KINDS,
  type CommunityPostKind,
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
import { QuotedPostCard } from "@/features/community/quoted-post-card";
import { MarkdownBody } from "@/features/community/markdown-body";
import { SignInOverlay } from "@/features/community/sign-in-overlay";
import {
  ACCEPT,
  formatBytes,
  MAX_BYTES,
  MAX_FILES,
  messageOf,
  statusOf,
} from "@/features/community/community-helpers";
import {
  clearPostDraft,
  readPostDraft,
  writePostDraft,
} from "@/features/community/saved-posts";
import { invalidateCommunityCacheWhere } from "@/features/community/community-cache";
import {
  chipBtn,
  composerShell,
  ghostLink,
  inputClass,
  primaryCta,
  toolbarBtn,
} from "@/features/community/community-ui";
import { cn } from "@/lib/utils";
import { COMMUNITY_BOT_USERNAME } from "@/lib/community-bot";
import { useCommunityMentionSuggest } from "@/features/community/community-mention-suggest";
import {
  AlertCircle,
  AtSign,
  Bold,
  Check,
  Eye,
  FileText,
  Heading2,
  Italic,
  List,
  Loader2,
  Paperclip,
  Pencil,
  Plus,
  RotateCcw,
  Send,
  Trash2,
} from "lucide-react";

interface QueuedFileItem {
  id: string;
  file: File;
  progress: number;
  status: "queued" | "uploading" | "uploaded" | "failed";
  error?: string;
}

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
  const searchParams = useSearchParams();
  const quotePostId = mode === "create" ? searchParams.get("quote")?.trim() || null : null;
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const draftRouteKey = mode === "edit" && initial ? `edit:${initial.id}` : "new";

  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const { mentionPanel, syncFromTextarea, onTextareaBlur, openFromAtButton, insertBotMention } =
    useCommunityMentionSuggest({ body, setBody, textareaRef: bodyRef });
  const [category, setCategory] = useState(initial?.category ?? "general");
  const [postKind, setPostKind] = useState<CommunityPostKind>(initial?.kind ?? "discussion");
  const [editorTab, setEditorTab] = useState<"write" | "preview">("write");
  const [files, setFiles] = useState<QueuedFileItem[]>([]);
  const [existing, setExisting] = useState<FeedAttachment[]>(initial?.attachments ?? []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Guests who try to publish get the native-app sign-in overlay ("Sign in to create").
  const [signInPromptOpen, setSignInPromptOpen] = useState(false);
  const [savedPostId, setSavedPostId] = useState<string | null>(initial?.id ?? null);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);
  const [uploadDrag, setUploadDrag] = useState(false);
  const [quotePreview, setQuotePreview] = useState<FeedPost | null>(null);
  const hydratedDraftRef = useRef(false);

  useEffect(() => {
    if (!quotePostId) {
      setQuotePreview(null);
      return;
    }
    let cancelled = false;
    void getPost(quotePostId)
      .then((detail) => {
        if (!cancelled) setQuotePreview(detail.post);
      })
      .catch(() => {
        if (!cancelled) setQuotePreview(null);
      });
    return () => {
      cancelled = true;
    };
  }, [quotePostId]);

  useEffect(() => {
    if (!initial) return;
    setTitle(initial.title);
    setBody(initial.body);
    setCategory(initial.category);
    setPostKind(initial.kind ?? "discussion");
    setExisting(initial.attachments);
    setSavedPostId(initial.id);
  }, [initial]);

  // Restore local device draft once per mount for new posts (or unsaved edits).
  useEffect(() => {
    if (hydratedDraftRef.current) return;
    hydratedDraftRef.current = true;
    if (mode !== "create") return;
    const savedDraft = readPostDraft(draftRouteKey);
    if (!savedDraft) return;
    setTitle(savedDraft.title);
    setBody(savedDraft.body);
    setCategory(savedDraft.category);
    setDraftSavedAt(savedDraft.savedAt);
  }, [draftRouteKey, mode]);

  // Debounced local draft autosave (never blocks typing).
  useEffect(() => {
    if (!hydratedDraftRef.current) return;
    if (mode === "edit" && initial) {
      const unchanged =
        title === initial.title && body === initial.body && category === initial.category;
      if (unchanged) return;
    }
    const timer = window.setTimeout(() => {
      const savedAt = writePostDraft(draftRouteKey, { title, body, category });
      setDraftSavedAt(savedAt);
    }, 500);
    return () => window.clearTimeout(timer);
  }, [title, body, category, draftRouteKey, initial, mode]);

  const tagged = /@(?:community-bot|veer(?:-ai)?)\b/i.test(body);

  function tagBot() {
    if (tagged) return;
    insertBotMention();
    setEditorTab("write");
  }

  function insertMarkup(before: string, after = "") {
    const el = bodyRef.current;
    const start = el?.selectionStart ?? body.length;
    const end = el?.selectionEnd ?? body.length;
    const selected = body.slice(start, end) || "text";
    const next = `${body.slice(0, start)}${before}${selected}${after}${body.slice(end)}`;
    setBody(next);
    setEditorTab("write");
    requestAnimationFrame(() => {
      const cursor = start + before.length + selected.length + after.length;
      el?.focus();
      el?.setSelectionRange(cursor, cursor);
    });
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    const activeCount = () =>
      next.filter((item) => item.status !== "uploaded").length + existing.length;

    for (const file of Array.from(list)) {
      if (activeCount() >= MAX_FILES) {
        setError("A post can have at most 4 files.");
        break;
      }
      if (file.size > MAX_BYTES) {
        setError(`${file.name} is larger than 3 MB.`);
        continue;
      }
      next.push({
        id: `${file.name}-${file.size}-${Date.now()}-${next.length}`,
        file,
        progress: 0,
        status: "queued",
      });
    }
    setFiles(next);
  }

  async function uploadSingleFile(postId: string, item: QueuedFileItem): Promise<FeedAttachment | null> {
    setFiles((current) =>
      current.map((entry) =>
        entry.id === item.id ? { ...entry, status: "uploading", error: undefined } : entry,
      ),
    );
    try {
      const attachment = await uploadAttachment(postId, item.file, (fraction) => {
        setFiles((current) =>
          current.map((entry) =>
            entry.id === item.id ? { ...entry, progress: fraction } : entry,
          ),
        );
      });
      setFiles((current) => current.filter((entry) => entry.id !== item.id));
      setExisting((current) =>
        current.some((have) => have.id === attachment.id) ? current : [...current, attachment],
      );
      return attachment;
    } catch (err) {
      const msg = messageOf(err, `Could not upload ${item.file.name}.`);
      setFiles((current) =>
        current.map((entry) =>
          entry.id === item.id ? { ...entry, status: "failed", error: msg } : entry,
        ),
      );
      return null;
    }
  }

  async function retryAttachment(item: QueuedFileItem) {
    if (!savedPostId || busy) return;
    setBusy(true);
    setError(null);
    const uploaded = await uploadSingleFile(savedPostId, item);
    setBusy(false);
    if (uploaded) {
      invalidateCommunityCacheWhere((k) => k.startsWith("feed-"));
    }
  }

  async function publish() {
    if (sessionLoading || busy) return;
    if (!user) {
      if (mode === "edit") {
        setError("Sign in to edit posts.");
      } else {
        setSignInPromptOpen(true);
      }
      return;
    }
    const input: PostInput = {
      title: title.trim(),
      body: body.trim(),
      category,
      kind: postKind,
      ...(quotePostId && mode === "create" ? { quotedPostId: quotePostId } : {}),
    };
    if (input.title.length < 4 || input.title.length > 160 || input.body.length < 1) {
      setError("Add a title (4–160 characters) and a body.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const targetId = mode === "edit" && initial ? initial.id : savedPostId;
      const saved = targetId
        ? (await updatePost(targetId, input)).post
        : (await createPost(input)).post;
      setSavedPostId(saved.id);

      let uploadFailed = false;
      const pendingUploads = files.filter((item) => item.status !== "uploaded");
      for (const item of pendingUploads) {
        const attachment = await uploadSingleFile(saved.id, item);
        if (attachment) {
          saved.attachments = [...(saved.attachments ?? []), attachment];
        } else {
          uploadFailed = true;
        }
      }

      invalidateCommunityCacheWhere((k) => k.startsWith("feed-"));

      if (uploadFailed) {
        setError("Post text was saved, but one or more files failed to upload. Retry or remove failed files below.");
        return;
      }

      clearPostDraft(draftRouteKey);
      setDraftSavedAt(null);

      const full = await getPost(saved.id);
      const post = full.post ?? saved;
      onPublished?.(post);

      if (redirectOnSuccess) {
        const action = mode === "edit" ? "updated" : "posted";
        router.push(`/ai/community/done?action=${action}&postId=${encodeURIComponent(post.id)}`);
        return;
      }
      if (mode === "create") {
        setTitle("");
        setBody("");
        setCategory("general");
        setSavedPostId(null);
      }
    } catch (err) {
      if (statusOf(err) === 401) {
        setError(
          mode === "edit"
            ? "Sign in to edit posts."
            : "Sign in with a verified account to publish.",
        );
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
    <>
      <form
        noValidate
        className={cn(composerShell, "space-y-4 p-4 shadow-elev-1 sm:p-5")}
      onSubmit={(event) => {
        event.preventDefault();
        void publish();
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {mode === "edit" ? (
              <Pencil className="h-4 w-4" aria-hidden />
            ) : (
              <Plus className="h-4 w-4" aria-hidden />
            )}
          </span>
          {mode === "edit" ? "Edit post" : "New post"}
        </h2>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {!user && !sessionLoading ? (
            <span>Sign in with a verified account to publish.</span>
          ) : draftSavedAt ? (
            <span className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-primary" aria-hidden />
              Draft saved on this device
            </span>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_9rem_9rem]">
        <label className="block text-sm">
          <span className="mb-1.5 block text-[13px] font-medium text-muted-foreground">Title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={160}
            required
            placeholder="Clear question or study note title"
            aria-label="Title"
            className={cn(inputClass, "min-h-11")}
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block text-[13px] font-medium text-muted-foreground">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Category"
            className={cn(inputClass, "min-h-11")}
          >
            {COMMUNITY_CATEGORIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block text-[13px] font-medium text-muted-foreground">Type</span>
          <select
            value={postKind}
            onChange={(event) => setPostKind(event.target.value as CommunityPostKind)}
            aria-label="Post type"
            className={cn(inputClass, "min-h-11")}
          >
            {COMMUNITY_POST_KINDS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Write / Preview tabs + Formatting toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          role="tablist"
          aria-label="Editor mode"
          className="inline-flex min-h-11 items-center rounded-xl border border-border/80 bg-background p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={editorTab === "write"}
            onClick={() => setEditorTab("write")}
            className={cn(
              "min-h-9 rounded-lg px-3 text-[13px] font-medium transition-colors",
              editorTab === "write"
                ? "bg-primary/12 font-semibold text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Write
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={editorTab === "preview"}
            onClick={() => setEditorTab("preview")}
            className={cn(
              "inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium transition-colors",
              editorTab === "preview"
                ? "bg-primary/12 font-semibold text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Eye className="h-3.5 w-3.5" aria-hidden />
            Preview
          </button>
        </div>

        {editorTab === "write" ? (
          <div className="flex flex-wrap gap-1.5" role="toolbar" aria-label="Formatting">
            <button
              type="button"
              className={cn(toolbarBtn, "min-h-11")}
              aria-label="Bold"
              onClick={() => insertMarkup("**", "**")}
            >
              <Bold className="h-3.5 w-3.5" aria-hidden />
              Bold
            </button>
            <button
              type="button"
              className={cn(toolbarBtn, "min-h-11")}
              aria-label="Italic"
              onClick={() => insertMarkup("*", "*")}
            >
              <Italic className="h-3.5 w-3.5" aria-hidden />
              Italic
            </button>
            <button
              type="button"
              className={cn(toolbarBtn, "min-h-11")}
              aria-label="Heading"
              onClick={() => insertMarkup("## ")}
            >
              <Heading2 className="h-3.5 w-3.5" aria-hidden />
              Heading
            </button>
            <button
              type="button"
              className={cn(toolbarBtn, "min-h-11")}
              aria-label="Bullet list"
              onClick={() => insertMarkup("- ")}
            >
              <List className="h-3.5 w-3.5" aria-hidden />
              List
            </button>
            <button
              type="button"
              className={cn(toolbarBtn, "min-h-11", tagged && "bg-primary/12 text-primary")}
              aria-label="Tag bot"
              aria-pressed={tagged}
              onClick={() => (tagged ? tagBot() : openFromAtButton())}
            >
              <AtSign className="h-3.5 w-3.5" aria-hidden />
              Mention
            </button>
          </div>
        ) : null}
      </div>

      {quotePreview ? (
        <div className="space-y-1">
          <p className="text-[13px] font-medium text-muted-foreground">Quoting</p>
          <QuotedPostCard post={quotePreview} />
        </div>
      ) : null}

      {editorTab === "write" ? (
        <label className="relative block text-sm">
          <span className="mb-1.5 block text-[13px] font-medium text-muted-foreground">Body</span>
          {mentionPanel}
          <textarea
            ref={bodyRef}
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
              syncFromTextarea();
            }}
            onKeyUp={syncFromTextarea}
            onClick={syncFromTextarea}
            onBlur={onTextareaBlur}
            onKeyDown={(event) => {
              if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                event.preventDefault();
                void publish();
              }
            }}
            rows={7}
            maxLength={20000}
            required
            placeholder="Write anything. Type @ to tag Veer AI (@community-bot) for a reply."
            aria-label="Body"
            className={cn(inputClass, "min-h-[10rem] resize-y text-base sm:text-sm")}
          />
        </label>
      ) : (
        <div className="min-h-[10rem] rounded-xl border border-border/80 bg-background p-4">
          {body.trim() ? (
            <MarkdownBody text={body} className="text-sm leading-relaxed" />
          ) : (
            <p className="text-sm text-muted-foreground">Nothing to preview yet.</p>
          )}
        </div>
      )}

      <div className="block text-sm">
        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-[13px] text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium">
            <Paperclip className="h-3.5 w-3.5" aria-hidden />
            Files
          </span>
          <span>Up to 4 files · 3 MB each (PDF, images, Office, TXT)</span>
        </div>
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
            className="block w-full cursor-pointer text-sm text-muted-foreground file:mr-3 file:min-h-9 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary"
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
              .catch((err) =>
                setError(statusOf(err) === 401 ? "Sign in to remove files." : messageOf(err)),
              );
          }}
        />
      ) : null}

      {files.length > 0 ? (
        <ul className="space-y-2 text-sm">
          {files.map((item) => (
            <li
              key={item.id}
              className={cn(
                "space-y-2 rounded-xl border px-3.5 py-2.5",
                item.status === "failed"
                  ? "border-destructive/40 bg-destructive/5"
                  : "border-border/80 bg-muted/30",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2 truncate text-sm font-medium">
                  <FileText className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="truncate">{item.file.name}</span>
                  <span className="shrink-0 text-xs font-normal text-muted-foreground">
                    ({formatBytes(item.file.size)})
                  </span>
                </span>
                <span className="text-xs font-medium tabular-nums text-muted-foreground">
                  {item.status === "failed"
                    ? "Upload failed"
                    : item.status === "uploading" || item.progress > 0
                      ? `${Math.round(item.progress * 100)}%`
                      : "Queued"}
                </span>
              </div>

              {item.status !== "failed" ? (
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
              ) : item.error ? (
                <p className="text-xs text-destructive">{item.error}</p>
              ) : null}

              <div className="flex flex-wrap items-center gap-2">
                {item.status === "failed" && savedPostId ? (
                  <button
                    type="button"
                    disabled={busy}
                    className={cn(chipBtn, "min-h-10 py-1 text-xs")}
                    onClick={() => void retryAttachment(item)}
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                    Retry upload
                  </button>
                ) : null}
                <button
                  type="button"
                  disabled={busy}
                  className={cn(chipBtn, "min-h-10 py-1 text-xs")}
                  aria-label={`Remove ${item.file.name}`}
                  onClick={() =>
                    setFiles((current) => current.filter((entry) => entry.id !== item.id))
                  }
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}

      {savedPostId && error ? (
        <Link href={sharePath(savedPostId)} className={ghostLink}>
          Open saved post
        </Link>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button type="submit" disabled={busy || sessionLoading} className={cn(primaryCta, "min-h-11")}>
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Publishing…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              {mode === "edit" ? "Save changes" : "Publish post"}
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
            if (dirty && !window.confirm("Discard this post? Unsaved changes will be lost.")) {
              return;
            }
            clearPostDraft(draftRouteKey);
            setDraftSavedAt(null);
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

      {/* Guest publish attempt → native-app sign-in overlay */}
      <SignInOverlay
        open={signInPromptOpen}
        action="create"
        onOpenChange={setSignInPromptOpen}
      />
    </>
  );
}
