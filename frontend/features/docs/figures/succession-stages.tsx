/**
 * Ecological succession — bare rock → lichen → moss → grass → shrub →
 * forest sere, with changing properties at each seral stage.
 * Theme-aware via currentColor.
 */
export function SuccessionStages({ className }: { className?: string }) {
  const stages = [
    { t: "Bare rock", s: "no soil", c: "rgb(120 113 108 / 0.9)" },
    { t: "Lichen", s: "pioneer — makes first soil", c: "rgb(148 163 184 / 0.9)" },
    { t: "Moss", s: "soil deepens", c: "rgb(14 165 233 / 0.9)" },
    { t: "Grass", s: "fast growers take over", c: "rgb(132 204 22 / 0.9)" },
    { t: "Shrub", s: "woody plants shade grasses", c: "rgb(16 185 129 / 0.9)" },
    { t: "Forest (climax)", s: "stable, max biomass", c: "rgb(22 163 74 / 0.9)" },
  ];
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Primary succession sere from bare rock through lichen moss grass and shrub stages to the climax forest community">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Succession — a community's life story (hydrosere/xerosere)</text>
      {stages.map((st, i) => (
        <g key={st.t}>
          <rect x={20 + i * 106} y="70" width="92" height="70" rx="10" style={{ color: st.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={66 + i * 106} y="100" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{st.t}</text>
          <text x={66 + i * 106} y="116" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{st.s}</text>
          {i < 5 && <line x1={112 + i * 106} y1="105" x2={124 + i * 106} y2="105" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}
      <text x="16" y="180" fontSize="11" className="fill-current text-foreground" fontWeight="800">What changes along the sere:</text>
      <text x="16" y="202" fontSize="9.5" className="fill-current text-muted-foreground">↑ species diversity · ↑ biomass · ↑ niche specialisation · ↑ soil depth · ↑ stability</text>
      <text x="16" y="224" fontSize="10" className="fill-current text-muted-foreground">Pioneers modify the environment and are replaced — facilitation. Early species: small, fast, many seeds; climax species: large, slow, few seeds.</text>
      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">PRIMARY succession: starts on bare rock / lava (no soil) — centuries. SECONDARY: soil remains after disturbance (abandoned farm, burned forest) — decades.</text>
      <text x="16" y="266" fontSize="10" className="fill-current text-muted-foreground">Climax community: self-sustaining, in balance with the local climate.</text>
    </svg>
  );
}
