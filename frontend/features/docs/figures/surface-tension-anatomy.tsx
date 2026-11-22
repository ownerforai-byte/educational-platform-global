export function SurfaceTensionAnatomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Unbalanced inward forces on surface molecules create surface tension" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Surface Tension - the Inward Pull</text>
      <rect x="80" y="70" width="400" height="110" rx="8" className="fill-current opacity-10" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => (
        <circle key={j} cx={110 + (j % 4) * 115} cy={100 + Math.floor(j / 4) * 50} r="9" className="fill-current opacity-45" />
      ))}
      <g>
        {[-1, 1].map((s) => (
          <line key={s} x1={225} y1={100} x2={225 + s * 30} y2={100} stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrSt)" className="opacity-60" />
        ))}
        <line x1="225" y1="100" x2="225" y2="135" stroke="currentColor" strokeWidth="2.2" markerEnd="url(#arrSt)" />
        <text x="225" y="88" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor">surface molecule</text>
      </g>
      <defs><marker id="arrSt" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor" /></marker></defs>
      <text x="280" y="200" textAnchor="middle" fontSize="11" className="fill-current opacity-75">Bulk: pulled equally. Surface: net inward - surface contracts to a sphere</text>
      <text x="280" y="220" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Water 0.072 N/m at 25 C; mercury 0.48 N/m; falls with T and with detergents</text>
    </svg>
  );
}
