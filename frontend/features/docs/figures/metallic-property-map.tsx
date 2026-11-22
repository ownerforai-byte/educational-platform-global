// Metallic property map: four properties traced to the electron sea. Theme-aware.
export function MetallicPropertyMap({ className }: { className?: string }) {
  const props: [string, string][] = [
    ["Conducts electricity", "electrons drift under a potential"],
    ["Conducts heat", "mobile electrons carry kinetic energy"],
    ["Lustre", "free electrons re-emit visible light"],
    ["Malleable, ductile", "non-directional bond survives layer sliding"],
  ];
  return (
    <svg viewBox="0 0 700 300" className={className} role="img" aria-label="Metallic property map linking conduction heat conduction lustre and malleability to the delocalised electron sea mechanism">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">One mechanism, four properties</text>
      <rect x="250" y="50" width="200" height="54" rx="10" className="fill-current" style={{ color: "rgb(139 92 246)" }} opacity="0.2" />
      <rect x="250" y="50" width="200" height="54" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="350" y="84" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">delocalised electron sea</text>
      {props.map(([prop, mech], i) => {
        const y = 140 + i * 40;
        return (
          <g key={i}>
            <line x1="350" y1="104" x2={130 + i * 150} y2={y} stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <rect x={60 + i * 150} y={y - 14} width="200" height="32" rx="8" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.1" />
            <rect x={60 + i * 150} y={y - 14} width="200" height="32" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text x={160 + i * 150} y={y + 5} fontSize="10.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{prop}</text>
          </g>
        );
      })}
      <text x="350" y="292" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">each property traces back to the same mobile, non-directional electron cloud</text>
    </svg>
  );
}
