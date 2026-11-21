/** Biogas plant Nepal numbers — the household energy math. Well-detailed. Theme-aware. */
export function BiogasPlantNepalNumbers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Biogas plant Nepal numbers household dome model cattle dung 6kg 30 litres gas per day cooking hours savings LPG subsidy alternatives fuelwood time saved women drudgery slurry fertiliser installed units hundreds thousands AEPC programme hills terai suitability climate altitude temperature digester">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Biogas by the numbers — Nepal's household success</text>
      {/* the arithmetic */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ONE PLANT'S ARITHMETIC</text>
      {[
        "input: ~30 kg fresh cattle dung",
        "  daily (from 4–6 animals) +",
        "  equal water",
        "output: ~1.5–2 m³ biogas/day —",
        "  roughly 3–4 hours of cooking",
        "  for a family",
        "by-product: nutrient-rich",
        "  slurry — better fertiliser",
        "  than raw dung",
        "payback: subsidy-supported",
        "  plants typically repay",
        "  themselves in 3–6 years",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* impact */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE NATIONAL IMPACT</text>
      {[
        "hundreds of thousands of",
        "  plants installed since the",
        "  1990s — one of the world's",
        "  most successful programmes",
        "each plant spares forests of",
        "  fuelwood pressure and",
        "  removes indoor smoke",
        "the social win: hours saved",
        "  collecting wood — mostly",
        "  women's and children's time",
        "the limits: needs water, warm",
        "  temperatures and cattle —",
        "  high hills struggle",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: ~30 kg dung → ~2 m³ gas → 3–4 h cooking + slurry fertiliser — the full input-output chain in one line.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Biogas is the rare technology that solves waste, fuel, health and fertiliser problems in one digester.</text>
    </svg>
  );
}
