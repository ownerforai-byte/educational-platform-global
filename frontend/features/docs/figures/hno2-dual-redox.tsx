// HNO2 dual redox behaviour. Theme-aware.
export function Hno2DualRedox({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Nitrous acid acting as oxidant with hydrogen iodide and as reductant with acidified permanganate">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">HNO₂ at +3: can go up or down</text>
      <rect x="40" y="50" width="580" height="60" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.13" />
      <text x="60" y="76" fontSize="12.5" fontWeight="800" className="fill-current text-foreground">as oxidant (N: +3 → +2):</text>
      <text x="60" y="98" fontSize="12" fontWeight="700" fill="rgb(239 68 68)">2HNO₂ + 2HI → 2NO + I₂ + 2H₂O</text>
      <rect x="40" y="126" width="580" height="60" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.13" />
      <text x="60" y="152" fontSize="12.5" fontWeight="800" className="fill-current text-foreground">as reductant (N: +3 → +5):</text>
      <text x="60" y="174" fontSize="12" fontWeight="700" fill="rgb(14 165 233)">5HNO₂ + 2KMnO₄ + 3H₂SO₄ → 5HNO₃ + 2MnSO₄ + K₂SO₄ + 3H₂O</text>
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The mid-oxidation-state signature - the same trick H₂O₂ plays</text>
    </svg>
  );
}
