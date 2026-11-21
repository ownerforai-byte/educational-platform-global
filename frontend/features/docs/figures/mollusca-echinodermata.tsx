/** Mollusca & Echinodermata — soft body plan and pentaradial plan. Theme-aware. */
export function MolluscaEchinodermata({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Mollusca soft bodied plan with muscular foot mantle shell and radula compared with echinodermata pentaradial water vascular system and tube feet">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two oddballs — Mollusca and Echinodermata</text>

      {/* mollusc */}
      <g>
        <path d="M60 180 Q60 90 170 90 Q260 90 260 180 Z" className="fill-current text-violet-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
        <ellipse cx="150" cy="196" rx="90" ry="16" className="fill-current text-amber-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="150" y="66" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MOLLUSCA</text>
        <text x="150" y="236" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">muscular foot (movement) · mantle (secretes shell)</text>
        <text x="150" y="250" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">radula (rasping tongue) · open circulation · Pila, octopus</text>
      </g>

      {/* echinoderm */}
      <g>
        <g className="stroke-current text-rose-500" strokeWidth="3" style={{ color: "rgb(244 63 94 / 0.9)" }}>
          {[0, 72, 144, 216, 288].map((deg) => {
            const a = (deg * Math.PI) / 180;
            const x = 480 + 46 * Math.cos(a), y = 130 + 46 * Math.sin(a);
            return <line key={deg} x1="480" y1="130" x2={x} y2={y} />;
          })}
        </g>
        <circle cx="480" cy="130" r="20" className="fill-current text-rose-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="480" y="66" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ECHINODERMATA</text>
        <text x="480" y="236" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">pentaradial (5-part) symmetry as adult</text>
        <text x="480" y="250" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">water vascular system drives tube feet · starfish, sea urchin</text>
      </g>

      <text x="16" y="258" fontSize="0">.</text>
      <text x="16" y="256" fontSize="0">.</text>
      <text x="16" y="246" fontSize="0">.</text>
    </svg>
  );
}
