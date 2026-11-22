// Sugar snake dehydration. Theme-aware.
export function SugarSnakeDehydration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Concentrated sulphuric acid poured on sugar producing black carbon column steam and heat">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The sugar snake experiment</text>
      <rect x="120" y="70" width="140" height="80" rx="10" className="fill-current" style={{ color: "rgb(250 250 250)" }} opacity="0.5" />
      <text x="190" y="115" fontSize="11" textAnchor="middle" className="fill-current text-foreground">white sugar C₁₂H₂₂O₁₁</text>
      <path d="M 270 110 L 340 110" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" markerEnd="url(#ass)" />
      <text x="305" y="96" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">conc. H₂SO₄</text>
      <rect x="350" y="60" width="180" height="100" rx="10" className="fill-current" style={{ color: "rgb(23 23 23)" }} opacity="0.85" />
      <text x="440" y="105" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(250 250 250)">black porous column</text>
      <text x="440" y="128" fontSize="10" textAnchor="middle" fill="rgb(226 232 240)">C + steam, rising "snake"</text>
      <defs><marker id="ass" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="currentColor" className="text-muted-foreground" /></marker></defs>
      <text x="330" y="190" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">C₁₂H₂₂O₁₁ —(H₂SO₄)→ 12C + 11H₂O</text>
      <text x="330" y="212" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Water is ripped out atom-by-atom; the heat and steam inflate the carbon</text>
    </svg>
  );
}
