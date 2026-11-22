// Ortho versus para nitrophenol hydrogen bonding contrast. Theme-aware.
export function NitrophenolContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 280" className={className} role="img" aria-label="Contrast of ortho nitrophenol intramolecular hydrogen bond making it steam volatile with para nitrophenol intermolecular hydrogen bonding giving high boiling point">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Same formula, different H-bond architecture</text>
      <rect x="24" y="50" width="300" height="190" rx="12" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.10" />
      <rect x="24" y="50" width="300" height="190" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="174" y="80" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ortho - intramolecular</text>
      <circle cx="174" cy="140" r="34" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="174" y1="106" x2="174" y2="174" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 3" />
      <text x="174" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">O-H...O inside one molecule,</text>
      <text x="174" y="218" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">chelate ring - steam-volatile, low bp</text>
      <rect x="356" y="50" width="300" height="190" rx="12" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.10" />
      <rect x="356" y="50" width="300" height="190" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="506" y="80" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">para - intermolecular</text>
      <circle cx="446" cy="140" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="566" cy="140" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="478" y1="140" x2="534" y2="140" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 3" />
      <text x="506" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">molecules link to each other -</text>
      <text x="506" y="218" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">associated, high bp, not steam-volatile</text>
      <text x="340" y="264" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">An H-bond spent inside a molecule is unavailable for holding neighbours</text>
    </svg>
  );
}
