/** Greenhouse gas sources sectors — who emits what. Well-detailed. Theme-aware. */
export function GreenhouseGasSourcesSectors({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Greenhouse gas sources sectors energy electricity heat transport industry agriculture livestock rice methane nitrous oxide fertiliser deforestation land use waste share percentages global emissions CO2 CH4 N2O F-gases contribution by sector comparison bar Nepal negligible share per capita historical responsibility developed developing distinction">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where emissions come from — sectors and gases</text>
      {/* sectors */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GLOBAL GHG SOURCES BY SECTOR (approximate shares)</text>
      {[
        ["Energy (power + heat)", "~35%", 340],
        ["Industry", "~20%", 250],
        ["Agriculture + land use", "~20%", 160],
        ["Transport", "~15%", 100],
        ["Buildings", "~10%", 60],
      ].map(([sector, pct, w], i) => {
        const y = 92 + i * 22;
        return (
          <g key={sector as string}>
            <text x="46" y={y + 4} fontSize="6.2" className="fill-current text-foreground" fontWeight="600">{sector as string}</text>
            <rect x="210" y={y - 4} width={(w as number) * 1.0} height="14" rx="4" className="fill-current" style={{ color: "rgb(16 185 129 / 0.35)" }} stroke="currentColor" strokeWidth="0.8" />
            <text x={220 + (w as number)} y={y + 4} fontSize="6" className="fill-current text-emerald-600" fontWeight="700">{pct as string}</text>
          </g>
        );
      })}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">agriculture's share is mostly methane (livestock, rice) and nitrous oxide (fertiliser) — not CO₂</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The gases: CO₂ dominates by volume; CH₄ and N₂O are trace gases with far higher warming power per molecule.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The equity fact: Nepal emits under 0.1% of global CO₂ — yet faces GLOFs, droughts and floods; historical emitters owe the adaptation bill.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: rank three sectors with shares, and name the gas each is dominated by — energy→CO₂, livestock/rice→CH₄, fertiliser→N₂O.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Mitigation priority follows the bar chart — electricity and transport first, because that is where the mass is.</text>
    </svg>
  );
}
