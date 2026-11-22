// NaohPrecipitationColours figure. Theme-aware.
export function NaohPrecipitationColours({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Colour chart of hydroxide precipitates formed by sodium hydroxide">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The precipitate colour chart</text>
      {[
        ["Cu²⁺", "pale blue Cu(OH)₂", "insoluble in excess", "rgb(96 165 250)", 30],
        ["Fe²⁺", "dirty green Fe(OH)₂", "insoluble in excess", "rgb(101 163 13)", 185],
        ["Fe³⁺", "reddish-brown Fe(OH)₃", "insoluble in excess", "rgb(180 83 9)", 340],
        ["Zn²⁺ Al³⁺ Pb²⁺", "white hydroxides", "SOLUBLE in excess — amphoteric", "rgb(148 163 184)", 495],
      ].map(([ion, ppt, extra, col, x]) => (
        <g key={ion as string}>
          <rect x={x as number} y="60" width="140" height="105" rx="10" fill={col as string} opacity="0.16" stroke={col as string} />
          <text x={(x as number) + 70} y="84" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{ion as string}</text>
          <text x={(x as number) + 70} y="106" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{ppt as string}</text>
          <text x={(x as number) + 70} y="126" fontSize="9" textAnchor="middle" fill={col as string}>{extra as string}</text>
          <text x={(x as number) + 70} y="150" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">+ NaOH</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">NH₄⁺: no precipitate — only pungent NH₃ on warming</text>
    </svg>
  );
}
