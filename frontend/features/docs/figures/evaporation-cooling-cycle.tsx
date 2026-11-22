export function EvaporationCoolingCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Evaporation removes high energy molecules and cools the liquid" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Evaporation Cools - the Fast Ones Leave</text>
      <rect x="90" y="110" width="220" height="60" rx="8" className="fill-current opacity-15" />
      {[0, 1, 2, 3, 4, 5].map((j) => (<circle key={j} cx={115 + (j % 3) * 70} cy={130 + Math.floor(j / 3) * 28} r="7" className="fill-current opacity-50" />))}
      {[0, 1].map((j) => (
        <g key={j}>
          <circle cx={200 + j * 60} cy={85} r="7" className="fill-current opacity-70" />
          <line x1={200 + j * 60} y1={80} x2={200 + j * 60} y2={45} stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrEv)" />
        </g>
      ))}
      <defs><marker id="arrEv" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor" /></marker></defs>
      <text x="230" y="35" textAnchor="middle" fontSize="10.5" fill="currentColor">fastest molecules escape</text>
      <text x="200" y="192" textAnchor="middle" fontSize="11" className="fill-current opacity-75">Average KE of those left falls - liquid cools</text>
      <text x="470" y="130" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">sweat, earthen pots,</text>
      <text x="470" y="148" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">ether on skin</text>
      <text x="280" y="212" textAnchor="middle" fontSize="10.5" className="fill-current opacity-60">Latent heat drawn from the remaining liquid</text>
    </svg>
  );
}
