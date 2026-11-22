// PH3 preparation routes. Theme-aware.
export function Ph3PrepRoutes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Preparation of phosphine from white phosphorus with sodium hydroxide and from calcium phosphide with water">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Two prep routes, both from P³⁻</text>
      <rect x="60" y="56" width="540" height="52" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.14" />
      <text x="330" y="80" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">P₄ + 3NaOH + 3H₂O → PH₃ + 3NaH₂PO₂</text>
      <text x="330" y="100" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">lab route (hot conc. alkali)</text>
      <rect x="60" y="122" width="540" height="52" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="330" y="146" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">Ca₃P₂ + 6H₂O → 3Ca(OH)₂ + 2PH₃</text>
      <text x="330" y="166" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">hydrolysis of calcium phosphide (seaside fire-flare impurity P₂H₄)</text>
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Purify by passing through KOH / freezing trap — remove P₂H₄ that ignites spontaneously</text>
    </svg>
  );
}
