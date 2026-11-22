// Holmes signal sequence. Theme-aware.
export function HolmesSignalSequence({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Holmes signal of spontaneously burning phosphine used by wrecked ships">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Holme's signal: the sea's flare</text>
      <rect x="80" y="60" width="200" height="70" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.14" />
      <text x="180" y="88" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">pierced Ca₃P₂ + CaC₂ container</text>
      <text x="180" y="110" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">thrown overboard from a wrecked ship</text>
      <path d="M 285 95 L 355 95" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#ahs)" />
      <rect x="360" y="60" width="210" height="70" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.16" />
      <text x="465" y="88" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">PH₃ + P₂H₄ ignite on contact with water</text>
      <text x="465" y="110" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">C₂H₂ also burns — flames + smoke</text>
      <defs><marker id="ahs" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker></defs>
      <text x="330" y="176" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">P₂H₄ impurity is the self-igniter; pure PH₃ needs a spark</text>
      <text x="330" y="204" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">A distress beacon that needs no matches — only seawater</text>
    </svg>
  );
}
