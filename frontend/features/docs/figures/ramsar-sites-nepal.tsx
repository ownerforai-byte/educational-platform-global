/** Nepal's Ramsar wetland sites. Theme-aware. */
export function RamsarSitesNepal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Nepal's nine Ramsar wetland sites Bishazari Tal Ghodaghodi Tal Jagadishpur Reservoir Koshi Tappu Gosaikunda Rara Lake Mai Pokhari Phoksundo Lake and Gokyo lakes protecting migratory waterbirds">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nine Ramsar wetlands — Nepal's water jewels</text>
      <text x="16" y="46" fontSize="9" className="fill-current text-muted-foreground">Ramsar Convention (1971, Iran): wetlands of international importance.</text>

      {[
        { x: 110, t: "TERAI / LOWLAND", items: ["Bishazari Tal (Chitwan)", "Ghodaghodi Tal (Kailali)", "Jagadishpur Reservoir (Kapilvastu)", "Koshi Tappu"], c: "rgb(22 163 74 / 0.9)" },
        { x: 330, t: "MID-HILL / ALPINE", items: ["Gosaikunda (alpine lake)", "Mai Pokhari"], c: "rgb(14 165 233 / 0.9)" },
        { x: 550, t: "HIGH HIMALAYAN LAKES", items: ["Rara Lake", "Phoksundo Lake", "Gokyo lakes"], c: "rgb(124 58 237 / 0.9)" },
      ].map((g) => (
        <g key={g.t}>
          <rect x={g.x - 88} y="60" width="176" height="140" rx="12" style={{ color: g.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={g.x} y="82" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{g.t}</text>
          {g.items.map((s, i) => (
            <text key={i} x={g.x} y={104 + i * 17} fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
          ))}
        </g>
      ))}

      <rect x="40" y="212" width="580" height="20" rx="8" className="fill-current text-teal-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
      <text x="56" y="226" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">What they protect: migratory waterbirds, fish and unique alpine wetlands.</text>
    </svg>
  );
}
