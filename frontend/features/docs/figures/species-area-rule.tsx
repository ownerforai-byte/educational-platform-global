/** Species area rule — why big reserves win. Well-detailed. Theme-aware. */
export function SpeciesAreaRule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Species area rule species number rises with area island biogeography reserve design single large versus several small SLOSS corridor edge effect habitat fragmentation 10 percent area doubling">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The species–area rule — why size is protection</text>
      {/* curve */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SPECIES vs AREA (LOG CURVE)</text>
      <line x1="70" y1="200" x2="320" y2="200" className="stroke-current" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <line x1="70" y1="90" x2="70" y2="200" className="stroke-current" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <path d="M70 190 Q150 110 320 92" className="fill-none stroke-current" strokeWidth="3.5" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="330" y="96" fontSize="6" className="fill-current text-sky-600" fontWeight="700">species</text>
      <text x="330" y="204" fontSize="6" className="fill-current text-sky-600" fontWeight="700">area →</text>
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">doubling area adds fewer new species each time — but losing area loses them faster than linearly</text>
      {/* reserve design */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DESIGN RULES FROM ISLAND BIOGEOGRAPHY</text>
      {[
        "bigger reserves hold more species",
        "  (the SLOSS debate: usually",
        "  single-large beats several-small",
        "  when quality is equal)",
        "round beats thin: less edge,",
        "  fewer edge-effect intrusions",
        "clusters connected by corridors",
        "  beat isolated fragments",
        "fragmentation adds edge, cuts",
        "  interior habitat, and blocks",
        "  gene flow",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: species number rises with area on a log curve — the mathematical backbone of reserve sizing.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Habitat loss is the top extinction driver because the curve is steep at small areas.</text>
    </svg>
  );
}
