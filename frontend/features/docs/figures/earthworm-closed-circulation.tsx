/** Earthworm closed circulation — why closed beats open. Well-detailed. Theme-aware. */
export function EarthwormClosedCirculation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm closed circulation dorsal ventral vessels lateral hearts five pairs aortic arches blood always in vessels efficient delivery comparison open system">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">A closed loop — blood that never leaks out</text>
      {/* loop diagram */}
      <rect x="30" y="44" width="330" height="200" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE LOOP, SEGMENT BY SEGMENT</text>
      <path d="M80 110 h230" className="stroke-current" strokeWidth="5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="290" y="102" fontSize="6.4" className="fill-current text-rose-600" fontWeight="700">dorsal vessel</text>
      <path d="M80 200 h230" className="stroke-current" strokeWidth="5" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="290" y="216" fontSize="6.4" className="fill-current text-sky-600" fontWeight="700">ventral vessel</text>
      {[[110, 120], [195, 120], [280, 120]].map(([x], i) => (
        <g key={i}>
          <path d={`M${x} 110 q-10 45 0 90`} className="fill-none stroke-current" strokeWidth="3" style={{ color: "rgb(217 119 6 / 0.9)" }} />
          <circle cx={x} cy="112" r="8" className="fill-current text-amber-500/40" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(217 119 6 / 0.9)" }} />
        </g>
      ))}
      <text x="195" y="236" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">lateral hearts (5 pairs, segments 7–11) pump blood ventrally</text>
      {/* comparison */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CLOSED vs OPEN</text>
      {[
        "closed: blood stays inside vessels,",
        "  pressure and routing are precise",
        "every segment gets its own supply",
        "open (insects, molluscs): blood",
        "  sloshes in a body cavity —",
        "  slower, lower pressure",
        "active burrowers need the closed",
        "  plan's delivery speed",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: dorsal vessel carries blood forward, lateral hearts push it down, ventral vessel carries it backward.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Name all three and the loop is complete — that is the full 3-mark answer.</text>
    </svg>
  );
}
