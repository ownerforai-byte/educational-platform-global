/**
 * Bacterial cell structure — rod-shaped bacterium with capsule, cell wall,
 * plasma membrane, nucleoid DNA, ribosomes, mesosome, pili and flagellum.
 * Theme-aware via currentColor.
 */
export function BacterialCell({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 320" className={className} role="img" aria-label="Labelled structure of a rod-shaped bacterial cell showing capsule, cell wall, plasma membrane, cytoplasm, nucleoid DNA, ribosomes, mesosome, pili and flagellum">
      {/* capsule */}
      <rect x="90" y="70" width="380" height="180" rx="90" fill="none" strokeWidth="2" strokeDasharray="6 4" className="stroke-current text-amber-500" style={{ color: "rgb(245 158 11 / 0.7)" }} />
      <text x="486" y="84" fontSize="11" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="700">capsule (slime layer)</text>
      <text x="486" y="98" fontSize="9" className="fill-current text-muted-foreground">protection · adherence</text>

      {/* cell wall */}
      <rect x="102" y="82" width="356" height="156" rx="78" fill="none" strokeWidth="7" className="stroke-current text-emerald-600" style={{ color: "rgb(5 150 105 / 0.8)" }} />
      <text x="486" y="126" fontSize="11" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">cell wall</text>
      <text x="486" y="140" fontSize="9" className="fill-current text-muted-foreground">rigid peptidoglycan</text>

      {/* plasma membrane */}
      <rect x="112" y="92" width="336" height="136" rx="68" fill="none" strokeWidth="2.5" className="stroke-current text-sky-500" />
      <text x="486" y="168" fontSize="11" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">plasma membrane</text>
      <text x="486" y="182" fontSize="9" className="fill-current text-muted-foreground">selectively permeable</text>

      {/* cytoplasm */}
      <rect x="120" y="100" width="320" height="120" rx="60" className="fill-current text-sky-500/5" stroke="none" />
      <text x="180" y="284" fontSize="11" className="fill-current text-muted-foreground" fontWeight="700">cytoplasm — granular, no membrane-bound organelles (prokaryote)</text>

      {/* nucleoid DNA */}
      <path d="M180 130 q30 -22 60 0 q30 22 60 0 q30 -22 60 0" fill="none" strokeWidth="3.5" className="stroke-current text-violet-600" style={{ color: "rgb(124 58 237)" }} />
      <text x="196" y="108" fontSize="11" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">nucleoid (circular DNA, no nuclear membrane)</text>

      {/* ribosomes */}
      <g className="fill-current text-slate-500">
        <circle cx="170" cy="176" r="4" /><circle cx="190" cy="188" r="4" /><circle cx="210" cy="172" r="4" /><circle cx="300" cy="196" r="4" /><circle cx="330" cy="180" r="4" /><circle cx="360" cy="196" r="4" /><circle cx="396" cy="176" r="4" />
      </g>
      <text x="160" y="212" fontSize="10" className="fill-current text-muted-foreground" fontWeight="700">70S ribosomes</text>

      {/* mesosome */}
      <path d="M250 214 q14 -18 30 -6 q14 10 2 20" fill="none" strokeWidth="2.5" className="stroke-current text-rose-500" />
      <text x="238" y="248" fontSize="10" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">mesosome (respiration · cell division)</text>

      {/* pili */}
      <g className="stroke-current text-slate-400" strokeWidth="2">
        <line x1="110" y1="120" x2="70" y2="104" /><line x1="108" y1="150" x2="64" y2="146" /><line x1="112" y1="186" x2="72" y2="200" />
      </g>
      <text x="18" y="96" fontSize="10" className="fill-current text-muted-foreground" fontWeight="700">pili</text>

      {/* flagellum */}
      <path d="M470 160 q30 -26 52 0 q14 18 40 6" fill="none" strokeWidth="3.5" className="stroke-current text-teal-600" />
      <text x="486" y="210" fontSize="11" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="700">flagellum</text>
      <text x="486" y="224" fontSize="9" className="fill-current text-muted-foreground">locomotion</text>
    </svg>
  );
}
