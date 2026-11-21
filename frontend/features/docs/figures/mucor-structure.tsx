/** Mucor structure — coenocytic mycelium, rhizoids, sporangiophore with sporangium. Theme-aware. */
export function MucorStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Mucor structure with branching coenocytic mycelium rhizoids anchoring substrate sporangiophore and globous sporangium with columella">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mucor — the black bread mould's blueprint</text>

      {/* substrate */}
      <rect x="20" y="190" width="620" height="40" rx="8" className="fill-current text-stone-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="36" y="216" fontSize="9" className="fill-current text-muted-foreground">substrate (bread / dung / moist surfaces)</text>

      {/* mycelium */}
      <g className="stroke-current text-amber-500/80" strokeWidth="4" strokeLinecap="round">
        <path d="M120 190 q-10 -50 -40 -70" fill="none" /><path d="M120 190 q10 -60 50 -80" fill="none" /><path d="M120 190 q0 -40 20 -60" fill="none" />
        <path d="M420 190 q-14 -60 -60 -90" fill="none" /><path d="M420 190 q20 -50 60 -70" fill="none" />
      </g>
      <text x="60" y="120" fontSize="8.5" className="fill-current text-muted-foreground">coenocytic hyphae (no septa)</text>

      {/* rhizoids */}
      <g className="stroke-current text-emerald-600" strokeWidth="2.5">
        <path d="M120 190 q-6 14 -12 20 M120 190 q0 16 2 22 M120 190 q8 12 14 18" fill="none" />
      </g>
      <text x="150" y="216" fontSize="8.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">rhizoids anchor + absorb</text>

      {/* sporangiophore + sporangium */}
      <line x1="420" y1="100" x2="420" y2="40" strokeWidth="4" className="stroke-current text-amber-600" />
      <circle cx="420" cy="34" r="22" className="fill-current text-sky-500/25" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <circle cx="420" cy="34" r="6" className="fill-current text-sky-700/80" />
      <text x="455" y="30" fontSize="8.5" className="fill-current text-foreground" fontWeight="700">sporangium</text>
      <text x="455" y="44" fontSize="8" className="fill-current text-muted-foreground">columella (dome) inside</text>
      <text x="455" y="58" fontSize="8" className="fill-current text-muted-foreground">sporangiophore = the stalk</text>

      <text x="16" y="248" fontSize="10" className="fill-current text-muted-foreground">The black dust you see on old bread is thousands of ripe sporangia. Each sporangium releases hundreds of sporangiospores at once.</text>
    </svg>
  );
}
