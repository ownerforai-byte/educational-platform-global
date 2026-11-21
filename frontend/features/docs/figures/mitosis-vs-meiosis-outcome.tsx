/**
 * Mitosis vs meiosis outcome — one 2n cell → 2 identical 2n cells vs
 * one 2n cell → 4 different n gametes. Theme-aware via currentColor.
 */
export function MitosisVsMeiosisOutcome({ className }: { className?: string }) {
  const chrom = (x: number, y: number, c: string, k: string) => (
    <rect key={k} x={x - 3} y={y - 10} width="6" height="20" rx="3" style={{ color: c }} className="fill-current" />
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Outcome comparison: mitosis produces two identical diploid daughter cells while meiosis produces four genetically different haploid gametes">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The outcomes — mitosis copies, meiosis halves &amp; shuffles</text>

      {/* mitosis branch */}
      <text x="16" y="58" fontSize="12" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">MITOSIS — conservation</text>
      <g>
        <circle cx="90" cy="110" r="30" className="fill-current text-sky-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        {chrom(80, 106, "rgb(249 115 22 / 0.9)", "a1")}{chrom(100, 106, "rgb(16 185 129 / 0.9)", "a2")}
        <text x="90" y="152" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">parent 2n</text>
      </g>
      <line x1="120" y1="110" x2="180" y2="86" strokeWidth="2.5" className="stroke-current text-foreground" />
      <polygon points="172,80 190,84 176,96" className="fill-current text-foreground" />
      <line x1="120" y1="110" x2="180" y2="136" strokeWidth="2.5" className="stroke-current text-foreground" />
      <polygon points="172,130 190,140 174,144" className="fill-current text-foreground" />
      <g>
        <circle cx="230" cy="80" r="24" className="fill-current text-sky-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        {chrom(222, 78, "rgb(249 115 22 / 0.9)", "b1")}{chrom(238, 78, "rgb(16 185 129 / 0.9)", "b2")}
        <circle cx="230" cy="142" r="24" className="fill-current text-sky-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        {chrom(222, 140, "rgb(249 115 22 / 0.9)", "c1")}{chrom(238, 140, "rgb(16 185 129 / 0.9)", "c2")}
        <text x="270" y="84" fontSize="9.5" className="fill-current text-muted-foreground">2 daughters, both 2n,</text>
        <text x="270" y="99" fontSize="9.5" className="fill-current text-muted-foreground">genetically IDENTICAL to parent</text>
        <text x="270" y="146" fontSize="9.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">→ growth, repair, asexual reproduction</text>
      </g>

      {/* meiosis branch */}
      <text x="16" y="192" fontSize="12" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">MEIOSIS — reduction + variation</text>
      <g>
        <circle cx="90" cy="240" r="30" className="fill-current text-rose-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        {chrom(80, 236, "rgb(249 115 22 / 0.9)", "d1")}{chrom(100, 236, "rgb(16 185 129 / 0.9)", "d2")}
        <text x="90" y="282" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">parent 2n</text>
      </g>
      <line x1="120" y1="240" x2="190" y2="216" strokeWidth="2.5" className="stroke-current text-foreground" />
      <polygon points="182,210 200,214 186,226" className="fill-current text-foreground" />
      <line x1="120" y1="240" x2="190" y2="266" strokeWidth="2.5" className="stroke-current text-foreground" />
      <polygon points="182,260 200,270 184,274" className="fill-current text-foreground" />
      <g>
        <circle cx="222" cy="212" r="17" className="fill-current text-rose-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        {chrom(222, 210, "rgb(249 115 22 / 0.9)", "e1")}
        <circle cx="262" cy="212" r="17" className="fill-current text-rose-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        {chrom(262, 210, "rgb(16 185 129 / 0.9)", "e2")}
        <circle cx="222" cy="268" r="17" className="fill-current text-rose-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        {chrom(222, 266, "rgb(14 165 233 / 0.9)", "e3")}
        <circle cx="262" cy="268" r="17" className="fill-current text-rose-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        {chrom(262, 266, "rgb(124 58 237 / 0.9)", "e4")}
        <text x="296" y="216" fontSize="9.5" className="fill-current text-muted-foreground">4 gametes, all n (half),</text>
        <text x="296" y="231" fontSize="9.5" className="fill-current text-muted-foreground">each genetically DIFFERENT</text>
        <text x="296" y="268" fontSize="9.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">→ gamete formation; variation for evolution</text>
      </g>
    </svg>
  );
}
