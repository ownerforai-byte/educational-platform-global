/** Demographic transition model stages — the four-step curve. Well-detailed. Theme-aware. */
export function DemographicTransitionModelStages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Demographic transition model stages four birth rate death rate gap pre industrial expanding late stationary declining stage examples Nepal stage three UK historical explanation why death rate falls first sanitation medicine then birth rate lag education urbanisation women employment criticism assumptions cultural variation stage five debate population pyramid link">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The demographic transition — four stages, one lag</text>
      {/* curve */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {/* birth rate line */}
      <path d="M60 80 L200 80 Q260 82 300 100 Q360 130 420 150 Q480 160 650 162" className="fill-none stroke-current" strokeWidth="2.5" style={{ color: "rgb(2 132 199 / 0.8)" }} />
      {/* death rate line */}
      <path d="M60 80 L180 80 Q220 100 250 130 Q280 155 320 160 L650 160" className="fill-none stroke-current" strokeWidth="2.5" strokeDasharray="6 3" style={{ color: "rgb(244 63 94 / 0.8)" }} />
      <text x="70" y="74" fontSize="6" className="fill-current text-sky-600" fontWeight="800">birth rate</text>
      <text x="70" y="94" fontSize="6" className="fill-current text-rose-600" fontWeight="800">death rate</text>
      {/* stage markers */}
      {[
        ["Stage 1", "high birth, high death — stable", 110],
        ["Stage 2", "death falls first — boom", 270],
        ["Stage 3", "birth falls, gap closes", 430],
        ["Stage 4", "both low — stable again", 590],
      ].map(([label, note, x], i) => (
        <g key={label as string}>
          <line x1={x as number} y1="90" x2={x as number} y2="185" className="stroke-current" strokeWidth="0.8" strokeDasharray="3 3" style={{ color: "rgb(148 163 184 / 0.8)" }} />
          <text x={x as number} y="198" fontSize="5.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{label as string}</text>
          <text x={x as number} y="210" fontSize="5.2" textAnchor="middle" className="fill-current text-muted-foreground">{(note as string).slice(0, 26)}</text>
        </g>
      ))}
      <text x="360" y="196" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">the boom lives in the gap — stage 2's falling deaths with still-high births is where populations explode</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why deaths fall first: sanitation, vaccines and antibiotics arrive before the social changes that lower births — the lag is the model's engine.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal sits in stage 3: fertility near replacement, deaths low, growth sustained by momentum. Some argue a stage 5 (fertility below replacement) — Japan is the exhibit.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: draw both lines, label four stages, explain WHY death falls first — the diagram plus the mechanism is the full answer.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The model is a description, not a law — some countries stall or reverse; history isn't obliged to follow the curve.</text>
    </svg>
  );
}
