"use client";

import katex from "katex";
import { useEffect, useMemo, useState } from "react";

import type { ComputeBlock, Formula } from "@/lib/content/schema";
import { KATEX_OPTIONS } from "@/lib/content/katex";
import { deriveExpr, evaluate } from "@/lib/content/safe-eval";
import { formatWithUnit } from "@/lib/content/dimensions";

/**
 * Live formula lab (PLANS.md §7.3): renders the formula with the current inputs
 * substituted, lets the reader slide/type inputs, and shows the evaluated result
 * with its unit. Nothing here executes content text — `safe-eval` builds the
 * expression from whitelisted symbols and a locked AST walk.
 */
const tex = (latex: string, display = false) =>
  katex.renderToString(latex, { ...KATEX_OPTIONS, displayMode: display, throwOnError: false });

const formatNumber = (n: number) =>
  Math.abs(n) >= 1e4 || (Math.abs(n) < 1e-3 && n !== 0) ? n.toExponential(2) : String(Number(n.toPrecision(4)));

export function FormulaLab({ block, formulaSpec }: { block: ComputeBlock; formulaSpec: Formula }) {
  const expr = useMemo(() => deriveExpr(formulaSpec), [formulaSpec]);

  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const i of block.inputs) init[i.var] = i.value ?? formulaSpec.vars[i.var]?.default ?? 1;
    return init;
  });
  const [result, setResult] = useState<{ text: string; bad?: boolean }>({ text: "—" });

  const substituted = useMemo(() => {
    let s = formulaSpec.latex;
    for (const [name, value] of Object.entries(inputs)) {
      s = s.replace(new RegExp(`(?<![A-Za-z0-9_])${name}(?![A-Za-z0-9_])`, "g"), `(${formatNumber(value)})`);
    }
    return s;
  }, [formulaSpec.latex, inputs]);

  useEffect(() => {
    if (!expr) {
      setResult({ text: "—", bad: true });
      return;
    }
    let cancelled = false;
    const values: Record<string, { value: number; unit?: string }> = {};
    for (const i of block.inputs) values[i.var] = { value: inputs[i.var], unit: i.unit ?? formulaSpec.vars[i.var]?.unit };
    void evaluate({ expr, values, constants: formulaSpec.constants }).then((r) => {
      if (cancelled) return;
      setResult(
        r.ok ? { text: formatWithUnit(r.value, formulaSpec.vars[block.solveFor]?.unit) } : { text: r.reason, bad: true },
      );
    });
    return () => {
      cancelled = true;
    };
  }, [expr, inputs, block, formulaSpec]);

  if (!expr) {
    return (
      <p className="rounded-lg border border-dashed border-slate-600 p-2 text-xs text-slate-400">
        Formula <code>{formulaSpec.id}</code> needs an <code>expr</code> field for live computation.
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3">
      <div dangerouslySetInnerHTML={{ __html: tex(substituted, true) }} />
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {block.inputs.map((i) => (
          <label key={i.var} className="flex items-center gap-2 text-xs text-slate-300">
            <span className="w-10 shrink-0 font-mono">{i.var}</span>
            {i.range ? (
              <input
                type="range"
                min={i.range.min}
                max={i.range.max}
                step={i.range.step}
                value={inputs[i.var]}
                onChange={(e) => setInputs((s) => ({ ...s, [i.var]: Number(e.target.value) }))}
                className="w-full accent-sky-400"
                aria-label={`${i.var} ${formulaSpec.vars[i.var]?.label ?? ""}`}
              />
            ) : (
              <input
                type="number"
                value={inputs[i.var]}
                onChange={(e) => setInputs((s) => ({ ...s, [i.var]: Number(e.target.value) }))}
                className="w-24 rounded-md border border-slate-700 bg-slate-950 px-2 py-1 font-mono"
                aria-label={`${i.var} ${formulaSpec.vars[i.var]?.label ?? ""}`}
              />
            )}
            <span className="tabular-nums text-slate-400">
              {formatNumber(inputs[i.var])} {i.unit ?? ""}
            </span>
          </label>
        ))}
      </div>
      <p className="mt-2 text-sm font-semibold" data-bad={result.bad || undefined}>
        {block.solveFor} = <span className={result.bad ? "text-red-400" : "text-sky-300"}>{result.text}</span>
      </p>
    </div>
  );
}
