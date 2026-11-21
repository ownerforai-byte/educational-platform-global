/** Bird migration — Himalaya to Terai, storks, bar-headed goose. Theme-aware. */
export function BirdMigrationRoutes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Bird migration routes Himalayan birds migrate to lower altitudes in winter bar-headed goose and storks to Terai lowland lakes">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Bird migration — the Himalaya → Terai commute</text>

      {/* mountain profile */}
      <g>
        <rect x="30" y="56" width="600" height="160" rx="12" className="fill-current text-slate-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(100 116 139 / 0.9)" }} />
        <path d="M50 200 L160 100 L240 160 L330 80 L420 170 L520 120 L620 200" className="fill-none stroke-current text-slate-500" strokeWidth="3" />
        <text x="150" y="90" fontSize="8" className="fill-current text-muted-foreground">HIMALAYA (summer breeding)</text>
        <text x="480" y="106" fontSize="8" className="fill-current text-muted-foreground">TERAI lowlands (winter refuge)</text>

        {/* geese flying */}
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${230 + i * 40} ${120 + i * 10} q10 -12 20 0 q-10 8 -20 0 Z`} className="fill-current text-sky-500/70" />
        ))}
        <path d="M230 150 q90 -26 200 -8" className="fill-none stroke-current text-sky-500" strokeWidth="2.5" strokeDasharray="7 5" markerEnd="url(#arrb)" />
        <defs><marker id="arrb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-sky-500" /></marker></defs>
      </g>

      <rect x="40" y="216" width="580" height="26" rx="8" className="fill-current text-amber-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="56" y="234" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">Bar-headed geese and Himalayan birds descend to the Terai in winter; storks gather at lowland lakes.</text>
    </svg>
  );
}
