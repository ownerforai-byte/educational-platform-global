// Zeff trend arrows across and down the table. Theme-aware.
export function ZeffTrendArrows({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Effective nuclear charge trend arrows increasing across a period and nearly constant down a group with radius inverse trend">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">How Z_eff moves on the table</text>
      <rect x="40" y="50" width="200" height="110" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="140" y="76" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Across a period</text>
      <line x1="70" y1="112" x2="210" y2="112" className="stroke-current text-sky-500" strokeWidth="3" style={{ color: "rgb(14 165 233 / 0.95)" }} markerEnd="url(#ztarr)" />
      <text x="140" y="140" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">Z_eff climbs (Na +1 → Cl +7)</text>
      <rect x="260" y="50" width="200" height="110" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="76" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Down a group</text>
      <line x1="290" y1="112" x2="290" y2="145" className="stroke-current text-emerald-500" strokeWidth="3" style={{ color: "rgb(16 185 129 / 0.95)" }} />
      <line x1="430" y1="112" x2="430" y2="145" className="stroke-current text-emerald-500" strokeWidth="3" style={{ color: "rgb(16 185 129 / 0.95)" }} />
      <text x="360" y="140" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">Z_eff ~constant; new shells dominate</text>
      <rect x="480" y="50" width="210" height="110" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="585" y="76" fontSize="9.5" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">Consequences</text>
      <text x="585" y="98" fontSize="8.2" textAnchor="middle" className="fill-current text-muted-foreground">radius: shrinks →, grows ↓</text>
      <text x="585" y="116" fontSize="8.2" textAnchor="middle" className="fill-current text-muted-foreground">IE &amp; EN: rise →, fall ↓</text>
      <text x="585" y="140" fontSize="8.2" textAnchor="middle" className="fill-current text-muted-foreground">metallic character: falls →, rises ↓</text>
      <rect x="30" y="176" width="660" height="30" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="195" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Cause chain for full marks: Z up (same shielding) → Z_eff up → pull up → radius down → IE up.</text>
      <defs>
        <marker id="ztarr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" className="fill-current" /></marker>
      </defs>
    </svg>
  );
}
