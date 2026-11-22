// Nitrogen triple bond anatomy. Theme-aware.
export function TripleBondAnatomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Nitrogen molecule with triple bond 941 kilojoules per mole and 110 picometre bond length explaining inertness">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The strongest bond in the simple diatomics</text>
      <circle cx="250" cy="110" r="26" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.3" />
      <circle cx="410" cy="110" r="26" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.3" />
      <line x1="270" y1="98" x2="390" y2="98" stroke="currentColor" strokeWidth="2.5" className="text-foreground" />
      <line x1="270" y1="110" x2="390" y2="110" stroke="currentColor" strokeWidth="2.5" className="text-foreground" />
      <line x1="270" y1="122" x2="390" y2="122" stroke="currentColor" strokeWidth="2.5" className="text-foreground" />
      <text x="330" y="165" fontSize="11.5" textAnchor="middle" className="fill-current text-muted-foreground">N≡N · 941 kJ/mol · 110 pm · bond order 3</text>
      <text x="330" y="200" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Breaking it costs more than most reactions can pay - so N₂ just watches</text>
    </svg>
  );
}
