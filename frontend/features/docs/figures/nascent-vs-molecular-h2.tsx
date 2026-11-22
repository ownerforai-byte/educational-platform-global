// Nascent vs molecular hydrogen reducing power. Theme-aware.
export function NascentVsMolecularH2({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Comparison of mild molecular hydrogen needing heat with powerful nascent hydrogen reducing permanganate cold">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Two hydrogens, two powers</text>
      <rect x="40" y="50" width="280" height="130" rx="10" className="fill-current" style={{ color: "rgb(148 163 184)" }} opacity="0.14" />
      <text x="60" y="76" fontSize="13" fontWeight="800" className="fill-current text-foreground">molecular H₂ (H–H)</text>
      <text x="60" y="98" fontSize="11" className="fill-current text-muted-foreground">must pay 436 kJ/mol bond cost</text>
      <text x="60" y="118" fontSize="11" className="fill-current text-muted-foreground">reduces only heated oxides:</text>
      <text x="60" y="138" fontSize="11.5" fontWeight="700" fill="rgb(148 163 184)">CuO + H₂ → Cu + H₂O (Δ)</text>
      <text x="60" y="162" fontSize="10.5" className="fill-current text-muted-foreground">KMnO₄ untouched cold</text>
      <rect x="340" y="50" width="280" height="130" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.16" />
      <text x="360" y="76" fontSize="13" fontWeight="800" className="fill-current text-foreground">nascent [H] (atoms)</text>
      <text x="360" y="98" fontSize="11" className="fill-current text-muted-foreground">bond energy spent instantly</text>
      <text x="360" y="118" fontSize="11" className="fill-current text-muted-foreground">reduces cold:</text>
      <text x="360" y="138" fontSize="11.5" fontWeight="700" fill="rgb(16 185 129)">KMnO₄, K₂Cr₂O₇, C₆H₅NO₂</text>
      <text x="360" y="162" fontSize="10.5" className="fill-current text-muted-foreground">pink colour discharged at once</text>
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Zn + dil H₂SO₄ → ZnSO₄ + 2[H] - born in situ, never stored</text>
      <text x="330" y="244" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The whole difference is an energy bill: 436 kJ/mol paid or unpaid</text>
    </svg>
  );
}
