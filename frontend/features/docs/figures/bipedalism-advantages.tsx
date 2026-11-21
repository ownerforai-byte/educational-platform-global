/** Why bipedalism came first — four advantages. Theme-aware. */
export function BipedalismAdvantages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Why bipedalism came first on open ground scans over grass for predators and food frees hands for carrying food tools and infants reduces sun exposure energetically efficient long distance travel">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why bipedalism came first — four advantages on open ground</text>
      {[
        { x: 110, n: "1", s: "scans over grass for", s2: "predators and food" },
        { x: 255, n: "2", s: "frees hands for carrying", s2: "food, tools and infants" },
        { x: 400, n: "3", s: "reduces sun exposure" },
        { x: 545, n: "4", s: "energetically efficient for", s2: "long-distance travel" },
      ].map((b) => (
        <g key={b.n}>
          <rect x={b.x - 65} y="52" width="130" height="110" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
          <text x={b.x} y="86" fontSize="14" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">{b.n}</text>
          <text x={b.x} y="112" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{b.s}</text>
          {b.s2 && <text x={b.x} y="128" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{b.s2}</text>}
        </g>
      ))}
      <text x="16" y="196" fontSize="8.4" className="fill-current text-muted-foreground">Standing and walking upright on open savanna ground — the first step toward free hands and tools.</text>
    </svg>
  );
}
