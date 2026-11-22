// HbVsChlorophyllFig figure. Theme-aware.
export function HbVsChlorophyllFig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Side by side comparison of haemoglobin iron and chlorophyll magnesium">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Function picks the metal</text>
      <ellipse cx="185" cy="120" rx="90" ry="55" fill="none" stroke="rgb(239 68 68)" strokeWidth="3" strokeDasharray="7 5" />
      <circle cx="185" cy="120" r="13" fill="rgb(220 38 38)" />
      <text x="185" y="125" fontSize="9" fill="rgb(255 255 255)" textAnchor="middle">Fe²⁺</text>
      <text x="185" y="196" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">HAEM — transport</text>
      <text x="185" y="214" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">d-orbitals bind O₂ reversibly</text>
      <ellipse cx="475" cy="120" rx="90" ry="55" fill="none" stroke="rgb(16 185 129)" strokeWidth="3" strokeDasharray="7 5" />
      <circle cx="475" cy="120" r="13" fill="rgb(16 185 129)" />
      <text x="475" y="125" fontSize="9" fill="rgb(255 255 255)" textAnchor="middle">Mg²⁺</text>
      <text x="475" y="196" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">CHLORIN — light</text>
      <text x="475" y="214" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">conjugated ring absorbs red + blue</text>
      <text x="330" y="75" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">both porphyrin-type chelate rings</text>
      <text x="330" y="95" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">swap the metals and neither works</text>
    </svg>
  );
}
