/** Desert water economy — the xeric survival ledger. Well-detailed. Theme-aware. */
export function DesertWaterEconomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Desert water economy xeric adaptations camel hump fat kangaroo rat metabolic water concentrated urine dry faeces nocturnal behaviour water conservation insects cuticle">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Desert water economy — every drop accounted</text>
      {/* ledger */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE WATER LEDGER</text>
      {[
        ["IN", "metabolic water from fat and food", "rgb(16 185 129)"],
        ["IN", "dew licked from fur at dawn", "rgb(16 185 129)"],
        ["OUT", "breath — countered by nasal", "rgb(244 63 94)"],
        ["", "counter-current heat exchange", ""],
        ["OUT", "urine — concentrated to near-solid", "rgb(244 63 94)"],
        ["OUT", "faeces — dried to pellets", "rgb(244 63 94)"],
      ].map(([dir, detail, rgb], i) => (
        <g key={i}>
          <text x="52" y={96 + i * 20} fontSize="6.6" className="fill-current" style={{ color: rgb }} fontWeight="800">{dir}</text>
          <text x="86" y={96 + i * 20} fontSize="6.6" className="fill-current text-muted-foreground">{detail}</text>
        </g>
      ))}
      <text x="195" y="212" fontSize="6.6" textAnchor="middle" className="fill-current text-amber-600">the kangaroo rat never drinks — its ledger balances on metabolism alone</text>
      {/* behaviour */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BEHAVIOUR AS ADAPTATION</text>
      {[
        "nocturnal life dodges the worst",
        "  heat; days pass in burrows",
        "camel: fat in the hump (not",
        "  water) plus tolerance — its",
        "  temperature and blood chemistry",
        "  simply drift further than ours",
        "insects seal water inside a",
        "  waxy cuticle; some never drink",
        "estivation parallels hibernation",
        "  when dryness, not cold, is the threat",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: desert survival = water in (metabolism, dew) minus water out (breath, urine, faeces) — and behaviour manages both.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The camel's hump stores fat, not water — a common misconception worth correcting.</text>
    </svg>
  );
}
