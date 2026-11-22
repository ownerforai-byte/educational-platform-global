// H2 potential energy profile from valence bond overlap. Theme-aware.
export function H2EnergyProfile({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 320" className={className} role="img" aria-label="Energy versus internuclear distance curve for hydrogen molecule formation showing minimum at 74 picometres and bond energy 436 kilojoules per mole">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Energy dips where the overlap is best</text>
      <line x1="70" y1="40" x2="70" y2="270" stroke="currentColor" strokeWidth="1.5" />
      <line x1="70" y1="270" x2="600" y2="270" stroke="currentColor" strokeWidth="1.5" />
      <text x="30" y="160" fontSize="11" className="fill-current text-muted-foreground" transform="rotate(-90 30 160)">Potential energy</text>
      <text x="340" y="296" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">H-H internuclear distance</text>
      <path d="M 90 70 C 150 70 180 240 250 248 C 300 252 330 252 380 248 C 460 240 520 120 580 70" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="320" cy="251" r="5" className="fill-current" style={{ color: "rgb(16 185 129)" }} />
      <line x1="320" y1="251" x2="320" y2="270" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <text x="320" y="288" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">74 pm</text>
      <line x1="70" y1="251" x2="320" y2="251" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <text x="150" y="244" fontSize="10" className="fill-current text-foreground" fontWeight="700">-436 kJ per mole</text>
      <text x="400" y="120" fontSize="10.5" className="fill-current text-muted-foreground">too close: repulsion</text>
      <text x="120" y="110" fontSize="10.5" className="fill-current text-muted-foreground">too far: no overlap</text>
      <text x="320" y="236" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">bond length = energy minimum</text>
    </svg>
  );
}
