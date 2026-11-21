/** Migration push pull model — the decision calculus. Well-detailed. Theme-aware. */
export function MigrationPushPullModel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Migration push pull model Ravenstein laws Lee theory push factors poverty conflict disaster land scarcity pull factors jobs wages services intervening obstacles distance cost information networks remittances Nepal labour migration Gulf Malaysia Korea destination remittance economy GDP share brain drain gain circular migration return social costs family separation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Migration — the push-pull calculus</text>
      {/* model */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["PUSH (origin)", "poverty, conflict, disaster, land scarcity, no prospects", 140],
        ["PULL (destination)", "wages, jobs, schools, hospitals, safety", 580],
      ].map(([side, detail, x], i) => (
        <g key={side as string}>
          <rect x={(x as number) - 100} y="70" width="200" height="90" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: i === 0 ? "rgb(217 119 6 / 0.9)" : "rgb(22 163 74 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{side as string}</text>
          <text x={x as number} y="112" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 34)}</text>
          <text x={x as number} y="126" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(34, 68)}</text>
        </g>
      ))}
      {/* obstacles */}
      <rect x="270" y="90" width="180" height="70" rx="10" className="fill-current text-rose-500/15" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="112" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">INTERVENING OBSTACLES</text>
      <text x="360" y="130" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">distance, cost, borders, visas,</text>
      <text x="360" y="144" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">information gaps — and networks</text>
      <text x="360" y="156" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">that lower the barrier</text>
      <path d="M242 120 h26 m-6 -5 l6 5 l-6 5" className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <path d="M452 120 h26 m-6 -5 l6 5 l-6 5" className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">Lee's refinement: migration is never pure push or pull — the obstacles and personal factors decide who actually moves</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Nepal's case: over 2,000 workers leave daily for Gulf and Malaysian jobs; remittances fund a quarter-plus of GDP — the country's largest export is labour.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The costs: family separation, exploitation in destination labour markets, and villages of grandparents and children.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: two push + two pull + one intervening obstacle + the Nepali remittance fact — the complete migration answer.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Migrants are not passive victims of push — most move toward opportunity they calculated, with networks smoothing the way.</text>
    </svg>
  );
}
