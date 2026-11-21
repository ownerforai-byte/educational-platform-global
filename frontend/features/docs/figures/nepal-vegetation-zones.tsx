/** Nepal vegetation zones — tropical to nival belt with altitude. Theme-aware. */
export function NepalVegetationZones({ className }: { className?: string }) {
  const zones = [
    { t: "NIVAL (>5,000 m)", s: "snow, mosses, lichens", c: "rgb(226 232 240 / 0.9)" },
    { t: "ALPINE (4,000–5,000 m)", s: "cushion herbs, Rhododendron shrubs", c: "rgb(147 197 253 / 0.9)" },
    { t: "SUB-ALPINE (3,000–4,000 m)", s: "birch, fir, juniper", c: "rgb(110 231 183 / 0.9)" },
    { t: "TEMPERATE (2,000–3,000 m)", s: "oak, Rhododendron, pine", c: "rgb(52 211 153 / 0.9)" },
    { t: "SUB-TROPICAL (1,000–2,000 m)", s: "sal, pine, Schima", c: "rgb(250 204 21 / 0.9)" },
    { t: "TROPICAL (<1,000 m)", s: "sal, Khair, Sisoo, tall grassland", c: "rgb(251 146 60 / 0.9)" },
  ];
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Nepal vegetation zones stacked from tropical lowlands to nival snowline with characteristic species at each altitude band">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Altitude is Nepal's climate dial — six vegetation belts</text>
      {zones.map((z, i) => {
        const y = 48 + i * 36;
        return (
          <g key={z.t}>
            <rect x="20" y={y} width="620" height="30" rx="8" style={{ color: z.c }} className="fill-current opacity-40" strokeWidth="2" stroke="currentColor" />
            <text x="36" y={y + 20} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{z.t}</text>
            <text x="330" y={y + 20} fontSize="9" className="fill-current text-foreground/80">{z.s}</text>
          </g>
        );
      })}
      <text x="16" y="268" fontSize="10" className="fill-current text-muted-foreground">Climb 1,000 m and you cross what driving 1,000 km north would show — that is why Nepal's species list is so long.</text>
    </svg>
  );
}
