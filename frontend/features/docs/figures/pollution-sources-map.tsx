/** Pollution sources map — air, water, soil. Theme-aware. */
export function PollutionSourcesMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Pollution sources by medium air pollution vehicle exhaust industry brick kilns water pollution sewage industry agriculture solid waste and soil pollution fertilisers mining plastic">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">One problem, three arenas — where pollution enters</text>

      {[
        { x: 115, t: "AIR", items: ["vehicle exhaust: CO, NOₓ,", "hydrocarbons, lead", "industry & power: SO₂,", "particulates, CO₂", "brick kilns (Nepal's", "major source)", "indoor biomass cooking"], c: "rgb(100 116 139 / 0.9)" },
        { x: 330, t: "WATER", items: ["sewage: organic waste,", "pathogens", "industry: heavy metals", "(lead, mercury, cadmium,", "arsenic), acids, dyes", "agriculture: nitrates,", "phosphates, pesticides"], c: "rgb(14 165 233 / 0.9)" },
        { x: 545, t: "SOIL", items: ["excess fertilisers", "and pesticides", "industrial waste,", "mining spoil", "plastic dumping,", "sewage sludge"], c: "rgb(120 113 108 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 85} y="56" width="170" height="170" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t} POLLUTION</text>
          {n.items.map((s, i) => (
            <text key={i} x={n.x} y={100 + i * 17} fontSize="7.1" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
          ))}
        </g>
      ))}

      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Pollution = adding substances or energy faster than the environment can disperse, dilute or decompose them into harmless forms.</text>
    </svg>
  );
}
