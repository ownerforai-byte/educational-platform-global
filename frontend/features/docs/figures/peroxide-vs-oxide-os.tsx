// Peroxide vs normal oxide oxidation states. Theme-aware.
export function PeroxideVsOxideOs({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Comparison of oxygen oxidation states in normal oxides, peroxides and superoxides">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Count oxygen's charge before labelling</text>
      <rect x="40" y="50" width="180" height="90" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.14" />
      <text x="130" y="80" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">normal oxide</text>
      <text x="130" y="106" fontSize="15" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">O = −2</text>
      <text x="130" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Na₂O, CuO</text>
      <rect x="240" y="50" width="180" height="90" rx="10" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.16" />
      <text x="330" y="80" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">peroxide</text>
      <text x="330" y="106" fontSize="15" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">O = −1 (O₂²⁻)</text>
      <text x="330" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Na₂O₂, BaO₂, H₂O₂</text>
      <rect x="440" y="50" width="180" height="90" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.14" />
      <text x="530" y="80" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">superoxide</text>
      <text x="530" y="106" fontSize="15" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">O = −½ (O₂⁻)</text>
      <text x="530" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">KO₂</text>
      <text x="330" y="190" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Test: peroxides give H₂O₂ with water/acid - Na₂O₂ + 2H₂O → 2NaOH + H₂O₂</text>
      <text x="330" y="214" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">dioxides like MnO₂ do not</text>
    </svg>
  );
}
