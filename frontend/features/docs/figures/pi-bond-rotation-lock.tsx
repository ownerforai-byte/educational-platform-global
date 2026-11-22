// PiBondRotationLock figure. Theme-aware.
export function PiBondRotationLock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Pi bond prevents free rotation locking geometrical isomers">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why C=C refuses to rotate</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">C–C single bond</text>
      <text x="180" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground">σ bond: cylindrical, free rotation</text>
      <text x="180" y="138" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">conformers interconvert — no isolation</text>
      <text x="180" y="162" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">ethane spins ~10¹¹ times per second</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">C=C double bond</text>
      <text x="480" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground">σ + π: the π cloud blocks rotation</text>
      <text x="480" y="138" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">breaking the π bond costs ~250 kJ/mol</text>
      <text x="480" y="162" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">cis and trans are locked — separable compounds</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">restricted rotation is the entire mechanism of geometrical isomerism</text>
    </svg>
  );
}
