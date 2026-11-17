"use client";

/**
 * Account-scoped Saved Posts store (synced via `/api/user-state/community-saved`)
 * plus account + route-scoped PostComposer draft recovery.
 *
 * Uses per-post timestamps so unsaving on one device cleanly wins over an
 * older save on another device instead of resurrecting during merge.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { isCurrentScope, key, keyForScope, storageScope } from "@/lib/state/scoped-storage";
import { scheduleNamespacePush, syncJsonNamespace } from "@/lib/state/user-state";

export const COMMUNITY_SAVED_NAMESPACE = "community-saved";
const SAVED_STORAGE_BASE = "neb-community-saved:v1";
const DRAFT_STORAGE_BASE = "neb-community-draft:v1";
const SAVED_EVENT = "neb:community-saved-change";
const MAX_SAVED_ITEMS = 200;

export interface SavedPostEntry {
  saved: boolean;
  updatedAt: string;
}

export interface SavedPostsDocument {
  items: Record<string, SavedPostEntry>;
}

export interface PostComposerDraft {
  title: string;
  body: string;
  category: string;
  savedAt: string;
}

function normalizeSavedDoc(raw: unknown): SavedPostsDocument {
  if (!raw || typeof raw !== "object") return { items: {} };
  const candidate = (raw as { items?: unknown }).items;
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    return { items: {} };
  }
  const entries = Object.entries(candidate as Record<string, unknown>)
    .filter(([postId, val]) => {
      if (!postId || typeof val !== "object" || val === null) return false;
      const entry = val as Partial<SavedPostEntry>;
      return typeof entry.saved === "boolean" && typeof entry.updatedAt === "string";
    })
    .map(([postId, val]) => [postId, val as SavedPostEntry] as const)
    .sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt))
    .slice(0, MAX_SAVED_ITEMS);

  return { items: Object.fromEntries(entries) };
}

export function mergeSavedPostsDocs(
  local: SavedPostsDocument,
  remote: SavedPostsDocument | null,
): SavedPostsDocument {
  const safeLocal = normalizeSavedDoc(local);
  const safeRemote = normalizeSavedDoc(remote);
  const allIds = new Set([...Object.keys(safeLocal.items), ...Object.keys(safeRemote.items)]);
  const merged: Record<string, SavedPostEntry> = {};

  for (const id of allIds) {
    const l = safeLocal.items[id];
    const r = safeRemote.items[id];
    if (l && r) {
      merged[id] = l.updatedAt >= r.updatedAt ? l : r;
    } else if (l) {
      merged[id] = l;
    } else if (r) {
      merged[id] = r;
    }
  }
  return normalizeSavedDoc({ items: merged });
}

export function readSavedPostsDoc(): SavedPostsDocument {
  if (typeof window === "undefined") return { items: {} };
  try {
    const raw = window.localStorage.getItem(key(SAVED_STORAGE_BASE));
    return raw ? normalizeSavedDoc(JSON.parse(raw)) : { items: {} };
  } catch {
    return { items: {} };
  }
}

function writeSavedPostsDocForScope(doc: SavedPostsDocument, scope: string): boolean {
  if (typeof window === "undefined") return false;
  if (!isCurrentScope(scope)) return false;
  try {
    window.localStorage.setItem(
      keyForScope(SAVED_STORAGE_BASE, scope),
      JSON.stringify(normalizeSavedDoc(doc)),
    );
    window.dispatchEvent(new CustomEvent(SAVED_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function savedIdsFromDoc(doc: SavedPostsDocument): string[] {
  return Object.entries(doc.items)
    .filter(([, entry]) => entry.saved)
    .sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt))
    .map(([postId]) => postId);
}

export function readSavedPostIds(): string[] {
  return savedIdsFromDoc(readSavedPostsDoc());
}

export function toggleSavedPost(postId: string, signedIn: boolean): boolean {
  const scope = storageScope();
  const current = readSavedPostsDoc();
  const nextSaved = !current.items[postId]?.saved;
  const nextDoc = normalizeSavedDoc({
    items: {
      ...current.items,
      [postId]: {
        saved: nextSaved,
        updatedAt: new Date().toISOString(),
      },
    },
  });
  writeSavedPostsDocForScope(nextDoc, scope);
  if (signedIn && isCurrentScope(scope)) {
    scheduleNamespacePush(COMMUNITY_SAVED_NAMESPACE, nextDoc);
  }
  return nextSaved;
}

export function useSavedPosts(userId?: string | null) {
  const [doc, setDoc] = useState<SavedPostsDocument>(() => readSavedPostsDoc());

  useEffect(() => {
    setDoc(readSavedPostsDoc());
  }, [userId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const refresh = () => setDoc(readSavedPostsDoc());
    window.addEventListener(SAVED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SAVED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    const scope = storageScope();
    void syncJsonNamespace<SavedPostsDocument>(
      COMMUNITY_SAVED_NAMESPACE,
      readSavedPostsDoc,
      (merged) => {
        writeSavedPostsDocForScope(merged, scope);
      },
      mergeSavedPostsDocs,
    )
      .then((res) => {
        if (!cancelled && res.changed) {
          setDoc(res.value);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const savedIds = useMemo(() => savedIdsFromDoc(doc), [doc]);
  const savedSet = useMemo(() => new Set(savedIds), [savedIds]);

  const isSaved = useCallback((postId: string) => savedSet.has(postId), [savedSet]);

  const toggle = useCallback(
    (postId: string) => {
      const next = toggleSavedPost(postId, Boolean(userId));
      setDoc(readSavedPostsDoc());
      return next;
    },
    [userId],
  );

  return { savedIds, savedSet, savedCount: savedIds.length, isSaved, toggle };
}

/* ── Composer local draft autosave (account + route scoped) ─────────────── */

function draftStorageKey(routeKey: string): string {
  return key(`${DRAFT_STORAGE_BASE}:${routeKey}`);
}

export function readPostDraft(routeKey: string): PostComposerDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(draftStorageKey(routeKey));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PostComposerDraft>;
    if (
      typeof parsed.title !== "string" ||
      typeof parsed.body !== "string" ||
      typeof parsed.category !== "string" ||
      typeof parsed.savedAt !== "string"
    ) {
      return null;
    }
    if (!parsed.title.trim() && !parsed.body.trim()) return null;
    return {
      title: parsed.title,
      body: parsed.body,
      category: parsed.category,
      savedAt: parsed.savedAt,
    };
  } catch {
    return null;
  }
}

export function writePostDraft(
  routeKey: string,
  draft: Pick<PostComposerDraft, "title" | "body" | "category">,
): string | null {
  if (typeof window === "undefined") return null;
  try {
    if (!draft.title.trim() && !draft.body.trim()) {
      window.localStorage.removeItem(draftStorageKey(routeKey));
      return null;
    }
    const savedAt = new Date().toISOString();
    const payload: PostComposerDraft = {
      title: draft.title,
      body: draft.body,
      category: draft.category,
      savedAt,
    };
    window.localStorage.setItem(draftStorageKey(routeKey), JSON.stringify(payload));
    return savedAt;
  } catch {
    return null;
  }
}

export function clearPostDraft(routeKey: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(draftStorageKey(routeKey));
  } catch {
    /* ignore blocked storage */
  }
}
