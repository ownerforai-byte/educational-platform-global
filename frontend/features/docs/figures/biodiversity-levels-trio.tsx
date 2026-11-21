/** Biodiversity levels genes species ecosystem — the three-tier ladder. Well-detailed. Theme-aware. */
export function BiodiversityLevelsTrio({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Biodiversity levels genes species ecosystem three tiers genetic diversity within population species variety ecosystem variety examples rice varieties Nepal example interrelation pyramid levels diversity definition">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Biodiversity's three levels — genes, species, ecosystems</text>
      {/* ladder */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["Genetic", "variety within a population — the raw material of adaptation", 105],
        ["Species", "variety of living kinds — the level most people picture", 155],
        ["Ecosystem", "variety of habitats and their processes — the stage itself", 205],
      ].map(([name, detail, y], i) => (
        <g key={name as string}>
          <rect x="60" y={(y as number) - 22} width="270" height="38" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x="78" y={(y as number) - 6} fontSize="6.8" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x="78" y={(y as number) + 8} fontSize="5.6" className="fill-current text-muted-foreground">{(detail as string).slice(0, 44)}</text>
        </g>
      ))}
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">each level depends on the one below: genes → species → ecosystems</text>
      {/* examples */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ONE NEPALI EXAMPLE EACH</text>
      {[
        "genes: dozens of local rice and",
        "  landrace varieties — each with",
        "  different drought or disease",
        "  tolerance",
        "species: red panda, spiny",
        "  babbler, rhododendron —",
        "  Nepal's ~2% of world flora",
        "ecosystem: Terai grassland,",
        "  mid-hill forest, alpine",
        "  meadow, glacial lake",
        "lose genes and species lose",
        "  options; lose ecosystems and",
        "  species lose addresses",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: define biodiversity at all three levels with one example each — the full-mark structure.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Conservation that saves only species counts misses the genes and the stage they act on.</text>
    </svg>
  );
}
