import { type NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 120;
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
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}

function isRateLimited(key: string) {
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
  return entry.count > RATE_LIMIT_MAX;
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });

  if (isRateLimited(getClientKey(request))) {
    return new NextResponse("Too many requests", { status: 429 });
  }

  response.headers.set("x-frame-options", "DENY");
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "content-security-policy",
    // 'unsafe-inline' and 'unsafe-eval' are needed for Next.js dev mode (Turbopack HMR).
    // They are not required in production builds.
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'} https://tsvbksfegvdjwczzfdcx.supabase.co; frame-src 'none';"
  );

  return response;
}
