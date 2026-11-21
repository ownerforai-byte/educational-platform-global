/** Terai vs Bhabar vegetation. Theme-aware. */
export function TeraiVsBhabarVegetation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Terai versus Bhabar vegetation Terai alluvial plain tall sal forests riverine sissoo khair tall grasslands Saccharum habitat of rhino tiger swamp deer versus Bhabar boulder strewn porous belt drier sal khair sissoo deep water tables">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Terai vs Bhabar vegetation (NEB 2022)</text>

      <rect x="40" y="50" width="280" height="110" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="180" y="72" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TERAI — alluvial plain</text>
      <text x="180" y="94" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">tall sal forests; riverine</text>
      <text x="180" y="110" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">sissoo–khair; tall grasslands</text>
      <text x="180" y="126" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">(Saccharum, Phragmites, Themeda)</text>
      <text x="180" y="146" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontStyle="italic">habitat of rhino, tiger, swamp deer</text>

      <rect x="340" y="50" width="280" height="110" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="480" y="72" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BHABAR — porous boulder belt</text>
      <text x="480" y="94" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">below the Siwaliks; boulder-strewn</text>
      <text x="480" y="110" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">drier sal and khair–sissoo forest</text>
      <text x="480" y="126" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">with deep water tables</text>
      <text x="480" y="146" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontStyle="italic">four key species: sal, sissoo, khair, simal</text>

      <text x="16" y="186" fontSize="8.4" className="fill-current text-muted-foreground">Same latitude, different ground: water table and soil decide the forest.</text>
    </svg>
  );
}
