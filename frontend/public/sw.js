/**
 * Service Worker — Offline-first caching for Ravikisan's Platform.
 *
 * Strategy:
 *   - HTML pages (app routes): stale-while-revalidate
 *   - JS/CSS bundles: cache-first with update
 *   - Fonts/images: cache-first, never update
 *
 * Add route patterns to SW_ROUTES to cache additional pages.
 */

const CACHE_NAME = "neb-vault-v2";
const DATA_CACHE = "neb-data-v2";

/** Pages to pre-cache on install (core app shell). */
const SW_ROUTES = [
  "/",
  "/home",
  "/subjects",
  "/syllabus",
  "/lab",
  "/quiz",
  "/exam-countdown",
  "/notes",
  "/theorems",
  "/derivations",
  "/knowledge",
  "/progress",
  "/bookmarks",
  "/chat",
  "/offline",
];

/** Install: precache the app shell. */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Cache each route independently — a single 404/redirect must not
      // abort the whole install and leave the app shell uncached.
      Promise.allSettled(SW_ROUTES.map((route) => cache.add(route)))
    )
  );
  self.skipWaiting();
});

/** Activate: clean old caches. */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME && k !== DATA_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/** Fetch: strategy per resource type. */
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // API calls: network-first, fallback to cache
  if (request.url.includes("/api/")) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Data JSON files: cache-first
  if (request.url.includes("/data/")) {
    event.respondWith(cacheFirst(request, DATA_CACHE));
    return;
  }

  // App pages: stale-while-revalidate (with offline fallback for navigations)
  event.respondWith(
    staleWhileRevalidate(request, CACHE_NAME, request.mode === "navigate")
  );
});

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("Offline", { status: 503, statusText: "Offline" });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) return response;
  } catch {
    // fall through to cache
  }
  const cached = await caches.match(request);
  return cached ?? new Response("Offline", { status: 503, statusText: "Offline" });
}

async function staleWhileRevalidate(request, cacheName, isNavigation = false) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(async (response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);

  if (cached) return cached;

  try {
    return await fetchPromise;
  } catch {
    // Network and cache both unavailable:
    // serve the offline fallback page for navigations instead of failing.
    if (isNavigation) {
      const offline = await caches.match("/offline");
      if (offline) return offline;
    }
    return new Response("Offline", { status: 503, statusText: "Offline" });
  }
}
