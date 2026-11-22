// Rotation lock: ethane rotates, ethene cannot. Theme-aware.
export function RotationLockPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 260" className={className} role="img" aria-label="Rotation lock contrast showing ethane single bond rotates freely while ethene double bond is locked by the pi bond enabling cis trans isomers">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Rotation: free with sigma, locked with pi</text>
      <rect x="24" y="50" width="300" height="170" rx="12" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.10" />
      <rect x="24" y="50" width="300" height="170" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="174" y="80" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Ethane C-C: rotates</text>
      <text x="174" y="120" fontSize="22" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">&#8635;</text>
      <text x="174" y="156" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">one sigma bond - twisting costs</text>
      <text x="174" y="174" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">nothing, conformers interconvert</text>
      <rect x="356" y="50" width="300" height="170" rx="12" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.10" />
      <rect x="356" y="50" width="300" height="170" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="506" y="80" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Ethene C=C: locked</text>
      <text x="506" y="120" fontSize="22" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">&#8898;</text>
      <text x="506" y="156" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">twisting destroys the sideways</text>
      <text x="506" y="174" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">p overlap - cis and trans isomers</text>
      <text x="340" y="244" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The pi bond is the gatekeeper of geometric isomerism</text>
    </svg>
  );
}
