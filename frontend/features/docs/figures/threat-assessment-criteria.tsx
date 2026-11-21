/** Threat assessment criteria — how IUCN decides. Well-detailed. Theme-aware. */
export function ThreatAssessmentCriteria({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Threat assessment criteria IUCN decision population size mature individuals extent of occurrence area of occupancy decline rate fragmented range probability extinction quantitative thresholds categories assignment process">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">How IUCN decides — the five criteria behind the label</text>
      {/* criteria cards */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["A", "Population decline", "rate of reduction over 10 yrs / 3 generations", 130],
        ["B", "Geographic range", "small extent of occurrence or occupancy + fragmentation", 300],
        ["C", "Small population + decline", "few mature individuals still falling", 470],
        ["D", "Very small population", "extreme: <50 mature individuals (CR)", 620],
      ].map(([k, name, detail, x], i) => (
        <g key={k as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <circle cx={x as number} cy="92" r="10" className="fill-current" style={{ color: "rgb(2 132 199 / 0.8)" }} />
          <text x={x as number} y="96" fontSize="8" textAnchor="middle" className="fill-current text-white" fontWeight="800">{k as string}</text>
          <text x={x as number} y="116" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{name as string}</text>
          <text x={x as number} y="134" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y="146" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
        </g>
      ))}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">criterion E adds quantified extinction probability (PVA) — a species qualifies via ANY single criterion met</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The assessment is rule-based, not vibes: fixed thresholds on decline, range, and population size decide the category.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Data Deficient is not 'safe' — it means we haven't looked hard enough; many DD species are later found threatened.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: criteria A–E — decline, range, small+declining, tiny, quantified risk. Any one can trigger a category.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Assessments are revisited — categories change as data improves or populations move.</text>
    </svg>
  );
}
