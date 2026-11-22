// OctaneScalePanel figure. Theme-aware.
export function OctaneScalePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Octane number scale from n-heptane zero to iso-octane hundred">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Octane number — petrol's knock resistance</text>
      <line x1="80" y1="120" x2="580" y2="120" stroke="rgb(148 163 184)" strokeWidth="4" />
      <circle cx="80" cy="120" r="10" fill="rgb(239 68 68)" />
      <text x="80" y="150" fontSize="10.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">0</text>
      <text x="80" y="100" fontSize="10" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">n-heptane</text>
      <text x="80" y="170" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">straight chain, knocks</text>
      <circle cx="580" cy="120" r="10" fill="rgb(16 185 129)" />
      <text x="580" y="150" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">100</text>
      <text x="580" y="100" fontSize="10" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">iso-octane</text>
      <text x="580" y="170" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">2,2,4-trimethylpentane</text>
      <circle cx="330" cy="120" r="8" fill="rgb(59 130 246)" />
      <text x="330" y="150" fontSize="10" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">pump petrol 87–95</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">rating = % iso-octane in the matching mixture with n-heptane</text>
      <text x="330" y="226" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">branched + aromatic = high · straight = low</text>
    </svg>
  );
}
