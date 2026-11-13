import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  checksum,
  diffMigrations,
  listMigrationFiles,
} from "../../scripts/migrate-lib.mjs";

describe("migrate-lib", () => {
  let dir: string;

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true });
  });

  it("checksums are stable for identical SQL", () => {
    expect(checksum("select 1")).toBe(checksum("select 1"));
    expect(checksum("select 1")).not.toBe(checksum("select 2"));
  });

  it("lists migrations in filename order and skips non-matching names", () => {
    dir = mkdtempSync(join(tmpdir(), "migrate-"));
    writeFileSync(join(dir, "002_b.sql"), "b");
    writeFileSync(join(dir, "001_a.sql"), "a");
    writeFileSync(join(dir, "readme.md"), "nope");
    writeFileSync(join(dir, "009_gap_note.txt"), "gap");
    expect(listMigrationFiles(dir)).toEqual(["001_a.sql", "002_b.sql"]);
  });

  it("diffMigrations reports pending and changed checksums", () => {
    dir = mkdtempSync(join(tmpdir(), "migrate-"));
    writeFileSync(join(dir, "001_a.sql"), "a");
    writeFileSync(join(dir, "002_b.sql"), "b");
    const files = listMigrationFiles(dir);
    const sumA = checksum("a");
    const { pending, changed } = diffMigrations(dir, files, [
      { filename: "001_a.sql", checksum: sumA },
    ]);
    expect(pending).toEqual(["002_b.sql"]);
    expect(changed).toEqual([]);

    const drifted = diffMigrations(dir, files, [
      { filename: "001_a.sql", checksum: "wrong" },
      { filename: "002_b.sql", checksum: checksum("b") },
    ]);
    expect(drifted.pending).toEqual([]);
    expect(drifted.changed).toEqual(["001_a.sql"]);
  });
});
