/**
 * lib/perf/idle.ts — ADD-ONLY idle-scheduling helpers.
 *
 * Nothing existing changes: this module only *adds* a safe way to move
 * non-critical work (prefetching, dynamic imports) off the critical path.
 * Every helper is SSR-safe and returns a cancellation function.
 */

/** Performs the work now when there is no `window` (SSR/build). */
const hasIdleCallback = (): boolean =>
  typeof window !== "undefined" &&
  typeof (window as unknown as { requestIdleCallback?: unknown }).requestIdleCallback === "function";

/**
 * Runs `task` when the browser is idle, or after `timeoutMs` at the latest.
 * Falls back to a 0 ms `setTimeout` on Safari/older WebKit and on the server.
 * Returns a cancel function that is always safe to call.
 */
export function onIdle(
  task: () => void,
  options: { timeoutMs?: number } = {},
): () => void {
  const timeoutMs = Math.max(0, options.timeoutMs ?? 2000);

  if (typeof window === "undefined") {
    return () => {};
  }

  if (hasIdleCallback()) {
    const handle = (
      window as unknown as {
        requestIdleCallback: (cb: () => void, cfg?: { timeout: number }) => number;
      }
    ).requestIdleCallback(() => task(), { timeout: timeoutMs });
    return () => {
      const cancel = (
        window as unknown as { cancelIdleCallback?: (handle: number) => void }
      ).cancelIdleCallback;
      if (cancel) cancel(handle);
    };
  }

  const timer = window.setTimeout(task, 0);
  return () => window.clearTimeout(timer);
}

/**
 * Resolves a dynamic import at idle time so heavy client modules (3D scenes,
 * renderers) do not compete with the first paint.
 */
export function idleImport<T>(loader: () => Promise<T>, options: { timeoutMs?: number } = {}): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    onIdle(() => {
      loader().then(resolve).catch(reject);
    }, options);
  });
}

/**
 * Adds a low-priority `<link rel="prefetch">` for a same-origin route or JSON
 * asset — the plain HTML mechanism is reused, so it works with the existing
 * Service Worker cache without touching Next.js routing. No-op on the server.
 */
export function idlePrefetchHref(href: string, options: { timeoutMs?: number } = {}): () => void {
  if (typeof document === "undefined") return () => {};

  let link: HTMLLinkElement | null = null;
  const cancel = onIdle(() => {
    try {
      link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "document";
      link.href = href;
      link.dataset.idlePrefetch = "true";
      document.head.appendChild(link);
    } catch {
      // Prefetching is an enhancement — never surface a failure.
    }
  }, options);

  return () => {
    cancel();
    if (link?.parentNode) link.parentNode.removeChild(link);
    link = null;
  };
}

/** Warms an image into the HTTP cache without blocking the main thread. */
export function idlePreloadImage(src: string, options: { timeoutMs?: number } = {}): () => void {
  if (typeof window === "undefined") return () => {};
  const cancel = onIdle(() => {
    try {
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
    } catch {
      // Ignore — preloading is best-effort.
    }
  }, options);
  return cancel;
}
