import path from "path";

/**
 * Server configuration — single source of truth.
 *
 * These values used to be inlined (and therefore duplicated) across
 * `src/index.ts` (port, host) and `src/app.ts` (JSON body limit, static public
 * dirs, trust-proxy). Centralising them here means one edit moves the whole
 * server, and no two files can drift apart on a limit.
 */

/** Port the API listens on. Render/platform sets PORT; local dev defaults to 3000. */
export const PORT = Number(process.env.PORT) || 3000;

/** Interface the server binds. 0.0.0.0 so containerised deploys are reachable. */
export const HOST = "0.0.0.0";

/**
 * Express JSON body limit. "15mb": base64 storage uploads (~10MB decoded) must
 * survive the JSON body parser — see app.ts's comment on the same value.
 */
export const JSON_BODY_LIMIT = "15mb";

/**
 * Static asset roots as ABSOLUTE directories, most preferred first. Resolving
 * against `process.cwd()` keeps the same build working from `backend/` (cwd =
 * backend) and from the repo root (cwd = repo), mirroring the old inline
 * `path.join(process.cwd(), "public")` / `"../public"` pair.
 */
export const STATIC_PUBLIC_DIRS: string[] = [
  path.join(process.cwd(), "public"),
  path.join(process.cwd(), "..", "public"),
];

/** Trust the first proxy hop (Render / nginx) so `req.ip` and secure cookies work. */
export const TRUST_PROXY_HOPS = 1;
