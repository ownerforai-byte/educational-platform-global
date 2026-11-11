/**
 * Lazy renderer resolution for the 3D activity manifest.
 *
 * The manifest (`lib/lab-manifest.ts`) is data-only so Node scripts, tests and
 * the notes page can read it without loading Three.js. This module is the one
 * place that turns a `renderer` reference into a React component, and every
 * branch is a lazy `import()`: importing a topic's 3D activity only downloads
 * the visual chunk when the learner actually opens it.
 *
 * The `module` switch is exhaustive over `ActivityModulePath`, so adding an
 * activity to the manifest without wiring its chunk is a type error.
 */

import { createElement, type ComponentType, type ReactNode } from "react";

import type { ActivityModulePath, ActivityRendererRef } from "@/lib/lab-manifest";

export type ActivityRenderer = ComponentType<Record<string, never>>;

function asRenderer(component: unknown): ActivityRenderer {
  return component as ActivityRenderer;
}

/** Wrap a ReactNode producer as a component (topic visuals, catalog sheets). */
function nodeRenderer(build: () => ReactNode): ActivityRenderer {
  const Renderer = () => createElement("div", { className: "contents" }, build());
  Renderer.displayName = "ManifestNodeRenderer";
  return asRenderer(Renderer);
}

/**
 * Resolve the renderer for a manifest entry.
 *
 * Each branch is a literal `import()` so the bundler can split it into its own
 * chunk; a variable specifier would defeat code-splitting and drop every visual
 * into the same chunk.
 */
export async function loadActivityRenderer(
  ref: ActivityRendererRef,
): Promise<ActivityRenderer> {
  switch (ref.kind) {
    case "module":
      return loadModuleRenderer(ref.modulePath);

    case "visual": {
      const { getLabVisualNode } = await import("@/lib/lab-visual-loaders");
      return nodeRenderer(() => getLabVisualNode(ref.entry));
    }

    case "registry": {
      const registry = await import("@/lib/lab-registry");
      const lab = registry.getLabById(ref.labId);
      if (!lab) {
        throw new Error(`Manifest renderer: lab "${ref.labId}" is not in LAB_REGISTRY`);
      }
      return asRenderer(lab.component);
    }

    case "catalog": {
      const { LABS } = await import("@/lib/lab-catalog");
      const entry = LABS[ref.entryId];
      if (!entry) {
        throw new Error(`Manifest renderer: catalog entry "${ref.entryId}" is unknown`);
      }
      return catalogSheetRenderer(entry);
    }
  }
}

/** Written practical sheet — the real surface for catalog-only activities. */
function catalogSheetRenderer(entry: {
  title: string;
  tagline?: string;
  purpose?: string;
  concepts?: string[];
  observations?: string[];
  apparatus?: string[];
  procedure?: string[];
  result?: string;
}): ActivityRenderer {
  const list = (items?: string[]) =>
    items?.length ? createElement("ul", { className: "list-disc pl-5" }, items.map((item, index) => createElement("li", { key: index }, item))) : null;

  const Renderer = () =>
    createElement(
      "article",
      { className: "space-y-3 rounded-2xl border border-border/60 bg-card p-5 text-sm" },
      createElement("h2", { className: "text-base font-bold" }, entry.title),
      entry.tagline ? createElement("p", { className: "text-muted-foreground" }, entry.tagline) : null,
      entry.purpose ? createElement("p", null, entry.purpose) : null,
      entry.concepts?.length
        ? createElement("section", null, createElement("h3", { className: "font-semibold" }, "Concepts"), list(entry.concepts))
        : null,
      entry.apparatus?.length
        ? createElement("section", null, createElement("h3", { className: "font-semibold" }, "Apparatus"), list(entry.apparatus))
        : null,
      entry.procedure?.length
        ? createElement("section", null, createElement("h3", { className: "font-semibold" }, "Procedure"), list(entry.procedure))
        : null,
      entry.observations?.length
        ? createElement("section", null, createElement("h3", { className: "font-semibold" }, "Observations"), list(entry.observations))
        : null,
      entry.result ? createElement("p", { className: "font-semibold" }, entry.result) : null,
    );
  Renderer.displayName = `CatalogSheet(${entry.title})`;
  return asRenderer(Renderer);
}

/** Journey-owned visual modules with hand-wired chunks. */
async function loadModuleRenderer(
  modulePath: ActivityModulePath,
): Promise<ActivityRenderer> {
  switch (modulePath) {
    case "@/components/lab/topic-visuals/projectile-motion-3d": {
      const mod = await import("@/components/lab/topic-visuals/projectile-motion-3d");
      return asRenderer(mod.ProjectileMotionVisual);
    }
    case "@/components/lab/topic-visuals/chemical-bond-covalent-3d": {
      const mod = await import(
        "@/components/lab/topic-visuals/chemical-bond-covalent-3d"
      );
      return asRenderer(mod.CovalentBondVisual);
    }
    case "@/components/lab/topic-visuals/cell-biology": {
      const mod = await import("@/components/lab/topic-visuals/cell-biology");
      return asRenderer(mod.CellBiologyVisual);
    }
  }
}
