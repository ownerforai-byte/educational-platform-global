/** Mineral resources extraction — mining's footprint. Well-detailed. Theme-aware. */
export function MineralResourcesExtraction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mineral resources extraction non-renewable ore mining open pit tailings waste rock land damage water pollution recycling steel aluminium reuse finite stock conservation reduce recycle circular economy">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Minerals — finite stock, heavy footprint</text>
      {/* footprint */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT MINING LEAVES BEHIND</text>
      {[
        "ore grades fall as rich veins run",
        "  out — more rock moved per",
        "  tonne of metal",
        "tailings ponds: finely crushed",
        "  waste that can leak metals",
        "open pits scar land permanently;",
        "  underground mines hollow it",
        "smelting emits SO₂ and heavy",
        "  metals",
        "minerals are non-renewable on",
        "  any human timescale — the",
        "  stock only shrinks",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* conservation */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CIRCULAR ANSWER</text>
      {[
        "recycling aluminium takes ~5%",
        "  of the energy of smelting",
        "  new metal from ore",
        "steel is the world's most",
        "  recycled material",
        "design for disassembly keeps",
        "  metals in circulation",
        "reuse beats recycle: a longer",
        "  product life delays mining",
        "reduce beats everything: the",
        "  cleanest tonne is the one",
        "  never mined",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-stone-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: minerals = non-renewable; recycling aluminium ≈ 5% of virgin energy — the classic conservation number.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Reduce → reuse → recycle applies to metals with real force: every loop keeps a mine closed longer.</text>
    </svg>
  );
}
