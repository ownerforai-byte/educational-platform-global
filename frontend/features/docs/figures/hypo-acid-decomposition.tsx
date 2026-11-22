// Hypo acid decomposition. Theme-aware.
export function HypoAcidDecomposition({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Thiosulphate with dilute acid giving sulphur dioxide precipitated sulphur and water with milkiness">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Acid + hypo = the milky test</text>
      <rect x="80" y="56" width="500" height="56" rx="10" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.15" />
      <text x="330" y="80" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">S₂O₃²⁻ + 2H⁺ → SO₂↑ + S↓ + H₂O</text>
      <text x="330" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">the +5 S stays as SO₂; the −2 S precipitates as yellow S</text>
      <text x="330" y="150" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">Milky suspension + pungent gas = thiosulphate confirmed</text>
      <text x="330" y="184" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The disproportionation is instant — unlike carbonate, no fizzing CO₂</text>
    </svg>
  );
}
