// Importance map of the equilibrium constant. Theme-aware.
export function KcImportanceMap({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["Extent of reaction", "how far the reaction goes at equilibrium", "rgb(16 185 129)"],
    ["Direction of change", "Qc vs Kc decides forward or reverse", "rgb(14 165 233)"],
    ["Thermodynamic bridge", "dG° = -RT ln K links yield to energy", "rgb(245 158 11)"],
    ["Industrial design", "Haber and contact processes tune against Kc", "rgb(168 85 247)"],
  ];
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Four uses of the equilibrium constant: extent, direction, thermodynamic link and industrial design">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Four jobs for one constant</text>
      {uses.map(([t, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 54} width="580" height="42" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={64 + i * 54} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="58" y={82 + i * 54} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="270" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Kc is simultaneously a scoreboard, a compass, an energy meter and a factory manual</text>
    </svg>
  );
}
