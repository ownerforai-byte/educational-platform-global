// Conductivity drill: who carries the charge in each state. Theme-aware.
export function ConductivityDrill({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Copper wire (solid)", "delocalised electrons drift", "conducts"],
    ["Solid NaCl", "nothing mobile - ions locked", "no conduction"],
    ["Molten NaCl", "Na+ and Cl- ions migrate", "conducts"],
    ["NaCl solution", "hydrated ions migrate", "conducts"],
  ];
  return (
    <svg viewBox="0 0 680 300" className={className} role="img" aria-label="Conductivity drill comparing copper wire molten sodium chloride and sodium chloride solution which conduct with solid sodium chloride which does not">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Who carries the charge? Electrons or ions</text>
      {rows.map(([state, carrier, verdict], i) => {
        const good = verdict !== "no conduction";
        return (
          <g key={i}>
            <rect x="24" y={46 + i * 58} width="652" height="48" rx="8" className="fill-current" style={{ color: good ? "rgb(16 185 129)" : "rgb(244 63 94)" }} opacity="0.09" />
            <rect x="24" y={46 + i * 58} width="652" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text x="40" y={66 + i * 58} fontSize="12.5" className="fill-current text-foreground" fontWeight="800">{state}</text>
            <text x="40" y={86 + i * 58} fontSize="10.5" className="fill-current text-muted-foreground">{carrier}</text>
            <text x="560" y={76 + i * 58} fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{verdict}</text>
          </g>
        );
      })}
    </svg>
  );
}
