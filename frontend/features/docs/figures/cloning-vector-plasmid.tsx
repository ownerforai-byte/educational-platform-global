/**
 * Cloning vector anatomy — plasmid with origin of replication, selectable
 * marker, restriction site (MCS) and insert. Theme-aware.
 */
export function CloningVectorPlasmid({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Anatomy of a cloning plasmid vector showing origin of replication, antibiotic resistance marker, multiple cloning site with inserted gene and the bacterial host">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The cloning vector — a plasmid's four must-have parts</text>

      <circle cx="220" cy="160" r="90" fill="none" strokeWidth="10" className="stroke-current text-emerald-500/60" />

      {/* ori */}
      <g>
        <rect x="180" y="66" width="80" height="22" rx="6" className="fill-current text-sky-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.95)" }} />
        <text x="220" y="81" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ori</text>
        <text x="270" y="76" fontSize="9" className="fill-current text-muted-foreground">origin of replication —</text>
        <text x="270" y="90" fontSize="9" className="fill-current text-muted-foreground">lets the plasmid copy itself</text>
      </g>

      {/* marker */}
      <g>
        <rect x="180" y="232" width="80" height="22" rx="6" className="fill-current text-amber-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.95)" }} />
        <text x="220" y="247" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ampᴿ marker</text>
        <text x="270" y="242" fontSize="9" className="fill-current text-muted-foreground">antibiotic resistance — only transformed</text>
        <text x="270" y="256" fontSize="9" className="fill-current text-muted-foreground">cells survive selection plates</text>
      </g>

      {/* MCS + insert */}
      <g>
        <rect x="120" y="146" width="46" height="22" rx="6" className="fill-current text-violet-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.95)" }} />
        <text x="143" y="161" fontSize="7.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MCS</text>
        <rect x="230" y="146" width="52" height="22" rx="6" className="fill-current text-rose-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.95)" }} />
        <text x="256" y="161" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">gene</text>
        <text x="300" y="150" fontSize="9" className="fill-current text-muted-foreground">multiple cloning site — a row of</text>
        <text x="300" y="164" fontSize="9" className="fill-current text-muted-foreground">restriction cut points where the</text>
        <text x="300" y="178" fontSize="9" className="fill-current text-muted-foreground">foreign gene is spliced in</text>
      </g>

      {/* host */}
      <g>
        <ellipse cx="540" cy="150" rx="60" ry="38" className="fill-current text-teal-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <circle cx="540" cy="150" r="22" fill="none" strokeWidth="4" className="stroke-current text-emerald-500" />
        <text x="540" y="212" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">host bacterium multiplies the plasmid with it</text>
      </g>

      <text x="16" y="284" fontSize="10" className="fill-current text-muted-foreground">Good vectors are small (easy uptake), have one cut site per enzyme, carry a marker, and a high copy number. Ti-plasmid of Agrobacterium delivers genes into plants.</text>
    </svg>
  );
}
