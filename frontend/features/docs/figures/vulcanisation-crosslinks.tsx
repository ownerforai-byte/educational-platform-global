// Vulcanisation crosslinks. Theme-aware.
export function VulcanisationCrosslinks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Vulcanisation adding 3 to 5 percent sulphur crosslinks between rubber chains versus 30 percent for ebonite">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Sulphur as the bridge-builder</text>
      <path d="M 120 80 q 60 20 120 0 q 60 -20 120 0 q 60 20 120 0" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-foreground" opacity="0.5" />
      <path d="M 120 130 q 60 20 120 0 q 60 -20 120 0 q 60 20 120 0" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-foreground" opacity="0.5" />
      <path d="M 120 180 q 60 20 120 0 q 60 -20 120 0 q 60 20 120 0" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-foreground" opacity="0.5" />
      {[220, 340].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="80" x2={x} y2="130" stroke="rgb(245 158 11)" strokeWidth="3" />
          <line x1={x} y1="130" x2={x} y2="180" stroke="rgb(245 158 11)" strokeWidth="3" />
        </g>
      ))}
      <text x="345" y="110" fontSize="10" fill="rgb(245 158 11)">S crosslinks</text>
      <text x="560" y="105" fontSize="10.5" className="fill-current text-muted-foreground">tyres: 3–5% S</text>
      <text x="560" y="128" fontSize="10.5" className="fill-current text-muted-foreground">ebonite: ~30% S</text>
      <text x="330" y="208" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Goodyear 1839: soft sticky rubber becomes tough and elastic — S–S bridges stop chain slip</text>
    </svg>
  );
}
