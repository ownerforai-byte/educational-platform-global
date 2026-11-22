// Lewis notation for ionic compound versus shared-pair molecule. Theme-aware.
export function LewisIonicVsMolecular({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 260" className={className} role="img" aria-label="Lewis notation contrast between bracketed ions of sodium chloride and shared electron pairs of water">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Reading Lewis notation: brackets vs shared dots</text>
      <rect x="24" y="50" width="300" height="170" rx="12" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.10" />
      <rect x="24" y="50" width="300" height="170" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="174" y="80" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Ionic: brackets and charges</text>
      <text x="174" y="130" fontSize="15" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">[ Na ]&#8314;  [ :Cl: 8 dots ]&#8315;</text>
      <text x="174" y="170" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Na shows an empty outer shell,</text>
      <text x="174" y="190" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Cl shows a full octet of dots</text>
      <rect x="356" y="50" width="300" height="170" rx="12" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.10" />
      <rect x="356" y="50" width="300" height="170" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="506" y="80" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Molecular: shared pairs</text>
      <text x="506" y="130" fontSize="15" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">H-O-H with 2 lone pairs on O</text>
      <text x="506" y="170" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">each bond line = one shared pair;</text>
      <text x="506" y="190" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">dots stay on the owning atom</text>
    </svg>
  );
}
