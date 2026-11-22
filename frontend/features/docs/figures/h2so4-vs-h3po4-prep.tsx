// H2SO4 vs H3PO4 preparation choice. Theme-aware.
export function H2so4VsH3po4Prep({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Choice of sulphuric acid for hydrogen chloride and phosphoric acid for hydrogen bromide and iodide">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Pick the acid to match the halide</text>
      <rect x="40" y="50" width="280" height="110" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="180" y="78" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">conc. H₂SO₄ works for Cl⁻</text>
      <text x="180" y="102" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">NaCl + H₂SO₄ → NaHSO₄ + HCl</text>
      <text x="180" y="124" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Cl⁻ too weak a reducer to be oxidised</text>
      <text x="180" y="146" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">clean gas distils off</text>
      <rect x="340" y="50" width="280" height="110" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.14" />
      <text x="480" y="78" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">conc. H₃PO₄ for Br⁻ and I⁻</text>
      <text x="480" y="102" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">KBr/KI + H₃PO₄ → KH₂PO₄ + HX</text>
      <text x="480" y="124" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">H₂SO₄ would oxidise to Br₂/I₂</text>
      <text x="480" y="146" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">non-oxidising acid preserves the halide</text>
      <text x="330" y="206" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The acid's oxidising power, dormant against Cl⁻, wakes against Br⁻ and I⁻</text>
    </svg>
  );
}
