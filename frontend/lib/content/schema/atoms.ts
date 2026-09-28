import { z } from "zod";

/**
 * Schema atoms — leaf types shared by every content schema.
 *
 * Every bound here is measured against the live corpus (see
 * `scripts/enrichment/schema-gap.mjs`), not guessed. The caps exist so a bad
 * paste cannot sink a page: `MdString` bounds a single authored note, `MdList`
 * bounds a whole field's worth of notes.
 *
 * Imports are relative on purpose (`./atoms`, not `@/lib/content/schema/atoms`)
 * so this tree loads under `npx tsx` from the repo root AND from the frontend
 * workspace without path-alias resolution, while app code may still import it
 * as `@/lib/content/schema`.
 */

/** One authored markdown/Math string. */
export const MdString = z.string().trim().min(1).max(20_000);

/** A whole authored field (notes, formulas, keyPoints, …). */
export const MdList = z.array(MdString).max(80);

/** Titles and short descriptive strings. */
export const ShortString = z.string().trim().min(1).max(400);

/** Lowercase url-safe identifier, e.g. `capacitor`, `01-limits-of-function`. */
export const Slug = z
  .string()
  .trim()
  .regex(/^[a-z0-9][a-z0-9._-]*$/, "slug must be lowercase url-safe");

/** `NN-slug.json` naming, per `frontend/agents.md` §4. */
export const ContentFileName = z
  .string()
  .regex(/^\d{2}-[a-z0-9][a-z0-9._-]*\.json$/, "file must be NN-slug.json");

/**
 * Unit symbols the corpus actually uses. Measured, not prescribed: every value
 * below appears in an authored file. A new symbol needs a schema edit, which is
 * the point — unit vocabulary stays explicit.
 */
export const UnitSymbol = z.enum([
  // SI base
  "m", "kg", "s", "A", "K", "mol", "cd",
  // SI decimal multiples / common submultiples
  "cm", "mm", "µm", "nm", "g", "mg", "µg", "t", "h", "min",
  // SI derived (named)
  "N", "J", "W", "C", "V", "F", "Ω", "ohm", "Pa", "Hz", "T", "H", "S", "lm", "lx", "rad", "sr",
  // engineering / chemistry
  "eV", "u", "amu", "Å", "kPa", "atm", "bar", "L", "mL", "mol/L", "M",
  // degree-ish
  "deg", "°",
]);

/** Plain, non-markdown short identifier used for ids and registry keys. */
export const Identifier = z.string().trim().min(1).max(120);

/**
 * An EMBEDDED copy of a note payload, as used by `originalContent`,
 * `enrichedContent`, `nepali` and `grammar`.
 *
 * Measured: all four are objects carrying a `notes: string[]` plus a subset of
 * the note's own authored fields — they are snapshots of the payload before or
 * after a content round-trip, not free text. `.passthrough()` is deliberate:
 * the snapshot's field set varies with which pipeline wrote it, and a schema
 * that over-constrains it rejects 220 valid files.
 */
export const NoteBlockSchema = z
  .object({
    notes: z.array(z.string().max(20_000)).max(100),
  })
  .passthrough();

export type NoteBlock = z.infer<typeof NoteBlockSchema>;

