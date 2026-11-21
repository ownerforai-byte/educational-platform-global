/** Organochlorine persistence — DDT's long shadow. Well-detailed. Theme-aware. */
export function OrganochlorinePersistence({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Organochlorine persistence DDT chlorine chemistry stable fat soluble half life years soil residue biomagnification banned Rachel Carson silent spring malaria control legacy">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Organochlorines — chemistry that outlives its use</text>
      {/* molecule persistence */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY DDT LINGERS</text>
      {[
        "chlorine-carbon bonds resist",
        "  bacterial and chemical attack",
        "fat-soluble, not water-soluble —",
        "  it lodges in fatty tissue and",
        "  climbs every food chain",
        "soil half-life: years to decades",
        "found in Antarctic penguins —",
        "  carried by air and ocean",
        "banned for agriculture since the",
        "  1970s–80s; still legal for",
        "  indoor malaria control",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* legacy ledger */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE HONEST LEDGER</text>
      {[
        "saved: millions from malaria —",
        "  DDT worked spectacularly",
        "cost: thinning eagle and falcon",
        "  eggshells (the Silent Spring",
        "  discovery), contaminated",
        "  food chains worldwide",
        "lesson: persistence is a feature",
        "  for the applicator and a bug",
        "  for the biosphere",
        "modern rule: use the least",
        "  persistent agent that works",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: organochlorine = persistent + fat-soluble + biomagnifying — three properties that explain its ban.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Rachel Carson's Silent Spring (1962) launched the environmental movement on this chemistry.</text>
    </svg>
  );
}
