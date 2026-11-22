// HalideSilverTests figure. Theme-aware.
export function HalideSilverTests({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Silver nitrate colour ladder for chloride bromide iodide">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Halogens — the silver nitrate colour ladder</text>
      {[
        ["Cl⁻", "white ppt", "soluble in NH₃", "rgb(148 163 184)", 40],
        ["Br⁻", "pale yellow ppt", "partly soluble", "rgb(245 158 11)", 240],
        ["I⁻", "yellow ppt", "insoluble in NH₃", "rgb(139 92 246)", 440],
      ].map(([ion, c, s, col, x]) => (
        <g key={ion as string}>
          <rect x={x as number} y="55" width="180" height="90" rx="10" fill={col as string} opacity="0.12" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="82" fontSize="13" fontWeight="800" textAnchor="middle" fill={col as string}>{ion as string}</text>
          <text x={(x as number) + 90} y="106" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{c as string}</text>
          <text x={(x as number) + 90} y="128" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{s as string}</text>
        </g>
      ))}
      <text x="330" y="180" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">acidify the extract with dilute HNO₃ first</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">acidification destroys CN⁻ and S²⁻ so they cannot fake a halide result</text>
    </svg>
  );
}
