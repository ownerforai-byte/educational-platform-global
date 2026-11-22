// BenzeneKekulePair figure. Theme-aware.
export function BenzeneKekulePair({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Benzene two Kekule structures resonating to equal bonds">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Benzene: the two Kekulé forms</text>
      <rect x="40" y="50" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Kekulé I</text>
      <circle cx="180" cy="120" r="42" fill="none" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="180" y="126" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">=–=</text>
      <text x="180" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">alternating double bonds, set A</text>
      <rect x="340" y="50" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">Kekulé II</text>
      <circle cx="480" cy="120" r="42" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="480" y="126" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">–=–</text>
      <text x="480" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">the double bonds swap positions</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">hybrid: all six C–C bonds equal at 1.39 Å</text>
    </svg>
  );
}
