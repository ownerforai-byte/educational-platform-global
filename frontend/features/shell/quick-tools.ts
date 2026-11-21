"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Bot, LayoutGrid, type LucideIcon } from "lucide-react";
import { hasLevel } from "@/lib/core/access-level";
import { shouldShowPlatformGuideWidget } from "@/lib/platform-guide-widget";
import type { AiSparkUserLike } from "@/lib/ai/ai-spark-tiers";

/**
 * One launcher, many tools. Add a row here and a panel that calls
 * `useQuickToolOpen(id)` — the button list picks it up.
 */
export type QuickTool = {
  id: string;
  label: string;
  detail: string;
  /** Accessible name of the button that opens the tool. */
  openLabel: string;
  icon: LucideIcon;
  visible: (pathname: string, user: AiSparkUserLike | null | undefined) => boolean;
};

export const QUICK_TOOLS: readonly QuickTool[] = [
  {
    id: "veer-ai",
    label: "Veer AI",
    detail: "A short answer on this page",
    openLabel: "Open Veer AI personal guide",
    icon: Bot,
    visible: shouldShowPlatformGuideWidget,
  },
  {
    id: "veer-workspace",
    label: "Veer workspace",
    detail: "Professor lessons and practice",
    openLabel: "Open Veer Professor",
    icon: LayoutGrid,
    visible: (pathname, user) => {
      if (!hasLevel(user, "plus")) return false;
      if (pathname === "/chat" || pathname.startsWith("/chat/") || pathname.startsWith("/home/")) {
        return false;
      }
      return true;
    },
  },
];

let activeId: string | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function getActiveQuickTool(): string | null {
  return activeId;
}

export function setActiveQuickTool(id: string | null) {
  activeId = id;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Open state for one tool. Opening it closes whichever tool was open before. */
export function useQuickToolOpen(id: string) {
  const open = useSyncExternalStore(
    subscribe,
    () => getActiveQuickTool() === id,
    () => false,
  );
  const setOpen = useCallback(
    (next: boolean | ((value: boolean) => boolean)) => {
      const current = getActiveQuickTool() === id;
      const value = typeof next === "function" ? next(current) : next;
      if (value) setActiveQuickTool(id);
      else if (getActiveQuickTool() === id) setActiveQuickTool(null);
    },
    [id],
  );
  return [open, setOpen] as const;
}
