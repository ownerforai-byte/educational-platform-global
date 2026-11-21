/** Carbon footprint reduction actions — the personal ledger. Well-detailed. Theme-aware. */
export function CarbonFootprintReductionActions({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Carbon footprint reduction actions ranked transport flights car electricity heating solar renewable diet meat reduction food waste home insulation efficiency highest impact list lifestyle choices offset quality tonnes CO2 per year individual action">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cutting your carbon footprint — ranked by impact</text>
      {/* ranked actions */}
      <rect x="30" y="44" width="660" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BIGGEST LEVERS FIRST (annual CO₂ per person, typical)</text>
      {[
        ["1", "one fewer long-haul return flight", "~1.5–3 t", 100],
        ["2", "car-free household / shift to transit", "~1–2.5 t", 180],
        ["3", "renewable electricity / solar home", "~1–1.5 t", 260],
        ["4", "plant-rich diet (less beef, lamb)", "~0.5–1 t", 340],
        ["5", "home insulation, efficient heating", "~0.5–1 t", 420],
        ["6", "reduce food waste", "~0.3 t", 500],
      ].map(([rank, action, saving, x], i) => {
        const y = 92 + i * 20;
        return (
          <g key={rank as string}>
            <circle cx="70" cy={y - 3} r="8" className="fill-current text-emerald-500/20" strokeWidth="1.2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
            <text x="70" y={y} fontSize="6.4" textAnchor="middle" className="fill-current text-emerald-700" fontWeight="800">{rank as string}</text>
            <text x="86" y={y} fontSize="6.4" className="fill-current text-foreground">{action as string}</text>
            <text x="660" y={y} fontSize="6" textAnchor="end" className="fill-current text-emerald-600" fontWeight="700">{saving as string}</text>
          </g>
        );
      })}
      <text x="360" y="204" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">transport and home energy dominate — recycling, however virtuous, is a small slice</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Order matters: the top two actions outweigh the bottom four combined — effort should follow impact, not habit.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Offsets are a last resort, not a licence — quality varies; reduction beats purchase.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: rank three actions by impact and justify with approximate CO₂ — the analytical answer, not a slogan list.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Individual action matters most when it changes systems: fewer flights also shrinks airlines.</text>
    </svg>
  );
}
