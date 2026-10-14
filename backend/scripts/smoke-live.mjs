#!/usr/bin/env node
/**
 * Live smoke test against the deployed backend.
 *
 * Usage:
 *   node scripts/smoke-live.mjs [baseUrl]
 *   npm run smoke -- https://rn01.onrender.com
 *
 * Default base URL comes from SMOKE_BASE_URL or https://rn01.onrender.com.
 * Requires SMOKE_OWNER_EMAIL + SMOKE_OWNER_PASSWORD for the auth round-trip;
 * those checks are skipped when unset (run in read-only mode).
 */
const BASE = process.argv[2] || process.env.SMOKE_BASE_URL || "https://rn01.onrender.com";

let failures = 0;
const step = (name, ok, detail = "") => {
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};

const getSetCookies = (res) => {
  const anyHeaders = res.headers;
  if (typeof anyHeaders.getSetCookie === "function") return anyHeaders.getSetCookie();
  const single = anyHeaders.get("set-cookie");
  return single ? [single] : [];
};
const cookieValue = (cookies, name) => {
  const c = cookies.find((x) => x.startsWith(name + "="));
  return c ? c.split(";")[0].slice(name.length + 1) : null;
};
const j = async (path, opts = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  let body = null;
  try { body = await res.json(); } catch {}
  return { status: res.status, body, res };
};

// ── 0. Deploy-aware wait: confirm we are testing the RIGHT release ──
// Greptile review 2026-09-25: a fixed sleep can run the smoke against the
// PREVIOUS release when Render is slow. Render injects RENDER_GIT_COMMIT, so
// when SMOKE_EXPECTED_COMMIT is set (CI passes GITHUB_SHA) we poll /health
// until the deployed revision matches, then proceed.
const EXPECTED_COMMIT = process.env.SMOKE_EXPECTED_COMMIT || null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
{
  const deadline = Date.now() + (EXPECTED_COMMIT ? 8 * 60_000 : 4 * 60_000);
  let last = null;
  while (Date.now() < deadline) {
    try {
      const h = await j("/health");
      last = h;
      if (h.status === 200 && h.body?.status === "ok") {
        if (!EXPECTED_COMMIT || h.body?.commit === EXPECTED_COMMIT) {
          step(
            "deployed revision confirmed",
            true,
            EXPECTED_COMMIT ? `commit=${String(h.body.commit).slice(0, 8)}` : "no expected commit set"
          );
          break;
        }
      }
    } catch {}
    await sleep(10_000);
  }
  if (!last || last.status !== 200 || (EXPECTED_COMMIT && last.body?.commit !== EXPECTED_COMMIT)) {
    step(
      "deployed revision confirmed",
      false,
      `timeout waiting for ${EXPECTED_COMMIT ? `commit ${EXPECTED_COMMIT.slice(0, 8)}` : "healthy backend"}`
    );
  }
}

// ── 1. Health ──
const health = await j("/health");
step("health endpoint responds", health.status === 200 && health.body?.status === "ok", `status=${health.status}`);

// ── 2. Hardened endpoints reject anonymous callers ──
// 2026-10-01: guest access is MEMBERS-ONLY (GUEST_DAILY_LIMIT = 0) — the
// guest gate answers 402 before any AI call; an empty body must still never
// reach the AI (400 validation or 402 gate, never 2xx).
const anonQuiz = await j("/api/ai/generate-questions", {
  method: "POST",
  body: JSON.stringify({}),
});
step(
  "anonymous /ai/generate-questions is quota-gated (never 2xx)",
  anonQuiz.status >= 400,
  `status=${anonQuiz.status}`,
);

const anonProgress = await j("/api/biology/labs/bio-cell-3d/progress", {
  method: "POST",
  body: JSON.stringify({ labId: "bio-cell-3d", userId: "spoofed", progress: { completed: true } }),
});
step("anonymous biology progress write rejected (401)", anonProgress.status === 401, `status=${anonProgress.status}`);

// ── 3. Auth round-trip: login → refresh rotation → /me → logout ──
const email = process.env.SMOKE_OWNER_EMAIL;
const password = process.env.SMOKE_OWNER_PASSWORD;

const isCI = process.env.CI === "true" || !!process.env.GITHUB_ACTIONS;
if (isCI && !(email && password)) {
  // Greptile review 2026-09-25: silently skipping auth in CI lets the suite
  // report "ALL SMOKE CHECKS PASSED" without testing authentication at all.
  step(
    "CI auth round-trip configured",
    false,
    "set SMOKE_OWNER_EMAIL + SMOKE_OWNER_PASSWORD repo secrets"
  );
} else if (email && password) {
  const login = await j("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const access1 = cookieValue(getSetCookies(login.res), "sb-access-token");
  const refresh1 = cookieValue(getSetCookies(login.res), "sb-refresh-token");
  step("login 200 + access/refresh cookies issued", login.status === 200 && !!access1 && !!refresh1, `status=${login.status}`);

  if (refresh1) {
    const ref = await j("/api/auth/refresh", {
      method: "POST",
      headers: { Cookie: `sb-refresh-token=${refresh1}` },
    });
    step("refresh-cookie rotation returns 200 + new access token", ref.status === 200 && !!ref.body?.accessToken, `status=${ref.status}`);
  }

  if (access1) {
    const me = await j("/api/auth/me", { headers: { Cookie: `sb-access-token=${access1}` } });
    step("/me with fresh session returns 200", me.status === 200 && !!me.body?.user, `status=${me.status}`);

    // AI liveness rides the AUTHED route since 2026-10-01: guests no longer
    // reach the AI at all, so the paid-key check uses the owner session.
    const ai = await j("/api/ai", {
      method: "POST",
      headers: { Cookie: `sb-access-token=${access1}` },
      body: JSON.stringify({ messages: [{ role: "user", content: "Reply with the single word: ready" }] }),
    });
    step(
      "authed AI responds (paid-key liveness)",
      ai.status === 200 && typeof ai.body?.response === "string" && ai.body.response.length > 0,
      `status=${ai.status}`
    );

    const lo = await j("/api/auth/logout", { method: "POST", headers: { Cookie: `sb-access-token=${access1}` } });
    step("logout invalidates session", lo.status === 200, `status=${lo.status}`);
  }
} else {
  console.log("SKIP  auth round-trip (set SMOKE_OWNER_EMAIL / SMOKE_OWNER_PASSWORD to enable)");
}

// ── 4. Public guest-chat access remains closed ──
// The guest route is session- and owner-email-gated (see ai-owner-gate.test.ts).
// Do not send an unauthenticated prompt through this endpoint or assert the
// retired free-trial contract; both repeat calls must be rejected before AI.
const guestUnauthed = await j("/api/ai/guest", {
  method: "POST",
  body: JSON.stringify({ messages: [{ role: "user", content: "Reply with the single word: ready" }] }),
});
const guestRepeat = await j("/api/ai/guest", {
  method: "POST",
  body: JSON.stringify({ messages: [{ role: "user", content: "Reply with the single word: ready" }] }),
});
step(
  "guest chat requires an authenticated owner session",
  guestUnauthed.status === 401 && guestUnauthed.body?.error === "Unauthorized",
  `status=${guestUnauthed.status}`
);
step(
  "repeated anonymous guest chat remains rejected",
  guestRepeat.status === 401 && guestRepeat.body?.error === "Unauthorized",
  `status=${guestRepeat.status}`
);

console.log(failures === 0 ? "\nALL SMOKE CHECKS PASSED" : `\n${failures} SMOKE CHECK(S) FAILED`);
process.exit(failures ? 1 : 0);
