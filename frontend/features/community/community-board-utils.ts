"use client";

import { useCallback, useState } from "react";
import { publicUrl } from "@/lib/site-url";
import { sharePath } from "@/lib/api/community-feed";
import type { SessionUser } from "@/features/auth/types";
import type { FeedComment } from "@/lib/api/community-feed";

export function useCopyLink() {
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

export function optimisticComment(body: string, user: SessionUser): FeedComment {
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