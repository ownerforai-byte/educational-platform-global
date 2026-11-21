/** Test tube baby milestones — IVF's landmark dates. Well-detailed. Theme-aware. */
export function TestTubeBabyMilestones({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Test tube baby milestones IVF landmark dates Louise Brown 1978 first test tube baby England Steptoe Edwards Nobel prize 2010 India first IVF baby Kolkata Nepal first IVF progress timeline assisted reproduction history">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">IVF milestones — from impossibility to routine</text>
      {/* timeline */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <line x1="70" y1="120" x2="650" y2="120" className="stroke-current" strokeWidth="3" style={{ color: "rgb(139 92 246 / 0.5)" }} />
      {[
        ["1969", "human egg fertilised in vitro for the first time", 130],
        ["1978", "Louise Brown born — the world's first IVF baby", 290],
        ["1980s–90s", "IVF spreads worldwide; ICSI adds a sperm-injection route", 450],
        ["2010", "Robert Edwards wins the Nobel Prize for IVF", 590],
      ].map(([yr, ev, x], i) => (
        <g key={yr as string}>
          <circle cx={x as number} cy="120" r="7" className="fill-current" style={{ color: "rgb(139 92 246 / 0.8)" }} />
          <text x={x as number} y={i % 2 === 0 ? 100 : 150} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{yr as string}</text>
          <text x={x as number} y={i % 2 === 0 ? 112 : 162} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(0, 30)}</text>
          <text x={x as number} y={i % 2 === 0 ? 122 : 172} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(30, 60)}</text>
        </g>
      ))}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">a technique dismissed as impossible became routine medicine within one generation</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The name misleads: nothing about IVF happens in a test tube — fertilisation happens in a glass dish, hence 'in vitro' (in glass).</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">India's first IVF baby was born in Kolkata in 1978 — months after Louise Brown, from independent work by Mukherjee.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 1978 = Louise Brown = first IVF baby; 2010 = Nobel for Edwards — two dates anchor the story.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Today's additions — ICSI, frozen embryo transfer, genetic screening — all build on the same 1978 foundation.</text>
    </svg>
  );
}
