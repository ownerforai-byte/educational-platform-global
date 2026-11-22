// HCl gastric and pickling uses. Theme-aware.
export function HclGastricPickling({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Hydrochloric acid in the stomach at pH 1.5 to 3.5 and in steel pickling baths">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The same acid digests lunch and de-scales steel</text>
      <rect x="60" y="56" width="250" height="100" rx="12" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.14" />
      <text x="185" y="86" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">in your stomach</text>
      <text x="185" y="110" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">pH 1.5–3.5, ~2 L/day</text>
      <text x="185" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">activates pepsin, kills microbes</text>
      <rect x="350" y="56" width="250" height="100" rx="12" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.14" />
      <text x="475" y="86" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">in the steel mill</text>
      <text x="475" y="110" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">pickling: dissolves oxide scale</text>
      <text x="475" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">before galvanising / rolling</text>
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">One molecule, two careers — biology and heavy industry</text>
    </svg>
  );
}
