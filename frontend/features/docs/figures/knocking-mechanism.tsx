// KnockingMechanism figure. Theme-aware.
export function KnockingMechanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Knocking in engines caused by premature auto-ignition of straight chain fuel">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Knocking — the premature bang</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" />
      <text x="180" y="80" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">STRAIGHT-chain fuel</text>
      <text x="180" y="106" fontSize="10" textAnchor="middle" className="fill-current text-foreground">compression + heat → auto-ignites</text>
      <text x="180" y="128" fontSize="10" textAnchor="middle" className="fill-current text-foreground">BEFORE the spark</text>
      <text x="180" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">pressure spike = knock, power loss,</text>
      <text x="180" y="170" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">engine damage</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.08" stroke="rgb(16 185 129)" />
      <text x="480" y="80" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">BRANCHED fuel</text>
      <text x="480" y="106" fontSize="10" textAnchor="middle" className="fill-current text-foreground">burns smoothly behind the flame front</text>
      <text x="480" y="128" fontSize="10" textAnchor="middle" className="fill-current text-foreground">waits for the spark</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">uniform burn = high octane,</text>
      <text x="480" y="170" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">no knock</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Cracking, reforming and additives all pursue one goal: more branching, less knock</text>
    </svg>
  );
}
