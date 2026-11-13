import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Map retired flat `src/api/<name>.ts` shim names to domain controllers
 * after T3 collapsed the double route registry.
 */
const FLAT_TO_DOMAIN: Record<string, string> = {
  "ai.ts": "ai/chat.controller.ts",
  "ai-guest.ts": "ai/guest.controller.ts",
  "ai-enhance.ts": "ai/enhance.controller.ts",
  "ai-history.ts": "ai/history.controller.ts",
  "ai-generate.ts": "ai/generate.controller.ts",
  "ai-evaluate.ts": "ai/evaluate.controller.ts",
  "ai-deep-dive.ts": "ai/deep-dive.controller.ts",
  "ai-math.ts": "ai/math.controller.ts",
  "ai-figure.ts": "ai/figure.controller.ts",
  "ai-image.ts": "ai/image.controller.ts",
  "ai-image-facts.ts": "ai/image-facts.controller.ts",
  "ai-image-history.ts": "ai/image-history.controller.ts",
  "ai-image-search.ts": "ai/image-search.controller.ts",
  "ai-platform-guide.ts": "ai/platform-guide.controller.ts",
  "ai-quiz-history.ts": "ai/quiz-history.controller.ts",
  "ai-stream.ts": "ai/stream.controller.ts",
  "auth.ts": "auth/auth.routes.ts",
  "config.ts": "admin/config.controller.ts",
  "progress.ts": "user/progress.controller.ts",
  "bookmarks.ts": "user/bookmarks.controller.ts",
  "resources.ts": "content/resources.controller.ts",
  "storage.ts": "platform/storage.controller.ts",
  "controller.ts": "admin/controller.controller.ts",
  "biology.ts": "content/biology.controller.ts",
  "user-state.ts": "user/state.controller.ts",
  "support-requests.ts": "platform/support.controller.ts",
  "leaderboard.ts": "social/leaderboard.controller.ts",
};

/**
 * Read API route source for contract pins. Resolves legacy flat shim names
 * to domain controller implementations.
 */
export function readApiSource(relativePath: string): string {
  const trimmed = relativePath
    .replace(/\\/g, "/")
    .replace(/^(\.\.\/)+src\/api\//, "")
    .replace(/^src\/api\//, "");

  const apiRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/api");
  const mapped = FLAT_TO_DOMAIN[trimmed] ?? trimmed;
  const target = path.join(apiRoot, mapped);
  let src = readFileSync(target, "utf8");

  const reExport = src.match(/(?:export \* from|export \{ default \} from) ["']\.\/([^"']+)["']/);
  if (reExport) {
    const impl = path.join(path.dirname(target), reExport[1].replace(/\.js$/, ".ts"));
    if (existsSync(impl)) {
      src = readFileSync(impl, "utf8");
    }
  }

  return src;
}
