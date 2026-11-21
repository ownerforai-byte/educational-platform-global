/** IPM strategy — integrated pest management components. Theme-aware. */
export function IpmStrategy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Integrated pest management combining tolerant varieties crop rotation biological control with ladybird beetles and Bacillus thuringiensis pheromone traps and pesticides only as last resort at economic threshold">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">IPM — many small hammers, one big one in reserve</text>

      {[
        { x: 105, t: "TOLERANT VARIETIES", s: "plant crops bred to", s2: "withstand pest attack", c: "rgb(22 163 74 / 0.9)" },
        { x: 250, t: "CULTURAL PRACTICES", s: "crop rotation, clean seed,", s2: "timely sowing", c: "rgb(14 165 233 / 0.9)" },
        { x: 395, t: "BIOLOGICAL CONTROL", s: "ladybird beetles vs aphids;", s2: "Bacillus thuringiensis (Bt)", s3: "vs caterpillars", c: "rgb(132 204 22 / 0.9)" },
        { x: 540, t: "PHEROMONE TRAPS", s: "species-specific sex", s2: "pheromones lure and", s3: "trap the pest", c: "rgb(245 158 11 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 68} y="56" width="136" height="96" rx="10" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="78" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="98" fontSize="6.9" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="114" fontSize="6.9" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          {n.s3 && <text x={n.x} y="130" fontSize="6.9" textAnchor="middle" className="fill-current text-muted-foreground">{n.s3}</text>}
        </g>
      ))}

      <rect x="40" y="168" width="580" height="60" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="56" y="190" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">LAST RESORT: pesticides only when pest numbers cross the ECONOMIC THRESHOLD — the level where crop loss exceeds spray cost.</text>
      <text x="56" y="210" fontSize="8.4" className="fill-current text-muted-foreground">The logic: every spray spent early breeds resistance; every alternative used first keeps the chemical effective for a true emergency.</text>
    </svg>
  );
}
