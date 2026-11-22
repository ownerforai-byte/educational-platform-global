// CisTransBut2ene figure. Theme-aware.
export function CisTransBut2ene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Cis and trans but-2-ene geometrical isomers">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">but-2-ene: locked on either side of C=C</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="76" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">cis-but-2-ene</text>
      <text x="180" y="100" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃      CH₃</text>
      <text x="180" y="118" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">  \    /</text>
      <text x="180" y="136" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">     C=C</text>
      <text x="180" y="154" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">  /    \</text>
      <text x="180" y="166" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">both CH₃ on the SAME side</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="76" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">trans-but-2-ene</text>
      <text x="480" y="100" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃        H</text>
      <text x="480" y="118" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">  \      /</text>
      <text x="480" y="136" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">     C=C</text>
      <text x="480" y="154" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">  /      \</text>
      <text x="480" y="166" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">CH₃ groups on OPPOSITE sides</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">each carbon of the double bond carries two different groups — isomerism becomes possible</text>
    </svg>
  );
}
