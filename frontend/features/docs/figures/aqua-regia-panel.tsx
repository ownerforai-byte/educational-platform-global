// Aqua regia panel. Theme-aware.
export function AquaRegiaPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Aqua regia three parts hydrochloric acid to one part nitric acid dissolving gold and platinum via nascent chlorine and nitrosyl chloride">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Aqua regia: the king-dissolver</text>
      <rect x="60" y="56" width="240" height="56" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.16" />
      <text x="180" y="80" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">3 parts conc. HCl</text>
      <text x="180" y="100" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">: 1 part conc. HNO₃</text>
      <rect x="360" y="56" width="240" height="56" rx="10" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.16" />
      <text x="480" y="80" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">dissolves Au and Pt</text>
      <text x="480" y="100" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">via Cl₂ + NOCl in situ</text>
      <text x="330" y="160" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">HNO₃ + 3HCl → NOCl + 2Cl₂ + 2H₂O (freshly prepared only)</text>
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Neither acid alone touches gold - teamwork supplies nascent chlorine</text>
    </svg>
  );
}
