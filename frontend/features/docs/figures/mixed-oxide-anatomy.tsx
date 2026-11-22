// Mixed oxide anatomy Fe3O4. Theme-aware.
export function MixedOxideAnatomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Mixed oxides written as combinations of simpler oxides with magnetite and red lead examples">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Two oxides, one lattice</text>
      <rect x="60" y="52" width="240" height="60" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.15" />
      <text x="180" y="80" fontSize="15" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Fe₃O₄ (magnetite)</text>
      <text x="180" y="102" fontSize="12" textAnchor="middle" fill="rgb(59 130 246)">= FeO · Fe₂O₃</text>
      <rect x="360" y="52" width="240" height="60" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.15" />
      <text x="480" y="80" fontSize="15" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Pb₃O₄ (red lead)</text>
      <text x="480" y="102" fontSize="12" textAnchor="middle" fill="rgb(239 68 68)">= 2PbO · PbO₂</text>
      <text x="330" y="160" fontSize="11.5" textAnchor="middle" className="fill-current text-muted-foreground">The same metal in two oxidation states, packed into one compound</text>
      <text x="330" y="190" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Fe(II) + Fe(III) coexist; Pb(II) ×2 + Pb(IV) coexist</text>
    </svg>
  );
}
