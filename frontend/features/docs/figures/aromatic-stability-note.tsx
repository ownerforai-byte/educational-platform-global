// AromaticStabilityNote figure. Theme-aware.
export function AromaticStabilityNote({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Delocalised pi electron stability of benzene favouring substitution">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Aromaticity is a stability statement</text>
      <polygon points="330,60 390,96 390,164 330,200 270,164 270,96" fill="none" stroke="rgb(245 158 11)" strokeWidth="3.5" />
      <circle cx="330" cy="130" r="42" fill="rgb(245 158 11)" opacity="0.12" />
      <circle cx="330" cy="130" r="42" fill="none" stroke="rgb(245 158 11)" strokeWidth="2" strokeDasharray="6 4" />
      <text x="330" y="124" fontSize="10" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">6 π electrons</text>
      <text x="330" y="140" fontSize="9" fill="rgb(245 158 11)" textAnchor="middle">delocalised all round</text>
      <text x="560" y="80" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)">result 1:</text>
      <text x="560" y="100" fontSize="9.5" className="fill-current text-muted-foreground">extra stability —</text>
      <text x="560" y="118" fontSize="9.5" className="fill-current text-muted-foreground">the ring resists</text>
      <text x="560" y="136" fontSize="9.5" className="fill-current text-muted-foreground">being broken open</text>
      <text x="560" y="164" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)">result 2:</text>
      <text x="560" y="184" fontSize="9.5" className="fill-current text-muted-foreground">SUBSTITUTION preferred</text>
      <text x="560" y="202" fontSize="9.5" className="fill-current text-muted-foreground">over ADDITION</text>
      <text x="330" y="228" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">"Aromatic" = benzene-ring π stability, not any smell</text>
    </svg>
  );
}
