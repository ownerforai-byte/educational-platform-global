/** Migration definition — migrare, regular periodic passing. Theme-aware. */
export function MigrationDefinition({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Migration definition from Latin migrare regular and periodic passing of animals from one place to another shown in insects birds fishes mammals and turtles">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Migration — the word and the meaning</text>

      <rect x="40" y="56" width="580" height="60" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="330" y="82" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Latin 'MIGRARE' = to travel, going from one place to another</text>
      <text x="330" y="102" fontSize="8.6" textAnchor="middle" className="fill-current text-muted-foreground">Migration: the REGULAR and PERIODIC passing of animals from one place to another</text>

      <text x="40" y="146" fontSize="9" className="fill-current text-foreground" fontWeight="700">Shown by:</text>
      {["insects", "birds", "fishes", "some mammals", "turtle"].map((s, i) => (
        <g key={s}>
          <rect x={140 + i * 96} y="128" width="88" height="28" rx="8" className="fill-current text-emerald-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
          <text x={184 + i * 96} y="147" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground">{s}</text>
        </g>
      ))}

      <rect x="40" y="170" width="580" height="36" rx="10" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="56" y="193" fontSize="9" className="fill-current text-foreground" fontWeight="700">It is a complex type of INBORN behaviour — seasonal and genetically programmed, not a random wander.</text>
    </svg>
  );
}
