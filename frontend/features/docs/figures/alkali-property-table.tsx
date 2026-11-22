// AlkaliPropertyTable figure. Theme-aware.
export function AlkaliPropertyTable({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Physical property table of the alkali metals with melting points and densities">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Physical facts of Group IA</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["M", "mp °C", "g/mL", "flame", "on water"],
        ["Li", "181", "0.53", "crimson", "floats, fizzes"],
        ["Na", "98", "0.97", "golden-yellow", "floats, burns"],
        ["K", "63", "0.86", "lilac", "floats, ignites"],
        ["Rb", "39", "1.53", "red-violet", "sinks, explodes"],
        ["Cs", "28", "1.93", "blue", "sinks, explodes"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2, 3, 4].map((c) => (
            <text key={c} x={45 + c * 118} y={72 + i * 26} fontSize={i ? "11" : "10.5"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={80 + i * 26} x2="620" y2={80 + i * 26} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="224" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">mp falls steadily; density rises with the famous Na/K dip below 1 — they float</text>
    </svg>
  );
}
