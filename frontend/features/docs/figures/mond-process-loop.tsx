// Mond process loop. Theme-aware.
export function MondProcessLoop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Mond process loop forming nickel tetracarbonyl at 50 degrees and decomposing at 230 degrees">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Mond: nickel travels as a vapour</text>
      <rect x="70" y="80" width="200" height="60" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.16" />
      <text x="170" y="105" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">impure Ni + 4CO</text>
      <text x="170" y="126" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">50 °C → Ni(CO)₄ (volatile)</text>
      <path d="M 275 110 Q 330 60 385 110" stroke="rgb(245 158 11)" strokeWidth="2.5" fill="none" markerEnd="url(#amp)" />
      <rect x="390" y="80" width="200" height="60" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.16" />
      <text x="490" y="105" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Ni(CO)₄ — 230 °C</text>
      <text x="490" y="126" fontSize="10.5" textAnchor="middle" fill="rgb(16 185 129)">→ pure Ni + 4CO</text>
      <path d="M 490 145 Q 330 200 170 145" stroke="rgb(148 163 184)" strokeWidth="2" strokeDasharray="5 4" fill="none" markerEnd="url(#amp2)" />
      <text x="330" y="192" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">CO recycled</text>
      <defs>
        <marker id="amp" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
        <marker id="amp2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
      <text x="330" y="218" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Fe and Co refuse to form volatile carbonyls — the impurities stay behind</text>
    </svg>
  );
}
