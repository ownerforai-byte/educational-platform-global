/**
 * Nucleus structure — double nuclear envelope with pores, nucleolus,
 * chromatin and nucleoplasm. Theme-aware via currentColor.
 */
export function NucleusStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 320" className={className} role="img" aria-label="Structure of the nucleus showing the double nuclear envelope with nuclear pores, the dense nucleolus, chromatin threads and the nucleoplasm">
      <text x="16" y="28" fontSize="14" className="fill-current text-foreground" fontWeight="800">The nucleus — control centre of the eukaryotic cell</text>

      {/* outer envelope */}
      <circle cx="300" cy="170" r="120" fill="none" strokeWidth="4" className="stroke-current text-violet-500" />
      {/* inner envelope */}
      <circle cx="300" cy="170" r="106" fill="none" strokeWidth="2.5" className="stroke-current text-violet-400" style={{ color: "rgb(167 139 250 / 0.9)" }} />

      {/* nuclear pores */}
      <g className="fill-current text-sky-500">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 300 + 113 * Math.cos(rad);
          const y = 170 + 113 * Math.sin(rad);
          return <rect key={deg} x={x - 5} y={y - 5} width="10" height="10" rx="2" />;
        })}
      </g>
      <text x="428" y="86" fontSize="11" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">nuclear pores</text>
      <text x="428" y="101" fontSize="9.5" className="fill-current text-muted-foreground">mRNA and ribosomal subunits exit;</text>
      <text x="428" y="115" fontSize="9.5" className="fill-current text-muted-foreground">proteins (polymerases) enter</text>

      {/* nucleolus */}
      <circle cx="270" cy="150" r="34" className="fill-current text-violet-600/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237)" }} />
      <text x="240" y="154" fontSize="11" className="fill-current text-violet-800 dark:text-violet-200" fontWeight="800">nucleolus</text>
      <text x="196" y="206" fontSize="9.5" className="fill-current text-muted-foreground">rRNA made · ribosome subunits assembled</text>

      {/* chromatin threads */}
      <g className="stroke-current text-rose-500" strokeWidth="2.5" fill="none" style={{ color: "rgb(244 63 94 / 0.8)" }}>
        <path d="M320 130 q30 10 20 34 q-10 24 16 34" />
        <path d="M330 120 q44 22 28 56" />
        <path d="M250 200 q30 -6 36 18" />
        <path d="M340 196 q26 4 30 26" />
      </g>
      <text x="352" y="238" fontSize="11" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">chromatin — DNA + histones</text>
      <text x="352" y="253" fontSize="9.5" className="fill-current text-muted-foreground">condenses into chromosomes at division</text>

      {/* nucleoplasm label */}
      <text x="130" y="120" fontSize="10.5" className="fill-current text-muted-foreground" fontWeight="700">nucleoplasm —</text>
      <text x="130" y="134" fontSize="9.5" className="fill-current text-muted-foreground">gel matrix with enzymes</text>

      {/* envelope labels */}
      <text x="90" y="286" fontSize="10.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">double membrane (outer + inner) — continuous with rough ER; ribosomes stud the outer face</text>
      <text x="16" y="308" fontSize="10" className="fill-current text-muted-foreground">The envelope separates transcription (inside) from translation (outside) — the defining eukaryotic arrangement.</text>
    </svg>
  );
}
