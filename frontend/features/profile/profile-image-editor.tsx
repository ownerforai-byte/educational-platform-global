"use client";

/**
 * Profile picture / cover image editing.
 *
 *  - ONE pencil per image slot. The avatar pencil only ever touches the avatar,
 *    the cover pencil only ever the cover: separate state, separate request,
 *    separate confirmation. Removing one never removes the other.
 *  - Formats are validated by magic bytes, never by name or `file.type`, and a
 *    picker hint lists every format the server accepts.
 *  - The chosen zoom/position is baked into the uploaded pixels, so what the
 *    owner sees in the preview is what the profile shows afterwards.
 *  - HEIC/HEIF: browsers usually cannot decode it. When `createImageBitmap`
 *    fails we still upload the original bytes and let the server try, surfacing
 *    its answer instead of dropping the file.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pencil, RotateCcw, Trash2, Upload, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PROFILE_IMAGE_ACCEPT,
  removeAvatar,
  removeCover,
  uploadAvatar,
  uploadCover,
  type PublicProfile,
  type StorageInfo,
} from "@/lib/api/profile";

export type ProfileImageKind = "avatar" | "cover";

export interface ProfileImageChangeResult {
  profile: PublicProfile;
  storage: StorageInfo | null;
}

const LABELS: Record<ProfileImageKind, { edit: string; remove: string; title: string; hint: string }> = {
  avatar: {
    edit: "Edit profile picture",
    remove: "Remove profile picture",
    title: "Profile picture",
    hint: "Square crop · JPG, PNG, WebP, GIF, AVIF, HEIC, BMP or TIFF",
  },
  cover: {
    edit: "Edit cover image",
    remove: "Remove cover image",
    title: "Cover image",
    hint: "Wide crop · JPG, PNG, WebP, GIF, AVIF, HEIC, BMP or TIFF",
  },
};

/** Output canvas size per slot — generous enough that the server downscale stays sharp. */
const OUTPUT: Record<ProfileImageKind, { w: number; h: number }> = {
  avatar: { w: 512, h: 512 },
  cover: { w: 1200, h: 400 },
};

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/bmp": "bmp",
  "image/tiff": "tiff",
};

const SIGNATURE_MESSAGE =
  "That file is not a readable image — use JPG, PNG, WebP, GIF, AVIF, HEIC, BMP or TIFF.";

/** Real content sniffing: the extension is only a fallback. */
function sniffFormat(bytes: Uint8Array): "raster" | "heic" | null {
  const at = (offset: number, pattern: number[]) =>
    pattern.every((byte, index) => bytes[offset + index] === byte);
  if (at(0, [0xff, 0xd8, 0xff])) return "raster";
  if (at(0, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "raster";
  if (at(0, [0x47, 0x49, 0x46, 0x38])) return "raster";
  if (at(0, [0x42, 0x4d])) return "raster";
  if (at(0, [0x49, 0x49, 0x2a, 0x00]) || at(0, [0x4d, 0x4d, 0x00, 0x2a])) return "raster";
  if (at(0, [0x52, 0x49, 0x46, 0x46]) && at(8, [0x57, 0x45, 0x42, 0x50])) return "raster";
  if (at(4, [0x66, 0x74, 0x79, 0x70])) {
    const brand = String.fromCharCode(...Array.from(bytes.subarray(8, 12))).toLowerCase();
    if (brand.startsWith("avi")) return "raster";
    if (["heic", "heix", "hevc", "hevx", "mif1", "msf1"].includes(brand)) return "heic";
    return null;
  }
  return null;
}

interface Picked {
  file: File;
  url: string;
  /** Null when the browser cannot decode it (typical for HEIC outside Safari). */
  image: HTMLImageElement | null;
  decodable: boolean;
}

export function ProfileImageEditButton({
  kind,
  currentUrl,
  displayName,
  hasImage,
  onChanged,
  className,
}: {
  kind: ProfileImageKind;
  currentUrl: string | null;
  displayName: string;
  hasImage: boolean;
  onChanged: (result: ProfileImageChangeResult) => void;
  className?: string;
}) {
  const labels = LABELS[kind];
  const accept = useMemo(() => PROFILE_IMAGE_ACCEPT, []);

  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<Picked | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [frameSize, setFrameSize] = useState({ w: 0, h: 0 });

  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const pickedUrlRef = useRef<string | null>(null);

  const frameAspect = OUTPUT[kind].w / OUTPUT[kind].h;

  const close = useCallback(() => {
    setOpen(false);
    setPicked(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setMessage(null);
    setFailed(false);
    setConfirmRemove(false);
    if (pickedUrlRef.current) {
      URL.revokeObjectURL(pickedUrlRef.current);
      pickedUrlRef.current = null;
    }
  }, []);

  // Escape to dismiss + focus into the dialog + lock the page behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close]);

  // Abort an in-flight upload if the editor disappears mid-request.
  useEffect(
    () => () => {
      abortRef.current?.abort();
      if (pickedUrlRef.current) URL.revokeObjectURL(pickedUrlRef.current);
    },
    [],
  );

  // The preview must match the crop maths exactly, so the frame is measured.
  useEffect(() => {
    if (!open) return;
    const measure = () => {
      const rect = frameRef.current?.getBoundingClientRect();
      if (rect) setFrameSize({ w: rect.width, h: rect.height });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open, picked]);

  /** Drawn size of the image at the current zoom, and its clamped position. */
  const geometry = useMemo(() => {
    if (!picked?.image || !frameSize.w || !frameSize.h) return null;
    const coverScale = Math.max(frameSize.w / picked.image.naturalWidth, frameSize.h / picked.image.naturalHeight);
    const scale = coverScale * zoom;
    const drawW = picked.image.naturalWidth * scale;
    const drawH = picked.image.naturalHeight * scale;
    const limitX = Math.max(0, (drawW - frameSize.w) / 2);
    const limitY = Math.max(0, (drawH - frameSize.h) / 2);
    return {
      drawW,
      drawH,
      limitX,
      limitY,
      left: (frameSize.w - drawW) / 2 + Math.min(limitX, Math.max(-limitX, offset.x)),
      top: (frameSize.h - drawH) / 2 + Math.min(limitY, Math.max(-limitY, offset.y)),
      scale,
    };
  }, [picked, frameSize, zoom, offset]);

  const chooseFile = async (file: File) => {
    setMessage(null);
    setFailed(false);
    const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    const format = sniffFormat(head);
    if (!format) {
      setPicked(null);
      setMessage(SIGNATURE_MESSAGE);
      return;
    }

    if (pickedUrlRef.current) URL.revokeObjectURL(pickedUrlRef.current);
    const url = URL.createObjectURL(file);
    pickedUrlRef.current = url;

    const image = await new Promise<HTMLImageElement | null>((resolve) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => resolve(null);
      element.src = url;
    });

    setPicked({ file, url, image, decodable: Boolean(image) });
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    if (!image) {
      setMessage(
        "This browser cannot preview that format. The upload will still be sent — the server converts it if it can.",
      );
    }
  };

  /** Draw exactly the visible crop region into a canvas at the slot's output size. */
  const renderCrop = (): Promise<Blob | null> => {
    if (!picked?.image || !geometry) return Promise.resolve(null);
    const out = OUTPUT[kind];
    const canvas = document.createElement("canvas");
    canvas.width = out.w;
    canvas.height = out.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return Promise.resolve(null);

    const ratio = out.w / frameSize.w;
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, out.w, out.h);
    ctx.drawImage(
      picked.image,
      geometry.left * ratio,
      geometry.top * ratio,
      geometry.drawW * ratio,
      geometry.drawH * ratio,
    );

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.92);
    });
  };

  const upload = async () => {
    if (!picked) return;
    setBusy(true);
    setMessage(null);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      let payload: File = picked.file;
      const cropped = await renderCrop();
      if (cropped) {
        const extension = EXTENSION_BY_TYPE[cropped.type] ?? "jpg";
        payload = new File([cropped], `${kind}-crop.${extension}`, { type: cropped.type });
      }
      const result =
        kind === "avatar"
          ? await uploadAvatar(payload, controller.signal)
          : await uploadCover(payload, controller.signal);
      onChanged({ profile: result.profile, storage: result.storage });
      close();
    } catch (error) {
      if ((error as { name?: string }).name === "AbortError") return;
      setMessage(error instanceof Error ? error.message : "Upload failed — try another image.");
    } finally {
      abortRef.current = null;
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    setMessage(null);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const result = kind === "avatar" ? await removeAvatar() : await removeCover();
      onChanged({ profile: result.profile, storage: result.storage });
      close();
    } catch (error) {
      if ((error as { name?: string }).name === "AbortError") return;
      setMessage(error instanceof Error ? error.message : "Could not remove the image.");
    } finally {
      abortRef.current = null;
      setBusy(false);
    }
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!picked?.image) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || !geometry) return;
    const clamp = (value: number, limit: number) => Math.min(limit, Math.max(-limit, value));
    setOffset({
      x: clamp(drag.ox + (event.clientX - drag.x), geometry.limitX),
      y: clamp(drag.oy + (event.clientY - drag.y), geometry.limitY),
    });
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  // Keep the offset valid when zooming back out.
  const changeZoom = (next: number) => {
    setZoom(next);
    const ratio = next / Math.max(zoom, 0.01);
    setOffset((current) => ({ x: current.x * ratio, y: current.y * ratio }));
  };

  const previewSrc = picked?.url ?? currentUrl;

  return (
    <>
      <button
        type="button"
        aria-label={labels.edit}
        aria-haspopup="dialog"
        title={labels.edit}
        onClick={() => {
          setOpen(true);
          setMessage(null);
        }}
        className={cn(
          "absolute z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-md backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4">
          <button
            type="button"
            aria-label="Close image editor"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={labels.title}
            aria-busy={busy}
            tabIndex={-1}
            className="relative z-10 w-full max-w-lg space-y-3 rounded-t-2xl border border-border bg-card p-4 text-card-foreground shadow-2xl sm:rounded-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold">{labels.title}</h2>
                <p className="text-[11px] text-muted-foreground">{labels.hint}</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {confirmRemove ? (
              <div className="space-y-3 rounded-xl border border-destructive/40 bg-destructive/5 p-3">
                <p className="text-sm font-semibold">Remove {kind === "avatar" ? "profile picture" : "cover image"}?</p>
                <p className="text-xs text-muted-foreground">
                  {kind === "avatar"
                    ? "Your initials replace it. Your cover image stays."
                    : "The default background returns. Your profile picture stays."}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="rounded-xl"
                    disabled={busy}
                    onClick={() => void remove()}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {busy ? "Removing…" : labels.remove}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-xl"
                    disabled={busy}
                    onClick={() => setConfirmRemove(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : null}

            <div
              ref={frameRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className={cn(
                "relative overflow-hidden rounded-xl border border-border bg-muted select-none",
                picked?.image ? "cursor-grab active:cursor-grabbing" : "",
              )}
              style={{ aspectRatio: String(frameAspect) }}
            >
              {previewSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewSrc}
                  alt={displayName}
                  draggable={false}
                  onError={() => setFailed(true)}
                  className={cn("absolute", geometry ? "max-w-none" : "inset-0 h-full w-full object-cover")}
                  style={
                    geometry
                      ? { width: geometry.drawW, height: geometry.drawH, left: geometry.left, top: geometry.top }
                      : undefined
                  }
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  {hasImage ? "Loading…" : "No image yet"}
                </div>
              )}
              {failed && picked ? (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/80 text-center text-[11px] text-muted-foreground">
                  Preview unavailable — the file will still upload
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="file"
                  accept={accept}
                  aria-label={`Choose ${labels.title.toLowerCase()}`}
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.target.value = "";
                    if (file) void chooseFile(file);
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="rounded-xl"
                  disabled={busy}
                  onClick={() => inputRef.current?.click()}
                >
                  <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                  {picked ? "Choose another" : "Choose image"}
                </Button>
                {hasImage ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="rounded-xl text-destructive hover:bg-destructive/10"
                    disabled={busy}
                    onClick={() => setConfirmRemove(true)}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Remove
                  </Button>
                ) : null}
              </div>

              {picked?.image ? (
                <div className="flex items-center gap-2">
                  <span className="w-14 shrink-0 text-[11px] text-muted-foreground">Zoom</span>
                  <Slider
                    min={1}
                    max={3}
                    step={0.05}
                    value={[zoom]}
                    aria-label="Zoom"
                    onValueChange={([next]) => changeZoom(next ?? 1)}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    aria-label="Reset position"
                    title="Reset position"
                    disabled={busy}
                    onClick={() => {
                      setZoom(1);
                      setOffset({ x: 0, y: 0 });
                    }}
                    className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              ) : null}
            </div>

            {message ? (
              <p role="status" className="rounded-lg bg-muted px-2.5 py-1.5 text-[11px] text-muted-foreground">
                {message}
              </p>
            ) : null}

            <div className="flex justify-end gap-2">
              <Button type="button" size="sm" variant="outline" className="rounded-xl" disabled={busy} onClick={close}>
                Cancel
              </Button>
              <Button type="button" size="sm" className="rounded-xl" disabled={busy || !picked} onClick={() => void upload()}>
                {busy ? "Uploading…" : "Upload"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
