// AlicyclicVsAromatic figure. Theme-aware.
export function AlicyclicVsAromatic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Cyclohexane alicyclic ring versus benzene aromatic ring">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Two rings, two behaviours</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">ALICYCLIC — cyclohexane</text>
      <polygon points="180,95 216,116 202,158 158,158 144,116" fill="none" stroke="rgb(59 130 246)" strokeWidth="3" />
      <text x="180" y="132" fontSize="10" textAnchor="middle" className="fill-current text-foreground">C₆H₁₂</text>
      <text x="180" y="192" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">ordinary aliphatic ring — adds readily, no π stabilisation</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.08" stroke="rgb(245 158 11)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">AROMATIC — benzene</text>
      <polygon points="480,95 516,116 502,158 458,158 444,116" fill="none" stroke="rgb(245 158 11)" strokeWidth="3" />
      <circle cx="480" cy="126" r="24" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="480" y="192" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">delocalised π ring — extra stability, substitution over addition</text>
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The ring is not the test — the delocalised π electrons are</text>
    </svg>
  );
}
