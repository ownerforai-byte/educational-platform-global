/**
 * Typed env contract (T9). Groups the env vars the backend reads at boot /
 * request time. `ai/config.ts` still reads provider keys directly (follow-up).
 */
import { z } from "zod";

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const optionalString = z.preprocess(emptyToUndefined, z.string().optional());
const optionalUrl = z.preprocess(emptyToUndefined, z.string().url().optional());

const truthy = z.preprocess((value) => {
  if (typeof value !== "string") return false;
  const v = value.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}, z.boolean());

export const backendEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  PORT: optionalString,
  RENDER: optionalString,
  RENDER_EXTERNAL_URL: optionalUrl,
  FRONTEND_URL: optionalString,
  PUBLIC_SITE_URL: optionalUrl,
  TRUST_PROXY_HOPS: optionalString,

  SUPABASE_URL: optionalUrl,
  SUPABASE_SERVICE_ROLE_KEY: optionalString,
  SUPABASE_ANON_KEY: optionalString,
  SUPABASE_STORAGE_BUCKET: optionalString,

  R2_ACCOUNT_ID: optionalString,
  R2_BUCKET: optionalString,
  R2_ACCESS_KEY_ID: optionalString,
  R2_SECRET_ACCESS_KEY: optionalString,
  R2_PUBLIC_BASE_URL: optionalUrl,
  STORAGE_UPLOADS_ENABLED: truthy.optional(),

  FIREBASE_PROJECT_ID: optionalString,
  FIREBASE_CLIENT_EMAIL: optionalString,
  FIREBASE_PRIVATE_KEY: optionalString,
  FIREBASE_SERVICE_ACCOUNT_JSON: optionalString,
  FIREBASE_SERVICE_ACCOUNT_PATH: optionalString,
  FIREBASE_STORAGE_BUCKET: optionalString,
  USE_FIREBASE_AUTH: truthy.optional(),

  RATE_LIMIT_MAX_REQUESTS: optionalString,
  RATE_LIMIT_WINDOW_MS: optionalString,
  AUTH_RATE_LIMIT_MAX_REQUESTS: optionalString,
  OAUTH_RATE_LIMIT_MAX_REQUESTS: optionalString,
  PASSWORD_RESET_RATE_LIMIT_MAX_REQUESTS: optionalString,
  PASSWORD_RESET_RATE_LIMIT_WINDOW_MS: optionalString,
  UPSTASH_REDIS_REST_URL: optionalUrl,
  UPSTASH_REDIS_REST_TOKEN: optionalString,

  SENTRY_DSN: optionalString,
  JOURNAL_LOCK_HOURS: optionalString,
  PERIODIC_TABLE_PRO_PASSWORD: optionalString,
  ROUTE_DEBUG: optionalString,
  AGNES_API_KEY: optionalString,
});

export type BackendEnv = z.infer<typeof backendEnvSchema>;

/** Parse `process.env` (or a test double). Soft: unknown keys ignored. */
export function parseBackendEnv(
  raw: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env,
): BackendEnv {
  return backendEnvSchema.parse(raw);
}
