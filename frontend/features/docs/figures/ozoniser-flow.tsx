// Ozoniser silent discharge flow. Theme-aware.
export function OzoniserFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Siemens ozoniser with dry oxygen entering, silent discharge between cooled electrodes and ten percent ozone exiting">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Siemen's ozoniser</text>
      <rect x="60" y="80" width="420" height="70" rx="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <rect x="120" y="88" width="300" height="54" rx="8" className="fill-current" style={{ color: "rgb(168 85 247)" }} opacity="0.18" />
      <text x="270" y="120" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(168 85 247)">silent (corona) discharge</text>
      <text x="60" y="70" fontSize="11" className="fill-current text-muted-foreground">dry, pure O₂ in →</text>
      <text x="480" y="120" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)">out: O₂ + ~10% O₃</text>
      <rect x="60" y="160" width="540" height="40" rx="8" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.12" />
      <text x="330" y="186" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">electrodes cooled in dil. H₂SO₄ · dry O₂ · no sparking</text>
      <text x="330" y="226" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">3O₂ ⇌ 2O₃ (+142 kJ): the discharge builds and destroys - a ~10% steady state</text>
    </svg>
  );
}
