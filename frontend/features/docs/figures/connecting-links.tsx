/** Connecting links — Archaeopteryx, Peripatus, Euglena. Theme-aware. */
export function ConnectingLinks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Connecting links Archaeopteryx reptile bird Peripatus annelid arthropod and Euglena plant animal bridging two groups">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Connecting links — bridging two groups</text>
      {[
        { x: 110, t: "Archaeopteryx", s: "reptile → bird:", s2: "feathers + teeth/tail", c: "rgb(245 158 11 / 0.9)" },
        { x: 330, t: "Peripatus", s: "annelid → arthropod:", s2: "worm-like, jointed legs", c: "rgb(22 163 74 / 0.9)" },
        { x: 550, t: "Euglena", s: "plant → animal:", s2: "chloroplasts + can move", c: "rgb(14 165 233 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 80} y="52" width="160" height="104" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="76" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800" fontStyle="italic">{n.t}</text>
          <text x={n.x} y="98" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="114" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
        </g>
      ))}
      <text x="16" y="180" fontSize="9" className="fill-current text-muted-foreground">Connecting links show transition between two groups — living bridges in evolution.</text>
    </svg>
  );
}
