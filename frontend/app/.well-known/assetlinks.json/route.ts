import assetlinks from "../../../../.well-known/assetlinks.json";

/** Never ISR-cache — Play/Google refetch must see fingerprint updates immediately. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Serve repo-root `assetlinks.json` (canonical source: `/.well-known/` at monorepo root).
 * Static import bundles the JSON into the serverless output so Vercel never 404s when
 * runtime `fs` paths differ from `import.meta.url` / `process.cwd()` (traced copies are
 * not always at the paths we used to probe).
 */
export async function GET() {
  const body = JSON.stringify(assetlinks);
  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "CDN-Cache-Control": "public, max-age=60, must-revalidate",
    },
  });
}