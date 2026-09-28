export * from "./atoms";
export * from "./concept";
export * from "./mindmap";
export * from "./manifest";

/**
 * Content schema barrel — single import surface for app code.
 *
 * Import as `@/lib/content/schema`. Tools run with `npx tsx` from the repo root
 * should import the concrete file (e.g. `./schema/concept`) to avoid needing
 * the `@/*` path alias outside the frontend workspace — see PLANS.md §3.
 */
