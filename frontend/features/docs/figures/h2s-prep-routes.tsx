// H2S prep routes. Theme-aware.
export function H2sPrepRoutes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="Hydrogen sulphide preparation from ferrous sulphide with dilute sulphuric acid dried by phosphorus pentoxide">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">FeS + acid, dried over P₂O₅</text>
      <rect x="80" y="56" width="500" height="56" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.14" />
      <text x="330" y="80" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">FeS + dil. H₂SO₄ → FeSO₄ + H₂S↑</text>
      <text x="330" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Kipp's apparatus; upward delivery (heavier than air)</text>
      <text x="330" y="148" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">Dry with P₂O₅ or anhyd. CaCl₂ — never conc. H₂SO₄ (it oxidises H₂S)</text>
      <text x="330" y="180" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Conc. H₂SO₄ would give SO₂ + S — a drying agent that reacts is no drying agent</text>
    </svg>
  );
}
