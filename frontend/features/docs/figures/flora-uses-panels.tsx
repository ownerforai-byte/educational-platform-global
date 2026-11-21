/** Flora uses — food, medicine, timber, fodder, culture. Well-detailed. Theme-aware. */
export function FloraUsesPanels({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Flora uses five panels food grains fruits medicine herbs yarsagumba timber sal fodder grasses culture tulasi peepal economic importance of plants in Nepal">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">What flora gives us — five value streams</text>

      {[
        { x: 105, t: "FOOD", s: "rice, maize, millet;\nfruits, vegetables", c: "rgb(22 163 74 / 0.9)" },
        { x: 285, t: "MEDICINE", s: "herbs, yarsagumba;\nAyurvedic raw material", c: "rgb(14 165 233 / 0.9)" },
        { x: 465, t: "TIMBER & FUEL", s: "sal, pine; firewood\nstill the village fuel", c: "rgb(245 158 11 / 0.9)" },
        { x: 645, t: "FODDER", s: "leaf fodder trees feed\nthe livestock economy", c: "rgb(139 92 246 / 0.9)" },
      ].map((p) => (
        <g key={p.t}>
          <rect x={p.x - 82} y="44" width="164" height="110" rx="12" style={{ color: p.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={p.x} y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{p.t}</text>
          {p.s.split("\n").map((line, li) => (
            <text key={line} x={p.x} y={88 + li * 16} fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{line}</text>
          ))}
        </g>
      ))}

      <rect x="30" y="176" width="660" height="108" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="50" y="200" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">CULTURAL VALUE: tulsi worshipped, peepal sacred, flowers in every festival — conservation has religious allies in Nepal.</text>
      <text x="50" y="222" fontSize="7.8" className="fill-current text-muted-foreground">Economic note: non-timber forest products (herbs, resins, handpaper) are a major rural income source and export.</text>
      <text x="50" y="244" fontSize="7.8" className="fill-current text-muted-foreground">Sustainable use argument: a forest standing is worth more than felled when medicines, water regulation and tourism are counted.</text>
      <text x="50" y="266" fontSize="7.6" className="fill-current text-muted-foreground">Exam hook: list value streams — direct (food, timber) and indirect (watershed, climate, aesthetic).</text>
    </svg>
  );
}
