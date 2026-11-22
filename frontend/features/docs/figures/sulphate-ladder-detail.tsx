// SulphateLadderDetail figure. Theme-aware.
export function SulphateLadderDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Detailed sulphate solubility ladder with solubility product of barium sulphate">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Sulphates — the collapsing ladder</text>
      {[
        ["MgSO₄", "soluble", 0.9, "rgb(16 185 129)"],
        ["CaSO₄", "sparingly (gypsum)", 0.4, "rgb(245 158 11)"],
        ["SrSO₄", "very sparingly", 0.15, "rgb(239 68 68)"],
        ["BaSO₄", "2.4 mg/L · Ksp ≈ 10⁻¹⁰", 0.05, "rgb(59 130 246)"],
      ].map(([s, note, w, col], i) => (
        <g key={s as string}>
          <text x="60" y={60 + i * 34} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{s as string}</text>
          <rect x="160" y={48 + i * 34} width={(w as number) * 320} height="16" rx="4" fill={col as string} opacity="0.6" />
          <text x={170 + (w as number) * 320} y={61 + i * 34} fontSize="9.5" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="330" y="192" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Large SO₄²⁻ keeps the lattice high while hydration income shrinks — free energy turns positive</text>
      <text x="330" y="214" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">One drop of BaCl₂ precipitates essentially every sulphate ion</text>
    </svg>
  );
}
