/** Remittance economy Nepal — the lifeline's anatomy. Well-detailed. Theme-aware. */
export function RemittanceEconomyNepal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Remittance economy Nepal anatomy inflows GDP share quarter migrant workers Gulf Malaysia Korea India destinations hawala formal channels banking costs uses household consumption education land house investment productive versus consumption debate dependency risk labour export brain drain skills shortage at home social costs families separated destination exploitation recruitment fees manpower companies reform bilateral agreements social security">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Remittances — Nepal's lifeline, itemised</text>
      {/* flows */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FLOWS</text>
      {[
        "destinations: Gulf states,",
        "  Malaysia, Korea, India (the",
        "  open border's uncounted flow)",
        "scale: remittances fund roughly",
        "  a quarter of GDP — among the",
        "  world's highest shares",
        "formal vs informal: banks and",
        "  money transfer operators vs",
        "  hawala — formal channels are",
        "  safer and cheaper",
        "uses: food, school fees, land,",
        "  brick houses — visible in every",
        "  village skyline",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* debates */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE DEBATES</text>
      {[
        "the dependency worry: an economy",
        "  importing labour-export income",
        "  imports inflation and exports",
        "  its young",
        "the productive-use question: most",
        "  remittances buy consumption,",
        "  not factories — though housing",
        "  and education are investments",
        "  of a kind",
        "the human cost: recruitment fees,",
        "  passport confiscation, heat",
        "  deaths in Gulf summers",
        "exam hook: quote the GDP share,",
        "  name two destinations, one",
        "  benefit, one risk",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: remittances ≈ quarter of GDP; benefit (household welfare) vs risk (dependency, exploitation) — the balanced answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Remittances are development aid that families send to themselves — with none of the strings.</text>
    </svg>
  );
}
