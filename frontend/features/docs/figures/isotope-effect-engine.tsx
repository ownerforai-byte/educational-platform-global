// Isotope effect engine of D2O enrichment. Theme-aware.
export function IsotopeEffectEngine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Diagram of the isotope effect where O-H bonds break faster than O-D bonds during electrolysis">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The isotope effect: speed decides the split</text>
      <rect x="60" y="56" width="250" height="70" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.16" />
      <text x="185" y="86" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">O–H bond</text>
      <text x="185" y="110" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">lower reduced mass → breaks faster</text>
      <rect x="350" y="56" width="250" height="70" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.16" />
      <text x="475" y="86" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(14 165 233)">O–D bond</text>
      <text x="475" y="110" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">heavier, lower zero-point energy → slower</text>
      <text x="330" y="164" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">⇒ at the cathode, H₂ escapes first; D stays in solution</text>
      <text x="330" y="200" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Electrolysis sorts isotopes by reaction speed - the basis of heavy-water plants</text>
    </svg>
  );
}
