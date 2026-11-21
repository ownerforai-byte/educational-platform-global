/** Ecology levels ladder — from organism to biome. Well-detailed. Theme-aware. */
export function EcologyLevelsLadder({ className }: { className?: string }) {
  const levels: [string, string, string][] = [
    ["Organism", "one individual meeting its environment", "a single tiger"],
    ["Population", "all members of one species in an area", "every tiger in Chitwan"],
    ["Community", "all populations living together there", "tigers, deer, trees, fungi"],
    ["Ecosystem", "community + abiotic factors + energy flow", "the whole park, living and non-living"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ecology levels ladder organism population community ecosystem biome hierarchy scope of ecology examples ascending">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The levels of ecology — climb one rung at a time</text>
      {levels.map(([name, detail, ex], i) => {
        const y = 48 + i * 56;
        const w = 200 + i * 110;
        return (
          <g key={name}>
            <rect x="40" y={y} width={w} height="44" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `rgb(14 165 233 / ${0.9 - i * 0.12})` }} />
            <text x="56" y={y + 19} fontSize="8.4" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x="56" y={y + 34} fontSize="7" className="fill-current text-muted-foreground">{detail}</text>
            <text x={60 + w} y={y + 28} fontSize="7.2" className="fill-current text-sky-600">{ex}</text>
          </g>
        );
      })}
      <rect x="30" y="276" width="660" height="16" rx="6" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Each level adds the one below plus new interactions — ecology studies all of them.</text>
    </svg>
  );
}
