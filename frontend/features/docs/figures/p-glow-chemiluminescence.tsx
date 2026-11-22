// Phosphorus glow chemiluminescence. Theme-aware.
export function PGlowChemiluminescence({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="White phosphorus glowing in dark air by slow oxidation with phosphorus trioxide and ozone products">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Why white phosphorus glows</text>
      <rect x="70" y="60" width="520" height="70" rx="10" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.14" />
      <text x="330" y="90" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">slow oxidation in moist air → pale green glow</text>
      <text x="330" y="114" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">P₄ + 3O₂ → P₄O₆ (partial); excited P₂O₄ fragments emit light</text>
      <text x="330" y="160" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">Chemiluminescence — light from a chemical reaction, not from heat</text>
      <text x="330" y="192" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Why it must be kept under water: cut off O₂, cut off both the glow and the fire</text>
    </svg>
  );
}
