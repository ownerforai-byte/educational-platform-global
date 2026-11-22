// HI reducing H2SO4 self-defeating prep. Theme-aware.
export function HiReducesH2so4({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Hydrogen iodide reducing concentrated sulphuric acid to iodine and sulphur dioxide contaminating its own preparation">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The acid that eats its own product</text>
      <rect x="60" y="60" width="540" height="70" rx="10" className="fill-current" style={{ color: "rgb(124 58 237)" }} opacity="0.15" />
      <text x="330" y="90" fontSize="13.5" fontWeight="800" textAnchor="middle" fill="rgb(124 58 237)">2HI + H₂SO₄(conc) → I₂ + SO₂ + 2H₂O</text>
      <text x="330" y="114" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">violet iodine vapour + SO₂ contamination — preparation ruined</text>
      <text x="330" y="170" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">I⁻ is such a strong reducer that it strips the sulphate itself</text>
      <text x="330" y="198" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">⇒ use KI + conc. H₃PO₄ (non-oxidising) instead</text>
    </svg>
  );
}
