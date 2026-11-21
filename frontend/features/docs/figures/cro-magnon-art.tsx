/** Cro-Magnon art — modern humans' symbolic mind. Well-detailed. Theme-aware. */
export function CroMagnonArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cro Magnon art cave painting Lascaux symbolic thought modern humans art culture language burial ornaments">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cro-Magnon — the mind that paints</text>
      {/* cave wall with paintings */}
      <rect x="30" y="44" width="330" height="200" rx="12" className="fill-current text-stone-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="195" y="66" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CAVE WALL (Lascaux-style)</text>
      {/* deer */}
      <path d="M80 160 q10 -26 34 -26 q18 0 24 14 l16 -4 l-12 12 q6 12 -6 20 q-24 10 -50 0 q-10 -8 -6 -16" className="fill-none stroke-current" strokeWidth="2.4" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <line x1="88" y1="134" x2="82" y2="122" className="stroke-current" strokeWidth="2" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <line x1="94" y1="132" x2="92" y2="120" className="stroke-current" strokeWidth="2" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {/* hand print */}
      <ellipse cx="240" cy="160" rx="16" ry="20" className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {[[226, 146], [234, 142], [242, 142], [250, 146], [256, 154]].map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2={x} y2={y - 10} className="stroke-current" strokeWidth="2.4" strokeLinecap="round" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      ))}
      <text x="195" y="228" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">pigment on rock, ~17,000 years old — art for its own sake</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="200" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FULLY MODERN TRAITS</text>
      {[
        "brain ~1350–1450 cc, like ours",
        "high forehead, chin, flat face",
        "art, ornaments, cave painting",
        "deliberate burials with grave goods",
        "advanced tools: blades, needles, fish hooks",
        "language — teaching through symbols",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 22} fontSize="7" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Art is the clearest evidence of symbolic thought — planning, meaning and memory beyond immediate survival.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Cro-Magnon = Homo sapiens — modern anatomy plus modern behaviour.</text>
    </svg>
  );
}
