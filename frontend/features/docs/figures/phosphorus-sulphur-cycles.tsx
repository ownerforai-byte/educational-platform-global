/**
 * Phosphorus & sulphur cycles — sedimentary cycles without an
 * atmospheric pool, compared with carbon. Theme-aware via currentColor.
 */
export function PhosphorusSulphurCycles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Sedimentary phosphorus and sulphur cycles moving between rock soil organisms and water without a significant atmospheric pool">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sedimentary cycles — P &amp; S travel through rock, not air</text>

      {/* rock reservoir */}
      <rect x="40" y="70" width="240" height="60" rx="10" className="fill-current text-slate-600/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(87 83 78 / 0.9)" }} />
      <text x="160" y="94" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ROCK & MINERAL DEPOSITS</text>
      <text x="160" y="110" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">the main reservoir — no atmospheric pool</text>

      {/* soil */}
      <rect x="40" y="170" width="240" height="50" rx="10" className="fill-current text-amber-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="160" y="192" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SOIL / WATER (PO₄³⁻, SO₄²⁻)</text>
      <text x="160" y="208" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">weathering releases ions</text>

      {/* organisms */}
      <rect x="360" y="170" width="120" height="50" rx="10" className="fill-current text-green-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="420" y="192" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ORGANISMS</text>
      <text x="420" y="208" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">DNA, ATP, proteins</text>

      {/* decomposers */}
      <rect x="510" y="170" width="130" height="50" rx="10" className="fill-current text-violet-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="575" y="192" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DECOMPOSERS</text>
      <text x="575" y="208" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">return ions to soil</text>

      <g className="stroke-current text-foreground" strokeWidth="2.5">
        <line x1="160" y1="134" x2="160" y2="166" />
        <line x1="284" y1="195" x2="356" y2="195" /><polygon points="348,189 364,195 348,201" className="fill-current text-foreground" />
        <line x1="484" y1="195" x2="506" y2="195" /><polygon points="498,189 514,195 498,201" className="fill-current text-foreground" />
        <path d="M575 166 Q575 130 284 130 L200 166" fill="none" strokeDasharray="6 3" />
      </g>
      <text x="290" y="124" fontSize="8.5" className="fill-current text-muted-foreground">excretion & death return nutrients (dashed)</text>

      <text x="16" y="252" fontSize="10" className="fill-current text-muted-foreground">Key difference from carbon: no gas phase (P has none; S has SO₂/H₂S only via volcanic & human emissions) → cycles are slower and locally locked.</text>
      <text x="16" y="272" fontSize="10" className="fill-current text-muted-foreground">Human disruption: phosphate mining & fertiliser runoff → eutrophication; coal burning → acid rain (SO₂).</text>
      <text x="16" y="290" fontSize="10" className="fill-current text-muted-foreground">Exam hook: gaseous vs sedimentary cycles — which has an atmospheric reservoir?</text>
    </svg>
  );
}
