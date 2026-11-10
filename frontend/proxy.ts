import { randomBytes } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import { PUBLIC_SUPABASE_URL } from "@/lib/supabase/public-config";
import { isBlockedAutomatedClient } from "../backend/src/utils/botPolicy";

/**
 * Supabase project the frontend talks to. Driven by NEXT_PUBLIC_SUPABASE_URL so
 * a project migration can never strand the CSP allowlist again — the 2026-10
 * project switch left the old host hardcoded here, which made the OAuth
 * settings pre-check fail with a CSP violation ("Failed to fetch" on login).
 * Uses the same shared public config as the browser client, so the CSP and the
 * OAuth host can never drift apart.
 */
export const SUPABASE_ORIGIN = PUBLIC_SUPABASE_URL;

const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 120;
// Only page routes are counted against that cap. One page load also pulls
// the app shell (theme bootstrap, manifest, /sw-precache.json), the service
// worker's ~17 precache routes and a handful of API calls; charging all of
// them to the same bucket spent the whole minute of budget on a single visit
// and then answered real navigations with plain-text "Too many requests" (the
// 2026-11 E2E smoke failures: no login form, no error-page markup). Assets,
// JSON and /api/* have their own layers (CDN caching, the backend's
// express-rate-limit), so the page cap keeps guarding the expensive render
// path without starving it.
// Next prefetches every in-viewport <Link> as a speculative RSC payload — one
// pass over the notes index fired 70+ of them on the production build (dev
// never does, which is why this only ever showed up in CI). Those requests are
// chosen by page markup, not by the student, so they get their own budget:
// sharing the interactive cap made ordinary browsing land on plain-text
// "Too many requests" for pages nobody asked for. Speculative requests are
// capped rather than exempt because a client can forge their shape.
const RATE_LIMIT_MAX_PREFETCH = 600;
const RATE_LIMIT_MAX_KEYS = 10_000;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Accept only plausible client IP strings. `x-forwarded-for` is set by proxies but
// can also be supplied by a client, so we must not trust arbitrary values as keys —
// otherwise an attacker rotating that header could exhaust memory or dodge the limit.
const isPlausibleIp = (v: string): boolean =>
  v.length > 0 &&
  v.length <= 64 &&
  /^[0-9a-fA-F:.]+$/.test(v);

function getClientKey(request: NextRequest) {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp && isPlausibleIp(realIp)) return realIp;

  // Only take the first entry of x-forwarded-for if it looks like a real IP.
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  if (first && isPlausibleIp(first)) return first;

  return "anonymous";
}

function pruneExpired(now: number) {
  if (rateLimitMap.size < RATE_LIMIT_MAX_KEYS / 4) return;
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}

function isRateLimited(key: string, max: number) {
  const now = Date.now();

  // Opportunistically clean expired entries and keep the map bounded.
  pruneExpired(now);
  if (rateLimitMap.size >= RATE_LIMIT_MAX_KEYS && !rateLimitMap.has(key)) {
    rateLimitMap.delete(rateLimitMap.keys().next().value as string);
  }

  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count += 1;
  return entry.count > max;
}

/**
 * Pages Next prerenders at build time (`x-nextjs-prerender: 1`).
 *
 * A per-request nonce can only be stamped into HTML rendered per request, so a
 * prerendered page would ship its inline bootstrap scripts without one — and a
 * nonce-bearing CSP blocks exactly those, leaving the page dead (no hydration,
 * no offline takeover). These routes render a fixed registry entry with no user
 * input, so they get a nonce-free policy that permits their own inline scripts
 * instead of a non-functional nonce.
 */
const PRERENDERED_ERROR_PATHS = new Set([
  "/400",
  "/401",
  "/403",
  "/404",
  "/408",
  "/429",
  "/500",
  "/502",
  "/503",
  "/504",
  "/network",
  "/offline",
]);

function buildContentSecurityPolicy(nonce: string | null) {
  // puter.js (js.puter.com) is the platform's browser-side AI fallback — image
  // drawing since 2026-09-30 and Mind Studio diagram generation. Without these
  // two origins the CDN script itself never loads.
  //
  // With a nonce: inline scripts must carry it (CSP3 ignores 'unsafe-inline'
  // whenever a nonce is present). Without one (prerendered pages, see above):
  // the page's own inline bootstrap is allowed by 'unsafe-inline'.
  const scriptSrc = nonce
    ? `script-src 'self' 'nonce-${nonce}' https://js.puter.com`
    : "script-src 'self' 'unsafe-inline' https://js.puter.com";

  return (
    [
      "default-src 'self'",
      scriptSrc,
      // fonts.googleapis.com: globals.css @imports Google Fonts — blocking it
      // makes the stylesheet load reject with a raw Event, surfacing as the
      // "[object Event]" unhandled rejection in devtools.
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      `connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL || "https://rn01.onrender.com"} ${SUPABASE_ORIGIN} wss: ws: https://api.puter.com https://api-v2.puter.com wss://api.puter.com`,
      // In-app embeds: our own PDFs under /pdfs + /materials, PDF resources on
      // Supabase Storage, Google Drive previews, and the video players.
      "frame-src 'self' " + SUPABASE_ORIGIN + " https://drive.google.com https://docs.google.com https://www.youtube.com https://player.vimeo.com https://webnotee.com",
      // Modern equivalent of the X-Frame-Options above: we may frame ourselves,
      // other sites may not frame us.
      "frame-ancestors 'self'",
      "worker-src 'self' blob:",
    ].join("; ") + ";"
  );
}

function setSecurityHeaders(response: NextResponse, contentSecurityPolicy: string) {
  // SAMEORIGIN, not DENY: the app frames its own documents in-page (PDF Library,
  // PdfViewer, video viewer). DENY blocks *same-origin* framing too, which made
  // every in-app viewer render blank. Cross-site framing stays blocked, so
  // clickjacking protection is unchanged.
  response.headers.set("x-frame-options", "SAMEORIGIN");
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin");
  response.headers.set("content-security-policy", contentSecurityPolicy);
}

function isDocumentRequest(request: NextRequest) {
  const { pathname } = request.nextUrl;
  return (
    (request.method === "GET" || request.method === "HEAD") &&
    !pathname.startsWith("/api/") &&
    !/\.[^/]+$/.test(pathname)
  );
}

function isSpeculativeRequest(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  // Next strips its own `RSC` / `Next-Router-Prefetch` request headers before
  // middleware runs (verified against a production `next start`), so the URL
  // shape is the only reliable signal that a request is a speculative
  // client-side payload rather than a page the student asked for.
  if (searchParams.has("_rsc")) return true;
  if (pathname.startsWith("/_next/data/")) return true;
  if (pathname.endsWith(".rsc") || pathname.includes("/.segments/")) return true;
  // Document-level prefetches do announce themselves, and that header survives.
  const purpose = request.headers.get("sec-purpose") ?? request.headers.get("purpose");
  return purpose === "prefetch";
}

export function proxy(request: NextRequest) {
  if (isBlockedAutomatedClient(request.headers.get("user-agent"))) {
    const denied = NextResponse.json(
      { error: "Automated client access denied" },
      { status: 403 },
    );
    denied.headers.set("cache-control", "private, no-store");
    denied.headers.set("x-robots-tag", "noindex, nofollow, noarchive");
    setSecurityHeaders(denied, "default-src 'none'; frame-ancestors 'none';");
    return denied;
  }

  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next/static/") ||
    pathname === "/_next/image" ||
    pathname.startsWith("/data/") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/icon-") ||
    pathname === "/sw.js" ||
    pathname === "/all_elements.json"
  ) {
    return NextResponse.next();
  }

  const nonce = PRERENDERED_ERROR_PATHS.has(request.nextUrl.pathname)
    ? null
    : randomBytes(16).toString("base64");
  const contentSecurityPolicy = buildContentSecurityPolicy(nonce);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);
  if (nonce) requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  setSecurityHeaders(response, contentSecurityPolicy);

  // AI chat is unlimited by design (2026-09-20): skip the generic per-IP cap
  // for AI routes; abuse limits live upstream at the provider gateway.
  if (request.nextUrl.pathname.startsWith("/api/ai")) {
    return response;
  }

  const key = getClientKey(request);

  if (isSpeculativeRequest(request)) {
    if (isRateLimited(`${key}|prefetch`, RATE_LIMIT_MAX_PREFETCH)) {
      return new NextResponse("Too many requests", { status: 429 });
    }
    return response;
  }

  if (isDocumentRequest(request) && isRateLimited(`${key}|visit`, RATE_LIMIT_MAX)) {
    return new NextResponse("Too many requests", { status: 429 });
  }

  return response;
}

export const config = {
  matcher: "/:path*",
};
