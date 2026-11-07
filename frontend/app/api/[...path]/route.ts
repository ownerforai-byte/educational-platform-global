import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://rn01.onrender.com";

/**
 * Hop-by-hop / framing headers must not be replayed: `fetch` already
 * decompressed the body, so forwarding `content-encoding`/`content-length`
 * would make the browser try to gunzip plain JSON (which broke the OAuth CSRF
 * handshake with a silent JSON parse error).
 */
const STRIPPED_RESPONSE_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "content-encoding",
  "content-length",
  "set-cookie",
]);

async function proxyRequest(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  const subPath = resolvedParams.path?.join("/") ?? "";
  const query = request.nextUrl.search;
  const targetUrl = `${BACKEND_URL}/api/${subPath}${query}`;

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    // Forward relevant headers; do not forward host
    if (key !== "host" && key !== "connection") {
      headers.set(key, value);
    }
  });

  const body =
    request.method !== "GET" && request.method !== "HEAD"
      ? await request.text()
      : undefined;

  try {
    const res = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      redirect: "manual",
    });

    const resHeaders = new Headers();
    res.headers.forEach((val, key) => {
      if (!STRIPPED_RESPONSE_HEADERS.has(key.toLowerCase())) {
        resHeaders.set(key, val);
      }
    });

    // `/api/auth/oauth/session` sets the access cookie, the refresh cookie and
    // clears the CSRF cookie — three separate Set-Cookie headers. A plain
    // `headers.set("set-cookie", combined)` merges them into one invalid
    // cookie, which leaves a successful Google sign-in signed out.
    const getSetCookie = (
      res.headers as Headers & { getSetCookie?: () => string[] }
    ).getSetCookie;
    const cookies = typeof getSetCookie === "function"
      ? getSetCookie.call(res.headers)
      : [];
    for (const cookie of cookies) resHeaders.append("set-cookie", cookie);
    if (cookies.length === 0) {
      const single = res.headers.get("set-cookie");
      if (single) resHeaders.append("set-cookie", single);
    }

    const data = await res.arrayBuffer();
    return new NextResponse(data, {
      status: res.status,
      statusText: res.statusText,
      headers: resHeaders,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Backend service unreachable (Render cold-start or offline). Please retry in 10-15s.",
        details: err?.message,
      },
      { status: 503 }
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
