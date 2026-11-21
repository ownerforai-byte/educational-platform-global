/** Echinodermata water vascular — hydraulic tube feet. Well-detailed. Theme-aware. */
export function EchinodermataWaterVascular({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Echinodermata water vascular system hydraulic tube feet madreporite stone canal ring canal radial canals locomotion starfish spiny skin bilateral larva">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The water-vascular system — plumbing as legs</text>
      {/* starfish */}
      <g>
        {[0, 72, 144, 216, 288].map((a) => {
          const rad = ((a - 90) * Math.PI) / 180;
          const x = 200 + 70 * Math.cos(rad);
          const y = 150 + 70 * Math.sin(rad);
          return (
            <g key={a}>
              <path d={`M200 150 L${x} ${y}`} className="stroke-current" strokeWidth="22" strokeLinecap="round" style={{ color: "rgb(245 158 11 / 0.25)" }} />
              <circle cx={x} cy={y} r="5" className="fill-current text-amber-500/50" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(217 119 6 / 0.9)" }} />
            </g>
          );
        })}
        <circle cx="200" cy="150" r="16" className="fill-current text-amber-500/40" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      </g>
      <text x="200" y="252" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">tube feet at each ray tip — hydraulically extended by water pressure</text>
      {/* flow path */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FLOW PATH</text>
      {[
        "madreporite: sieve plate on top",
        "  — the intake valve",
        "stone canal → ring canal around",
        "  the mouth",
        "radial canals run out along",
        "  each arm",
        "lateral canals feed every tube",
        "  foot — suction cup at the end",
        "drives locomotion, feeding,",
        "  respiration and grip",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 19} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: madreporite → stone canal → ring canal → radial canals → tube feet — trace it in order for full marks.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Larvae are bilateral; adults are radial — echinoderms switched plans mid-life.</text>
    </svg>
  );
}
