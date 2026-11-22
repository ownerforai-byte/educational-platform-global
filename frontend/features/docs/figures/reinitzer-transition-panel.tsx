export function ReinitzerTransitionPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 200" role="img" aria-label="Cholesteryl benzoate phase transitions on heating" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Reinitzer's Observation (1888)</text>
      {[
        { x: 40, t: "CRYSTAL", d: "ordered, solid" },
        { x: 200, t: "MESOPHASE", d: "milky, flowing" },
        { x: 380, t: "CLEAR LIQUID", d: "isotropic" },
      ].map((s, i) => (
        <g key={i} transform={`translate(${s.x}, 55)`}>
          <rect width="140" height="60" rx="8" className={i === 1 ? "fill-current opacity-20" : "fill-current opacity-5"} stroke="currentColor" strokeWidth="1.2" />
          <text x="70" y="28" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="currentColor">{s.t}</text>
          <text x="70" y="48" textAnchor="middle" fontSize="10" className="fill-current opacity-70">{s.d}</text>
        </g>
      ))}
      <line x1="182" y1="85" x2="198" y2="85" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrRn)" />
      <line x1="342" y1="85" x2="358" y2="85" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrRn)" />
      <defs><marker id="arrRn" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor" /></marker></defs>
      <text x="190" y="145" textAnchor="middle" fontSize="10.5" fill="currentColor">145.5 C</text>
      <text x="350" y="145" textAnchor="middle" fontSize="10.5" fill="currentColor">178.5 C</text>
      <text x="280" y="180" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">The milky in-between state was the first liquid crystal ever seen</text>
    </svg>
  );
}
