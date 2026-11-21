/** Fungal cell vs plant cell contrast. Well-detailed. Theme-aware. */
export function FungalVsPlantCell({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Fungal cell versus plant cell contrast chitin wall versus cellulose wall glycogen versus starch storage no chloroplast versus chloroplast present vacuole both similar features table">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fungal cell vs plant cell — near twins, three tells</text>

      {/* fungal cell */}
      <rect x="40" y="44" width="290" height="170" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="185" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FUNGAL CELL</text>
      <rect x="90" y="84" width="190" height="110" rx="14" className="fill-none stroke-current text-rose-600" strokeWidth="4" />
      <text x="185" y="90" fontSize="6.6" textAnchor="middle" className="fill-current text-rose-600" fontWeight="700">chitin wall</text>
      <circle cx="140" cy="120" r="14" className="fill-current text-violet-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="140" y="124" fontSize="5.6" textAnchor="middle" className="fill-current text-foreground">nucleus</text>
      <circle cx="220" cy="150" r="18" className="fill-current text-amber-500/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="220" y="154" fontSize="5.6" textAnchor="middle" className="fill-current text-foreground">vacuole</text>
      <circle cx="160" cy="172" r="8" className="fill-current text-stone-500/50" />
      <text x="185" y="212" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">glycogen granules stored (same as animals)</text>

      {/* plant cell */}
      <rect x="390" y="44" width="290" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="535" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PLANT CELL</text>
      <rect x="440" y="84" width="190" height="110" rx="14" className="fill-none stroke-current text-emerald-600" strokeWidth="4" />
      <text x="535" y="90" fontSize="6.6" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">cellulose wall</text>
      <circle cx="490" cy="120" r="14" className="fill-current text-violet-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="490" y="124" fontSize="5.6" textAnchor="middle" className="fill-current text-foreground">nucleus</text>
      <ellipse cx="570" cy="150" rx="20" ry="13" className="fill-current text-green-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(34 197 94 / 0.9)" }} />
      <text x="570" y="154" fontSize="5.6" textAnchor="middle" className="fill-current text-foreground">chloroplast</text>
      <circle cx="510" cy="172" r="8" className="fill-current text-stone-500/50" />
      <text x="535" y="212" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">starch granules stored</text>

      {/* verdict */}
      <rect x="40" y="230" width="640" height="58" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="60" y="252" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">THE THREE TELLS: wall chemistry (chitin vs cellulose) · storage (glycogen vs starch) · nutrition (absorbs vs photosynthesises).</text>
      <text x="60" y="272" fontSize="7.6" className="fill-current text-muted-foreground">That is why fungi got their own kingdom — plant-like in habit, animal-like in storage and feeding.</text>
    </svg>
  );
}
