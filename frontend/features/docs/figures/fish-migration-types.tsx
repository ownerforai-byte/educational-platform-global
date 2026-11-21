/** Fish migration — salmon upstream, mackerel in Kosi/Gandaki. Theme-aware. */
export function FishMigrationTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Fish migration salmon moving upstream to spawn and mackerel migrating seasonally in Kosi and Gandaki rivers to feed and breed">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fish migration — two classic journeys</text>

      {/* salmon */}
      <g>
        <rect x="30" y="56" width="290" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="175" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SALMON — upstream to spawn</text>
        <path d="M60 180 q120 -10 230 -40" className="fill-none stroke-current text-sky-500" strokeWidth="3" strokeDasharray="8 6" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${110 + i * 60} ${172 - i * 12} q14 -8 26 0 q-12 10 -26 0 Z`} className="fill-current text-sky-400/70" />
        ))}
        <circle cx="290" cy="112" r="9" className="fill-current text-rose-400/70" />
        <text x="46" y="200" fontSize="8.3" className="fill-current text-muted-foreground">adults fight currents UPSTREAM to the gravel</text>
        <text x="46" y="216" fontSize="8.3" className="fill-current text-muted-foreground">stream where they were born — then spawn and die</text>
      </g>

      {/* mackerel */}
      <g>
        <rect x="340" y="56" width="290" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="485" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MACKEREL — Nepal's rivers</text>
        <path d="M380 160 q50 -30 110 -20 q60 10 100 -20" className="fill-none stroke-current text-emerald-500" strokeWidth="3" strokeDasharray="8 6" />
        {[0, 1].map((i) => (
          <path key={i} d={`M${420 + i * 90} ${142 - i * 8} q12 -7 22 0 q-10 9 -22 0 Z`} className="fill-current text-emerald-400/70" />
        ))}
        <text x="356" y="200" fontSize="8.3" className="fill-current text-muted-foreground">migrate seasonally in the Kosi and Gandaki rivers</text>
        <text x="356" y="216" fontSize="8.3" className="fill-current text-muted-foreground">— moving to FEED and to BREED</text>
      </g>
      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Fish migration = seasonal movement to feeding or breeding grounds; the route is inherited, the timing is set by the seasons.</text>
    </svg>
  );
}
