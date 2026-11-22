// SodiumFusionExtract figure. Theme-aware.
export function SodiumFusionExtract({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Sodium fusion extract preparation and contents">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The fusion extract — what is in the water</text>
      <rect x="40" y="52" width="270" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="175" y="78" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">IGNITION TUBE</text>
      <text x="175" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">organic compound + sodium metal</text>
      <text x="175" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">red-hot → fused mass → drop in water</text>
      <text x="175" y="152" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">boil + filter → the Lassaigne extract</text>
      <rect x="350" y="52" width="270" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="485" y="78" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">EXTRACT CONTAINS</text>
      <text x="485" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">NaCN (if N) · Na₂S (if S) · NaX (if X)</text>
      <text x="485" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">each anion now has its own colour test</text>
      <text x="485" y="152" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">unused Na destroyed by the boiling</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">safety: excess sodium must be destroyed — it reacts violently with water</text>
    </svg>
  );
}
