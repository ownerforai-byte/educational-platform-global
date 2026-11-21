/**
 * Bacterial reproduction — binary fission sequence + the three
 * recombination routes (conjugation, transformation, transduction).
 * Theme-aware via currentColor.
 */
export function BinaryFissionRecombination({ className }: { className?: string }) {
  const cell = (cx: number, cy: number, rx: number, ry: number, k: string, split = false) => (
    <g key={k}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} className="fill-current text-teal-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
      {split && <line x1={cx} y1={cy - ry + 4} x2={cx} y2={cy + ry - 4} strokeWidth="2.5" className="stroke-current text-teal-600" />}
      <path d={`M${cx - rx + 6} ${cy} q10 -10 20 0`} fill="none" strokeWidth="2" className="stroke-current text-violet-500" />
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Binary fission sequence from one cell elongating and dividing into two, plus bacterial recombination routes conjugation transformation and transduction">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Reproduction — binary fission, plus gene-swapping</text>

      <text x="16" y="56" fontSize="11.5" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="800">Binary fission (asexual, ~20 min per generation):</text>
      {cell(90, 100, 34, 20, "f1")}
      <text x="90" y="140" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">1 · DNA replicates</text>
      {cell(210, 100, 40, 20, "f2", true)}
      <text x="210" y="140" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">2 · cell elongates, DNA moves apart</text>
      {cell(330, 100, 24, 18, "f3")}{cell(390, 100, 24, 18, "f4")}
      <text x="360" y="140" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">3 · septum forms → two identical cells</text>

      <text x="16" y="180" fontSize="11.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="800">Genetic recombination (no new cells — new gene mixes):</text>
      <g>
        {cell(80, 232, 26, 16, "r1")}{cell(160, 232, 26, 16, "r2")}
        <line x1="106" y1="232" x2="134" y2="232" strokeWidth="3" className="stroke-current text-rose-500" />
        <text x="120" y="264" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">CONJUGATION</text>
        <text x="120" y="278" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">pilus bridge passes plasmid DNA</text>
      </g>
      <g>
        <path d="M280 216 l16 10 l-16 10 Z" className="fill-current text-sky-500" />
        {cell(320, 232, 26, 16, "r3")}
        <text x="310" y="264" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">TRANSFORMATION</text>
        <text x="310" y="278" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">cell takes up free DNA from medium</text>
      </g>
      <g>
        <circle cx="470" cy="222" r="9" className="fill-current text-amber-500/30" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <line x1="479" y1="226" x2="500" y2="234" strokeWidth="2" className="stroke-current text-amber-500" />
        {cell(520, 232, 26, 16, "r4")}
        <text x="510" y="264" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">TRANSDUCTION</text>
        <text x="510" y="278" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">bacteriophage carries host DNA across</text>
      </g>
    </svg>
  );
}
