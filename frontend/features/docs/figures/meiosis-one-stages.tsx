/**
 * Meiosis I — the reduction division: pairing, crossing over, homologous
 * chromosomes separate, chromosome number halves. Theme-aware.
 */
export function MeiosisIStages({ className }: { className?: string }) {
  // draw one chromosome: two chromatids joined at a centromere
  const chrom = (x: number, y: number, c: string, key: string) => (
    <g key={key} style={{ color: c }}>
      <rect x={x - 4} y={y - 18} width="8" height="16" rx="4" className="fill-current" />
      <rect x={x - 4} y={y + 2} width="8" height="16" rx="4" className="fill-current" />
      <rect x={x - 3.5} y={y - 3} width="7" height="6" rx="2" className="fill-current" />
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Meiosis one stages: homologous chromosomes pair in prophase one with crossing over at chiasmata, align in metaphase one as pairs, and homologs separate in anaphase one halving the chromosome number">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Meiosis I — the reduction division (2n → n)</text>

      {/* Prophase I */}
      <g>
        <text x="30" y="60" fontSize="11" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">Prophase I</text>
        {chrom(80, 92, "rgb(14 165 233 / 0.9)", "a")}
        {chrom(104, 92, "rgb(249 115 22 / 0.9)", "b")}
        <text x="60" y="132" fontSize="9" className="fill-current text-muted-foreground">homologous pairs</text>
        <text x="60" y="146" fontSize="9" className="fill-current text-muted-foreground">synapse (bivalent)</text>
        <text x="60" y="160" fontSize="9" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">crossing over at chiasmata</text>
      </g>

      {/* Metaphase I */}
      <g>
        <text x="230" y="60" fontSize="11" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="800">Metaphase I</text>
        <line x1="300" y1="52" x2="300" y2="170" strokeWidth="2" strokeDasharray="5 3" className="stroke-current text-muted-foreground" />
        {chrom(262, 100, "rgb(14 165 233 / 0.9)", "c")}
        {chrom(338, 100, "rgb(249 115 22 / 0.9)", "d")}
        <text x="230" y="132" fontSize="9" className="fill-current text-muted-foreground">pairs line up DOUBLE file</text>
        <text x="230" y="146" fontSize="9" className="fill-current text-muted-foreground">(unlike mitosis single file)</text>
        <text x="230" y="160" fontSize="9" className="fill-current text-muted-foreground">independent assortment here</text>
      </g>

      {/* Anaphase I */}
      <g>
        <text x="450" y="60" fontSize="11" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">Anaphase I</text>
        {chrom(500, 88, "rgb(14 165 233 / 0.9)", "e")}
        {chrom(500, 140, "rgb(249 115 22 / 0.9)", "f")}
        <text x="450" y="180" fontSize="9" className="fill-current text-muted-foreground">whole chromosomes pulled apart —</text>
        <text x="450" y="194" fontSize="9" className="fill-current text-muted-foreground">centromeres do NOT split</text>
      </g>

      {/* result */}
      <g>
        <text x="30" y="212" fontSize="11" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">Result: two haploid cells (n) — each chromosome still double (2 chromatids)</text>
        <text x="30" y="240" fontSize="10" className="fill-current text-muted-foreground">Telophase I → cytokinesis → Meiosis II then splits the chromatids (like mitosis) → 4 haploid cells total.</text>
        <text x="30" y="262" fontSize="10" className="fill-current text-muted-foreground">Two sources of variation: crossing over (prophase I) + independent assortment (metaphase I).</text>
        <text x="30" y="284" fontSize="10" className="fill-current text-muted-foreground">That is why no two siblings (except identical twins) are genetically identical.</text>
      </g>
    </svg>
  );
}
