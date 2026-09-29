import { z } from "zod";
import { FormulaSymbol, MdString, MeasurableUnit, ShortString, Slug } from "./atoms";

/**
 * Structured formulas + declarative blocks (PLANS.md §4.2).
 *
 * This file is the contract behind PLANS.md Phase 4a (live formula computation)
 * and Phase 4b (interactive blocks by reference). Nothing here is executable:
 * a block NAMES a formula or a registered widget; the code that runs lives in
 * the bundle and is whitelisted (`lib/content/safe-eval.ts`,
 * `components/content/blocks/registry.ts`).
 *
 * Content stays JSON. A note opts in by adding `formulaSpecs` / `blocks` —
 * both optional on `ConceptNoteSchema`, so the 600+ existing notes are
 * untouched.
 */

/** A symbol used by a formula: its unit and an optional default for live use. */
export const FormulaVarSchema = z
  .object({
    /**
     * Must be convertible by `dimensions.ts` — `MeasurableUnit` is derived from
     * that table, so a unit can never be schema-legal but silently dimensionless.
     */
    unit: MeasurableUnit.optional(),
    /** Dimension vector over M,L,T,I,Θ,N (see lib/content/dimensions.ts). */
    dim: z
      .tuple([z.number(), z.number(), z.number(), z.number(), z.number(), z.number()])
      .optional(),
    default: z.number().finite().optional(),
    label: ShortString.optional(),
  })
  .strict();

export const FormulaSchema = z
  .object({
    id: Slug,
    latex: MdString,
    /** Optional machine-readable form. Wins over any LaTeX→expression derivation. */
    expr: MdString.optional(),
    /** Symbol to isolate when the block is used for live computation. */
    solve: FormulaSymbol.optional(),
    vars: z.record(FormulaSymbol, FormulaVarSchema).default({}),
    /** Constants the evaluator may use: g, k, e0, N_A … */
    constants: z.record(FormulaSymbol, z.number().finite()).default({}),
    sourceTopicSlug: Slug.optional(),
  })
  .strict();

/** Declarative live-computation block. Contains no executable code. */
export const ComputeBlockSchema = z
  .object({
    kind: z.literal("compute"),
    /** id of a Formula in the SAME note's `formulaSpecs` — a Slug, not a symbol. */
    formula: Slug,
    solveFor: FormulaSymbol,
    inputs: z
      .array(
        z
          .object({
            var: FormulaSymbol,
            value: z.number().finite().optional(),
            unit: MeasurableUnit.optional(),
            range: z
              .object({ min: z.number(), max: z.number(), step: z.number().positive() })
              .refine((r) => (r.max - r.min) / r.step <= 2000, "range too dense")
              .optional(),
          })
          .strict(),
      )
      .min(1)
      .max(8),
    /** Expression text shown substituted, e.g. "C = Q / V". */
    showUnits: z.boolean().default(true),
    checks: z
      .array(
        z
          .object({
            var: FormulaSymbol,
            expect: z.enum(["positive", "nonNegative", "nonZero", "finite"]),
          })
          .strict(),
      )
      .default([]),
  })
  .strict();

/** Declarative widget block: names a component from a fixed registry. */
export const WidgetBlockSchema = z
  .object({
    kind: z.literal("widget"),
    /** Must exist in components/content/blocks/registry.ts. */
    block: Slug,
    props: z
      .record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))
      .default({}),
    caption: MdString.optional(),
  })
  .strict();

export const BlockSchema = z.discriminatedUnion("kind", [ComputeBlockSchema, WidgetBlockSchema]);

export type Block = z.infer<typeof BlockSchema>;
export type Formula = z.infer<typeof FormulaSchema>;
export type FormulaVar = z.infer<typeof FormulaVarSchema>;
export type ComputeBlock = z.infer<typeof ComputeBlockSchema>;
export type WidgetBlock = z.infer<typeof WidgetBlockSchema>;

/** Authoring inputs: the fields with schema defaults are optional at the call site. */
export type ComputeBlockInput = Omit<ComputeBlock, "kind" | "showUnits" | "checks"> &
  Partial<Pick<ComputeBlock, "kind" | "showUnits" | "checks">>;
export type WidgetBlockInput = Omit<WidgetBlock, "kind" | "props"> &
  Partial<Pick<WidgetBlock, "kind" | "props">>;
