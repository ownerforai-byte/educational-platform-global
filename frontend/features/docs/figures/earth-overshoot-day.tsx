/** Earth Overshoot Day — the date the ledger goes red. Well-detailed. Theme-aware. */
export function EarthOvershootDay({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earth Overshoot Day date calculation biocapacity divided footprint days into year August global footprint network moving earlier since 1970s COVID 19 blip country specific overshoot days USA Qatar Kuwait earliest Indonesia later concept regeneration rate consumption rate analogy bank account deficit calendar graphic">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Earth Overshoot Day — the date the ledger goes red</text>
      {/* concept */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CALCULATION</text>
      {[
        "(Earth's biocapacity ÷ humanity's",
        "  footprint) × 365 = the day our",
        "  demand exceeds the year's",
        "  regeneration",
        "the trend: from late December in",
        "  the early 1970s to late July/",
        "  early August now — the date",
        "  moves earlier as the overdraft",
        "  deepens",
        "COVID-19 pushed it back weeks —",
        "  proof the date moves with",
        "  consumption, not fate",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* country days */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">COUNTRY OVERSHOOT DAYS</text>
      {[
        "Qatar, Kuwait, USA: overshoot in",
        "  the first months of the year",
        "Germany, UK: by early May",
        "Indonesia, Ecuador: later in",
        "  the year — lower footprints",
        "if everyone lived like the",
        "  average Qatari, we'd need",
        "  many Earths; like the average",
        "  Indonesian, less than one",
        "exam hook: the date is a",
        "  communication device —",
        "  memorable, contested, but",
        "  directionally honest",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the formula (biocapacity ÷ footprint × 365) + the trend direction — two marks, one sentence.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">After Overshoot Day, humanity lives on ecological credit — borrowing forests, fisheries and a stable climate.</text>
    </svg>
  );
}
