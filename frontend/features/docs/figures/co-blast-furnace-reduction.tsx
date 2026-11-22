// CO blast furnace reduction. Theme-aware.
export function CoBlastFurnaceReduction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Blast furnace reduction of iron oxide by carbon monoxide">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The blast furnace's quiet worker</text>
      <rect x="80" y="60" width="180" height="100" rx="12" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.16" />
      <text x="170" y="100" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Fe₂O₃ (ore)</text>
      <text x="170" y="124" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">iron oxide charge</text>
      <path d="M 265 110 L 395 110" stroke="rgb(59 130 246)" strokeWidth="3" markerEnd="url(#abf)" />
      <text x="330" y="96" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">3CO</text>
      <rect x="400" y="60" width="180" height="100" rx="12" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.16" />
      <text x="490" y="100" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">2Fe + 3CO₂</text>
      <text x="490" y="124" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">molten iron + gas</text>
      <defs><marker id="abf" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(59 130 246)" /></marker></defs>
      <text x="330" y="200" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">Fe₂O₃ + 3CO → 2Fe + 3CO₂</text>
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">CO grabs the oxygen; CO₂ is the thermodynamically happier product</text>
    </svg>
  );
}
