/**
 * Hydrophyte adaptations — floating, submerged and emergent forms with
 * their structural modifications. Theme-aware via currentColor.
 */
export function HydrophyteAdaptations({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Hydrophyte adaptations showing free floating water hyacinth submerged Hydrilla and emergent lotus with modifications like aerenchyma reduced roots and thin cuticle">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Hydrophytes — built for life in water</text>

      {/* water surface */}
      <line x1="40" y1="110" x2="620" y2="110" strokeWidth="3" className="stroke-current text-sky-400" />
      <path d="M40 110 L620 110 L620 280 L40 280 Z" className="fill-current text-sky-500/8" stroke="none" />

      {/* free-floating */}
      <g>
        <ellipse cx="120" cy="104" rx="34" ry="10" className="fill-current text-emerald-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        <path d="M120 114 q-8 30 0 60" fill="none" strokeWidth="2.5" className="stroke-current text-emerald-600" />
        <text x="120" y="66" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FREE-FLOATING</text>
        <text x="120" y="82" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">water hyacinth, Eichhornia</text>
        <text x="60" y="196" fontSize="8.5" className="fill-current text-muted-foreground">• swollen petiole floats the plant</text>
        <text x="60" y="212" fontSize="8.5" className="fill-current text-muted-foreground">• aerenchyma (air spaces) for buoyancy</text>
        <text x="60" y="228" fontSize="8.5" className="fill-current text-muted-foreground">• roots reduced or absent</text>
      </g>

      {/* submerged */}
      <g>
        <path d="M330 120 q-6 60 -14 110 M330 120 q10 60 20 110 M330 120 q0 70 0 120" fill="none" strokeWidth="3" className="stroke-current text-emerald-500" />
        <text x="330" y="66" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SUBMERGED</text>
        <text x="330" y="82" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Hydrilla, Vallisneria</text>
        <text x="280" y="262" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">• thin, ribbon leaves; no cuticle/stomata</text>
        <text x="280" y="276" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">• mechanical tissue absent — water supports</text>
      </g>

      {/* emergent */}
      <g>
        <line x1="510" y1="110" x2="510" y2="60" strokeWidth="4" className="stroke-current text-emerald-600" />
        <ellipse cx="510" cy="56" rx="20" ry="8" className="fill-current text-emerald-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        <text x="510" y="26" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EMERGENT (amphibious)</text>
        <text x="510" y="42" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">lotus, Typha, rice</text>
        <text x="450" y="196" fontSize="8.5" className="fill-current text-muted-foreground">• stomata on upper surface only</text>
        <text x="450" y="212" fontSize="8.5" className="fill-current text-muted-foreground">• aerenchyma channels air to roots</text>
        <text x="450" y="228" fontSize="8.5" className="fill-current text-muted-foreground">• roots normal but poorly developed</text>
      </g>

      <text x="16" y="296" fontSize="0">.</text>
      <text x="16" y="294" fontSize="10" className="fill-current text-muted-foreground">Common thread: too much water, so the problem is gases and support, not drought — hence air spaces everywhere.</text>
    </svg>
  );
}
