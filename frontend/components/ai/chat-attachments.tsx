"use client";

import { useCallback, useRef, useState } from "react";
import { Camera, ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Camera / gallery photo input for the Veer chat.
 *
 * A student can photograph a question, a textbook page, a diagram or a
 * hand-written derivation and send it with (or without) typed text; the
 * backend reads the photo and teaches what it shows.
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
  onError?: (message: string) => void;
  disabled?: boolean;
  /** How many photos are already attached (hides buttons at the cap). */
  attached?: number;
  className?: string;
}

/**
 * The two attach buttons (camera + gallery). Each owns a hidden file input, so
 * the same UI works on desktop, Android and iOS without a permission dialog of
 * its own.
 */
export function ChatAttachButton({
  onPick,
  onError,
  disabled = false,
  attached = 0,
  className,
}: ChatAttachButtonProps) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      const file = files?.[0];
      if (!file) return;
      setBusy(true);
      try {
        onPick(await fileToDataUrl(file));
      } catch (err) {
        onError?.(err instanceof Error ? err.message : "Could not attach that photo");
      } finally {
        setBusy(false);
      }
    },
    [onPick, onError],
  );

  const atCap = attached >= MAX_ATTACHMENTS;
  const isDisabled = disabled || busy || atCap;

  const buttonClass =
    "h-11 w-11 rounded-2xl border border-border/80 bg-card text-muted-foreground flex items-center justify-center hover:text-foreground hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          void handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          void handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => cameraRef.current?.click()}
        disabled={isDisabled}
        className={buttonClass}
        title={atCap ? `Up to ${MAX_ATTACHMENTS} photos per message` : "Take a photo — snap the question and I'll teach it"}
        aria-label="Take a photo"
      >
        <Camera className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => galleryRef.current?.click()}
        disabled={isDisabled}
        className={buttonClass}
        title={atCap ? `Up to ${MAX_ATTACHMENTS} photos per message` : "Attach a photo from your gallery"}
        aria-label="Attach photo from gallery"
      >
        <ImagePlus className="h-4 w-4" />
      </button>
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
