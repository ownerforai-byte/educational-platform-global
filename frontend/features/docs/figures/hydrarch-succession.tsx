/** Hydrarch succession — a pond becoming a forest. Well-detailed. Theme-aware. */
export function HydrarchSuccession({ className }: { className?: string }) {
  const stages: [string, string][] = [
    ["Open water", "phytoplankton pioneers"],
    ["Submerged stage", "Hydrilla traps silt"],
    ["Floating stage", "lily leaves shade the water"],
    ["Reed-swamp", "amphibious plants take the edge"],
    ["Sedge-meadow", "soil rises above water"],
    ["Forest climax", "trees own the old pond bed"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Hydrarch succession pond to forest phytoplankton submerged Hydrilla floating lily reed swamp sedge meadow climax hydrarch stages">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Hydrarch succession — a pond dries into a forest</text>
      {stages.map(([name, detail], i) => {
        const x = 30 + (i % 3) * 228;
        const y = 48 + Math.floor(i / 3) * 118;
        const water = 60 - i * 10;
        return (
          <g key={name}>
            <rect x={x} y={y} width="210" height="100" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
            <rect x={x + 12} y={y + 44} width="186" height={water > 0 ? water : 6} rx="4" className="fill-current text-sky-400/20" style={{ color: "rgb(14 165 233 / 0.9)" }} />
            {i === 0 && [0, 1, 2].map((j) => <circle key={j} cx={x + 50 + j * 50} cy={y + 58} r="3" className="fill-current text-emerald-500/60" />)}
            {i === 1 && [0, 1, 2].map((j) => <path key={j} d={`M${x + 50 + j * 50} ${y + 70} v-18`} className="stroke-current text-emerald-600" strokeWidth="2" />)}
            {i === 2 && [0, 1, 2].map((j) => <ellipse key={j} cx={x + 50 + j * 50} cy={y + 52} rx="14" ry="5" className="fill-current text-emerald-600/50" />)}
            {i === 3 && [0, 1, 2].map((j) => <path key={j} d={`M${x + 50 + j * 50} ${y + 74} v-26`} className="stroke-current text-lime-600" strokeWidth="2.4" />)}
            {i === 4 && [0, 1, 2].map((j) => <path key={j} d={`M${x + 45 + j * 55} ${y + 66} q4 -16 10 -18 q6 2 10 18`} className="fill-current text-emerald-600/40" />)}
            {i === 5 && [0, 1, 2].map((j) => (
              <g key={j}>
                <path d={`M${x + 50 + j * 50} ${y + 66} v-24`} className="stroke-current text-amber-700" strokeWidth="2.6" />
                <circle cx={x + 50 + j * 50} cy={y + 38} r="8" className="fill-current text-emerald-600/50" />
              </g>
            ))}
            <text x={x + 12} y={y + 18} fontSize="7.6" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x={x + 12} y={y + 32} fontSize="6.8" className="fill-current text-muted-foreground">{detail}</text>
          </g>
        );
      })}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Silt and dead matter raise the bed stage by stage — the water loses, the land wins, the climax arrives.</text>
    </svg>
  );
}
