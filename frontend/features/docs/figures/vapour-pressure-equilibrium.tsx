export function VapourPressureEquilibrium({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Dynamic equilibrium establishing vapour pressure" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Vapour Pressure - Dynamic Equilibrium</text>
      <rect x="110" y="55" width="200" height="120" rx="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="110" y="125" width="200" height="50" rx="4" className="fill-current opacity-15" />
      {[0, 1, 2, 3].map((j) => (
        <g key={j}>
          <circle cx={150 + j * 45} cy={90 + (j % 2) * 15} r="5" className="fill-current opacity-60" />
          <line x1={150 + j * 45} y1={85 + (j % 2) * 15} x2={150 + j * 45} y2={68 + (j % 2) * 15} stroke="currentColor" strokeWidth="1" markerEnd="url(#arrVp)" className="opacity-70" />
          <line x1={172 + j * 45} y1={70 + (j % 2) * 15} x2={172 + j * 45} y2={88 + (j % 2) * 15} stroke="currentColor" strokeWidth="1" markerEnd="url(#arrVp)" className="opacity-40" />
        </g>
      ))}
      <defs><marker id="arrVp" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor" /></marker></defs>
      <text x="210" y="190" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">evaporation rate = condensation rate</text>
      <g transform="translate(360, 70)">
        <rect width="170" height="90" rx="8" className="fill-current opacity-5" />
        <text x="85" y="30" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="currentColor">Depends only on</text>
        <text x="85" y="52" textAnchor="middle" fontSize="11" fill="currentColor">liquid identity + T</text>
        <text x="85" y="74" textAnchor="middle" fontSize="10" className="fill-current opacity-70">not amount, not vessel</text>
      </g>
      <text x="280" y="215" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Water: 23.8 mmHg at 25 C - present long before boiling</text>
    </svg>
  );
}
