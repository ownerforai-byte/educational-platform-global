// Resonance arrow versus equilibrium arrow contrast. Theme-aware.
export function ResonanceVsEquilibrium({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 240" className={className} role="img" aria-label="Contrast of resonance arrow which is not a chemical change with equilibrium arrow which represents a real reversible reaction">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Two arrows that look alike but mean different things</text>
      <rect x="24" y="50" width="300" height="150" rx="12" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.10" />
      <rect x="24" y="50" width="300" height="150" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="174" y="90" fontSize="26" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">&#8596;</text>
      <text x="174" y="126" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Resonance arrow</text>
      <text x="174" y="152" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">no reaction happens - one hybrid,</text>
      <text x="174" y="170" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">several bookkeeping drawings</text>
      <rect x="356" y="50" width="300" height="150" rx="12" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.10" />
      <rect x="356" y="50" width="300" height="150" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="506" y="90" fontSize="26" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">&#8652;</text>
      <text x="506" y="126" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Equilibrium arrow</text>
      <text x="506" y="152" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">real forward and reverse reactions</text>
      <text x="506" y="170" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">molecules genuinely interconvert</text>
      <text x="340" y="226" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Resonance structures never exist separately - writing them is bookkeeping, not chemistry</text>
    </svg>
  );
}
