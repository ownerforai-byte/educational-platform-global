/** Altitude flora zonation for flora-status topic — species turnover by belt. Well-detailed. Theme-aware. */
export function FloraAltitudeTurnover({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Flora altitude species turnover tropical subtropical temperate subalpine alpine nival belts with representative species sal chir pine oak rhododendron birch juniper moss lichen and decreasing species richness with height">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Climb the mountain, change the flora</text>

      {/* mountain */}
      <polygon points="360,40 620,270 100,270" className="fill-current text-stone-400/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <polygon points="360,40 430,120 290,120" className="fill-current text-sky-100/60" style={{ color: "rgb(224 242 254 / 0.9)" }} />

      {/* belts */}
      {[
        { y: 250, t: "TROPICAL (<1,000 m)", s: "Sal forest", c: "rgb(22 163 74 / 0.9)" },
        { y: 210, t: "SUBTROPICAL", s: "chir pine", c: "rgb(34 197 94 / 0.9)" },
        { y: 170, t: "TEMPERATE", s: "oak, Rhododendron", c: "rgb(245 158 11 / 0.9)" },
        { y: 130, t: "SUBALPINE", s: "birch, juniper", c: "rgb(139 92 246 / 0.9)" },
        { y: 95, t: "ALPINE", s: "cushion herbs, grass", c: "rgb(14 165 233 / 0.9)" },
        { y: 62, t: "NIVAL", s: "moss, lichen only", c: "rgb(148 163 184 / 0.9)" },
      ].map((b) => (
        <g key={b.t}>
          <line x1="120" y1={b.y} x2="600" y2={b.y} strokeWidth="1.5" strokeDasharray="4 4" className="stroke-current text-muted-foreground opacity-60" />
          <text x="640" y={b.y + 3} fontSize="6.8" className="fill-current text-foreground" fontWeight="700">{b.t}</text>
          <text x="640" y={b.y + 16} fontSize="6.2" className="fill-current text-muted-foreground">{b.s}</text>
        </g>
      ))}

      {/* richness arrow */}
      <path d="M40 250 L40 70" markerEnd="url(#arrfat)" strokeWidth="2.5" className="stroke-current text-rose-500" />
      <defs><marker id="arrfat" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-rose-500" /></marker></defs>
      <text x="28" y="160" fontSize="7" textAnchor="middle" transform="rotate(-90 28 160)" className="fill-current text-rose-500" fontWeight="700">species richness falls</text>

      <text x="16" y="292" fontSize="8.4" className="fill-current text-muted-foreground">Each belt has its own dominant species — that is why Nepal needs protected areas at every altitude, not just one big park.</text>
    </svg>
  );
}
