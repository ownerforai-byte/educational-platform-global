export function Cuso4WaterTest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 210" role="img" aria-label="Anhydrous copper sulphate water test colour cycle" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">The Blue-White Water Test</text>
      <g transform="translate(70, 50)">
        <rect width="170" height="60" rx="8" className="fill-current opacity-25" />
        <text x="85" y="35" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">CuSO4.5H2O</text>
        <text x="85" y="52" textAnchor="middle" fontSize="10.5" fill="currentColor">BLUE</text>
      </g>
      <g transform="translate(320, 50)">
        <rect width="170" height="60" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" />
        <text x="85" y="35" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">CuSO4</text>
        <text x="85" y="52" textAnchor="middle" fontSize="10.5" fill="currentColor">WHITE</text>
      </g>
      <line x1="245" y1="70" x2="315" y2="70" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrCu)" />
      <text x="280" y="60" textAnchor="middle" fontSize="10" fill="currentColor">heat, -5H2O</text>
      <line x1="315" y1="125" x2="245" y2="125" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrCu)" />
      <text x="280" y="143" textAnchor="middle" fontSize="10" fill="currentColor">+ water: turns blue</text>
      <defs><marker id="arrCu" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor" /></marker></defs>
      <text x="280" y="175" textAnchor="middle" fontSize="10.5" className="fill-current opacity-75">Sharp reversible colour change - the standard test for water</text>
      <text x="280" y="196" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Used to check whether an organic distillate is dry</text>
    </svg>
  );
}
