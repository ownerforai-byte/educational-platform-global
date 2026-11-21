/** Taxis vs kinesis comparison. Theme-aware. */
export function TaxisVsKinesis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Taxis versus kinesis comparison directional movement toward stimulus versus random non-directional movement with woodlouse example">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Taxis vs kinesis — heading vs hurry</text>

      {/* taxis panel */}
      <g>
        <rect x="30" y="56" width="290" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="175" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TAXIS — DIRECTIONAL</text>
        <circle cx="120" cy="140" r="14" className="fill-current text-emerald-500/60" />
        <circle cx="250" cy="140" r="22" className="fill-current text-amber-400/60" />
        <path d="M138 140 h80" markerEnd="url(#arrk)" strokeWidth="3" className="stroke-current text-emerald-600" />
        <defs><marker id="arrk" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-emerald-600" /></marker></defs>
        <text x="46" y="190" fontSize="8.3" className="fill-current text-muted-foreground">movement TOWARD or AWAY from a stimulus —</text>
        <text x="46" y="206" fontSize="8.3" className="fill-current text-muted-foreground">the body turns and steers (phototaxis, chemotaxis…)</text>
      </g>

      {/* kinesis panel */}
      <g>
        <rect x="340" y="56" width="290" height="160" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="485" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">KINESIS — NON-DIRECTIONAL</text>
        <path d="M400 150 q20 -30 40 -6 q14 22 34 2 q18 -24 38 4 q14 20 36 -2" className="fill-none stroke-current text-rose-500" strokeWidth="2.5" strokeDasharray="6 5" />
        <text x="356" y="190" fontSize="8.3" className="fill-current text-muted-foreground">RANDOM movement — no heading; the RATE of</text>
        <text x="356" y="206" fontSize="8.3" className="fill-current text-muted-foreground">turning/speed simply rises with stimulus strength</text>
      </g>

      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Memory hook: taxis = Toward/Away; kinesis = Kicking around randomly. Exam favourite: state the difference in one line each.</text>
    </svg>
  );
}
