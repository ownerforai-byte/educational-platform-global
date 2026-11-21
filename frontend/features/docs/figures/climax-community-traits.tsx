/** Climax community traits — the stable end state. Well-detailed. Theme-aware. */
export function ClimaxCommunityTraits({ className }: { className?: string }) {
  const traits: [string, string][] = [
    ["Stable", "no net change in species composition year to year"],
    ["Biomass-rich", "maximum standing crop the climate can support"],
    ["Efficient", "energy use and nutrient recycling are near-perfect"],
    ["Self-replacing", "young of the climax species replace the old"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Climax community traits stable biomass efficient self replacing succession end state mesophytic forest biodiversity equilibrium">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Climax community — the settled end state</text>
      {/* forest */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FINISHED FOREST</text>
      {/* layered trees */}
      {[0, 1, 2, 3, 4].map((j) => (
        <g key={j}>
          <path d={`M${70 + j * 60} 240 v-60`} className="stroke-current text-amber-700" strokeWidth="3" style={{ color: "rgb(180 130 40 / 0.9)" }} />
          <circle cx={70 + j * 60} cy={168} r={20 + (j % 2) * 4} className="fill-current text-emerald-600/40" />
        </g>
      ))}
      <rect x="50" y="240" width="290" height="14" rx="4" className="fill-current text-stone-600/40" />
      <text x="195" y="272" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">canopy, understorey, herbs, litter — every niche filled</text>

      {/* traits */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FOUR SIGNATURES</text>
      {traits.map(([name, detail], i) => (
        <g key={name}>
          <text x="406" y={94 + i * 42} fontSize="7.6" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
          <text x="420" y={108 + i * 42} fontSize="7" className="fill-current text-muted-foreground">{detail.slice(0, 42)}</text>
        </g>
      ))}
      <text x="406" y="254" fontSize="7" className="fill-current text-sky-600">Climax is set by climate — rainforest, taiga</text>
      <text x="406" y="268" fontSize="7" className="fill-current text-sky-600">or grassland, whichever the region allows.</text>
    </svg>
  );
}
