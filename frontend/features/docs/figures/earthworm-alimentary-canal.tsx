/** Earthworm alimentary canal — mouth to anus with gland detail. Theme-aware. */
export function EarthwormAlimentaryCanal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Earthworm alimentary canal from mouth through buccal cavity pharynx oesophagus gizzard stomach intestine with typhlosole to anus">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The alimentary canal — a straight, well-staffed tube</text>

      {[
        { x: 60, w: 70, c: "rgb(14 165 233 / 0.9)", t: "buccal cavity (1–3)" },
        { x: 140, w: 110, c: "rgb(20 184 166 / 0.9)", t: "pharynx (3–6) — sucks, glands add mucus + protease" },
        { x: 260, w: 60, c: "rgb(16 185 129 / 0.9)", t: "oesophagus (7)" },
        { x: 330, w: 50, c: "rgb(245 158 11 / 0.9)", t: "gizzard (9–10)" },
        { x: 390, w: 60, c: "rgb(249 115 22 / 0.9)", t: "stomach (11–14)" },
        { x: 460, w: 150, c: "rgb(22 163 74 / 0.9)", t: "intestine (15–last) — typhlosole inside" },
      ].map((s) => (
        <g key={s.t}>
          <rect x={s.x} y="80" width={s.w} height="34" rx="10" style={{ color: s.c }} className="fill-current opacity-15" strokeWidth="2.5" stroke="currentColor" />
        </g>
      ))}
      <text x="46" y="70" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">mouth</text>
      <text x="620" y="70" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">anus</text>

      {[
        { x: 95, y: 140, t: "buccal cavity: ingests soil + decaying leaves" },
        { x: 195, y: 158, t: "pharynx: muscular pump; pharyngeal glands add mucus & proteolytic enzyme" },
        { x: 355, y: 140, t: "gizzard: grinds food with sand — mechanical only" },
        { x: 420, y: 158, t: "stomach: calciferous glands neutralise humic acid" },
        { x: 535, y: 140, t: "intestine: amylase, lipase, protease; absorption" },
      ].map((l) => (
        <text key={l.t} x={l.x} y={l.y} fontSize="8" className="fill-current text-muted-foreground">• {l.t}</text>
      ))}

      {/* typhlosole */}
      <path d="M470 96 q40 10 130 0" fill="none" strokeWidth="4" className="stroke-current text-rose-500" />
      <text x="470" y="120" fontSize="8.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">typhlosole (dorsal fold, 26–95) doubles absorptive surface</text>

      <text x="16" y="216" fontSize="10" className="fill-current text-muted-foreground">Chemistry + mechanics divided among stations: suck → grind → neutralise → digest → absorb. Chloragogen cells around the gut act as a 'liver'.</text>
    </svg>
  );
}
