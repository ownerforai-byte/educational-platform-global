/** Renewable energy sources comparison — the five contenders. Well-detailed. Theme-aware. */
export function RenewableSourcesComparison({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Renewable energy sources comparison solar wind hydro biomass geothermal advantages disadvantages intermittency storage capacity factor land use cost trends LCOE levelised Nepal hydro dominance solar potential wind pockets biomass traditional vs modern suitability matrix which source where geography dependent complementarity hybrid systems">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Renewables — five contenders, one table</text>
      {/* comparison table */}
      <rect x="30" y="40" width="660" height="196" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["Source", "Strength", "Weakness", "Nepal fit"],
        ["Solar PV", "cheap, modular, silent", "night + monsoon dips", "excellent"],
        ["Wind", "strong in ridgelines", "intermittent, siting fights", "pockets only"],
        ["Hydro", "storage + firm power", "dry-season dips, silt, GLOF risk", "the backbone"],
        ["Biomass/biogas", "uses waste, rural fit", "needs dung/water, low density", "household star"],
        ["Geothermal", "always-on baseload", "rare geology, drilling cost", "hot springs only"],
      ].map(([src, str, wk, fit], i) => {
        const y = 66 + i * 30;
        return (
          <g key={src as string}>
            <text x="50" y={y} fontSize="6.2" className="fill-current text-foreground" fontWeight={i === 0 ? "800" : "700"}>{src as string}</text>
            <text x="170" y={y} fontSize="5.8" className="fill-current text-muted-foreground">{str as string}</text>
            <text x="370" y={y} fontSize="5.8" className="fill-current text-muted-foreground">{wk as string}</text>
            <text x="580" y={y} fontSize="5.8" className="fill-current text-emerald-600" fontWeight="700">{fit as string}</text>
          </g>
        );
      })}
      {/* facts */}
      <rect x="30" y="244" width="660" height="48" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="262" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The complementarity principle: solar peaks at noon, hydro rules the monsoon, wind fills gaps — portfolios beat single sources.</text>
      <text x="360" y="280" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: compare three sources on strength + weakness + Nepal suitability — the table format scores highest.</text>
    </svg>
  );
}
