/** Nuclear energy pros cons — the split atom's ledger. Well-detailed. Theme-aware. */
export function NuclearEnergyProsCons({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Nuclear energy pros cons fission uranium low carbon high density waste problem accidents Chernobyl Fukushima cost overrun public fear baseload power comparison table fossil alternative fusion future promise">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nuclear power — the ledger with no neutral page</text>
      {/* pros */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FOR</text>
      {[
        "energy density: 1 kg of uranium ≈",
        "  tonnes of coal",
        "near-zero CO₂ in operation —",
        "  a climate asset",
        "baseload: runs day and night,",
        "  whatever the weather",
        "small land footprint per TWh",
        "modern designs add passive",
        "  safety (walk-away safe)",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* cons */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">AGAINST</text>
      {[
        "waste stays dangerous for",
        "  millennia; no repository has",
        "  fully opened yet",
        "accidents are rare but vast:",
        "  Chernobyl 1986, Fukushima 2011",
        "weapons linkage shadows every",
        "  programme",
        "capital cost and build time",
        "  overwhelm budgets",
        "uranium mining leaves its own",
        "  tailings problem",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: low-carbon and dense vs waste and accident risk — name one point from each column at minimum.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Fusion remains the clean promise — always decades away, still worth the attempt.</text>
    </svg>
  );
}
