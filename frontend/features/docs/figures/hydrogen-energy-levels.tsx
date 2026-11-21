// Hydrogen energy-level ladder with the spectral series. Theme-aware.
export function HydrogenEnergyLevels({ className }: { className?: string }) {
  const levels: [string, number, string][] = [
    ["n = ∞  E = 0 (ionisation)", 40, ""],
    ["n = 5", 88, "−0.54 eV"],
    ["n = 4", 128, "−0.85 eV"],
    ["n = 3", 168, "−1.51 eV"],
    ["n = 2", 218, "−3.40 eV"],
    ["n = 1", 288, "−13.60 eV"],
  ];
  return (
    <svg viewBox="0 0 720 330" className={className} role="img" aria-label="Hydrogen energy level ladder showing Lyman Balmer Paschen series transitions between quantised orbits with energies in electron volts">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Hydrogen energy levels — every line is one downward jump</text>
      {levels.map(([label, y, e]) => (
        <g key={label}>
          <line x1="60" y1={y} x2="470" y2={y} className="stroke-current text-foreground" strokeWidth="1.6" style={{ color: "rgb(120 120 130 / 0.85)" }} />
          <text x="16" y={y + 4} fontSize="9.5" className="fill-current text-foreground" fontWeight="700">{label}</text>
          {e && <text x="478" y={y + 4} fontSize="9" className="fill-current text-muted-foreground">{e}</text>}
        </g>
      ))}
      {[
        ["Lyman (n₁ = 1) — UV", 478, 60, 288, "rgb(139 92 246 / 0.9)"],
        ["Balmer (n₁ = 2) — visible", 548, 218, 288, "rgb(37 99 235 / 0.9)"],
        ["Paschen (n₁ = 3) — IR", 620, 168, 288, "rgb(220 38 38 / 0.9)"],
      ].map(([label, x, y1, y2, color]) => (
        <g key={String(label)}>
          <line x1={Number(x)} y1={Number(y1)} x2={Number(x)} y2={Number(y2)} className="stroke-current" strokeWidth="2.4" style={{ color: String(color) }} markerEnd="url(#harrow)" />
          <text x={Number(x) - 4} y={Number(y1) - 8} fontSize="8.5" textAnchor="end" className="fill-current" style={{ color: String(color) }} fontWeight="700">{String(label)}</text>
        </g>
      ))}
      <defs>
        <marker id="harrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" className="fill-current" /></marker>
      </defs>
      <rect x="30" y="300" width="660" height="24" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="316" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Brackett (n₁ = 4) and Pfund (n₁ = 5) continue the same ladder deeper into the infrared — one series per landing level.</text>
    </svg>
  );
}
