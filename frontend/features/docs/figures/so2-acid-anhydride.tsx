// SO2 acid anhydride. Theme-aware.
export function So2AcidAnhydride({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Sulphur dioxide as acid anhydride of sulphurous acid forming bisulphite and sulphite in alkali">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Acidic oxide: anhydride of H₂SO₃</text>
      <rect x="80" y="56" width="500" height="56" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.14" />
      <text x="330" y="80" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">SO₂ + H₂O ⇌ H₂SO₃ (weak, dibasic)</text>
      <text x="330" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">turns moist blue litmus red; burns the nose</text>
      <rect x="80" y="126" width="500" height="50" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="330" y="148" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">SO₂ + 2NaOH → Na₂SO₃ + H₂O</text>
      <text x="330" y="166" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">NaHSO₃ with limited alkali — bisulphite salts for food</text>
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The acid-anhydride behaviour is what makes it a preservative: HSO₃⁻ scavenges O₂</text>
    </svg>
  );
}
