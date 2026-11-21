/** Classification systems timeline — artificial, natural, phylogenetic. Theme-aware. */
export function ClassificationSystemsTimeline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Classification systems timeline artificial based on few characters natural based on overall similarity and phylogenetic based on evolutionary relationships">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three generations of classification</text>

      <line x1="60" y1="120" x2="600" y2="120" strokeWidth="3" className="stroke-current text-muted-foreground" />
      {[
        { x: 100, c: "rgb(245 158 11 / 0.9)", t: "ARTIFICIAL", s: ["one or few characters", "(flower colour, habit)", "e.g. Linnaeus' sexual system"] },
        { x: 330, c: "rgb(14 165 233 / 0.9)", t: "NATURAL", s: ["overall similarity,", "many characters", "Bentham & Hooker"] },
        { x: 560, c: "rgb(22 163 74 / 0.9)", t: "PHYLOGENETIC", s: ["evolutionary relationships", "(common ancestry)", "modern, DNA-informed"] },
      ].map((n, i) => (
        <g key={n.t}>
          <circle cx={n.x} cy="120" r="8" style={{ color: n.c }} className="fill-current opacity-80" />
          <rect x={n.x - 70} y={i === 1 ? 40 : 150} width="140" height="80" rx="10" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y={i === 1 ? 64 : 174} fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          {n.s.map((line, j) => (
            <text key={j} x={n.x} y={(i === 1 ? 82 : 192) + j * 13} fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{line}</text>
          ))}
          {i === 1 && <line x1={n.x} y1="120" x2={n.x} y2="120" strokeWidth="0" />}
        </g>
      ))}
      <text x="16" y="232" fontSize="10" className="fill-current text-muted-foreground">Direction of travel: from convenience → to similarity → to history. Only phylogenetic systems predict shared traits reliably.</text>
    </svg>
  );
}
