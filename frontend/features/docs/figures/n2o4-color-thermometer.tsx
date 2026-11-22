// N2O4/NO2 colour thermometer. Theme-aware.
export function N2o4ColorThermometer({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Nitrogen dioxide equilibrium acts as a colour thermometer: heating deepens the brown as N2O4 dissociates, cooling and pressure pale it">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">A visible equilibrium: the colour thermometer</text>
      <text x="330" y="60" fontSize="15" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">N₂O₄ (colourless)  ⇌  2NO₂ (brown)   ΔH = +57 kJ/mol</text>
      <rect x="60" y="90" width="160" height="90" rx="10" className="fill-current" style={{ color: "rgb(241 245 249)" }} opacity="0.5" />
      <text x="140" y="120" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">cool / pressurise</text>
      <text x="140" y="142" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">shifts backward</text>
      <text x="140" y="164" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">pale tube</text>
      <rect x="250" y="90" width="160" height="90" rx="10" fill="rgb(120 53 15)" opacity="0.85" />
      <text x="330" y="120" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(254 243 199)">heat</text>
      <text x="330" y="142" fontSize="11" textAnchor="middle" fill="rgb(254 243 199)">shifts forward</text>
      <text x="330" y="164" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(254 243 199)">deep brown</text>
      <rect x="440" y="90" width="160" height="90" rx="10" fill="rgb(120 53 15)" opacity="0.4" />
      <text x="520" y="120" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(254 243 199)">heat + open volume</text>
      <text x="520" y="142" fontSize="11" textAnchor="middle" fill="rgb(254 243 199)">more NO2</text>
      <text x="520" y="164" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(254 243 199)">medium brown</text>
      <text x="330" y="230" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">NEB 2022 asked exactly this: dH positive, so heating drives forward and the brown deepens</text>
    </svg>
  );
}
