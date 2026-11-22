// Central decomposition equation of H2O2. Theme-aware.
export function DecompositionEquationHub({ className }: { className?: string }) {
  const spokes: [string, string][] = [
    ["antiseptic fizz", "catalase in the wound"],
    ["bleach action", "gentle oxidation, then water"],
    ["rocket HTP", "85% solution as propellant"],
    ["storage rules", "why cold, dark, wax-lined"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Hub diagram showing one decomposition equation powering antiseptic, bleaching, rocketry and storage behaviour">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">One equation, four careers</text>
      <rect x="230" y="100" width="200" height="52" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.2" />
      <text x="330" y="122" fontSize="13.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">2H₂O₂ → 2H₂O + O₂</text>
      <text x="330" y="142" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">exothermic, catalysed by light/metals</text>
      {spokes.map(([t, s], i) => (
        <g key={i}>
          <text x={120 + (i % 2) * 380} y={86 + Math.floor(i / 2) * 92} fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{t}</text>
          <text x={120 + (i % 2) * 380} y={104 + Math.floor(i / 2) * 92} fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
          <line x1={200 + (i % 2) * 260} y1={92 + Math.floor(i / 2) * 60} x2={240 + (i % 2) * 160} y2={116} stroke="currentColor" strokeWidth="1" className="text-muted-foreground" opacity="0.5" />
        </g>
      ))}
      <text x="330" y="244" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The same spontaneous decomposition read four ways</text>
    </svg>
  );
}
