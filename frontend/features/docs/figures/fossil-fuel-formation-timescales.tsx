/** Fossil fuel formation timescales — buried sunshine. Well-detailed. Theme-aware. */
export function FossilFuelFormationTimescales({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Fossil fuel formation timescales buried sunshine coal swamp plants carboniferous oil marine plankton anoxic basins natural gas burial heat pressure millions years millions years to burn seconds non renewable rate comparison ancient sunlight photosynthesis stored energy density kerogen maturation oil window peak oil concept finite reserves">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fossil fuels — buried sunshine on a slow fuse</text>
      {/* three fuels */}
      <rect x="30" y="40" width="660" height="180" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      {[
        ["Coal", "swamp forests buried in anoxic conditions → peat → lignite → bituminous → anthracite", 130],
        ["Oil", "marine plankton in anoxic basins → kerogen → 'oil window' of heat (~60–120°C)", 300],
        ["Natural gas", "same source rock, deeper heat; also coal seams and shallow biogenic gas", 470],
        ["The timescale", "tens to hundreds of millions of years to form — burned in seconds", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 78} y="70" width="156" height="110" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y="126" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          <text x={x as number} y="140" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(64, 96)}</text>
          <text x={x as number} y="168" fontSize="5.6" textAnchor="middle" className="fill-current text-amber-600" fontWeight="700">{["Carboniferous", "Jurassic", "deeper heat", "10⁸ yr → sec"][i]}</text>
        </g>
      ))}
      <text x="360" y="200" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">every litre of petrol is ancient photosynthesis — energy banked for aeons, withdrawn in a century</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why they're non-renewable: the formation rate is effectively zero on human timescales — we're spending a one-time inheritance.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: coal = land plants; oil and gas = marine plankton; both need anoxic burial (no decay) plus heat and pressure over aeons.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The anoxic detail matters — oxygen lets decomposers eat the carbon; burial without oxygen is what preserves it.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Fossil fuels are stored solar energy with a 300-million-year maturity period — and we've spent half in 200 years.</text>
    </svg>
  );
}
