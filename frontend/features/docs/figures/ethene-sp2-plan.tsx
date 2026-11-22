// Ethene sp2 plan: three hybrids in plane plus perpendicular p orbital. Theme-aware.
export function EtheneSp2Plan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 280" className={className} role="img" aria-label="Ethene sp2 hybridisation plan showing three sp2 orbitals in a plane at 120 degrees and one unhybridised p orbital perpendicular forming the pi bond">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">sp2 carbon: 3 hybrids in the plane, 1 p orbital upright</text>
      <circle cx="320" cy="160" r="14" className="fill-current" opacity="0.3" />
      <text x="320" y="165" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">C</text>
      {[[250, 130], [390, 130], [320, 225]].map(([x, y], i) => (
        <g key={i}>
          <line x1="320" y1="160" x2={x} y2={y} stroke="currentColor" strokeWidth="2" />
          <ellipse cx={(320 + x) / 2} cy={(160 + y) / 2} rx="26" ry="9" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.2" transform={`rotate(${i === 2 ? 90 : i === 0 ? -30 : 30} ${(320 + x) / 2} ${(160 + y) / 2})`} />
        </g>
      ))}
      <ellipse cx="320" cy="95" rx="12" ry="34" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(139 92 246)" }} />
      <text x="320" y="60" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">unhybridised p</text>
      <text x="320" y="256" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">three sp2 at 120 degrees in-plane; the leftover p reaches for the pi bond</text>
    </svg>
  );
}
