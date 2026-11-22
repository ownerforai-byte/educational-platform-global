// ElectrophileRoster figure. Theme-aware.
export function ElectrophileRoster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Charged and neutral electrophiles with incomplete octets">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Electrophile roster — charged and neutral</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">CHARGED (cations)</text>
      <text x="180" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">H⁺ · NO₂⁺ · CH₃⁺ · Br⁺ · Cl⁺</text>
      <text x="180" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">NO₂⁺ attacks benzene in nitration</text>
      <text x="180" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">CH₃⁺ = the carbocation of substitution</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">NEUTRAL (incomplete octet)</text>
      <text x="480" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">BF₃ · AlCl₃ · SO₃</text>
      <text x="480" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">empty orbitals accept electron pairs</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">AlCl₃ catalyses Friedel–Crafts</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">charge is not the criterion — electron deficiency is</text>
    </svg>
  );
}
