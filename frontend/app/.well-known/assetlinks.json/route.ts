import fs from "node:fs/promises";
import { REPO_ROOT_ASSETLINKS_PATH } from "@/lib/well-known";

export const revalidate = 86_400;

export async function GET() {
  const body = await fs.readFile(REPO_ROOT_ASSETLINKS_PATH, "utf8");
  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}