// Starch iodide test flow for ozone. Theme-aware.
export function StarchIodideTestFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Starch iodide test sequence for ozone with equation and turpentine discrimination from hydrogen peroxide">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The test, and its catch</text>
      <rect x="40" y="50" width="280" height="80" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.13" />
      <text x="180" y="80" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">gas + starch–iodide paper</text>
      <text x="180" y="104" fontSize="11" textAnchor="middle" fill="rgb(59 130 246)">2KI + H₂O + O₃ → 2KOH + I₂ + O₂</text>
      <text x="180" y="122" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">blue-black colour = oxidant present</text>
      <rect x="340" y="50" width="280" height="80" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="480" y="80" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">but H₂O₂ passes the same test!</text>
      <text x="480" y="104" fontSize="11" textAnchor="middle" fill="rgb(16 185 129)">shake with turpentine:</text>
      <text x="480" y="122" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">O₃ decolourises the violet - H₂O₂ does not</text>
      <text x="330" y="180" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">⇒ starch–iodide finds the oxidant; turpentine names it ozone</text>
      <text x="330" y="216" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Two tests, one conclusion - quote both for full marks</text>
    </svg>
  );
}
