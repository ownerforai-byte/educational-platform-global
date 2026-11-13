import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://rn01.onrender.com";

/**
 * POST /api/content/reveal
 *
 * Thin proxy: forwards the request body and the `cookie` header (so
 * `requireAuth` on the backend can read `sb-access-token`) to the Express
 * backend's `/api/content/reveal` endpoint, then returns the response as-is.
 *
 * No auth logic lives here — all auth/tier/spark checks run on the backend.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const targetUrl = `${BACKEND_URL}/api/content/reveal`;

  const headers = new Headers();
  // Forward the session cookie so the backend requireAuth middleware can
  // validate the Supabase access token.
  const cookie = request.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);
  headers.set("content-type", "application/json");

  let body: string;
  try {
    body = await request.text();
  } catch {
    return NextResponse.json({ error: "Failed to read request body" }, { status: 400 });
  }

  try {
    const res = await fetch(targetUrl, {
      method: "POST",
      headers,
      body,
    });

    const resBody = await res.arrayBuffer();
    const resHeaders = new Headers();
    res.headers.forEach((value, key) => {
      // Skip hop-by-hop headers that should not be forwarded.
      if (key !== "connection" && key !== "transfer-encoding") {
        resHeaders.set(key, value);
      }
    });

    return new NextResponse(resBody, {
      status: res.status,
      statusText: res.statusText,
      headers: resHeaders,
    });
  } catch (err: unknown) {
    const e = err as Error;
    return NextResponse.json(
      {
        error: "Temporarily unavailable. Please try again.",
        details: e?.message,
      },
      { status: 503 },
    );
  }
}
