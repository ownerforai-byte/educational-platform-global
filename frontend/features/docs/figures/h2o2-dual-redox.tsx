// H2O2 dual redox behaviour. Theme-aware.
export function H2o2DualRedox({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Hydrogen peroxide acting as oxidant with iron two plus and as reductant with permanganate">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Oxidant on Monday, reductant on Tuesday</text>
      <rect x="40" y="50" width="580" height="60" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.13" />
      <text x="60" y="76" fontSize="12.5" fontWeight="800" className="fill-current text-foreground">as oxidant (with Fe²⁺):</text>
      <text x="60" y="98" fontSize="12" fontWeight="700" fill="rgb(239 68 68)">2Fe²⁺ + H₂O₂ + 2H⁺ → 2Fe³⁺ + 2H₂O</text>
      <rect x="40" y="126" width="580" height="60" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.13" />
      <text x="60" y="152" fontSize="12.5" fontWeight="800" className="fill-current text-foreground">as reductant (with KMnO₄):</text>
      <text x="60" y="174" fontSize="12" fontWeight="700" fill="rgb(14 165 233)">2KMnO₄ + 3H₂SO₄ + 5H₂O₂ → 2MnSO₄ + K₂SO₄ + 8H₂O + 5O₂</text>
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Oxygen at −1 can climb to 0 or sink to −2: both doors are open</text>
    </svg>
  );
}
