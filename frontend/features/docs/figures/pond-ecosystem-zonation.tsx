/**
 * Pond ecosystem zonation — littoral, limnetic, profundal zones with
 * characteristic life. Theme-aware via currentColor.
 */
export function PondEcosystemZonation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Pond ecosystem cross-section showing littoral limnetic and profundal zones with rooted plants plankton fish and bottom decomposers">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">A pond, cut open — three zones, three communities</text>

      {/* water body */}
      <path d="M40 90 L620 90 L620 240 Q330 260 40 240 Z" className="fill-current text-sky-500/10" stroke="none" />
      <line x1="40" y1="90" x2="620" y2="90" strokeWidth="3" className="stroke-current text-sky-400" />
      <text x="46" y="84" fontSize="9" className="fill-current text-sky-600 dark:text-sky-300" fontWeight="700">water surface — light zone boundary</text>

      {/* littoral */}
      <path d="M40 240 L140 240 L140 90" fill="none" strokeWidth="1.5" strokeDasharray="5 3" className="stroke-current text-emerald-500" />
      <text x="90" y="112" fontSize="10.5" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">LITTORAL</text>
      <text x="90" y="128" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">shallow, rooted:</text>
      <text x="90" y="141" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">Typha, Hydrilla, snails</text>
      <line x1="90" y1="240" x2="90" y2="170" strokeWidth="3" className="stroke-current text-emerald-500" />
      <ellipse cx="90" cy="164" rx="10" ry="7" className="fill-current text-emerald-500/40" />

      {/* limnetic */}
      <path d="M140 90 L480 90 L480 240" fill="none" strokeWidth="1.5" strokeDasharray="5 3" className="stroke-current text-sky-500" />
      <text x="310" y="112" fontSize="10.5" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">LIMNETIC (open water)</text>
      <g className="fill-current text-sky-500/60">
        <circle cx="250" cy="150" r="3" /><circle cx="280" cy="160" r="3" /><circle cx="320" cy="145" r="3" /><circle cx="360" cy="158" r="3" /><circle cx="400" cy="150" r="3" />
      </g>
      <text x="310" y="180" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">phyto- & zooplankton, fish</text>
      <path d="M300 200 q20 -14 40 0 q-20 12 -40 0" className="fill-current text-amber-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />

      {/* profundal */}
      <text x="550" y="112" fontSize="10.5" textAnchor="middle" className="fill-current text-slate-600 dark:text-slate-300" fontWeight="800">PROFUNDAL</text>
      <text x="550" y="128" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">dark bottom:</text>
      <text x="550" y="141" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">no photosynthesis —</text>
      <text x="550" y="154" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">decomposers, bloodworms</text>
      <ellipse cx="550" cy="238" rx="120" ry="10" className="fill-current text-slate-600/30" />

      <text x="16" y="282" fontSize="10" className="fill-current text-muted-foreground">Light decides the zones: producers only where light reaches; the profundal bottom lives on falling dead matter — a decomposer economy.</text>
    </svg>
  );
}
