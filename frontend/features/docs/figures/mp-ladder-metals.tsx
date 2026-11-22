// Melting point ladder across period 3 metals: Na, Mg, Al. Theme-aware.
export function MpLadderMetals({ className }: { className?: string }) {
  const cols: [string, number, string][] = [
    ["Na", 98, "1 valence electron, 1+ core"],
    ["Mg", 650, "2 valence electrons, 2+ core"],
    ["Al", 660, "3 valence electrons, 3+ core"],
  ];
  return (
    <svg viewBox="0 0 640 300" className={className} role="img" aria-label="Melting point ladder for sodium magnesium and aluminium at 98 650 and 660 degrees Celsius rising with valence electrons and cation charge">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">More electrons in the sea, stronger the hold</text>
      <line x1="80" y1="240" x2="560" y2="240" stroke="currentColor" strokeWidth="1.5" />
      {cols.map(([sym, mp, note], i) => {
        const h = (mp / 660) * 170;
        return (
          <g key={i}>
            <rect x={120 + i * 140} y={240 - h} width="70" height={h} className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.28" />
            <text x={155 + i * 140} y={232 - h} fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{mp} C</text>
            <text x={155 + i * 140} y="264" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{sym}</text>
            <text x={155 + i * 140} y="284" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{note}</text>
          </g>
        );
      })}
    </svg>
  );
}
