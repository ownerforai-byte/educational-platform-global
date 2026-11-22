// Dobson unit column concept. Theme-aware.
export function DobsonColumnPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Dobson unit concept: total column ozone measured as thickness of pure ozone at STP, one DU equals one hundredth of a millimetre">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">DU: ozone measured as a squeezed column</text>
      <rect x="80" y="60" width="500" height="50" rx="8" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.12" />
      <text x="330" y="90" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">the whole atmosphere's ozone, squeezed to pure O₃ at STP</text>
      <rect x="80" y="120" width="150" height="34" rx="6" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.3" />
      <text x="155" y="142" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">300 DU ≈ 3 mm</text>
      <text x="330" y="190" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">1 DU = 0.01 mm of pure ozone at STP</text>
      <text x="330" y="216" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The shield protecting you is thinner than a coin - and a hole means below 220 DU</text>
    </svg>
  );
}
