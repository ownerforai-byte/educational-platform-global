/** Fuelwood fodder balance — daily forest withdrawals. Well-detailed. Theme-aware. */
export function FuelwoodFodderBalance({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Fuelwood fodder balance daily forest use rural households cooking heating animal bedding lopping pressure sustainability community forestry regulated harvest">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">What a village takes from its forest daily</text>

      {/* withdrawals */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="230" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE DAILY WITHDRAWALS</text>
      {[
        ["Fuelwood", "cooking and heating — still the", "main energy source for many homes"],
        ["Fodder", "tree leaves lopped for buffalo", "and goats through the dry season"],
        ["Bedding + litter", "leaf litter collected for livestock", "bedding, then returned to fields"],
      ].map(([name, a, b], i) => (
        <g key={name}>
          <rect x="50" y={84 + i * 56} width="360" height="46" rx="8" className="fill-current text-amber-600/15" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(180 130 40 / 0.9)" }} />
          <text x="66" y={102 + i * 56} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{name}</text>
          <text x="66" y={118 + i * 56} fontSize="6.8" className="fill-current text-muted-foreground">{a} {b}</text>
        </g>
      ))}
      <text x="230" y="256" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Lopping the right branches is sustainable; cutting the trunk is not.</text>

      {/* balance card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">KEEPING IT SUSTAINABLE</text>
      {[
        "harvest below regrowth rate",
        "community forestry sets quotas",
        "biogas and improved stoves cut",
        "  fuelwood demand",
        "fodder trees planted on terraces",
        "  (ipil-ipil, bakaino)",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="466" y="204" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">The forest survives only when the</text>
      <text x="466" y="218" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">withdrawal stays under the interest,</text>
      <text x="466" y="232" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">never touching the capital.</text>
      <text x="466" y="256" fontSize="7" className="fill-current text-muted-foreground">Exam hook: name two daily uses</text>
      <text x="466" y="270" fontSize="7" className="fill-current text-muted-foreground">and one sustainability rule.</text>
    </svg>
  );
}
