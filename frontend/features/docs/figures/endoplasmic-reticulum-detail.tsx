/** Endoplasmic reticulum detail — RER vs SER structure and functions. Well-detailed. Theme-aware. */
export function EndoplasmicReticulumDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Endoplasmic reticulum detail rough ER with ribosomes studded cisternae continuous with nuclear envelope protein synthesis and transport versus smooth ER tubules lipid steroid synthesis detoxification calcium storage sarcoplasmic reticulum muscle">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Endoplasmic reticulum — the cell's internal highway</text>

      {/* RER */}
      <rect x="30" y="44" width="330" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ROUGH ER (RER)</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <path d={`M55 ${88 + i * 22} q40 14 80 0 q40 -14 80 0 q40 14 80 0`} className="fill-none stroke-current text-emerald-600" strokeWidth="2.5" />
          {[[70, 92 + i * 22], [110, 96 + i * 22], [150, 92 + i * 22], [190, 96 + i * 22], [230, 92 + i * 22], [270, 96 + i * 22]].map(([x, y], j) => (
            <circle key={j} cx={x} cy={y} r="3" className="fill-current text-stone-600" />
          ))}
        </g>
      ))}
      <text x="55" y="186" fontSize="7.2" className="fill-current text-muted-foreground">flattened cisternae studded with ribosomes</text>
      <text x="55" y="202" fontSize="7.2" className="fill-current text-muted-foreground">continuous with the outer nuclear envelope</text>

      {/* SER */}
      <rect x="390" y="44" width="300" height="150" rx="12" className="fill-current text-teal-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SMOOTH ER (SER)</text>
      <path d="M420 100 q25 -18 50 0 q25 18 50 0 q25 -18 50 0 q25 18 50 0" className="fill-none stroke-current text-teal-600" strokeWidth="3" />
      <path d="M420 130 q25 18 50 0 q25 -18 50 0 q25 18 50 0 q25 -18 50 0" className="fill-none stroke-current text-teal-600" strokeWidth="3" />
      <text x="420" y="186" fontSize="7.2" className="fill-current text-muted-foreground">tubules, no ribosomes</text>
      <text x="420" y="202" fontSize="7.2" className="fill-current text-muted-foreground">specialised as sarcoplasmic reticulum in muscle (Ca²⁺ store)</text>

      {/* functions */}
      <rect x="30" y="212" width="660" height="72" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="234" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">RER: protein synthesis → folding → transport to Golgi (secretory pathway).</text>
      <text x="50" y="254" fontSize="8" className="fill-current text-muted-foreground">SER: lipid and steroid synthesis, detoxification of drugs (liver), calcium storage, glycogen metabolism.</text>
      <text x="50" y="272" fontSize="8" className="fill-current text-muted-foreground">Both form a continuous membrane network — the endomembrane system with Golgi, lysosomes and vesicles.</text>
    </svg>
  );
}
