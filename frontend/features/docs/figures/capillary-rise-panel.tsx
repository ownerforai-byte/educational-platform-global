export function CapillaryRisePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Capillary rise in water and depression in mercury" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Capillarity - Surface Tension at Work</text>
      <g transform="translate(110, 45)">
        <rect x="55" y="0" width="30" height="150" rx="4" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="57" y="40" width="26" height="110" rx="3" className="fill-current opacity-30" />
        <line x1="40" y1="150" x2="100" y2="150" stroke="currentColor" strokeWidth="1.5" />
        <text x="70" y="30" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="currentColor">rise</text>
        <text x="70" y="172" textAnchor="middle" fontSize="11" fill="currentColor">water wets glass</text>
      </g>
      <g transform="translate(330, 45)">
        <rect x="55" y="0" width="30" height="150" rx="4" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="57" y="0" width="26" height="135" rx="3" className="fill-current opacity-30" />
        <line x1="40" y1="135" x2="100" y2="135" stroke="currentColor" strokeWidth="1.5" />
        <text x="70" y="160" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="currentColor">depression</text>
        <text x="70" y="172" textAnchor="middle" fontSize="11" fill="currentColor">mercury does not wet</text>
      </g>
      <text x="280" y="215" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Concave meniscus climbs, convex meniscus sinks - adhesion vs cohesion</text>
    </svg>
  );
}
