// Catalyst speeds arrival but does not shift equilibrium. Theme-aware.
export function CatalystNoShift({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="A catalyst shortens the time to reach equilibrium but leaves the final composition and Kc unchanged">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Catalyst: faster arrival, same destination</text>
      <line x1="70" y1="200" x2="620" y2="200" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
      <line x1="70" y1="200" x2="70" y2="50" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
      <text x="34" y="130" fontSize="11" className="fill-current text-muted-foreground" transform="rotate(-90 34 130)">[product]</text>
      <text x="345" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">time</text>
      <path d="M 70 190 Q 220 60 400 55" fill="none" stroke="rgb(148 163 184)" strokeWidth="3" strokeDasharray="7 5" />
      <text x="240" y="80" fontSize="11.5" className="fill-current text-muted-foreground">without catalyst (slow)</text>
      <path d="M 70 190 Q 150 60 240 55" fill="none" stroke="rgb(16 185 129)" strokeWidth="3" />
      <text x="86" y="72" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)">with catalyst (fast)</text>
      <line x1="240" y1="55" x2="620" y2="55" stroke="rgb(16 185 129)" strokeWidth="1.4" strokeDasharray="4 4" />
      <text x="470" y="46" fontSize="11.5" fontWeight="800" className="fill-current text-foreground">same plateau - same Kc</text>
      <text x="330" y="244" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">kf and kr rise equally, so their ratio Kc never moves</text>
    </svg>
  );
}
