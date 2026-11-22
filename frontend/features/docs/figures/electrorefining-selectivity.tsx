// ElectrorefiningSelectivity figure. Theme-aware.
export function ElectrorefiningSelectivity({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Electrode potential sorting explaining why only copper transfers in electrorefining">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One tank, three-way sorting</text>
      <line x1="80" y1="60" x2="580" y2="60" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
      {[
        ["Zn²⁺/Zn", "−0.76", "baser — ionises, never deposits", "rgb(239 68 68)", 150],
        ["Cu²⁺/Cu", "+0.34", "the shuttle — leaves anode, lands cathode", "rgb(16 185 129)", 330],
        ["Ag⁺/Ag", "+0.80", "nobler — refuses to ionise → mud", "rgb(59 130 246)", 500],
      ].map(([pair, v, role, col, x]) => (
        <g key={pair as string}>
          <circle cx={x as number} cy="60" r="6" fill={col as string} />
          <text x={x as number} y="84" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{pair as string}</text>
          <text x={x as number} y="100" fontSize="10" textAnchor="middle" fill={col as string}>{v as string} V</text>
          <text x={x as number} y="120" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{role as string}</text>
        </g>
      ))}
      <text x="330" y="160" fontSize="11" textAnchor="middle" className="fill-current text-foreground">Cu is the only metal that both leaves the anode and accepts electrons at the cathode</text>
      <text x="330" y="184" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Baser ions wait in solution; nobler atoms fall as mud — selectivity by electrode potential</text>
    </svg>
  );
}
