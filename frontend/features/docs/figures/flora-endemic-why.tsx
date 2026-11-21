/** Why the Himalaya breeds endemics. Well-detailed. Theme-aware. */
export function FloraEndemicWhy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Why Himalaya breeds endemic plants geographic isolation deep valleys island habitats speciation glacial refugia steep gradients limited distribution range small populations vulnerability example Nepal endemic plants">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why the Himalaya breeds endemic plants</text>

      {/* four causes */}
      {[
        { x: 120, t: "1. ISOLATION", s: "deep valleys act like\nislands between ridges", c: "rgb(22 163 74 / 0.9)" },
        { x: 300, t: "2. STEEP GRADIENTS", s: "1,000 m altitude step =\na climate zone change", c: "rgb(14 165 233 / 0.9)" },
        { x: 480, t: "3. ICE AGE REFUGIA", s: "sheltered valleys kept\nspecies while ice advanced", c: "rgb(245 158 11 / 0.9)" },
        { x: 660, t: "4. UPLIFT", s: "young mountains still\nrising = new habitats", c: "rgb(139 92 246 / 0.9)" },
      ].map((p) => (
        <g key={p.t}>
          <rect x={p.x - 78} y="44" width="156" height="86" rx="12" style={{ color: p.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={p.x} y="66" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{p.t}</text>
          {p.s.split("\n").map((line, li) => (
            <text key={line} x={p.x} y={88 + li * 16} fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{line}</text>
          ))}
        </g>
      ))}

      {/* result */}
      <rect x="30" y="150" width="660" height="134" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="50" y="174" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">THE RESULT — AND THE RISK:</text>
      <text x="50" y="196" fontSize="7.8" className="fill-current text-muted-foreground">endemics grow in one valley or one ridge — their whole world population may cover a few square kilometres.</text>
      <text x="50" y="218" fontSize="7.8" className="fill-current text-muted-foreground">One road, one landslide, one decade of warming can erase a species found nowhere else on Earth.</text>
      <text x="50" y="242" fontSize="7.8" className="fill-current text-muted-foreground">That is why Himal endemics top conservation priority lists even when their total species count looks small.</text>
      <text x="50" y="266" fontSize="7.6" className="fill-current text-muted-foreground">Definition reminder: endemic = native to, and restricted to, one geographic area.</text>
    </svg>
  );
}
