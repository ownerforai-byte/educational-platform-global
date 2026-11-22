// Extended hybridisations: SF6 sp3d2 octahedral and IF7 sp3d3 pentagonal bipyramidal. Theme-aware.
export function ExtendedHybridPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 260" className={className} role="img" aria-label="Extended hybridisation panel with sulphur hexafluoride sp3d2 octahedral and iodine heptafluoride sp3d3 pentagonal bipyramidal shapes">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Beyond s and p: d orbitals join (NEB 2024)</text>
      <rect x="24" y="50" width="300" height="170" rx="12" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.08" />
      <rect x="24" y="50" width="300" height="170" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="174" y="80" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SF6 - sp3d2</text>
      <text x="174" y="116" fontSize="12" textAnchor="middle" className="fill-current text-foreground">6 domains, octahedral</text>
      <text x="174" y="142" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">all F-S-F angles 90 degrees</text>
      <text x="174" y="168" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">two d orbitals join the mix</text>
      <rect x="356" y="50" width="300" height="170" rx="12" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.08" />
      <rect x="356" y="50" width="300" height="170" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="506" y="80" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">IF7 - sp3d3</text>
      <text x="506" y="116" fontSize="12" textAnchor="middle" className="fill-current text-foreground">7 domains, pentagonal bipyramidal</text>
      <text x="506" y="142" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">5 equatorial at 72, 2 axial at 90</text>
      <text x="506" y="168" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">three d orbitals join the mix</text>
      <text x="340" y="244" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Same rule at every size: number of hybrids equals number of electron domains</text>
    </svg>
  );
}
