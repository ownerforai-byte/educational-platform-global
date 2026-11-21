/** Cytoskeleton types — microtubules, microfilaments, intermediate filaments. Well-detailed. Theme-aware. */
export function CytoskeletonTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cytoskeleton three types microtubules 25 nanometres tubulin hollow tubes mitotic spindle cilia flagella microfilaments 7 nanometres actin muscle contraction cytokinesis intermediate filaments 10 nanometres keratin mechanical strength plus functions shape movement intracellular transport">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cytoskeleton — three protein filament families</text>

      {/* microtubules */}
      <rect x="30" y="44" width="330" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MICROTUBULES (Ø ~25 nm)</text>
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x="70" y={96 + i * 40} width="240" height="24" rx="6" className="fill-none stroke-current text-sky-600" strokeWidth="2.5" />
          {[0, 1, 2, 3, 4, 5].map((j) => (
            <line key={j} x1={90 + j * 40} y1={96 + i * 40} x2={90 + j * 40} y2={120 + i * 40} strokeWidth="1.5" className="stroke-current text-sky-600" />
          ))}
        </g>
      ))}
      <text x="60" y="182" fontSize="7.2" className="fill-current text-muted-foreground">hollow tubulin tubes → mitotic spindle, cilia, flagella, centrioles</text>

      {/* microfilaments */}
      <rect x="390" y="44" width="300" height="150" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MICROFILAMENTS (Ø ~7 nm)</text>
      {[0, 1].map((i) => (
        <g key={i}>
          <path d={`M420 ${104 + i * 40} q12 -12 24 0 q12 12 24 0 q12 -12 24 0 q12 12 24 0 q12 -12 24 0 q12 12 24 0 q12 -12 24 0 q12 12 24 0`} className="fill-none stroke-current text-rose-500" strokeWidth="3" />
          <path d={`M420 ${116 + i * 40} q12 12 24 0 q12 -12 24 0 q12 12 24 0 q12 -12 24 0 q12 12 24 0 q12 -12 24 0 q12 12 24 0 q12 -12 24 0`} className="fill-none stroke-current text-rose-400" strokeWidth="2" />
        </g>
      ))}
      <text x="420" y="182" fontSize="7.2" className="fill-current text-muted-foreground">actin double helix → muscle contraction, cytokinesis, streaming</text>

      {/* intermediate filaments */}
      <rect x="30" y="212" width="660" height="70" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="50" y="234" fontSize="8.6" className="fill-current text-foreground" fontWeight="800">INTERMEDIATE FILAMENTS (Ø ~10 nm)</text>
      <path d="M340 244 q30 -8 60 0 q30 8 60 0 q30 -8 60 0 q30 8 60 0 q30 -8 60 0" className="fill-none stroke-current text-amber-600" strokeWidth="3.5" />
      <text x="50" y="268" fontSize="7.8" className="fill-current text-muted-foreground">keratin, lamin — rope-like cables for mechanical strength; anchor organelles and resist stretching.</text>

      <text x="16" y="296" fontSize="8.4" className="fill-current text-muted-foreground">Together: shape, internal highways (kinesin/dynein motors), movement, and division — the cell's skeleton and railway in one.</text>
    </svg>
  );
}
