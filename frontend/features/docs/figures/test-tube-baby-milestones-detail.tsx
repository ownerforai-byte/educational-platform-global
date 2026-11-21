/** Test tube baby milestones — IVF history numbers. Well-detailed. Theme-aware. */
export function TestTubeBabyMilestonesDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Test tube baby milestones IVF history Louise Brown 1978 first birth Steptoe Edwards Nobel 2010 ICSI intracytoplasmic sperm injection success rates per cycle age decline multiple births risk frozen embryo transfer cost cycles millions born worldwide ethics surplus embryos">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">IVF by the numbers — from Louise Brown to millions</text>
      {/* milestones */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <line x1="70" y1="120" x2="650" y2="120" className="stroke-current" strokeWidth="3" style={{ color: "rgb(2 132 199 / 0.5)" }} />
      {[
        ["1978", "Louise Brown — first IVF baby, Oldham, England", 150],
        ["1992", "ICSI: single sperm injected into egg — male infertility solved", 320],
        ["2010", "Robert Edwards wins the Nobel Prize for IVF", 490],
        ["today", "over 10 million IVF babies worldwide", 620],
      ].map(([yr, ev, x], i) => (
        <g key={yr as string}>
          <circle cx={x as number} cy="120" r="7" className="fill-current" style={{ color: "rgb(2 132 199 / 0.8)" }} />
          <text x={x as number} y={i % 2 === 0 ? 100 : 150} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{yr as string}</text>
          <text x={x as number} y={i % 2 === 0 ? 112 : 162} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(0, 30)}</text>
          <text x={x as number} y={i % 2 === 0 ? 122 : 172} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(30, 60)}</text>
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">critics called the first babies 'test-tube experiments' — the critics are now outnumbered by the graduates</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Success rates fall steeply with age: roughly 30%+ per cycle under 35, dropping toward 5–10% past 40 — the biology is unforgiving.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The ethics file: surplus embryos, multiple-birth risk, cost access — IVF raised questions as fast as it raised babies.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 1978, Louise Brown, Edwards' 2010 Nobel — three anchor facts for any IVF history question.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">'Test-tube baby' is a misnomer — fertilisation happens in a dish; the tube is a newspaper myth that stuck.</text>
    </svg>
  );
}
