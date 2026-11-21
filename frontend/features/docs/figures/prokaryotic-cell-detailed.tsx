/** Prokaryotic cell detailed — bacterium with all labeled parts. Well-detailed. Theme-aware. */
export function ProkaryoticCellDetailed({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 340" className={className} role="img" aria-label="Prokaryotic cell detailed bacterium with capsule cell wall plasma membrane cytoplasm nucleoid circular DNA plasmid 70S ribosomes mesosome pili flagellum no membrane bound organelles labels and leader lines">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Prokaryotic cell — every labelled part</text>

      {/* capsule */}
      <ellipse cx="300" cy="185" rx="200" ry="95" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} strokeDasharray="8 5" />
      <text x="300" y="316" fontSize="8" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">capsule / slime layer (protection, adherence)</text>

      {/* cell wall */}
      <ellipse cx="300" cy="185" rx="180" ry="78" className="fill-none stroke-current text-emerald-600" strokeWidth="4" />
      <text x="300" y="296" fontSize="8" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">cell wall (peptidoglycan — shape + protection)</text>

      {/* plasma membrane */}
      <ellipse cx="300" cy="185" rx="165" ry="66" className="fill-none stroke-current text-amber-600" strokeWidth="3" />
      <text x="300" y="278" fontSize="8" textAnchor="middle" className="fill-current text-amber-600" fontWeight="700">plasma membrane (selective transport)</text>

      {/* nucleoid */}
      <path d="M250 165 q30 -30 60 0 q30 30 60 0 q20 -22 40 -5" className="fill-none stroke-current text-violet-600" strokeWidth="3" />
      <text x="355" y="150" fontSize="8" className="fill-current text-violet-600" fontWeight="800">nucleoid — circular DNA (no nuclear membrane)</text>

      {/* plasmid */}
      <circle cx="235" cy="205" r="12" className="fill-none stroke-current text-rose-500" strokeWidth="2.5" />
      <text x="180" y="232" fontSize="7.5" className="fill-current text-rose-500" fontWeight="700">plasmid (accessory DNA)</text>

      {/* ribosomes */}
      {[[280, 200], [320, 215], [350, 190], [265, 170], [330, 165]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className="fill-current text-stone-500" />
      ))}
      <text x="420" y="215" fontSize="7.5" className="fill-current text-muted-foreground">70S ribosomes (protein synthesis)</text>

      {/* mesosome */}
      <path d="M300 245 q20 8 30 -8 q8 -14 -8 -20" className="fill-none stroke-current text-amber-600" strokeWidth="2.5" />
      <text x="345" y="252" fontSize="7.5" className="fill-current text-amber-600" fontWeight="700">mesosome (respiration / cell division)</text>

      {/* pili */}
      {[[120, 140], [115, 165], [122, 190]].map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2={x - 35} y2={y - 8} strokeWidth="2" className="stroke-current text-stone-500" />
      ))}
      <text x="60" y="128" fontSize="7.5" className="fill-current text-muted-foreground">pili (attachment, conjugation)</text>

      {/* flagellum */}
      <path d="M500 185 q40 -25 70 0 q30 22 60 -5" className="fill-none stroke-current text-rose-600" strokeWidth="3" />
      <text x="575" y="160" fontSize="8" className="fill-current text-rose-600" fontWeight="800">flagellum (locomotion)</text>

      <text x="16" y="336" fontSize="8.4" className="fill-current text-muted-foreground">Key point: NO membrane-bound organelles, NO true nucleus — DNA free in the cytoplasm. Smallest cells: Mycoplasma (~0.1 µm).</text>
    </svg>
  );
}
