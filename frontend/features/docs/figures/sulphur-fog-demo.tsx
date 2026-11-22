// Sulphur fog demo. Theme-aware.
export function SulphurFogDemo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Sulphur fog demonstration mixing hydrogen sulphide and sulphur dioxide to precipitate fine sulphur">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The sulphur fog demo</text>
      <rect x="80" y="60" width="180" height="60" rx="10" className="fill-current" style={{ color: "rgb(124 58 237)" }} opacity="0.14" />
      <text x="170" y="95" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(124 58 237)">jar of H₂S</text>
      <rect x="400" y="60" width="180" height="60" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.14" />
      <text x="490" y="95" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">jar of SO₂</text>
      <path d="M 265 90 L 395 90" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" markerEnd="url(#asd)" />
      <ellipse cx="330" cy="140" rx="120" ry="22" className="fill-current" style={{ color: "rgb(253 224 71)" }} opacity="0.5" />
      <text x="330" y="145" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">fine yellow S mist</text>
      <defs><marker id="asd" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="currentColor" className="text-muted-foreground" /></marker></defs>
      <text x="330" y="192" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">2H₂S + SO₂ → 3S + 2H₂O — one gas oxidises, the other reduces, sulphur is born</text>
    </svg>
  );
}
