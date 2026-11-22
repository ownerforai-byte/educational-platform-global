// StereoBranchOverview figure. Theme-aware.
export function StereoBranchOverview({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Two types of stereoisomerism geometrical and optical">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Stereoisomerism — two types</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">GEOMETRICAL (cis–trans)</text>
      <text x="180" y="106" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">restricted rotation (C=C)</text>
      <text x="180" y="130" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">groups locked on the same or opposite side</text>
      <text x="180" y="154" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">example: but-2-ene</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">OPTICAL (d / l)</text>
      <text x="480" y="106" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">a chiral carbon (4 different groups)</text>
      <text x="480" y="130" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">mirror images rotate plane-polarised light</text>
      <text x="480" y="154" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">example: lactic acid</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">stereo-isomers are wired identically — only the 3-D arrangement differs</text>
    </svg>
  );
}
