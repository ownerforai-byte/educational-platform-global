export function DesiccatorPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Desiccator with drying agents keeping a dry atmosphere" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">The Desiccator - Humidity Control</text>
      <path d="M150,60 L150,170 Q150,190 175,190 L385,190 Q410,190 410,170 L410,60 Z" className="fill-current opacity-5" stroke="currentColor" strokeWidth="2" />
      <rect x="165" y="150" width="230" height="30" rx="5" className="fill-current opacity-25" />
      <text x="280" y="170" textAnchor="middle" fontSize="10" fill="currentColor">drying agent layer</text>
      <rect x="230" y="90" width="100" height="45" rx="6" className="fill-current opacity-10" stroke="currentColor" strokeWidth="1" />
      <text x="280" y="117" textAnchor="middle" fontSize="10" fill="currentColor">sample</text>
      <g transform="translate(430, 90)">
        <text x="0" y="0" fontSize="10.5" fill="currentColor">agents:</text>
        <text x="0" y="18" fontSize="10.5" className="fill-current opacity-70">silica gel (mild)</text>
        <text x="0" y="36" fontSize="10.5" className="fill-current opacity-70">CaCl2 (moderate)</text>
        <text x="0" y="54" fontSize="10.5" className="fill-current opacity-70">P2O5 / H2SO4 (strong)</text>
      </g>
      <text x="280" y="212" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Cool hot crucibles weight-free and store hygroscopic samples dry</text>
    </svg>
  );
}
