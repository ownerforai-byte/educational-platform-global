/** Ageing population Japan — the inverted pyramid future. Well-detailed. Theme-aware. */
export function AgeingPopulationJapan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ageing population Japan inverted pyramid future median age highest world dependency ratio pension burden healthcare costs shrinking workforce robots eldercare immigration policy debate fertility low Italy Germany similar South Korea lowest fertility Nepal ageing future projection 2050 elderly share one in three consequences economy care crisis">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ageing societies — Japan's inverted pyramid</text>
      {/* Japan */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">JAPAN'S NUMBERS</text>
      {[
        "median age ~49 — the world's",
        "  oldest major nation",
        "~30% of Japanese are 65+; by",
        "  2050, over one in three",
        "fertility ~1.2–1.3 — far below",
        "  the 2.1 replacement line",
        "consequences: shrinking",
        "  workforce, pension strain,",
        "  'care crisis' — too few hands",
        "  for the elderly",
        "responses: robots in eldercare,",
        "  delayed retirement, cautious",
        "  immigration — all partial",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* relevance */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY NEPAL SHOULD WATCH</text>
      {[
        "Nepal's pyramid is still broad-",
        "  based — but ageing is coming",
        "  faster than institutions adapt",
        "migration compounds it: young",
        "  workers leave, parents age at",
        "  home — remittances replace",
        "  some care, not all",
        "the dependency ratio inverts:",
        "  fewer workers support more",
        "  elders — the fiscal maths",
        "  tightens",
        "exam hook: Japan is the",
        "  demographic future's preview —",
        "  define dependency ratio and",
        "  explain the inversion",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Japan ~30% over 65, fertility ~1.3, inverted pyramid — three facts and the dependency-ratio consequence.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Population decline is a policy problem with no historical precedent — every rich society is improvising.</text>
    </svg>
  );
}
