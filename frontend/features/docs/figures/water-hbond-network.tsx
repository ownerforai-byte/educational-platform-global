// Water four-connected hydrogen bond network. Theme-aware.
export function WaterHbondNetwork({ className }: { className?: string }) {
  const central: [number, number] = [330, 140];
  const neighbours: [number, number][] = [[330, 50], [330, 230], [200, 140], [460, 140]];
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Central water molecule hydrogen bonded to four neighbours two donated and two accepted forming the tetrahedral network behind water high boiling point">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Water: four hydrogen bonds per molecule</text>
      <circle cx={central[0]} cy={central[1]} r="22" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.3" />
      <text x={central[0]} y={central[1] + 5} fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">H2O</text>
      {neighbours.map(([x, y], i) => (
        <g key={i}>
          <line x1={central[0]} y1={central[1]} x2={x} y2={y} stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
          <circle cx={x} cy={y} r="20" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.2" />
          <text x={x} y={y + 5} fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">H2O</text>
        </g>
      ))}
      <text x="330" y="272" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">2 donated (two H) + 2 accepted (two lone pairs) = a 3-D network (NEB 2024)</text>
      <text x="330" y="292" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Breaking it costs so much that water boils at 100 C, H2S at -60 C</text>
    </svg>
  );
}
