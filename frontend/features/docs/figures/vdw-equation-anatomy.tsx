export function VdwEquationAnatomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Anatomy of the van der Waals equation" className={className}>
      <text x="280" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Van der Waals Equation - Anatomy</text>
      <text x="280" y="70" textAnchor="middle" fontSize="16" fontWeight="700" fill="currentColor">(P + an²/V²)(V - nb) = nRT</text>
      <g transform="translate(60, 100)">
        <rect width="200" height="80" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
        <text x="100" y="28" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">a n²/V² added to P</text>
        <text x="100" y="50" textAnchor="middle" fontSize="10.5" fill="currentColor">attraction softens wall hits</text>
        <text x="100" y="68" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">observed P is less than ideal</text>
      </g>
      <g transform="translate(300, 100)">
        <rect width="200" height="80" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
        <text x="100" y="28" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">V - nb free volume</text>
        <text x="100" y="50" textAnchor="middle" fontSize="10.5" fill="currentColor">molecules own space excluded</text>
        <text x="100" y="68" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">b is about 4x molecular volume</text>
      </g>
      <text x="280" y="212" textAnchor="middle" fontSize="11" className="fill-current opacity-70">a ranks stickiness, b ranks bulk - both gas-specific, unlike R</text>
    </svg>
  );
}
