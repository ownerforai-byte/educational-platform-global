// CarbonExcitedState figure. Theme-aware.
export function CarbonExcitedState({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Excitation of carbon from 2s2 2p2 to 2s1 2p3 giving four unpaired electrons">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Ground state → excited state: carbon finds a fourth hand</text>
      <rect x="40" y="55" width="280" height="110" rx="10" fill="rgb(148 163 184)" opacity="0.1" stroke="rgb(148 163 184)" />
      <text x="180" y="80" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">GROUND: 1s² 2s² 2p²</text>
      <rect x="120" y="95" width="34" height="30" rx="4" fill="rgb(148 163 184)" opacity="0.3" />
      <text x="137" y="115" fontSize="10" textAnchor="middle" className="fill-current text-foreground">↑↓</text>
      <text x="170" y="115" fontSize="10" className="fill-current text-muted-foreground">2s  paired</text>
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={230 + i * 40} y="95" width="34" height="30" rx="4" fill="rgb(59 130 246)" opacity="0.3" />
          <text x={247 + i * 40} y="115" fontSize="10" textAnchor="middle" className="fill-current text-foreground">↑</text>
        </g>
      ))}
      <text x="315" y="115" fontSize="10" className="fill-current text-muted-foreground">2p  2 unpaired</text>
      <path d="M 325 110 L 355 110" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#ces-a)" />
      <text x="340" y="98" fontSize="9" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">~406 kJ/mol</text>
      <rect x="360" y="55" width="260" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="490" y="80" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">EXCITED: 1s² 2s¹ 2p³</text>
      <rect x="410" y="95" width="34" height="30" rx="4" fill="rgb(148 163 184)" opacity="0.3" />
      <text x="427" y="115" fontSize="10" textAnchor="middle" className="fill-current text-foreground">↑</text>
      <text x="452" y="115" fontSize="10" className="fill-current text-muted-foreground">2s</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={490 + i * 40} y="95" width="34" height="30" rx="4" fill="rgb(16 185 129)" opacity="0.3" />
          <text x={507 + i * 40} y="115" fontSize="10" textAnchor="middle" className="fill-current text-foreground">↑</text>
        </g>
      ))}
      <text x="590" y="115" fontSize="10" className="fill-current text-muted-foreground">2p</text>
      <text x="490" y="152" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">4 unpaired → VALENCY 4</text>
      <text x="330" y="195" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The promotion cost is repaid by two extra strong bonds — thermodynamic profit</text>
      <text x="330" y="216" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">in methane the four bonds are equivalent (sp³, tetrahedral, 109.5°)</text>
      <defs>
        <marker id="ces-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
    </svg>
  );
}
