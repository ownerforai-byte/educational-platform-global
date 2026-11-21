/** Soil pollution remediation — cleaning poisoned ground. Well-detailed. Theme-aware. */
export function SoilPollutionRemediation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Soil pollution remediation heavy metals cadmium arsenic pesticides residues bioremediation microbes phytoremediation plants hyperaccumulators crop rotation organic matter compost contaminated soil treatment">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Soil pollution — and how ground gets cleaned</text>
      {/* problem */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW SOIL GETS POISONED</text>
      {[
        "excess fertiliser and pesticide",
        "  residues accumulate season",
        "  after season",
        "industrial heavy metals — lead,",
        "  cadmium, arsenic, chromium",
        "mining spoil and e-waste dumps",
        "sewage sludge on fields",
        "unlike air and water, soil",
        "  damage hides — and lasts",
        "  for decades",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* remediation */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CLEANUP TOOLKIT</text>
      {[
        "bioremediation: microbes digest",
        "  oil and pesticide residues",
        "phytoremediation: plants that",
        "  hyperaccumulate metals are",
        "  grown, then harvested and",
        "  disposed of safely",
        "dilution and capping: clean soil",
        "  over or mixed with contaminated",
        "organic matter and compost bind",
        "  metals, cutting plant uptake",
        "prevention is cheapest: dosed",
        "  inputs, treated effluent only",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: soil pollution sources (agrochemicals, heavy metals, mining) + two biological cleanups (bioremediation, phytoremediation).</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Soil is the slowest pollutant sink to heal — prevention beats every cure listed.</text>
    </svg>
  );
}
