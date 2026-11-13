/**
 * Pure helpers for migrate.mjs — imported by unit tests without network I/O.
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

export function checksum(sql) {
  return createHash("sha256").update(sql).digest("hex");
}

export function listMigrationFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => /^\d{3}_.+\.sql$/i.test(name))
    .sort((a, b) => a.localeCompare(b, "en"));
}

export function diffMigrations(dir, files, appliedRows) {
  const applied = new Map(
    (appliedRows ?? []).map((row) => [row.filename, row.checksum]),
  );
  const pending = [];
  const changed = [];
  for (const file of files) {
    const sql = readFileSync(resolve(dir, file), "utf8");
    const sum = checksum(sql);
    const prev = applied.get(file);
    if (!prev) pending.push(file);
    else if (prev !== sum) changed.push(file);
  }
  return { pending, changed };
}
