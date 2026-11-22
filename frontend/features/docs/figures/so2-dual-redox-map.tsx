// SO2 dual redox map. Theme-aware.
export function So2DualRedoxMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Sulphur dioxide dual redox nature as reducer to sulphate and oxidiser to sulphur">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">+4: high enough to give, low enough to take</text>
      <rect x="40" y="50" width="280" height="110" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="180" y="78" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">as reducer (usual role)</text>
      <text x="180" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">2SO₂ + O₂ → 2SO₃ (V₂O₅)</text>
      <text x="180" y="126" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">SO₂ + Cl₂ + 2H₂O → H₂SO₄ + 2HCl</text>
      <text x="180" y="148" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">decolourises KMnO₄</text>
      <rect x="340" y="50" width="280" height="110" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.14" />
      <text x="480" y="78" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">as oxidiser (rare)</text>
      <text x="480" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">2H₂S + SO₂ → 3S + 2H₂O</text>
      <text x="480" y="126" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">2Mg + SO₂ → 2MgO + S</text>
      <text x="480" y="148" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">with strong reducers only</text>
      <text x="330" y="204" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Sulphur at +4 sits mid-ladder — direction depends on the partner's greed</text>
    </svg>
  );
}
