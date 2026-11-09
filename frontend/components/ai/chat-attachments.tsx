"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, FileText, ImagePlus, Loader2, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { attachmentError, classifyAttachment } from "@/lib/chat/attach-files";

/**
 * Camera / gallery photo input for the Veer chat.
 *
 * A student can photograph a question, a textbook page, a diagram or a
 * hand-written derivation and send it with (or without) typed text; the
 * backend reads the photo and teaches what it shows. Text-like files are read
 * in the browser and folded into the draft as context.
 *
 * Photos are downscaled in the browser before upload (max 1280 px, JPEG) so a
 * modern phone photo (3-8 MB) becomes ~150-400 KB — keeping the request inside
 * the server's limit and replies fast. Two entry points are offered on
 * purpose: the camera (`capture="environment"` → straight to the rear camera)
 * and the gallery picker.
 */

/** Cap and per-image limits — kept in sync with backend/src/ai/image-input.ts. */
export const MAX_ATTACHMENTS = 3;
const MAX_DIMENSION = 1280;
const JPEG_QUALITY = 0.82;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read that image"));
    img.src = src;
  });
}

/** Downscale + re-encode a picked file into a data URL. Falls back to the original. */
export async function fileToDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Only images are supported");
  const original = await readAsDataUrl(file);
  try {
    const img = await loadImage(original);
    const longest = Math.max(img.width, img.height);
    if (longest <= MAX_DIMENSION && file.size <= 900_000) return original;
    const scale = Math.min(1, MAX_DIMENSION / longest);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.width * scale));
    canvas.height = Math.max(1, Math.round(img.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) return original;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
  } catch {
    // Decoding failed (odd format) — send what the student picked.
    return original;
  }
}

export interface ChatAttachButtonProps {
  onPick: (dataUrl: string) => void;
  /** Text-like file picked from "Files": the surface folds it into the draft. */
  onPickDocument?: (name: string, text: string) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
  /** How many photos are already attached (blocks photo options at the cap). */
  attached?: number;
  className?: string;
}

/**
 * ONE attach button. Opens a small menu (Camera, Photos, Files) so the composer
 * carries a single control instead of separate camera and gallery buttons.
 * Each option owns a hidden file input, so the same UI works on desktop,
 * Android and iOS without a permission dialog of its own.
 */
export function ChatAttachButton({
  onPick,
  onPickDocument,
  onError,
  disabled = false,
  attached = 0,
  className,
}: ChatAttachButtonProps) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const atCap = attached >= MAX_ATTACHMENTS;

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      const file = files?.[0];
      if (!file) return;
      const problem = attachmentError(file);
      if (problem) {
        onError?.(problem);
        return;
      }
      setBusy(true);
      try {
        if (classifyAttachment(file) === "image") {
          if (atCap) throw new Error(`Up to ${MAX_ATTACHMENTS} photos per message`);
          onPick(await fileToDataUrl(file));
        } else if (onPickDocument) {
          onPickDocument(file.name, await file.text());
        } else {
          throw new Error("This chat takes photos only. Attach an image.");
        }
      } catch (err) {
        onError?.(err instanceof Error ? err.message : "Could not attach that file");
      } finally {
        setBusy(false);
      }
    },
    [onPick, onPickDocument, onError, atCap],
  );

  const isDisabled = disabled || busy;
  const reset = (e: React.ChangeEvent<HTMLInputElement>) => {
    void handleFiles(e.target.files);
    e.target.value = "";
  };

  const items = [
    { key: "camera", label: "Camera", hint: "Snap a question", icon: Camera, ref: cameraRef, off: atCap },
    { key: "photos", label: "Photos", hint: "From your gallery", icon: ImagePlus, ref: galleryRef, off: atCap },
    { key: "files", label: "Files", hint: "txt, md, csv, json", icon: FileText, ref: filesRef, off: !onPickDocument },
  ];

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={reset} />
      <input ref={galleryRef} type="file" accept="image/*" className="hidden" onChange={reset} />
      <input
        ref={filesRef}
        type="file"
        accept=".txt,.md,.markdown,.csv,.tsv,.json,.log,.xml,.yml,.yaml,text/*,application/json"
        className="hidden"
        onChange={reset}
      />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isDisabled}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Attach"
        title="Attach a photo, camera shot or file"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-card text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className={cn("h-4 w-4 transition-transform", open && "rotate-45")} />}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute bottom-full left-0 z-30 mb-2 w-52 overflow-hidden rounded-xl border border-border/80 bg-card p-1 shadow-xl"
        >
          {items.map(({ key, label, hint, icon: Icon, ref, off }) => (
            <button
              key={key}
              type="button"
              role="menuitem"
              disabled={off}
              onClick={() => {
                setOpen(false);
                ref.current?.click();
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              title={off && atCap ? `Up to ${MAX_ATTACHMENTS} photos per message` : undefined}
            >
              <Icon className="h-4 w-4 shrink-0 text-primary" />
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold">{label}</span>
                <span className="block text-[10px] text-muted-foreground">{hint}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Thumbnail strip for the photos queued with the next message. */
export function ChatAttachPreview({
  images,
  onRemove,
  className,
}: {
  images: string[];
  onRemove: (index: number) => void;
  className?: string;
}) {
  if (!images.length) return null;
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {images.map((src, i) => (
        <span
          key={i}
          className="relative h-14 w-14 rounded-xl overflow-hidden border border-border/70 bg-muted"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={`Attached photo ${i + 1}`} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onRemove(i)}
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow"
            aria-label={`Remove photo ${i + 1}`}
            title="Remove this photo"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
    </div>
  );
}
