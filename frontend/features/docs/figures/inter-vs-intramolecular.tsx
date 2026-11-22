// Intramolecular covalent bonds versus intermolecular forces in water. Theme-aware.
export function InterVsIntramolecular({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Water molecules showing strong covalent bonds inside each molecule and weak intermolecular forces between molecules">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Inside strong, between weak</text>
      {[[120, 120], [400, 120], [260, 210]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="16" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.3" />
          <text x={cx} y={cy + 4} fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">O</text>
          <circle cx={cx - 34} cy={cy - 26} r="9" className="fill-current" opacity="0.2" />
          <text x={cx - 34} y={cy - 22} fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">H</text>
          <circle cx={cx + 34} cy={cy - 26} r="9" className="fill-current" opacity="0.2" />
          <text x={cx + 34} y={cy - 22} fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">H</text>
          <line x1={cx - 10} y1={cy - 8} x2={cx - 28} y2={cy - 20} stroke="currentColor" strokeWidth="2.5" />
          <line x1={cx + 10} y1={cy - 8} x2={cx + 28} y2={cy - 20} stroke="currentColor" strokeWidth="2.5" />
        </g>
      ))}
      <line x1="180" y1="130" x2="360" y2="130" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="330" y1="140" x2="290" y2="200" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 4" />
      <text x="270" y="120" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">intermolecular: weak, breaks on boiling</text>
      <text x="120" y="260" fontSize="11" className="fill-current text-foreground">Covalent O-H: 463 kJ per mol - survives boiling</text>
      <text x="420" y="260" fontSize="11" className="fill-current text-foreground">Between molecules: about 20 kJ per mol - breaks at 100 C</text>
    </svg>
  );
}
