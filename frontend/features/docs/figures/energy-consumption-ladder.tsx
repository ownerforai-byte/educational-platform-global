/** Energy consumption ladder — from fuelwood to grid. Well-detailed. Theme-aware. */
export function EnergyConsumptionLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Energy consumption ladder fuelwood firewood dung biogas hydroelectricity Nepal hydropower potential solar non-renewable fossil fuel renewable transition indoor smoke clean cooking energy sources share">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Energy — Nepal's ladder from fuelwood to hydro</text>
      {/* ladder */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TRADITIONAL LADDER</text>
      {[
        ["Fuelwood", "still the rural default; smoke, deforestation"],
        ["Dung + agri-residue", "burns soil nutrients indoors"],
        ["Kerosene + LPG", "imported, costly, but cleaner burning"],
        ["Biogas", "dung + toilet waste → cooking gas + slurry"],
        ["Electricity", "cleanest at the stove; Nepal's hydro surplus"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="46" y={92 + i * 26} fontSize="6.6" className="fill-current text-amber-600" fontWeight="700">{k}</text>
          <text x="130" y={92 + i * 26} fontSize="6" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      {/* hydro facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NEPAL'S HYDRO CARD</text>
      {[
        "rivers drop thousands of metres",
        "  — theoretical capacity is vast",
        "only a fraction is tapped; dry-",
        "  season flow is the constraint",
        "hydro is renewable but not",
        "  impact-free: valleys, fish and",
        "  sediment pay a price",
        "solar is leapfrogging into homes",
        "  the grid hasn't reached",
        "the clean-cooking shift (biogas,",
        "  induction, LPG) saves forests",
        "  and lungs at once",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: renewable vs non-renewable — fuelwood is renewable only if harvest ≤ regrowth; coal and petrol are not.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Climbing the energy ladder is a health, forest and climate policy in one.</text>
    </svg>
  );
}
