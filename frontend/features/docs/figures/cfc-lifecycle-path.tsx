// CFC lifecycle from spray can to stratosphere. Theme-aware.
export function CfcLifecyclePath({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["release", "refrigerants, aerosols, foams"],
    ["troposphere drift", "chemically inert - survives for decades"],
    ["slow mixing upward", "years to reach the stratosphere"],
    ["UV cleavage", "CFCl₃ + hν → Cl· + CFCl₂·"],
    ["catalytic ozone destruction", "the Cl· cycle begins"],
  ];
  return (
    <svg viewBox="0 0 660 290" className={className} role="img" aria-label="Five stage journey of a CFC from release through inert drift to stratospheric UV cleavage and ozone destruction">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">A CFC's journey to crime</text>
      {steps.map(([t, s], i) => (
        <g key={i}>
          <circle cx="70" cy={62 + i * 44} r="9" className="fill-current" style={{ color: i >= 3 ? "rgb(239 68 68)" : "rgb(59 130 246)" }} opacity="0.6" />
          <text x="95" y={58 + i * 44} fontSize="12" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="95" y={76 + i * 44} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
          {i < 4 && <line x1="70" y1={71 + i * 44} x2="70" y2={97 + i * 44} stroke="currentColor" strokeWidth="1" className="text-muted-foreground" opacity="0.4" />}
        </g>
      ))}
      <text x="330" y="278" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Innocent at ground level, destructive 30 km up - inertia is the problem</text>
    </svg>
  );
}
