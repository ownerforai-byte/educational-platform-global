export function ViscosityLayerFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Viscosity as friction between liquid layers" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Viscosity - Layers That Rub</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(70, ${50 + i * 32})`}>
          <rect width="280" height="24" rx="5" className="fill-current opacity-10" />
          <line x1="30" y1="12" x2={90 + i * 45} y2="12" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrVs)" />
        </g>
      ))}
      <defs><marker id="arrVs" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor" /></marker></defs>
      <text x="210" y="185" textAnchor="middle" fontSize="11" className="fill-current opacity-75">Interlayer attraction resists sliding - internal friction</text>
      <text x="210" y="205" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">water ~1 cP; glycerine ~1000x; falls with T (gases rise)</text>
      <text x="460" y="120" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Ostwald</text>
      <text x="460" y="138" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">viscometer</text>
    </svg>
  );
}
