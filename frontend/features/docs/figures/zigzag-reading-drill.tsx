// ZigzagReadingDrill figure. Theme-aware.
export function ZigzagReadingDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Reading a pentane zig zag skeleton into a condensed formula">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Read the zig-zag</text>
      <line x1="90" y1="120" x2="150" y2="90" stroke="rgb(59 130 246)" strokeWidth="3.5" />
      <line x1="150" y1="90" x2="210" y2="120" stroke="rgb(59 130 246)" strokeWidth="3.5" />
      <line x1="210" y1="120" x2="270" y2="90" stroke="rgb(59 130 246)" strokeWidth="3.5" />
      <line x1="270" y1="90" x2="330" y2="120" stroke="rgb(59 130 246)" strokeWidth="3.5" />
      {[90, 150, 210, 270, 330].map((cx, i) => (
        <circle key={cx} cx={cx} cy={i % 2 ? 90 : 120} r="9" fill="rgb(59 130 246)" opacity="0.35" />
      ))}
      <text x="90" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C1 (CH₃)</text>
      <text x="210" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C3 (CH₂)</text>
      <text x="330" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C5 (CH₃)</text>
      <path d="M 380 105 L 430 105" stroke="rgb(148 163 184)" strokeWidth="2.5" markerEnd="url(#zrd-a)" />
      <text x="405" y="93" fontSize="9.5" fill="rgb(148 163 184)" textAnchor="middle">reads as</text>
      <text x="445" y="112" fontSize="14" fontWeight="800" className="fill-current text-foreground">CH₃CH₂CH₂CH₂CH₃</text>
      <text x="545" y="132" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)">pentane C₅H₁₂</text>
      <text x="330" y="190" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">5 vertices = 5 carbons; hydrogens supplied by valency 4 — no atoms needed on the page</text>
      <defs>
        <marker id="zrd-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
