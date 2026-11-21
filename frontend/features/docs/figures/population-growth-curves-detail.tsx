/** Population growth curves J and S — two futures of any population. Well-detailed. Theme-aware. */
export function PopulationGrowthCurvesDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Population growth curves detail J shaped exponential versus S shaped logistic carrying capacity K lag log stationary decline phases bacterial growth human population overshoot crash resources limiting factors curve shapes comparison">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two growth curves — J and S, boom and balance</text>
      {/* curves */}
      <rect x="30" y="44" width="660" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {/* J curve */}
      <path d="M90 200 L120 190 Q180 160 230 70" className="fill-none stroke-current" strokeWidth="3.5" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="150" y="60" fontSize="7" className="fill-current text-amber-600" fontWeight="800">J-curve (exponential)</text>
      <text x="150" y="74" fontSize="5.6" className="fill-current text-muted-foreground">boom, then crash when resources fail</text>
      {/* S curve */}
      <path d="M400 200 Q450 195 480 160 Q540 100 590 100 Q620 100 640 102" className="fill-none stroke-current" strokeWidth="3.5" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <line x1="400" y1="102" x2="660" y2="102" className="stroke-current" strokeWidth="1.5" strokeDasharray="6 4" style={{ color: "rgb(244 63 94 / 0.8)" }} />
      <text x="600" y="94" fontSize="6.4" className="fill-current text-rose-600" fontWeight="700">K (carrying capacity)</text>
      <text x="490" y="196" fontSize="7" className="fill-current text-sky-600" fontWeight="800">S-curve (logistic)</text>
      <text x="490" y="210" fontSize="5.6" className="fill-current text-muted-foreground">growth slows as K is approached — stable near the ceiling</text>
      {/* axes */}
      <line x1="90" y1="210" x2="360" y2="210" className="stroke-current" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <line x1="90" y1="210" x2="90" y2="70" className="stroke-current" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <line x1="400" y1="210" x2="660" y2="210" className="stroke-current" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <line x1="400" y1="210" x2="400" y2="70" className="stroke-current" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      {/* facts */}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Bacteria in a fresh broth follow J; lions in a stable reserve follow S — the difference is density-dependent feedback.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: J = exponential, no ceiling, crash follows; S = logistic, levels at carrying capacity K.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The human population has tracked a J for two centuries — the question is which curve we finish on.</text>
    </svg>
  );
}
