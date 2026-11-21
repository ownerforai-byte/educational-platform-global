// Block character panel: metallic to non-metallic across blocks. Theme-aware.
export function BlockCharacterPanel({ className }: { className?: string }) {
  const cols: [string, string, string][] = [
    ["s-block", "All metals · highly reactive · lose electrons", "rgb(14 165 233 / 0.9)"],
    ["d-block", "Transition metals · variable oxidation states", "rgb(16 185 129 / 0.9)"],
    ["p-block", "Metals → metalloids → non-metals across", "rgb(139 92 246 / 0.9)"],
    ["f-block", "Inner transition · mostly +3 state", "rgb(245 158 11 / 0.9)"],
  ];
  return (
    <svg viewBox="0 0 720 200" className={className} role="img" aria-label="Block character panel metallic character of s block transition character of d block mixed character of p block and f block inner transition metals">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Character by block — metals on the left, non-metals on the right</text>
      {cols.map(([blk, d, color], i) => (
        <g key={blk}>
          <rect x={30 + i * 168} y="42" width="152" height="94" rx="10" className="fill-current" style={{ color }} opacity="0.12" />
          <rect x={30 + i * 168} y="42" width="152" height="94" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color }} />
          <text x={106 + i * 168} y="64" fontSize="9.5" textAnchor="middle" className="fill-current" style={{ color }} fontWeight="800">{blk}</text>
          {[d].map((line, j) => (
            <text key={j} x={106 + i * 168} y="88" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{line.slice(0, 34)}</text>
          ))}
          <text x={106 + i * 168} y="102" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{d.slice(34, 68)}</text>
        </g>
      ))}
      <rect x="30" y="150" width="660" height="36" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="168" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Metallic character falls left → right (easier to hold electrons) and rises down a group (shells shield the nucleus).</text>
      <text x="360" y="180" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">The p-block alone carries the full metal-to-non-metal sweep — that is where the staircase lives.</text>
    </svg>
  );
}
