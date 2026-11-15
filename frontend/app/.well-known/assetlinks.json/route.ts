import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Canonical Digital Asset Links file: monorepo root `.well-known/assetlinks.json` (not `public/`). */
const ASSETLINKS_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "..",
  "..",
  ".well-known",
  "assetlinks.json",
);

export const revalidate = 86_400;

export async function GET() {
  const body = await fs.readFile(ASSETLINKS_PATH, "utf8");
  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}