/** Antimicrobial resistance timeline — the losing race. Well-detailed. Theme-aware. */
export function AntimicrobialResistanceTimeline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Antimicrobial resistance timeline discovery resistance gap penicillin 1928 1940s MRSA 1960s ESBL carbapenem colistin resistance years from introduction to first resistance shrinking pipeline discovery void new antibiotics few economic model broken incentives stewardship w side effects phase out growth promotion surveillance prescribing audit">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The resistance race — a timeline of shrinking margins</text>
      {/* timeline */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <line x1="70" y1="120" x2="650" y2="120" className="stroke-current" strokeWidth="3" style={{ color: "rgb(139 92 246 / 0.5)" }} />
      {[
        ["1928", "penicillin discovered — resistance seen in labs within years", 150],
        ["1940s", "clinical use begins; resistance follows within a decade", 270],
        ["1960s", "MRSA — the hospital superbug arrives", 390],
        ["2000s", "carbapenem resistance — last-line drugs failing", 500],
        ["2015+", "colistin resistance from farms detected; pipeline thin", 620],
      ].map(([yr, ev, x], i) => (
        <g key={yr as string}>
          <circle cx={x as number} cy="120" r="7" className="fill-current" style={{ color: i >= 3 ? "rgb(244 63 94 / 0.8)" : "rgb(139 92 246 / 0.8)" }} />
          <text x={x as number} y={i % 2 === 0 ? 100 : 150} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{yr as string}</text>
          <text x={x as number} y={i % 2 === 0 ? 112 : 162} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(0, 30)}</text>
          <text x={x as number} y={i % 2 === 0 ? 122 : 172} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(30, 60)}</text>
        </g>
      ))}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the gap between a drug's debut and resistance keeps shrinking — and the pipeline of new drugs is nearly dry</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why the pipeline dried: new antibiotics are held in reserve (used rarely) — so they sell less — so companies left the field.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Stewardship is the immediate answer: right drug, right dose, right duration, and no antibiotics for viral colds.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: resistance predates widespread use; every antibiotic class eventually met resistance — evolution is the mechanism.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">AMR could cause more deaths than cancer by mid-century on current trends — the slow pandemic.</text>
    </svg>
  );
}
