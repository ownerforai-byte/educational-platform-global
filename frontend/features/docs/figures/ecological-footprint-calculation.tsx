/** Ecological footprint calculation — how many Earths. Well-detailed. Theme-aware. */
export function EcologicalFootprintCalculation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ecological footprint calculation global hectares per person biocapacity overshoot Earth Overshoot Day consumption versus regeneration carbon footprint component food housing transport wealthy nations deficit poor countries surplus comparison 1.7 Earths">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ecological footprint — the Earths-per-person arithmetic</text>
      {/* concept */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TWO SIDES OF THE LEDGER</text>
      {[
        "footprint: biologically",
        "  productive land and sea needed",
        "  to support a lifestyle, in",
        "  global hectares (gha)",
        "biocapacity: what the Earth (or",
        "  a country) can actually",
        "  regenerate",
        "overshoot = footprint >",
        "  biocapacity — drawing down",
        "  natural capital like debt",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* numbers */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE NUMBERS</text>
      {[
        "humanity uses ~1.7 Earths —",
        "  we overshoot around August",
        "  ('Earth Overshoot Day')",
        "rich nations: 5–8+ gha per",
        "  person, far above their share",
        "poor nations: often under 2 gha",
        "  — many below their own",
        "  biocapacity (a 'creditor')",
        "the carbon component is the",
        "  biggest slice of the footprint",
        "exam hook: define footprint,",
        "  biocapacity, overshoot —",
        "  then quote the 1.7 Earths",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: footprint (demand) vs biocapacity (supply) — overshoot is the difference, ~1.7 Earths today.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Ecological debt is like financial debt, but the currency is forests, fish and stable climate.</text>
    </svg>
  );
}
