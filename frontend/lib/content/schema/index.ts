export * from "./atoms";
export * from "./concept";
export * from "./formula";
export * from "./mindmap";
export * from "./manifest";
export * from "./syllabus-ref";

import type { ConceptNote } from "./concept";
import type { ComputeBlock, ComputeBlockInput, Formula, WidgetBlock, WidgetBlockInput } from "./formula";

/**
 * Content schema barrel — single import surface for app code.
 *
 * Import as `@/lib/content/schema`. Tools run with `npx tsx` from the repo root
 * should import the concrete file (e.g. `./schema/concept`) to avoid needing
 * the `@/*` path alias outside the frontend workspace — see PLANS.md §3.
 */

/** Authoring helper: identity, but types the string as authored markdown. */
export const md = (s: string): string => s;

/** Authoring helper: a formula with its defaulted maps filled in. Callers may omit
 *  `vars` and `constants` entirely (per the §6 capacitor sample, which passes no
 *  `constants` key at all). */
export const formula = (
  id: string,
  f: Omit<Formula, "id" | "vars" | "constants"> & Partial<Pick<Formula, "vars" | "constants">>,
): Formula => {
  const { vars = {}, constants = {}, ...rest } = f as { vars?: Formula["vars"]; constants?: Formula["constants"] } & Omit<Formula, "id" | "vars" | "constants">;
  return { ...rest, id, vars, constants };
};

/** Typed constructors for the two block kinds, so authoring sites read declaratively.
 *  `kind` always lands FIRST (before caller keys), so helpers accept shorthand
 *  inputs missing `kind` and still produce canonical, schema-valid blocks. */
export const computeBlock = (b: ComputeBlockInput): ComputeBlock =>
  ({ kind: "compute", showUnits: true, checks: [], ...b }) as ComputeBlock;
export const widgetBlock = (b: WidgetBlockInput): WidgetBlock =>
  ({ kind: "widget", props: {}, ...b }) as WidgetBlock;

/** Type-checked note definition. Validation still runs in the CLI, so a bad literal
 *  fails the build instead of shipping. */
export const defineNote = (n: ConceptNote): ConceptNote => n;

