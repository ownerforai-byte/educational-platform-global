// OzoneCanonicalStructures figure. Theme-aware.
export function OzoneCanonicalStructures({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Ozone resonance structures with formal charges">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Ozone: two drawings, one molecule</text>
      <rect x="40" y="55" width="280" height="100" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="88" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">⁻O–O⁺=O</text>
      <text x="180" y="116" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">negative on the left oxygen, double bond right</text>
      <rect x="340" y="55" width="280" height="100" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="88" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">O=O⁺–O⁻</text>
      <text x="480" y="116" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">mirror image: double bond left, negative right</text>
      <text x="330" y="185" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">reality: both O–O bonds IDENTICAL, each between single and double</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">neither drawing alone is true — the hybrid is</text>
    </svg>
  );
}
