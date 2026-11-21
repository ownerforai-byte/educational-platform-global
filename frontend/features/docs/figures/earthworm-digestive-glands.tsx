/** Earthworm digestive glands — pharyngeal, calciferous, chloragogen roles. Theme-aware. */
export function EarthwormDigestiveGlands({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Earthworm digestive glands pharyngeal glands calciferous glands of stomach and chloragogen cells around intestine with their functions">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three gland systems, three jobs</text>

      {[
        { x: 16, c: "rgb(14 165 233 / 0.9)", t: "PHARYNGEAL GLANDS", items: ["segments 3–6, on the pharynx", "secrete mucus + proteolytic enzyme", "soften food, start protein digestion"] },
        { x: 232, c: "rgb(245 158 11 / 0.9)", t: "CALCIFEROUS GLANDS", items: ["segments 11–12, stomach wall", "remove Ca²⁺ and CO₂ from blood", "secrete calcium carbonate —", "neutralise humic acid of leaf litter"] },
        { x: 448, c: "rgb(22 163 74 / 0.9)", t: "CHLORAGOGEN CELLS", items: ["yellow cells around the intestine", "store glycogen & fat (liver-like)", "decolourise blood, excrete urea", "also make haemoglobin precursors"] },
      ].map((g) => (
        <g key={g.t}>
          <rect x={g.x} y="56" width="196" height="140" rx="12" style={{ color: g.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={g.x + 98} y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{g.t}</text>
          {g.items.map((s, i) => (
            <text key={i} x={g.x + 12} y={102 + i * 22} fontSize="8" className="fill-current text-muted-foreground">• {s}</text>
          ))}
        </g>
      ))}

      <text x="16" y="222" fontSize="10" className="fill-current text-muted-foreground">Exam line: calciferous glands = acid neutralisers; chloragogen = the worm's liver; pharyngeal glands = the first chemical station.</text>
    </svg>
  );
}
