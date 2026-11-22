export function KineticEquationBridge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Kinetic gas equation linking macroscopic and molecular worlds" className={className}>
      <text x="280" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">PV = 1/3 nMu(rms) squared - the Bridge</text>
      <rect x="40" y="55" width="220" height="90" rx="10" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" />
      <text x="150" y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor">Macroscopic</text>
      <text x="150" y="110" textAnchor="middle" fontSize="12" fill="currentColor">P, V, n, T measured</text>
      <text x="150" y="130" textAnchor="middle" fontSize="11" className="fill-current opacity-70">lab dials and gauges</text>
      <rect x="300" y="55" width="220" height="90" rx="10" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" />
      <text x="410" y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor">Molecular</text>
      <text x="410" y="110" textAnchor="middle" fontSize="12" fill="currentColor">u(rms), KE, collisions</text>
      <text x="410" y="130" textAnchor="middle" fontSize="11" className="fill-current opacity-70">invisible motion</text>
      <line x1="262" y1="100" x2="298" y2="100" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrB)" />
      <line x1="298" y1="100" x2="262" y2="100" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrB)" />
      <defs><marker id="arrB" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor" /></marker></defs>
      <text x="280" y="180" textAnchor="middle" fontSize="11.5" className="fill-current opacity-75">Combine with PV = nRT to extract u(rms) = sqrt(3RT/M)</text>
      <text x="280" y="202" textAnchor="middle" fontSize="10.5" className="fill-current opacity-60">One equation turns pressure into speed</text>
    </svg>
  );
}
