// LeadHaemBlock figure. Theme-aware.
export function LeadHaemBlock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Lead blocking haem synthesis enzymes causing anaemia and child IQ loss">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Lead: anaemia by enzyme sabotage</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(148 163 184)" opacity="0.12" stroke="rgb(148 163 184)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Pb²⁺ blocks the haem line</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">ALA dehydratase ✗</text>
      <text x="180" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">ferrochelatase ✗</text>
      <text x="180" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">haem cannot be assembled</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">CONSEQUENCES</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">anaemia (no haemoglobin)</text>
      <text x="480" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">children: IQ loss, learning harm</text>
      <text x="480" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">adults: lead colic, kidney damage</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Sources: old paints, batteries, formerly leaded petrol (now phased out)</text>
    </svg>
  );
}
