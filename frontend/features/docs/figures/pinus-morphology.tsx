/** Pinus morphology — needle leaves in fascicles, resin canals, bark. Theme-aware. */
export function PinusMorphology({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Pinus morphology with tall trunk needle leaves in fascicles of three dwarf shoots spur resin canals and scaly bark">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Pinus — built for mountain life</text>

      {/* tree */}
      <rect x="300" y="80" width="26" height="150" rx="6" className="fill-current text-stone-500/50" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M313 ${92 + i * 36} l-70 ${22 + i * 4} q70 14 140 0 Z`} className="fill-current text-emerald-600/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(21 128 61 / 0.9)" }} />
      ))}
      <text x="380" y="180" fontSize="8.5" className="fill-current text-muted-foreground">long shoot / dwarf shoot system</text>

      {/* needle fascicle zoom */}
      <g>
        <rect x="40" y="60" width="220" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="150" y="84" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NEEDLE FASCICLE</text>
        <g className="stroke-current text-emerald-600" strokeWidth="3.5">
          <line x1="120" y1="180" x2="120" y2="100" /><line x1="140" y1="180" x2="140" y2="100" /><line x1="160" y1="180" x2="160" y2="100" />
        </g>
        <path d="M112 100 q18 -14 56 0" fill="none" strokeWidth="2" className="stroke-current text-stone-500" />
        <text x="150" y="200" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">3 needles on a dwarf shoot,</text>
        <text x="150" y="214" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">wrapped by a scaly sheath</text>
      </g>

      {/* xerophyte features */}
      <rect x="420" y="60" width="220" height="160" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="530" y="84" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Xerophyte toolkit</text>
      {["needle shape → less surface", "thick cuticle + sunken stomata", "resin canals seal wounds & deter insects", "deep roots, evergreen habit"].map((s, i) => (
        <text key={i} x="436" y={106 + i * 22} fontSize="8.3" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      <text x="16" y="244" fontSize="10" className="fill-current text-muted-foreground">Needles survive several years — the pine never gambles everything on one summer, a slow-and-steady strategy.</text>
    </svg>
  );
}
