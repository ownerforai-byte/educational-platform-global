// Baso4TestPanel figure. Theme-aware.
export function Baso4TestPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Barium chloride test for sulphate ions and barium meal X-ray use">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">BaSO₄ — the test and the meal</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">THE TEST</text>
      <text x="180" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground">Ba²⁺ + SO₄²⁻ → BaSO₄↓</text>
      <text x="180" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">dense white ppt, insoluble in acid</text>
      <text x="180" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Ksp ≈ 10⁻¹⁰ — quantitative</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">THE BARIUM MEAL</text>
      <text x="480" y="112" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">insoluble → unabsorbed → safe</text>
      <text x="480" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">outlines the gut in X-ray white</text>
      <text x="480" y="156" fontSize="10" textAnchor="middle" fill="rgb(239 68 68)">Ba²⁺ absorbed would be toxic</text>
      <text x="330" y="210" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Insolubility is the safety — the same ladder that makes the test makes the meal</text>
    </svg>
  );
}
