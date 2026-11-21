/** Biofertilisers and biopesticides — living inputs instead of chemicals. Well-detailed. Theme-aware. */
export function BiofertiliserBiopesticide({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Biofertiliser Rhizobium Azolla blue green algae biopesticide Bacillus thuringiensis living inputs organic farming nitrogen fixation chemical fertiliser alternative">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Living inputs — two green alternatives</text>

      {/* biofertiliser */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BIOFERTILISER — nitrogen on tap</text>
      {/* root with nodules */}
      <path d="M120 100 v120 M120 130 q-24 8 -34 24 M120 150 q24 8 34 24 M120 176 q-20 6 -28 20" className="fill-none stroke-current text-amber-700" strokeWidth="2.6" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      {[[86, 154], [154, 174], [92, 196]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" className="fill-current text-emerald-600/50" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      ))}
      <text x="120" y="244" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">legume roots with Rhizobium nodules</text>
      {[
        "Rhizobium + legume fix N₂",
        "Azolla + Anabaena for paddy",
        "blue-green algae enrich wet fields",
        "cheap, renewable, no runoff",
      ].map((t, i) => (
        <text key={t} x={220 + (i % 2) * 0} y={110 + i * 16} fontSize="7" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : t}</text>
      ))}
      <text x="50" y="264" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">same nitrogen, no factory, no salt build-up</text>

      {/* biopesticide */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-lime-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(132 204 22 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BIOPESTICIDE — targeted kill</text>
      {/* Bt crystal + caterpillar */}
      <polygon points="470,110 494,110 482,132" className="fill-current text-lime-500/50" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(132 204 22 / 0.9)" }} />
      <text x="482" y="150" fontSize="6.6" textAnchor="middle" className="fill-current text-lime-700">Bt toxin crystal</text>
      <path d="M540 108 q14 -4 24 4 q8 8 -4 14 q-14 6 -22 -4 q-6 -8 2 -14" className="fill-current text-stone-500/40" stroke="currentColor" strokeWidth="1.4" />
      <text x="552" y="150" fontSize="6.6" textAnchor="middle" className="fill-current text-stone-500">caterpillar gut — only target</text>
      {[
        "Bacillus thuringiensis spores",
        "toxin activates only in alkaline",
        "  insect guts — humans unaffected",
        "Trichoderma fungus vs plant fungi",
        "ladybird beetles eat aphids",
      ].map((t, i) => (
        <text key={t} x="406" y={178 + i * 14} fontSize="7" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: biofertiliser feeds the plant; biopesticide kills only the pest — both replace chemicals with organisms.</text>
    </svg>
  );
}
