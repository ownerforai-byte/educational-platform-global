export function BoltzmannBridgePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 210" role="img" aria-label="Boltzmann constant bridges moles and molecules" className={className}>
      <text x="280" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">R Shrinks to k - Mole to Molecule</text>
      <rect x="60" y="55" width="180" height="60" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" />
      <text x="150" y="82" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="currentColor">R = 8.314 J/mol·K</text>
      <text x="150" y="102" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">per mole</text>
      <rect x="320" y="55" width="180" height="60" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" />
      <text x="410" y="82" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="currentColor">k = 1.38e-23 J/K</text>
      <text x="410" y="102" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">per molecule</text>
      <line x1="242" y1="85" x2="318" y2="85" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrBz)" markerStart="url(#arrBz)" />
      <text x="280" y="75" textAnchor="middle" fontSize="11" fill="currentColor">/ N(A)</text>
      <defs><marker id="arrBz" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor" /></marker></defs>
      <text x="280" y="155" textAnchor="middle" fontSize="11.5" className="fill-current opacity-75">k = R/N(A) = 8.314 / 6.022e23</text>
      <text x="280" y="180" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">KE = 3/2 kT per molecule - the temperature dial at single-molecule size</text>
    </svg>
  );
}
