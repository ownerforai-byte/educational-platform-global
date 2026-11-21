/** Carbon cycle human warp — fossil carbon injected fast. Well-detailed. Theme-aware. */
export function CarbonCycleHumanWarp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Carbon cycle human disruption fossil fuel combustion deforestation cement carbon sink sources sinks imbalance CO2 rise climate">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The carbon cycle — and the human warp on it</text>

      {/* natural balance */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NATURAL BALANCE</text>
      <rect x="120" y="86" width="150" height="30" rx="8" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="195" y="106" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">atmospheric CO₂</text>
      <rect x="70" y="180" width="110" height="34" rx="8" className="fill-current text-emerald-600/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="125" y="202" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground">photosynthesis</text>
      <rect x="210" y="180" width="110" height="34" rx="8" className="fill-current text-amber-600/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      <text x="265" y="202" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground">respiration</text>
      <line x1="125" y1="176" x2="170" y2="120" className="stroke-current text-emerald-700" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} markerEnd="url(#arrhl)" />
      <line x1="265" y1="176" x2="220" y2="120" className="stroke-current text-amber-700" strokeWidth="2" style={{ color: "rgb(180 130 40 / 0.9)" }} markerEnd="url(#arrhl)" />
      <text x="195" y="240" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">in ≈ out — CO₂ holds steady for millennia</text>
      <text x="195" y="256" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">oceans and forests act as buffers (sinks)</text>

      {/* human warp */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE HUMAN WARP</text>
      {[
        "fossil fuel combustion injects",
        "  carbon buried for 300 Mya",
        "deforestation removes the sink",
        "  that used to absorb the extra",
        "cement releases CO₂ directly",
        "result: CO₂ climbs, heat is trapped",
      ].map((t, i) => (
        <text key={t} x="406" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="406" y="204" fontSize="7" className="fill-current text-rose-500" fontWeight="700">The cycle is not broken — it is overloaded:</text>
      <text x="406" y="218" fontSize="7" className="fill-current text-rose-500" fontWeight="700">sources now beat sinks year after year.</text>
      <text x="406" y="244" fontSize="7" className="fill-current text-muted-foreground">Exam hook: name two sources and two</text>
      <text x="406" y="258" fontSize="7" className="fill-current text-muted-foreground">sinks, then state the imbalance.</text>
    </svg>
  );
}
