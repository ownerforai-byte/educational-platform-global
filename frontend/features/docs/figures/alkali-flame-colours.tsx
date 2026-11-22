// AlkaliFlameColours figure. Theme-aware.
export function AlkaliFlameColours({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Flame colours of the alkali metals from crimson lithium to blue caesium">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The flame tells you who is burning</text>
      {[
        ["Li", "crimson", "rgb(220 38 38)"], ["Na", "golden-yellow 589 nm", "rgb(250 204 21)"],
        ["K", "lilac", "rgb(167 139 250)"], ["Rb", "red-violet", "rgb(192 132 252)"], ["Cs", "blue", "rgb(96 165 250)"],
      ].map(([m, col_name, hex], i) => (
        <g key={m as string}>
          <path d={`M ${50 + i * 124} 170 Q ${112 + i * 124} 60 ${174 + i * 124} 170 Z`} fill={hex as string} opacity="0.5" />
          <text x={112 + i * 124} y="188" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{m as string}</text>
          <text x={112 + i * 124} y="205" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{col_name as string}</text>
        </g>
      ))}
      <text x="330" y="46" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Excited s-electron falls back and emits its line spectrum</text>
      <text x="330" y="64" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Na D-lines overwhelm everything — view K through cobalt glass</text>
    </svg>
  );
}
