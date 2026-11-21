/**
 * Eukaryotic cell structure — animal cell (left) and plant cell (right) with
 * the syllabus organelles labelled. Theme-aware via currentColor.
 */
export function EukaryoticCell({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 380" className={className} role="img" aria-label="Labelled animal cell and plant cell showing nucleus, mitochondria, endoplasmic reticulum, Golgi bodies, lysosomes, ribosomes, chloroplasts, vacuole and cell wall">
      {/* ── Animal cell (left) ── */}
      <ellipse cx="170" cy="190" rx="130" ry="150" className="fill-current text-sky-500/5" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.7)" }} />
      <text x="120" y="30" fontSize="14" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">Animal cell</text>
      <text x="106" y="48" fontSize="10" className="fill-current text-muted-foreground">no cell wall, small vacuoles</text>

      {/* nucleus */}
      <circle cx="170" cy="160" r="42" className="fill-current text-violet-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.8)" }} />
      <circle cx="170" cy="160" r="13" className="fill-current text-violet-500/40" stroke="none" />
      <text x="150" y="138" fontSize="11" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">nucleus</text>
      <text x="158" y="188" fontSize="9" className="fill-current text-muted-foreground">nucleolus</text>

      {/* mitochondrion */}
      <g>
        <ellipse cx="90" cy="245" rx="34" ry="17" className="fill-current text-rose-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.8)" }} />
        <path d="M64 245 q8 -8 16 0 q8 8 16 0 q8 -8 16 0" fill="none" strokeWidth="1.6" className="stroke-current text-rose-500" />
        <text x="60" y="280" fontSize="10" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">mitochondrion</text>
        <text x="60" y="293" fontSize="9" className="fill-current text-muted-foreground">ATP power-house</text>
      </g>

      {/* ER */}
      <path d="M215 120 q30 6 34 30 q4 24 -18 30" fill="none" strokeWidth="3" className="stroke-current text-teal-500" style={{ color: "rgb(20 184 166 / 0.8)" }} />
      <path d="M220 132 q22 6 24 22 q2 14 -12 20" fill="none" strokeWidth="2" className="stroke-current text-teal-500" />
      <text x="252" y="118" fontSize="10" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="700">endoplasmic reticulum</text>

      {/* Golgi */}
      <g>
        <path d="M232 240 q26 -4 30 8" fill="none" strokeWidth="3" className="stroke-current text-amber-500" />
        <path d="M234 250 q26 -4 30 8" fill="none" strokeWidth="3" className="stroke-current text-amber-500" />
        <path d="M236 260 q26 -4 30 8" fill="none" strokeWidth="3" className="stroke-current text-amber-500" />
        <text x="272" y="256" fontSize="10" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="700">Golgi bodies</text>
      </g>

      {/* lysosome + ribosomes */}
      <circle cx="110" cy="120" r="12" className="fill-current text-orange-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(249 115 22 / 0.8)" }} />
      <text x="80" y="100" fontSize="10" className="fill-current text-orange-600 dark:text-orange-400" fontWeight="700">lysosome</text>
      <g className="fill-current text-slate-500">
        <circle cx="150" cy="290" r="2.5" /><circle cx="160" cy="296" r="2.5" /><circle cx="170" cy="290" r="2.5" /><circle cx="180" cy="296" r="2.5" />
      </g>
      <text x="128" y="316" fontSize="10" className="fill-current text-muted-foreground" fontWeight="700">ribosomes</text>

      {/* ── Plant cell (right) ── */}
      <rect x="380" y="40" width="220" height="300" rx="16" className="fill-current text-emerald-500/5" strokeWidth="6" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.8)" }} />
      <rect x="392" y="52" width="196" height="276" rx="12" fill="none" strokeWidth="2" strokeDasharray="4 3" className="stroke-current text-emerald-500" />
      <text x="452" y="30" fontSize="14" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">Plant cell</text>
      <text x="418" y="74" fontSize="9" className="fill-current text-muted-foreground">cell wall (outer) · plasma membrane (inner)</text>

      {/* large central vacuole */}
      <rect x="430" y="120" width="120" height="150" rx="40" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.6)" }} />
      <text x="446" y="200" fontSize="11" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">central vacuole</text>
      <text x="446" y="216" fontSize="9" className="fill-current text-muted-foreground">turgor + storage</text>

      {/* nucleus */}
      <circle cx="448" cy="96" r="20" className="fill-current text-violet-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.8)" }} />
      <text x="474" y="94" fontSize="10" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">nucleus</text>

      {/* chloroplast */}
      <g>
        <ellipse cx="560" cy="100" rx="24" ry="13" className="fill-current text-green-600/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.85)" }} />
        <circle cx="550" cy="98" r="3" className="fill-current text-green-700" /><circle cx="566" cy="102" r="3" className="fill-current text-green-700" />
        <text x="524" y="132" fontSize="10" className="fill-current text-green-700 dark:text-green-400" fontWeight="700">chloroplast</text>
        <text x="524" y="145" fontSize="9" className="fill-current text-muted-foreground">photosynthesis</text>
      </g>

      {/* mitochondrion (plant) */}
      <ellipse cx="440" cy="300" rx="26" ry="12" className="fill-current text-rose-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.8)" }} />
      <text x="472" y="304" fontSize="10" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">mitochondrion</text>

      {/* legend */}
      <text x="20" y="366" fontSize="10" className="fill-current text-muted-foreground">Shared organelles: nucleus · mitochondria · ER · Golgi · ribosomes — plant-only: cell wall, chloroplasts, large vacuole</text>
    </svg>
  );
}
