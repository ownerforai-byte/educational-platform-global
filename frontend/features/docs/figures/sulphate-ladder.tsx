// SulphateLadder figure. Theme-aware.
export function SulphateLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Sulphate solubility ladder from soluble magnesium sulphate to insoluble barium sulphate">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The sulphate ladder — down and down</text>
      {[
        ["MgSO₄", "soluble (Epsom salt)", 0.9, "rgb(16 185 129)"],
        ["CaSO₄", "sparingly (gypsum)", 0.45, "rgb(245 158 11)"],
        ["SrSO₄", "very sparingly", 0.2, "rgb(239 68 68)"],
        ["BaSO₄", "2.4 mg/L — practically insoluble", 0.07, "rgb(59 130 246)"],
      ].map(([s, note, w, col], i) => (
        <g key={s as string}>
          <text x="60" y={60 + i * 34} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{s as string}</text>
          <rect x="150" y={48 + i * 34} width={(w as number) * 300} height="16" rx="4" fill={col as string} opacity="0.6" />
          <text x={160 + (w as number) * 300} y={61 + i * 34} fontSize="9.5" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Lattice (big SO₄²⁻ dominates) barely falls; hydration of M²⁺ falls fast → solubility sinks</text>
      <text x="330" y="218" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">BaCl₂ test for SO₄²⁻ · BaSO₄ = the safe barium meal</text>
    </svg>
  );
}
