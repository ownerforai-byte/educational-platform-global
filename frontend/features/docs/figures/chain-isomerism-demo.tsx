// ChainIsomerismDemo figure. Theme-aware.
export function ChainIsomerismDemo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Chain isomerism straight versus branched carbon skeleton">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Chain isomerism — the skeleton changes</text>
      <rect x="40" y="52" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">straight chain</text>
      <text x="180" y="110" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C–C–C–C–C (pentane)</text>
      <text x="180" y="140" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">every carbon ends-to-end</text>
      <rect x="340" y="52" width="280" height="110" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">branched chain</text>
      <text x="480" y="110" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C–C(C)–C–C (2-methylbutane)</text>
      <text x="480" y="140" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">a methyl grows off the middle</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">same formula C₅H₁₂ · different carbon framework</text>
    </svg>
  );
}
