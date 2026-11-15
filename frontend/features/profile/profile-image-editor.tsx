"use client";

// TEMPORARY LOCAL STUB — replaced by SUBAGENT 3's real editor if it lands.
import { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { uploadAvatar, uploadCover, type PublicProfile, type StorageInfo } from "@/lib/api/profile";

export function ProfileImageEditButton({
  kind,
  displayName,
  onChanged,
  className,
}: {
  kind: "avatar" | "cover";
  currentUrl: string | null;
  displayName: string;
  hasImage: boolean;
  onChanged: (result: { profile: PublicProfile; storage: StorageInfo | null }) => void;
  className?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const pick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    try {
      const result = kind === "avatar" ? await uploadAvatar(file) : await uploadCover(file);
      onChanged({ profile: result.profile, storage: result.storage });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={className ?? "absolute"}>
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => void pick(e.target.files?.[0])}
      />
      <button
        type="button"
        disabled={busy}
        aria-label={kind === "avatar" ? "Edit profile picture" : "Edit cover image"}
        onClick={() => input.current?.click()}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm transition-colors hover:bg-muted"
      >
        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <span className="sr-only">{displayName}</span>
    </div>
  );
}
