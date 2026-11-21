/** Eukaryotic cell general — animal cell with full organelle set. Well-detailed. Theme-aware. */
export function EukaryoticCellGeneral({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 340" className={className} role="img" aria-label="Eukaryotic animal cell generalised with plasma membrane cytoplasm nucleus nucleolus nuclear envelope rough endoplasmic reticulum smooth endoplasmic reticulum ribosomes Golgi apparatus mitochondrion lysosome centrioles and cytoskeleton all labeled">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Generalised eukaryotic (animal) cell</text>

      {/* membrane */}
      <ellipse cx="330" cy="180" rx="270" ry="130" className="fill-current text-sky-500/5" strokeWidth="4" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="330" y="330" fontSize="8" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">plasma membrane — fluid mosaic, selectively permeable</text>

      {/* nucleus */}
      <circle cx="230" cy="160" r="55" className="fill-current text-violet-500/15" stroke="currentColor" strokeWidth="3" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <circle cx="230" cy="160" r="18" className="fill-current text-violet-500/40" />
      <text x="230" y="164" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">nucleolus</text>
      <text x="230" y="230" fontSize="7.5" textAnchor="middle" className="fill-current text-violet-600" fontWeight="700">nucleus — chromatin + nucleoplasm,</text>
      <text x="230" y="243" fontSize="7.5" textAnchor="middle" className="fill-current text-violet-600" fontWeight="700">double nuclear envelope with pores</text>

      {/* RER */}
      <path d="M310 110 q30 10 60 0 q30 -10 60 0 q30 10 60 0" className="fill-none stroke-current text-emerald-600" strokeWidth="3" />
      <path d="M310 128 q30 10 60 0 q30 -10 60 0 q30 10 60 0" className="fill-none stroke-current text-emerald-600" strokeWidth="3" />
      {[[330, 118], [360, 116], [390, 120], [420, 116]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" className="fill-current text-stone-600" />
      ))}
      <text x="450" y="100" fontSize="7.5" className="fill-current text-emerald-600" fontWeight="700">rough ER + ribosomes (protein synthesis)</text>

      {/* SER */}
      <path d="M310 250 q30 -10 60 0 q30 10 60 0" className="fill-none stroke-current text-teal-600" strokeWidth="3" />
      <text x="450" y="258" fontSize="7.5" className="fill-current text-teal-600" fontWeight="700">smooth ER (lipid + steroid synthesis)</text>

      {/* Golgi */}
      <path d="M470 160 q25 -8 50 0 q25 8 50 0" className="fill-none stroke-current text-amber-600" strokeWidth="3" />
      <path d="M470 174 q25 -8 50 0 q25 8 50 0" className="fill-none stroke-current text-amber-600" strokeWidth="3" />
      <path d="M470 188 q25 -8 50 0 q25 8 50 0" className="fill-none stroke-current text-amber-600" strokeWidth="3" />
      <text x="545" y="150" fontSize="7.5" className="fill-current text-amber-600" fontWeight="700">Golgi apparatus (packaging)</text>

      {/* mitochondrion */}
      <ellipse cx="180" cy="255" rx="42" ry="22" className="fill-current text-rose-500/15" stroke="currentColor" strokeWidth="2.5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <path d="M150 255 q10 -12 20 0 q10 12 20 0 q10 -12 20 0" className="fill-none stroke-current text-rose-600" strokeWidth="2" />
      <text x="180" y="295" fontSize="7.5" textAnchor="middle" className="fill-current text-rose-600" fontWeight="700">mitochondrion (ATP)</text>

      {/* lysosome */}
      <circle cx="290" cy="270" r="14" className="fill-current text-orange-500/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(249 115 22 / 0.9)" }} />
      <text x="290" y="300" fontSize="7.5" textAnchor="middle" className="fill-current text-orange-600" fontWeight="700">lysosome (digestion)</text>

      {/* centrioles */}
      <rect x="500" y="230" width="20" height="10" rx="2" className="fill-none stroke-current text-stone-600" strokeWidth="2" />
      <rect x="505" y="245" width="10" height="20" rx="2" className="fill-none stroke-current text-stone-600" strokeWidth="2" />
      <text x="545" y="248" fontSize="7.5" className="fill-current text-muted-foreground">centrioles (spindle)</text>

      {/* ribosomes free */}
      {[[370, 210], [390, 220], [410, 205]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" className="fill-current text-stone-600" />
      ))}
      <text x="380" y="196" fontSize="7" className="fill-current text-muted-foreground">free ribosomes (80S)</text>

      <text x="16" y="352" fontSize="8.4" className="fill-current text-muted-foreground">Defining feature: true nucleus + membrane-bound organelles — compartmentalisation lets incompatible reactions run simultaneously.</text>
    </svg>
  );
}
