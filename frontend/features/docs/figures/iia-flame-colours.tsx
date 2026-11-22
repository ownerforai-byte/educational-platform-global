// IiaFlameColours figure. Theme-aware.
export function IiaFlameColours({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Flame colours of group two with beryllium and magnesium showing none">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Flame colours — three glow, two refuse</text>
      {[
        ["Be", "no colour", "rgb(148 163 184)"], ["Mg", "no colour", "rgb(148 163 184)"],
        ["Ca", "brick-red", "rgb(234 88 12)"], ["Sr", "crimson", "rgb(220 38 38)"], ["Ba", "apple-green", "rgb(22 163 74)"],
      ].map(([m, col_name, hex], i) => (
        <g key={m as string}>
          <path d={`M ${50 + i * 124} 170 Q ${112 + i * 124} 60 ${174 + i * 124} 170 Z`} fill={hex as string} opacity={(i < 2 ? 0.15 : 0.5)} />
          <text x={112 + i * 124} y="188" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{m as string}</text>
          <text x={112 + i * 124} y="205" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{col_name as string}</text>
        </g>
      ))}
      <text x="330" y="46" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Be and Mg: IE 899 / 738 kJ/mol — flame energy cannot excite their electrons</text>
      <text x="330" y="64" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Sr crimson = emergency flares; Ba green = fireworks</text>
    </svg>
  );
}
