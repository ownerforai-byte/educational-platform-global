/** Cell wall layers detailed — middle lamella, primary, secondary, plasmodesmata. Well-detailed. Theme-aware. */
export function CellWallLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cell wall layers detailed middle lamella pectin between two cells primary wall cellulose microfibrils secondary wall three layers S1 S2 S3 with lignin plasmodesmata channels connecting cytoplasm and functions support protection permeability">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Plant cell wall — layer by layer</text>

      {/* cell 1 */}
      <rect x="40" y="50" width="180" height="200" rx="10" className="fill-current text-emerald-500/5" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="130" y="160" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">cytoplasm (cell A)</text>
      {/* cell 2 */}
      <rect x="240" y="50" width="180" height="200" rx="10" className="fill-current text-emerald-500/5" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="330" y="160" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">cytoplasm (cell B)</text>

      {/* middle lamella */}
      <line x1="220" y1="50" x2="220" y2="250" strokeWidth="6" className="stroke-current text-amber-600" />
      <text x="220" y="40" fontSize="8" textAnchor="middle" className="fill-current text-amber-600" fontWeight="800">middle lamella (pectin — cements cells)</text>

      {/* primary walls */}
      <line x1="208" y1="50" x2="208" y2="250" strokeWidth="4" className="stroke-current text-emerald-500" />
      <line x1="232" y1="50" x2="232" y2="250" strokeWidth="4" className="stroke-current text-emerald-500" />
      <text x="480" y="80" fontSize="8" className="fill-current text-emerald-600" fontWeight="700">primary wall — cellulose microfibrils,</text>
      <text x="480" y="96" fontSize="8" className="fill-current text-emerald-600" fontWeight="700">thin (1–3 µm), grows with the cell</text>

      {/* secondary walls */}
      <line x1="196" y1="50" x2="196" y2="250" strokeWidth="5" className="stroke-current text-emerald-700" />
      <line x1="244" y1="50" x2="244" y2="250" strokeWidth="5" className="stroke-current text-emerald-700" />
      <text x="480" y="126" fontSize="8" className="fill-current text-emerald-700" fontWeight="700">secondary wall — deposited inside,</text>
      <text x="480" y="142" fontSize="8" className="fill-current text-emerald-700" fontWeight="700">three layers (S1, S2, S3), lignin-reinforced</text>

      {/* plasmodesmata */}
      <line x1="190" y1="140" x2="270" y2="140" strokeWidth="4" className="stroke-current text-sky-500" />
      <text x="480" y="170" fontSize="8" className="fill-current text-sky-600" fontWeight="700">plasmodesmata — cytoplasmic channels</text>
      <text x="480" y="186" fontSize="8" className="fill-current text-sky-600" fontWeight="700">through both walls: symplastic transport</text>

      {/* functions */}
      <rect x="440" y="206" width="260" height="80" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="460" y="228" fontSize="8" className="fill-current text-foreground" fontWeight="700">FUNCTIONS: shape · support · protection</text>
      <text x="460" y="246" fontSize="8" className="fill-current text-muted-foreground">freely permeable (unlike the membrane)</text>
      <text x="460" y="264" fontSize="8" className="fill-current text-muted-foreground">absent in animal cells; fungi: chitin wall</text>
    </svg>
  );
}
