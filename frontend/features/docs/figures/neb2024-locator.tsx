// Solved NEB 2024: locate Z = 19, 20, 31, 36, 55. Theme-aware.
export function Neb2024Locator({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["Z = 19", "K", "Group 1, period 4", "[Ar] 4s¹ — s-block"],
    ["Z = 20", "Ca", "Group 2, period 4", "[Ar] 4s² — s-block"],
    ["Z = 31", "Ga", "Group 13, period 4", "[Ar] 4s² 3d¹⁰ 4p¹ — p-block"],
    ["Z = 36", "Kr", "Group 18, period 4", "[Ar] 4s² 3d¹⁰ 4p⁶ — noble gas"],
    ["Z = 55", "Cs", "Group 1, period 6", "[Xe] 6s¹ — s-block"],
  ];
  return (
    <svg viewBox="0 0 720 250" className={className} role="img" aria-label="Solved NEB 2024 locating elements potassium calcium gallium krypton caesium by atomic number with group period and block">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — NEB 2024 (3m): name and place Z = 19, 20, 31, 36, 55</text>
      {rows.map(([z, sym, place, cfg], i) => (
        <g key={z}>
          <rect x="30" y={38 + i * 34} width="660" height="28" rx="7" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={57 + i * 34} fontSize="9" className="fill-current text-sky-600" fontWeight="800">{z}</text>
          <text x="120" y={57 + i * 34} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{sym}</text>
          <text x="220" y={57 + i * 34} fontSize="8.6" className="fill-current text-foreground" fontWeight="700">{place}</text>
          <text x="674" y={57 + i * 34} fontSize="8" textAnchor="end" className="fill-current text-muted-foreground">{cfg}</text>
        </g>
      ))}
      <rect x="30" y="216" width="660" height="22" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="231" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Method: write the configuration, read the block from the last subshell, count the group by block rules (s: 1–2, p: 12 + p-electrons, d: 2 + d-electrons).</text>
    </svg>
  );
}
