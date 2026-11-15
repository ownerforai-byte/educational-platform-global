import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Repo-root `.well-known/` — the only allowed location for `assetlinks.json`.
 * Do not place copies under `frontend/public/`.
 */
const FRONTEND_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

export const REPO_ROOT_ASSETLINKS_PATH = path.join(
  FRONTEND_ROOT,
  "..",
  ".well-known",
  "assetlinks.json",
);