// S-character ladder: sp, sp2, sp3 strength and angle. Theme-aware.
export function SCharacterLadder({ className }: { className?: string }) {
  const bars: [string, number, string][] = [
    ["sp", 50, "linear 180, strongest C-H"],
    ["sp2", 33, "trigonal 120"],
    ["sp3", 25, "tetrahedral 109.5"],
  ];
  return (
    <svg viewBox="0 0 640 260" className={className} role="img" aria-label="S character ladder comparing sp 50 percent sp2 33 percent and sp3 25 percent with bond strength angle and examples">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">More s-character: stronger, shorter, wider</text>
      {bars.map(([label, pct, note], i) => (
        <g key={i}>
          <rect x="90" y={60 + i * 60} width={pct * 7} height="40" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.25" />
          <rect x="90" y={60 + i * 60} width={pct * 7} height="40" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <text x="40" y={86 + i * 60} fontSize="14" className="fill-current text-foreground" fontWeight="800">{label}</text>
          <text x={110 + pct * 7} y={86 + i * 60} fontSize="12" className="fill-current text-foreground" fontWeight="700">{pct}% s</text>
          <text x="500" y={86 + i * 60} fontSize="10" className="fill-current text-muted-foreground">{note}</text>
        </g>
      ))}
      <text x="320" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Ethyne's sp C-H (106 pm) beats ethane's sp3 C-H (109 pm) in strength and shortness</text>
    </svg>
  );
}
