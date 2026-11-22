// Conduction drill: solid, molten and aqueous sodium chloride. Theme-aware.
export function IonicConductionDrill({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Solid NaCl", "No conduction", "ions locked in the lattice"],
    ["Molten NaCl (801 C)", "Conducts", "ions free to move"],
    ["NaCl in water", "Conducts", "ions hydrated and mobile"],
  ];
  return (
    <svg viewBox="0 0 640 280" className={className} role="img" aria-label="Conduction drill for solid molten and aqueous sodium chloride showing only mobile ions conduct electricity">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">When does salt conduct? Only when ions can move</text>
      {rows.map(([state, verdict, why], i) => {
        const good = verdict !== "No conduction";
        return (
          <g key={i}>
            <rect x="30" y={48 + i * 70} width="580" height="58" rx="10" className="fill-current" style={{ color: good ? "rgb(16 185 129)" : "rgb(244 63 94)" }} opacity="0.10" />
            <rect x="30" y={48 + i * 70} width="580" height="58" rx="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <text x="50" y={74 + i * 70} fontSize="13" className="fill-current text-foreground" fontWeight="800">{state}</text>
            <text x="50" y={94 + i * 70} fontSize="11" className="fill-current text-muted-foreground">{why}</text>
            <text x="470" y={84 + i * 70} fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{verdict}</text>
          </g>
        );
      })}
    </svg>
  );
}
