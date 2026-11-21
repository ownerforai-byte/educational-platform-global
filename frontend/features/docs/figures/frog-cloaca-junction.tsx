/** Frog cloaca junction — three systems one exit. Well-detailed. Theme-aware. */
export function FrogCloacaJunction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog cloaca junction three systems one exit digestive urinary reproductive converge single opening faeces urine gametes amphibian shared chamber">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The cloaca — three systems, one door</text>
      {/* junction diagram */}
      <rect x="30" y="44" width="660" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EVERYTHING CONVERGES</text>
      {/* three incoming arrows */}
      <path d="M120 110 h180" className="stroke-current" strokeWidth="4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="110" y="114" fontSize="7" textAnchor="end" className="fill-current text-emerald-600" fontWeight="700">intestine → faeces</text>
      <path d="M120 150 h180" className="stroke-current" strokeWidth="4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="110" y="154" fontSize="7" textAnchor="end" className="fill-current text-sky-600" fontWeight="700">kidneys + bladder → urine</text>
      <path d="M120 190 h180" className="stroke-current" strokeWidth="4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="110" y="194" fontSize="7" textAnchor="end" className="fill-current text-rose-600" fontWeight="700">gonads → eggs or sperm</text>
      {/* cloaca chamber */}
      <rect x="300" y="104" width="120" height="104" rx="16" className="fill-current text-violet-500/20" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="150" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CLOACA</text>
      <text x="360" y="168" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">shared chamber</text>
      {/* out */}
      <path d="M420 156 h120 m-10 -6 l10 6 l-10 6" className="fill-none stroke-current" strokeWidth="4" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="556" y="160" fontSize="7" className="fill-current text-violet-600" fontWeight="700">one opening (cloacal aperture)</text>
      <text x="360" y="224" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">in breeding season the same door releases eggs or sperm into the water</text>
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Design logic: a streamlined water animal needs one rear opening — the cloaca saves space and keeps the underside smooth for swimming.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: cloaca = common chamber for digestive, urinary and reproductive tracts — a definition worth a mark every year.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Birds and reptiles share the design; most mammals replaced it with separate openings.</text>
    </svg>
  );
}
