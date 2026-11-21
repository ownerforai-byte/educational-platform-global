/** Fungal cell structure — chitin wall, no chloroplast, vacuole. Theme-aware. */
export function FungalCellStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Fungal cell structure with chitin cell wall plasma membrane nucleus mitochondria vacuole and glycogen granules no chloroplast">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Inside one fungal cell</text>
      <rect x="120" y="50" width="260" height="150" rx="24" className="fill-current text-amber-500/10" strokeWidth="4" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <rect x="132" y="62" width="236" height="126" rx="18" fill="none" strokeWidth="2" strokeDasharray="5 4" className="stroke-current text-amber-600" />
      <text x="400" y="70" fontSize="9" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="800">chitin cell wall (outer, thick)</text>
      <text x="400" y="88" fontSize="9" className="fill-current text-muted-foreground">plasma membrane just inside</text>
      <circle cx="220" cy="105" r="18" className="fill-current text-violet-500/30" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="400" y="108" fontSize="9" className="fill-current text-muted-foreground">nucleus (eukaryotic)</text>
      <ellipse cx="290" cy="150" rx="30" ry="14" className="fill-current text-emerald-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="400" y="150" fontSize="9" className="fill-current text-muted-foreground">vacuole — stores reserves</text>
      <ellipse cx="180" cy="160" rx="18" ry="9" className="fill-current text-rose-500/30" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="400" y="172" fontSize="9" className="fill-current text-muted-foreground">mitochondria, glycogen granules</text>
      <text x="400" y="194" fontSize="9" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">NO chloroplast — fungi never photosynthesise</text>
      <text x="16" y="226" fontSize="10" className="fill-current text-muted-foreground">Storage is glycogen (like animals) but walls are chitin — fungi sit in their own kingdom for exactly these reasons.</text>
    </svg>
  );
}
