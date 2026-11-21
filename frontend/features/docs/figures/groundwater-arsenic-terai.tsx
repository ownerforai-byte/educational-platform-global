/** Groundwater arsenic Terai — the hidden poison in wells. Well-detailed. Theme-aware. */
export function GroundwaterArsenicTerai({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Groundwater arsenic Terai tube wells shallow deep contamination arsenicosis skin lesions cancer Bangladesh West Bengal Nepal plains testing red green painted wells safe depth alternatives rainwater harvesting slow sand filtration treatment WHO limit 10 ppb chronic exposure years">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Arsenic in the Terai — the hidden poison in wells</text>
      {/* problem */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW THE POISON ARRIVES</text>
      {[
        "sediments in the Terai plains",
        "  carry natural arsenic; shallow",
        "  tube wells tap contaminated",
        "  aquifers",
        "chronic exposure over years →",
        "  arsenicosis: skin patches,",
        "  hardening, eventually cancers",
        "the cruel irony: tubewells were",
        "  promoted to replace microbe-",
        "  ridden surface water —",
        "  trading cholera for arsenic",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* fix */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE RESPONSE</text>
      {[
        "test every well; paint red",
        "  (unsafe) or green (safe) —",
        "  the colour code saves lives",
        "deep wells (below the",
        "  contaminated layer) often test",
        "  clean",
        "treatment options: sand filters,",
        "  arsenic removal units,",
        "  rainwater harvesting",
        "WHO guideline: 10 µg/L —",
        "  Nepal's interim standard is",
        "  50 µg/L",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: natural (geological) arsenic, chronic skin disease, red/green well marking — three facts, one answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The largest mass poisoning in history unfolded through a development success story — testing made it visible.</text>
    </svg>
  );
}
