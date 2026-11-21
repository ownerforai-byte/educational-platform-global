/** Nepal's recovery success stories — rhino and tiger numbers. Theme-aware. */
export function RhinoTigerRecovery({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Nepal's recovery success stories rhinoceros population grew from about 100 in the 1960s to more than 750 through zero-poaching years and tigers nearly doubled from 121 in 2009 to 355 in 2022 meeting the Tx2 goal ahead of schedule">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Recovery stories — proof that protection works</text>

      <g>
        <rect x="40" y="50" width="280" height="110" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="180" y="76" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GREATER ONE-HORNED RHINOCEROS</text>
        <text x="180" y="112" fontSize="18" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">~100 → 750+</text>
        <text x="180" y="134" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">from the 1960s, through zero-poaching years</text>
        <text x="180" y="150" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">status moved EN → VU</text>
      </g>
      <g>
        <rect x="340" y="50" width="280" height="110" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="480" y="76" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BENGAL TIGER</text>
        <text x="480" y="112" fontSize="18" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">121 → 355</text>
        <text x="480" y="134" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">2009 → 2022 — nearly tripled</text>
        <text x="480" y="150" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Tx2 doubling goal met ahead of schedule</text>
      </g>

      <rect x="40" y="176" width="580" height="32" rx="10" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="56" y="197" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">The engines: anti-poaching patrols + translocation + census monitoring + grassland management.</text>
    </svg>
  );
}
