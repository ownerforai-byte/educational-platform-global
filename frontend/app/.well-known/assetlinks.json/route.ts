import fs from "node:fs/promises";
import path from "node:path";
import { REPO_ROOT_ASSETLINKS_PATH } from "@/lib/well-known";

/** Never ISR-cache — Play/Google refetch must see fingerprint updates immediately. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Read `assetlinks.json` robustly across deployments. `REPO_ROOT_ASSETLINKS_PATH`
 * resolves via `import.meta.url`, which at Vercel runtime points at the COMPILED
 * module location under `.next/server/**` — not the repo root — so that read
 * misses the file there. `next.config.mjs` `outputFileTracingIncludes` ships the
 * repo-root copy into the function bundle at `/.well-known/assetlinks.json`
 * relative to the function root (`process.cwd()` on Vercel). Try the source-tree
 * path first (tests, local, APK bundling), then the function-root path (Vercel
 * serverless) so `/.well-known/assetlinks.json` always serves 200 JSON.
 */
async function readAssetLinks(): Promise<string> {
  const candidates = [
    REPO_ROOT_ASSETLINKS_PATH,
    path.join(process.cwd(), ".well-known", "assetlinks.json"),
    path.join(process.cwd(), "..", ".well-known", "assetlinks.json"),
  ];
  for (const candidate of candidates) {
    try {
      return await fs.readFile(candidate, "utf8");
    } catch {
      // Try the next candidate.
    }
  }
  throw new Error("assetlinks.json not found in any known location");
}

export async function GET() {
  const body = await readAssetLinks();
  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}