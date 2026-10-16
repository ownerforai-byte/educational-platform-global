/**
 * Service Worker — Offline-first caching for Ravikisan's Platform.
 *
 * Strategy:
 *   - HTML pages (app routes): network-first (fresh deploy wins), offline fallback
 *   - JS/CSS bundles: cache-first with update
 *   - Fonts/images: cache-first, never update
 *
 * Add route patterns to SW_ROUTES to cache additional pages.
 */

// v5 (2026-09-26): /chat stopped redirecting to /ai and is now the AI
// Tutor's own dedicated page. Old v4 caches still hold the AI Studio render
// under /chat (stale-while-revalidate would flash it once per visit), so
// bump the cache name to force a clean precache of the new surface.
const CACHE_NAME = "neb-vault-v6";
const DATA_CACHE = "neb-data-v6";

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
  "/ai",
  "/offline",
];

/**
 * LOW DATA: is the device on a constrained connection?
 *
 * Save-Data / 2g / slow-2g (reported by the Network Information API, the
 * same hints app/layout.tsx uses to boot lite mode) must not pay for the
 * upfront 16-route precache or for background revalidation of every cached
 * asset — pages and assets cache lazily as they are actually visited.
 */
function networkIsConstrained() {
  try {
    const connection = self.navigator && self.navigator.connection;
    if (!connection) return false;
    return (
      connection.saveData === true ||
      connection.effectiveType === "2g" ||
      connection.effectiveType === "slow-2g"
    );
  } catch {
    return false;
  }
}

/** Install: precache the app shell (skipped entirely under low data). */
self.addEventListener("install", (event) => {
  if (networkIsConstrained()) {
    // Low data: fetching 16 HTML shells up front is exactly the spend the
    // user asked to avoid. Routes fill the cache as they are visited.
    self.skipWaiting();
    return;
  }
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

  // Skip cross-origin requests entirely (Google Fonts CDN, external APIs):
  // cache.put() throws on opaque responses, which would turn every font/CDN
  // fetch into respondWith(undefined) — a guaranteed network error. Letting
  // them pass through unhandled gives the browser default behaviour.
  try {
    if (new URL(request.url).origin !== self.location.origin) return;
  } catch {
    return;
  }

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

  // App pages: HTML navigations are network-first (fresh deploy wins), with an
  // offline fallback. Non-navigation same-origin assets stay stale-while-revalidate.
  event.respondWith(
      request.mode === "navigate"
        ? navigationNetworkFirst(request)
        : staleWhileRevalidate(request, CACHE_NAME, false)
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
  // Network-first means the SERVER's answer wins whenever the network is
  // reachable — including error statuses (404/500/503 cold-start). Falling
  // back to the synthetic "Offline" response must happen only when fetch
  // itself throws, otherwise real server errors get masked as 503 Offline.
  try {
    return await fetch(request);
  } catch {
    const cached = await caches.match(request);
    return cached ?? new Response("Offline", { status: 503, statusText: "Offline" });
  }
}

/**
 * Fetch with a time budget: on constrained networks a page must not wait on
 * a connection that is barely moving. Budget 0 = plain fetch (no timeout).
 */
function fetchWithBudget(request, budgetMs) {
  if (!budgetMs) return fetch(request);
  const inflight = fetch(request);
  // If the budget wins the race, the late reply must not surface as an
  // unhandled rejection in the worker.
  inflight.catch(function () {});
  return Promise.race([
    inflight,
    new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error("network budget exceeded"));
      }, budgetMs);
    }),
  ]);
}

/**
 * Navigation (HTML page) strategy: network-first with cache refresh.
 *  - Always try the network first so the newest Vercel deploy is served.
 *  - On a successful fetch, overwrite the cached copy so the offline
 *    fallback and any cached copy reflect the current build.
 *  - Only when the network fails: serve the cached page; for a top-level
 *    navigation with no cache, fall back to the /offline page.
 *  - LOW DATA: the network race runs on a short budget (3s), so a slow
 *    connection answers from cache instead of hanging the navigation.
 */
async function navigationNetworkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const budgetMs = networkIsConstrained() ? 3000 : 0;
  try {
    const response = await fetchWithBudget(request, budgetMs);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    const offline = await cache.match("/offline");
    if (offline) return offline;
    return new Response("Offline", { status: 503, statusText: "Offline" });
  }
}

async function staleWhileRevalidate(request, cacheName, isNavigation = false) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // LOW DATA: when a cached copy exists, serve it WITHOUT the background
  // re-fetch — revalidating every asset doubles the bytes a Save-Data user
  // pays for. Staleness is bounded by the build's hashed URLs and by the
  // caches cleaned in activate().
  const revalidateInBackground = () => {
    fetch(request)
      .then(async (response) => {
        if (response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      })
      .catch(() => {}); // network failure → keep the cached copy; real server statuses pass through
  };

  if (cached) {
    // LOW DATA: on a constrained connection serve the cached copy WITHOUT
    // the background re-fetch. Staleness is bounded by the build's hashed
    // URLs and by the caches cleaned in activate().
    if (!networkIsConstrained()) revalidateInBackground();
    return cached;
  }

  // Nothing cached: this fetch IS the content — always hit the network.
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
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
