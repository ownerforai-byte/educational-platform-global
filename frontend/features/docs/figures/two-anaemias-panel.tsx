// TwoAnaemiasPanel figure. Theme-aware.
export function TwoAnaemiasPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Iron deficiency anaemia versus pernicious anaemia from vitamin B12">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Two anaemias, two different metals</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">IRON-DEFICIENCY ANAEMIA</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">missing metal: Fe²⁺ of haem</text>
      <text x="180" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">too little haemoglobin made</text>
      <text x="180" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">pallor, fatigue, breathlessness</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">PERNICIOUS ANAEMIA</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">missing metal: Co of vitamin B₁₂</text>
      <text x="480" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">red cells fail to mature properly</text>
      <text x="480" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">immature, oversized cells</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Cobalt never sits in haemoglobin — it works one step earlier, in cell division</text>
    </svg>
  );
}
