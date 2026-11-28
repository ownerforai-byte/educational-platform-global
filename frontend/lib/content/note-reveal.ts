import { unlockContent, type ContentUnlockTarget } from "@/lib/api/credits";
import type { ContentKind } from "@/lib/content/paths";

const unlockInFlight = new Map<string, Promise<void>>();

function unlockCategory(kind: ContentKind): "theory" | "visuals" {
  return kind === "mindmap" || kind === "rails" || kind === "graph" ? "visuals" : "theory";
}

async function unlockOnce(target: ContentUnlockTarget): Promise<void> {
  const key = [target.kind, target.classSlug, target.subjectSlug, target.unitSlug, target.filename].join("\u0000");
  const existing = unlockInFlight.get(key);
  if (existing) return existing;

  const pending = unlockContent(unlockCategory(target.kind), undefined, target)
    .then(() => undefined)
    .finally(() => {
      unlockInFlight.delete(key);
    });
  unlockInFlight.set(key, pending);
  return pending;
}

async function postReveal(target: ContentUnlockTarget, signal?: AbortSignal): Promise<Response> {
  return fetch("/api/content/reveal", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(target),
    signal,
  });
}

export async function revealTopicNote<T>(
  target: ContentUnlockTarget,
  signal?: AbortSignal,
): Promise<T> {
  let response = await postReveal(target, signal);
  if (response.status === 403) {
    const error = (await response.json().catch(() => ({}))) as { code?: string };
    if (error.code === "NO_SPARK_WINDOW") {
      await unlockOnce(target);
      response = await postReveal(target, signal);
    }
  }

  if (!response.ok) {
    const error = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(error.error ?? `content/reveal returned ${response.status}`);
  }
  return response.json() as Promise<T>;
}
