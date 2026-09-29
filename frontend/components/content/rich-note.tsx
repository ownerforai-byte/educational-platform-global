import { MathMarkdown } from "@/components/content/math-markdown";
import { resolveBlock } from "@/components/content/blocks/registry";
import { FormulaLab } from "@/components/content/formula-lab";
import { BlockSchema, type Block, type ConceptNote, type Formula } from "@/lib/content/schema";

/**
 * Structured block rendering (PLANS.md §8.2) — the default surface for
 * `formulaSpecs` + `blocks`.
 *
 * No HTML parsing of tokens, no eval: each block is typed, and `NoteBlocks`
 * re-validates at the boundary so a hand-edited JSON shipped without the CLI
 * degrades to a visible placeholder instead of crashing the page.
 */

export function RichNote({ note }: { note: ConceptNote }) {
  return (
    <div className="space-y-3">
      {note.notes.map((n, i) => (
        <MathMarkdown key={i} content={n} />
      ))}
      <NoteBlocks blocks={note.blocks} formulaSpecs={note.formulaSpecs} />
    </div>
  );
}

/** Blocks-only view, for pages that render `notes` themselves (topic page). */
export function NoteBlocks({
  blocks,
  formulaSpecs,
}: {
  blocks?: unknown;
  formulaSpecs?: unknown;
}) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;
  const specs = (Array.isArray(formulaSpecs) ? formulaSpecs : []) as Formula[];

  return (
    <div className="space-y-3">
      {blocks.map((raw, i) => {
        const parsed = BlockSchema.safeParse(raw);
        if (!parsed.success) return <BlockInvalid key={i} />;
        const block = parsed.data;
        if (block.kind === "compute") {
          const spec = specs.find((f) => f.id === block.formula);
          if (!spec) return <BlockMissing key={i} name={block.formula} />;
          return <FormulaLab key={i} block={block} formulaSpec={spec} />;
        }
        const Comp = resolveBlock(block.block);
        if (!Comp) return <BlockMissing key={i} name={block.block} />;
        return (
          <figure key={i} className="space-y-1">
            <Comp {...block.props} />
            {block.caption ? (
              <figcaption className="text-xs text-slate-400">
                <MathMarkdown content={block.caption} />
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}

/** One block, used when a caller already parsed it (e.g. tests, previews). */
export function BlockView({ block, formulaSpecs = [] }: { block: Block; formulaSpecs?: Formula[] }) {
  if (block.kind === "compute") {
    const spec = formulaSpecs.find((f) => f.id === block.formula);
    return spec ? <FormulaLab block={block} formulaSpec={spec} /> : <BlockMissing name={block.formula} />;
  }
  const Comp = resolveBlock(block.block);
  if (!Comp) return <BlockMissing name={block.block} />;
  return (
    <figure className="space-y-1">
      <Comp {...block.props} />
      {block.caption ? (
        <figcaption className="text-xs text-slate-400">
          <MathMarkdown content={block.caption} />
        </figcaption>
      ) : null}
    </figure>
  );
}

const BlockMissing = ({ name }: { name: string }) => (
  <p className="rounded-lg border border-dashed border-slate-600 p-2 text-xs text-slate-400">
    Unregistered block: <code>{name}</code>
  </p>
);

const BlockInvalid = () => (
  <p className="rounded-lg border border-dashed border-red-500/60 p-2 text-xs text-red-400">
    Invalid block — failed BlockSchema validation
  </p>
);
