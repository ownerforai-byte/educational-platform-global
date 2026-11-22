// PlasterSettingPanel figure. Theme-aware.
export function PlasterSettingPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Plaster of Paris preparation at 120 degrees and setting by rehydration">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Plaster of Paris — a 120 °C recipe</text>
      <rect x="40" y="60" width="280" height="110" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="180" y="84" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">MAKE: gypsum at ~120 °C</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">CaSO₄·2H₂O → CaSO₄·½H₂O + 1½H₂O</text>
      <text x="180" y="132" fontSize="10" textAnchor="middle" fill="rgb(239 68 68)">above ~200 °C → dead-burnt anhydrite</text>
      <text x="180" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">(no channels — never sets again)</text>
      <rect x="340" y="60" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="84" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">SET: add water</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O</text>
      <text x="480" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">interlocking gypsum needles grow</text>
      <text x="480" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">sets 10–15 min, expands slightly → sharp moulds</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The hemihydrate is a sponge for water — that is the whole trick</text>
    </svg>
  );
}
