// WohlerUreaExperiment figure. Theme-aware.
export function WohlerUreaExperiment({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Wohler 1828 conversion of ammonium cyanate into urea">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Wöhler 1828 — the experiment that killed vitalism</text>
      <rect x="40" y="55" width="250" height="90" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="165" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">INORGANIC salt</text>
      <text x="165" y="108" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">NH₄OCN</text>
      <text x="165" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">ammonium cyanate</text>
      <path d="M 295 100 L 360 100" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#wue-a)" />
      <text x="328" y="90" fontSize="10" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">heat</text>
      <rect x="365" y="55" width="250" height="90" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="490" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ORGANIC compound</text>
      <text x="490" y="108" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">NH₂CONH₂ (urea)</text>
      <text x="490" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">found in urine</text>
      <text x="330" y="175" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Same molecular formula CH₄N₂O — isomerism demonstrated</text>
      <text x="330" y="198" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Berzelius's "vital force" theory refuted: one flask, no living cell</text>
      <text x="330" y="218" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the same chemistry rules inside and outside organisms</text>
      <defs>
        <marker id="wue-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
    </svg>
  );
}
