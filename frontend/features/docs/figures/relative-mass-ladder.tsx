// Relative atomic and molecular mass ladder. Theme-aware.
export function RelativeMassLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Relative mass ladder atomic mass of elements times subscripts gives molecular mass water eighteen carbon dioxide forty four">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">From atomic masses to molecular mass — one ladder</text>
      {[
        ["H = 1, O = 16 (atomic masses)", 44],
        ["H₂O: 2(1) + 16 = 18 (molecular mass)", 96],
        ["CO₂: 12 + 2(16) = 44", 148],
      ].map(([t, y], i) => (
        <g key={String(t)}>
          <rect x="30" y={Number(y)} width="660" height="42" rx="10" className="fill-current" style={{ color: ["rgb(14 165 233 / 0.9)", "rgb(16 185 129 / 0.9)", "rgb(139 92 246 / 0.9)"][i] }} opacity="0.1" />
          <rect x="30" y={Number(y)} width="660" height="42" rx="10" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ color: ["rgb(14 165 233 / 0.9)", "rgb(16 185 129 / 0.9)", "rgb(139 92 246 / 0.9)"][i] }} />
          <text x="46" y={Number(y) + 26} fontSize="10" className="fill-current text-foreground" fontWeight="800">{String(t)}</text>
        </g>
      ))}
      <rect x="30" y="198" width="660" height="16" rx="0" />
      <text x="360" y="212" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Method: multiply each element's atomic mass by its subscript, then add. Bracketed groups count the whole bracket per multiplier.</text>
    </svg>
  );
}
