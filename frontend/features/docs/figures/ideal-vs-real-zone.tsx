export function IdealVsRealZone({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Ideal behaviour zone versus real behaviour zone" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Where PV = nRT Works</text>
      <rect x="70" y="45" width="420" height="140" rx="10" className="fill-current opacity-5" />
      <rect x="90" y="60" width="150" height="110" rx="8" className="fill-current opacity-15" />
      <text x="165" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">IDEAL ZONE</text>
      <text x="165" y="125" textAnchor="middle" fontSize="10.5" fill="currentColor">low P, high T</text>
      <text x="165" y="143" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">both corrections vanish</text>
      <rect x="320" y="60" width="150" height="110" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="395" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">REAL ZONE</text>
      <text x="395" y="125" textAnchor="middle" fontSize="10.5" fill="currentColor">high P, low T</text>
      <text x="395" y="143" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">near condensation</text>
      <text x="280" y="212" textAnchor="middle" fontSize="11" className="fill-current opacity-70">Every gas is ideal when dilute and hot - deviations grow toward liquefaction</text>
    </svg>
  );
}
