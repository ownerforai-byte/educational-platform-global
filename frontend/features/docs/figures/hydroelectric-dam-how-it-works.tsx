/** Hydroelectric dam how it works — gravity's turbine. Well-detailed. Theme-aware. */
export function HydroelectricDamHowItWorks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Hydroelectric dam how works penstock turbine generator transformer head height flow rate power equation P rho g Q h efficiency pumped storage two way reservoir run of river differences sedimentation siltation catchment degradation fish passage fish ladder downstream flow resettlement displacement environmental flow e flows Nepal run of river dominant seasonal variation energy accounting">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The hydro dam — gravity's turbine, step by step</text>
      {/* mechanism */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CHAIN</text>
      {[
        "reservoir stores water at height",
        "  — potential energy = ρgQh",
        "  (flow × head)",
        "penstock: the pipe that drops",
        "  water onto the turbine",
        "turbine spins → generator",
        "  converts rotation to",
        "  electricity → transformer",
        "  steps up voltage for the grid",
        "efficiency is high (~90%) —",
        "  water is dense and the",
        "  conversion is mechanical",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* tradeoffs */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TRADE-OFFS</text>
      {[
        "reservoir dams flood valleys and",
        "  displace people (Tehri,",
        "  Three Gorges scale)",
        "fish migration blocked — ladders",
        "  help some species, not all",
        "sediment: Himalayan rivers carry",
        "  huge silt loads that fill",
        "  reservoirs and wear turbines",
        "pumped storage: the same",
        "  machinery runs backwards —",
        "  the grid's biggest 'battery'",
        "Nepal's choice: run-of-river",
        "  projects avoid displacement but",
        "  dry up in winter",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: P = ρgQh (power = density × gravity × flow × head) + ~90% efficiency — the formula most hydro questions want.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A dam is a battery charged by rain — pumped storage just charges it deliberately.</text>
    </svg>
  );
}
