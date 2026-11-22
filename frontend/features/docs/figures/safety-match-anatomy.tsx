// Safety match anatomy. Theme-aware.
export function SafetyMatchAnatomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Safety match head of potassium chlorate and antimony sulphide striking on red phosphorus side of the box">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Safety match: the reaction needs both sides</text>
      <rect x="120" y="70" width="70" height="24" rx="12" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.7" />
      <text x="155" y="115" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">head: KClO₃ + Sb₂S₃</text>
      <rect x="140" y="90" width="30" height="70" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <rect x="330" y="70" width="180" height="40" rx="6" className="fill-current" style={{ color: "rgb(220 38 38)" }} opacity="0.35" />
      <text x="420" y="95" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">striking surface: red P + glass powder</text>
      <path d="M 200 82 Q 265 82 325 88" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#asm)" />
      <text x="262" y="70" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">friction ignites P</text>
      <defs><marker id="asm" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker></defs>
      <text x="330" y="180" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Red P on the box oxidises the head's chlorate — neither side can light alone</text>
    </svg>
  );
}
