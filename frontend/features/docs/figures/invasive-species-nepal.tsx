/** Invasive species Nepal — the quiet takeover. Well-detailed. Theme-aware. */
export function InvasiveSpeciesNepal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Invasive species Nepal Mikania chromolaena banmara water hyacinth lantana exotic invasive alien pathways horticulture ballast water native competitors ecosystem impact protected areas Chitwan grasslands birds biodiversity threat management manual removal biological control">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Invasive species — the quiet takeover</text>
      {/* pathway */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE INVASION PATHWAY</text>
      {[
        "introduction: gardens, ballast",
        "  water, ornamental trade,",
        "  accidental transport",
        "lag phase: quietly spreading,",
        "  building a seed bank —",
        "  often unnoticed for years",
        "explosion: exponential spread",
        "  once conditions suit —",
        "  control is now expensive",
        "the advantage: no natural",
        "  enemies, so all energy goes",
        "  into growth and seed",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* Nepal's invaders */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NEPAL'S ROGUES' GALLERY</text>
      {[
        "Mikania ('mile-a-minute')",
        "  smothers saplings in Chitwan",
        "Chromolaena (banmara) takes",
        "  over roadsides and forests",
        "water hyacinth chokes lakes —",
        "  Phewa and Koshi Tappu",
        "lantana displaces understorey",
        "  native shrubs",
        "management: manual removal,",
        "  biological control agents,",
        "  prevention at the border",
        "exam hook: prevention is the",
        "  cheapest control — once",
        "  established, rarely cured",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name two Nepali invaders (Mikania, Chromolaena) with one impact each — the standard answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Invasives are second only to habitat loss as a global extinction driver.</text>
    </svg>
  );
}
