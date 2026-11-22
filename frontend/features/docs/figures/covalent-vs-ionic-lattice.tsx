// CovalentVsIonicLattice figure. Theme-aware.
export function CovalentVsIonicLattice({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Discrete covalent molecules versus ionic lattice structures">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Molecules vs lattices — the root difference</text>
      <rect x="40" y="55" width="280" height="130" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="180" y="80" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">ORGANIC: discrete molecules</text>
      {[[110, 120], [170, 105], [230, 130], [140, 155], [210, 165]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="13" fill="rgb(59 130 246)" opacity="0.35" />
          <circle cx={cx + 16} cy={cy + 4} r="7" fill="rgb(16 185 129)" opacity="0.35" />
        </g>
      ))}
      <text x="180" y="200" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">weak forces between molecules → low m.p./b.p.</text>
      <rect x="340" y="55" width="280" height="130" rx="10" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" />
      <text x="480" y="80" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">INORGANIC: ionic lattice</text>
      {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => (
        <circle key={r + "-" + c} cx={390 + c * 60} cy={100 + r * 26} r="10" fill={(r + c) % 2 ? "rgb(239 68 68)" : "rgb(59 130 246)"} opacity="0.45" />
      )))}
      <text x="480" y="200" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">strong electrostatics throughout → high m.p./b.p.</text>
      <text x="330" y="226" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">One structural fact explains the whole comparison table</text>
    </svg>
  );
}
