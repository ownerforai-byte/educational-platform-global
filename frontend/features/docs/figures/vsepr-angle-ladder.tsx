// Angle compression ladder from methane through ammonia to water. Theme-aware.
export function VseprAngleLadder({ className }: { className?: string }) {
  const steps: [string, string, string, number][] = [
    ["CH4", "4 bond pairs, 0 lone pairs", "109.5 degrees", 109.5],
    ["NH3", "3 bond pairs, 1 lone pair", "107 degrees", 107],
    ["H2O", "2 bond pairs, 2 lone pairs", "104.5 degrees", 104.5],
  ];
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Bond angle compression ladder from methane 109.5 degrees through ammonia 107 to water 104.5 as lone pairs are added">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Each lone pair squeezes the angle further</text>
      {steps.map(([mol, desc, angle, val], i) => (
        <g key={i}>
          <rect x={40 + i * 210} y="56" width="180" height="180" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.08" />
          <rect x={40 + i * 210} y="56" width="180" height="180" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x={130 + i * 210} y="86" fontSize="16" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{mol}</text>
          <text x={130 + i * 210} y="112" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{desc}</text>
          <rect x={70 + i * 210} y={250 - val} width="120" height={val - 60} className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.2" />
          <text x={130 + i * 210} y="150" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{angle}</text>
          <text x={130 + i * 210} y="222" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">bar height = angle</text>
        </g>
      ))}
    </svg>
  );
}
