// @vitest-environment node
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import gatedKinds from "@/lib/content/gated-kinds.json";
import { loadData } from "@/lib/data-loader";
import { getTopicManifest, hasTopicManifestNotes } from "@/lib/topic-content-index";

const PUBLIC_DATA = join(process.cwd(), "public", "data");
const GATED = join(process.cwd(), gatedKinds.gatedDir);

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

describe("gated bodies live outside public/", () => {
  it("the gated root is not under public/", () => {
    expect(gatedKinds.gatedDir).not.toMatch(/public/);
    expect(existsSync(GATED)).toBe(true);
  });

  it("no gated note body or PYQ file remains under public/data", () => {
    const publicNames = new Set(gatedKinds.publicNames);
    const notes = walk(join(PUBLIC_DATA, "syllabus-notes")).filter(
      (p) => !publicNames.has(p.split(/[\\/]/).pop() as string),
    );
    expect(notes).toEqual([]);
    expect(existsSync(join(PUBLIC_DATA, "content", "_index.json"))).toBe(false);
    expect(existsSync(join(PUBLIC_DATA, "content", "manifest.json"))).toBe(false);
  });

  it("public metadata is still served from public/data", () => {
    expect(existsSync(join(PUBLIC_DATA, "syllabus-notes", "physics", "_manifest.json"))).toBe(true);
    expect(existsSync(join(PUBLIC_DATA, "topic-registry.json"))).toBe(true);
  });

  it("server readers resolve bodies from the gated dir", async () => {
    const manifest = await getTopicManifest("physics");
    expect(manifest.length).toBeGreaterThan(0);
    const m = manifest.find((x) => existsSync(join(GATED, "syllabus-notes", "physics", x.unitSlug, x.filename)));
    expect(m).toBeDefined();
    expect(await hasTopicManifestNotes("physics", m!.unitSlug, m!.topicSlug)).toBe(true);

    const note = await loadData<{ notes?: unknown }>(`syllabus-notes/physics/${m!.unitSlug}/${m!.filename}`);
    expect(note).toBeTruthy();
    const idx = await loadData<Record<string, unknown>>("content/_index.json");
    expect(Object.keys(idx).length).toBeGreaterThan(0);
  });
});
