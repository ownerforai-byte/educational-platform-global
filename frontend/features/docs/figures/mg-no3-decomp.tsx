// MgNo3Decomp figure. Theme-aware.
export function MgNo3Decomp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Decomposition of magnesium nitrate with brown nitrogen dioxide and oxygen test">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Heating Mg(NO₃)₂ — read the fumes</text>
      <rect x="200" y="65" width="140" height="70" rx="10" fill="none" stroke="rgb(148 163 184)" strokeWidth="2" />
      <text x="270" y="92" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Mg(NO₃)₂</text>
      <text x="270" y="112" fontSize="9.5" textAnchor="middle" fill="rgb(239 68 68)">heat</text>
      <path d="M 345 90 C 420 70, 480 70, 540 85" stroke="rgb(148 57 57)" strokeWidth="5" fill="none" opacity="0.7" />
      <text x="450" y="60" fontSize="10" fill="rgb(148 57 57)" textAnchor="middle">brown fumes = NO₂</text>
      <path d="M 345 105 C 420 130, 480 135, 540 130" stroke="rgb(16 185 129)" strokeWidth="2.5" fill="none" markerEnd="url(#mnd-a)" />
      <text x="450" y="155" fontSize="10" fill="rgb(16 185 129)" textAnchor="middle">colourless gas relights a glowing splint = O₂</text>
      <text x="270" y="165" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">2Mg(NO₃)₂ → 2MgO + 4NO₂ + O₂</text>
      <text x="90" y="100" fontSize="10" className="fill-current text-muted-foreground">white residue</text>
      <text x="90" y="118" fontSize="10" className="fill-current text-muted-foreground">left: MgO</text>
      <defs>
        <marker id="mnd-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Two observations, two gases, one equation — quote all three</text>
    </svg>
  );
}
