// Viscosity mountain curve. Theme-aware.
export function ViscosityMountainCurve({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Viscosity of molten sulphur rising to a maximum near 200 degrees then falling as chains break">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The viscosity mountain</text>
      <path d="M 100 170 Q 200 168 280 150 Q 360 40 440 100 Q 500 140 570 150" stroke="rgb(245 158 11)" strokeWidth="3" fill="none" />
      <line x1="90" y1="180" x2="590" y2="180" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
      <text x="330" y="30" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">peak ≈ 200 °C: S₈ rings open into long chains, entangle</text>
      <text x="520" y="128" fontSize="10" textAnchor="middle" fill="rgb(16 185 129)">chains shorten again</text>
      <text x="120" y="196" fontSize="10" className="fill-current text-muted-foreground">119 °C</text>
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Rings → chains → shorter chains: one curve, three stories</text>
    </svg>
  );
}
