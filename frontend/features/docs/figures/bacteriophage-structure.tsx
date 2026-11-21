/**
 * Bacteriophage (T4-type) structure — head with DNA, collar, sheath, base
 * plate and tail fibres. Theme-aware via currentColor.
 */
export function BacteriophageStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 340" className={className} role="img" aria-label="Structure of a T4 bacteriophage showing the polyhedral head with DNA, collar, contractile sheath, base plate and six tail fibres attached to a bacterial surface">
      {/* head */}
      <polygon points="270,40 350,40 382,96 350,152 270,152 238,96" className="fill-current text-violet-500/10" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.85)" }} />
      <path d="M262 96 q38 -26 76 0 q-38 26 -76 0" fill="none" strokeWidth="2.5" className="stroke-current text-violet-600" style={{ color: "rgb(124 58 237)" }} />
      <text x="396" y="84" fontSize="12" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">Head (capsid)</text>
      <text x="396" y="100" fontSize="9.5" className="fill-current text-muted-foreground">polyhedral protein coat</text>
      <text x="396" y="114" fontSize="9.5" className="fill-current text-muted-foreground"> enclosing dsDNA</text>

      {/* collar */}
      <rect x="296" y="152" width="28" height="14" rx="4" className="fill-current text-sky-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.85)" }} />
      <text x="396" y="164" fontSize="12" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">Collar</text>

      {/* sheath */}
      <rect x="298" y="166" width="24" height="86" rx="6" className="fill-current text-teal-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.85)" }} />
      <line x1="304" y1="172" x2="304" y2="246" strokeWidth="1.5" className="stroke-current text-teal-600" />
      <line x1="316" y1="172" x2="316" y2="246" strokeWidth="1.5" className="stroke-current text-teal-600" />
      <text x="396" y="196" fontSize="12" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="700">Sheath (contractile)</text>
      <text x="396" y="212" fontSize="9.5" className="fill-current text-muted-foreground">injects DNA into the host</text>

      {/* base plate */}
      <polygon points="286,252 334,252 344,266 276,266" className="fill-current text-rose-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.85)" }} />
      <text x="396" y="262" fontSize="12" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">Base plate</text>

      {/* tail fibres */}
      <g className="stroke-current text-rose-500" strokeWidth="2.5" fill="none" style={{ color: "rgb(244 63 94 / 0.8)" }}>
        <path d="M286 266 q-40 18 -58 48" />
        <path d="M354 266 q40 18 58 48" />
        <path d="M296 268 q-16 34 -6 52" />
        <path d="M324 268 q16 34 6 52" />
      </g>
      <text x="396" y="288" fontSize="12" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">Tail fibres</text>
      <text x="396" y="304" fontSize="9.5" className="fill-current text-muted-foreground">anchor to host cell wall</text>

      {/* host surface */}
      <rect x="60" y="306" width="520" height="16" rx="6" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.7)" }} />
      <text x="70" y="334" fontSize="10" className="fill-current text-muted-foreground">host bacterial cell surface — phage attaches, pierces, injects DNA; the virus has no metabolism of its own (obligate parasite)</text>
    </svg>
  );
}
