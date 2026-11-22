// Two oxygen combustion equations of ammonia. Theme-aware.
export function TwoOxygenEquations({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Ammonia burning in oxygen without catalyst gives nitrogen while catalytic oxidation over platinum gives nitric oxide">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Same flame, two products - catalyst decides</text>
      <rect x="40" y="50" width="580" height="60" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.13" />
      <text x="60" y="76" fontSize="12.5" fontWeight="800" className="fill-current text-foreground">no catalyst:</text>
      <text x="60" y="98" fontSize="12" fontWeight="700" fill="rgb(239 68 68)">4NH₃ + 3O₂ → 2N₂ + 6H₂O (pale green flame)</text>
      <rect x="40" y="126" width="580" height="60" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="60" y="152" fontSize="12.5" fontWeight="800" className="fill-current text-foreground">Pt gauze, 800 °C:</text>
      <text x="60" y="174" fontSize="12" fontWeight="700" fill="rgb(16 185 129)">4NH₃ + 5O₂ → 4NO + 6H₂O (Ostwald step 1)</text>
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The exam trap: quote the right equation for the right condition</text>
    </svg>
  );
}
