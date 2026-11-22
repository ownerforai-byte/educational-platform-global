export function AqueousTensionCorrection({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Correcting gas pressure collected over water" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Gas Over Water - Subtract the Vapour Share</text>
      <rect x="80" y="50" width="180" height="130" rx="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="80" y="120" width="180" height="60" rx="4" className="fill-current opacity-15" />
      <text x="170" y="95" textAnchor="middle" fontSize="12" fill="currentColor">dry gas + vapour</text>
      <text x="170" y="155" textAnchor="middle" fontSize="11" className="fill-current opacity-70">water bath</text>
      <text x="170" y="200" textAnchor="middle" fontSize="11" className="fill-current opacity-70">collection flask</text>
      <g transform="translate(310, 70)">
        <rect width="210" height="46" rx="6" className="fill-current opacity-5" />
        <text x="12" y="20" fontSize="11.5" fill="currentColor">P(wet) = P(dry) + aq. tension</text>
        <text x="12" y="37" fontSize="11.5" fontWeight="700" fill="currentColor">P(dry) = P(wet) - aq. tension</text>
      </g>
      <g transform="translate(310, 130)">
        <rect width="210" height="42" rx="6" className="fill-current opacity-5" />
        <text x="12" y="18" fontSize="10.5" fill="currentColor">e.g. at 25 C: aq. tension = 23.8 mmHg</text>
        <text x="12" y="34" fontSize="10.5" className="fill-current opacity-70">745 - 23.8 = 721.2 mmHg dry</text>
      </g>
      <text x="280" y="225" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Water vapour claims its own partial pressure - Dalton's law at work</text>
    </svg>
  );
}
