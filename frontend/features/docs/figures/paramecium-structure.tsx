/** Paramecium structure — slipper animalcule with oral groove, cilia, nuclei, trichocysts. Theme-aware. */
export function ParameciumStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Paramecium structure with cilia pellicle oral groove food vacuoles macro and micronucleus contractile vacuoles and trichocysts">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Paramecium — the slipper animalcule, fully tooled</text>

      <ellipse cx="280" cy="150" rx="180" ry="80" className="fill-current text-emerald-500/10" strokeWidth="3.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />

      {/* cilia */}
      {Array.from({ length: 34 }, (_, i) => {
        const a = (i / 34) * Math.PI * 2;
        const x = 280 + 180 * Math.cos(a), y = 150 + 80 * Math.sin(a);
        return <line key={i} x1={x} y1={y} x2={x + 10 * Math.cos(a)} y2={y + 10 * Math.sin(a)} strokeWidth="1.5" className="stroke-current text-emerald-600" />;
      })}

      {/* oral groove */}
      <path d="M400 120 q-50 30 -90 34" fill="none" strokeWidth="4" className="stroke-current text-sky-500" />
      <text x="410" y="112" fontSize="9" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">oral groove → cytostome (cell mouth)</text>
      <text x="410" y="126" fontSize="8" className="fill-current text-muted-foreground">cilia sweep food into a food vacuole</text>

      {/* nuclei */}
      <ellipse cx="240" cy="140" rx="18" ry="12" className="fill-current text-violet-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="240" y="128" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">macronucleus</text>
      <circle cx="240" cy="158" r="6" className="fill-current text-violet-600/60" />
      <text x="262" y="166" fontSize="8" className="fill-current text-muted-foreground">micronucleus</text>

      {/* contractile vacuoles */}
      <circle cx="160" cy="110" r="11" className="fill-current text-sky-400/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(56 189 248 / 0.95)" }} />
      <circle cx="400" cy="190" r="11" className="fill-current text-sky-400/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(56 189 248 / 0.95)" }} />
      <text x="120" y="96" fontSize="8.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">contractile vacuoles (2, alternating)</text>

      {/* food vacuoles */}
      <g className="fill-current text-amber-500/50">
        <circle cx="330" cy="160" r="6" /><circle cx="310" cy="180" r="6" /><circle cx="290" cy="190" r="6" />
      </g>
      <text x="330" y="212" fontSize="8.5" className="fill-current text-muted-foreground">food vacuoles circulate (cyclosis)</text>

      {/* trichocysts */}
      <text x="60" y="246" fontSize="9" className="fill-current text-muted-foreground">trichocysts under the pellicle — defensive threads fired at attackers</text>
      <text x="60" y="262" fontSize="9" className="fill-current text-muted-foreground">pellicle = elastic outer skin holding the shape while cilia row</text>
    </svg>
  );
}
