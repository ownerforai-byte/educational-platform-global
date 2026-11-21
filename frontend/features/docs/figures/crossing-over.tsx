/**
 * Crossing over — two homologous chromosomes exchange segments at a
 * chiasma during prophase I, producing recombinant chromatids.
 * Theme-aware via currentColor.
 */
export function CrossingOver({ className }: { className?: string }) {
  const strand = (x: number, y: number, c: string, key: string, w = 9) => (
    <rect key={key} x={x} y={y} width="220" height={w} rx="4" style={{ color: c }} className="fill-current" />
  );
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Crossing over during prophase one: homologous maternal and paternal chromosomes pair and exchange segments at a chiasma producing two recombinant chromatids with new gene combinations">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Crossing over — shuffling the gene deck (Prophase I)</text>

      {/* before */}
      <text x="16" y="58" fontSize="11" className="fill-current text-foreground" fontWeight="800">Before: two homologous chromosomes (one from father, one from mother)</text>
      {strand(60, 72, "rgb(14 165 233 / 0.85)", "a")}
      {strand(60, 86, "rgb(14 165 233 / 0.85)", "b")}
      <text x="290" y="84" fontSize="9.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">paternal — genes A B C</text>
      {strand(60, 112, "rgb(249 115 22 / 0.85)", "c")}
      {strand(60, 126, "rgb(249 115 22 / 0.85)", "d")}
      <text x="290" y="124" fontSize="9.5" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="700">maternal — genes a b c</text>

      {/* pairing + chiasma */}
      <text x="16" y="168" fontSize="11" className="fill-current text-foreground" fontWeight="800">They pair (synapse) and swap segments at a chiasma:</text>
      {strand(60, 182, "rgb(14 165 233 / 0.85)", "e")}
      {strand(60, 196, "rgb(249 115 22 / 0.85)", "f")}
      <ellipse cx="180" cy="190" rx="10" ry="16" fill="none" strokeWidth="2.5" className="stroke-current text-rose-500" />
      <text x="196" y="194" fontSize="9.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">chiasma — break &amp; rejoin</text>

      {/* after */}
      <text x="16" y="238" fontSize="11" className="fill-current text-foreground" fontWeight="800">After: two chromatids are recombinant — new gene combinations</text>
      {strand(60, 250, "rgb(14 165 233 / 0.85)", "g")}
      <rect x="196" y="250" width="84" height="9" rx="4" style={{ color: "rgb(249 115 22 / 0.85)" }} className="fill-current" />
      <text x="290" y="258" fontSize="9.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">A B c  ← recombinant</text>
      {strand(60, 264, "rgb(249 115 22 / 0.85)", "h")}
      <rect x="196" y="264" width="84" height="9" rx="4" style={{ color: "rgb(14 165 233 / 0.85)" }} className="fill-current" />
      <text x="290" y="272" fontSize="9.5" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="700">a b C  ← recombinant</text>
    </svg>
  );
}
