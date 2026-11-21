/** Prions — protein-only infectious agents. Well-detailed. Theme-aware. */
export function PrionDisease({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Prion infectious protein misfolded normal protein conversion scrapie mad cow disease Creutzfeldt Jakob no nucleic acid resistant brain disease spongiform">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Prions — infection without nucleic acid</text>

      {/* conversion panel */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="230" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ONE MISFOLD CONVERTS THE REST</text>
      {/* normal protein */}
      <path d="M80 120 q10 -24 24 0 q10 22 24 0 q10 -20 22 2" className="fill-none stroke-current text-sky-500" strokeWidth="3" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="115" y="158" fontSize="7" textAnchor="middle" className="fill-current text-sky-600">normal PrP (folded right)</text>
      {/* arrow */}
      <line x1="200" y1="130" x2="260" y2="130" className="stroke-current text-rose-500" strokeWidth="2.4" style={{ color: "rgb(244 63 94 / 0.9)" }} markerEnd="url(#arrhl)" />
      <text x="230" y="122" fontSize="6.6" textAnchor="middle" className="fill-current text-rose-500">contact</text>
      {/* misfolded */}
      <path d="M270 132 q26 -6 12 -18 q-16 -10 -4 -20 q14 -8 26 4" className="fill-none stroke-current text-rose-500" strokeWidth="3" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="295" y="158" fontSize="7" textAnchor="middle" className="fill-current text-rose-500">prion (misfolded)</text>
      {/* chain reaction */}
      {[0, 1, 2, 3].map((j) => (
        <g key={j}>
          <path d={`M${370 + j * 14} ${104 + j * 8} q8 -10 16 0 q-8 10 -16 0`} className="fill-none stroke-current text-rose-400" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)", opacity: 1 - j * 0.2 }} />
        </g>
      ))}
      <text x="416" y="140" fontSize="6.8" className="fill-current text-muted-foreground">chain reaction</text>
      {[
        "no DNA, no RNA — protein alone",
        "misfolded shape is the infection",
        "survives boiling, formalin, radiation",
      ].map((t, i) => (
        <text key={t} x="50" y={190 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="50" y="252" fontSize="7" className="fill-current text-rose-500">The misfolded form templates normal proteins</text>
      <text x="50" y="266" fontSize="7" className="fill-current text-rose-500">into its own shape — replication without genes.</text>

      {/* diseases card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SPONGIFORM DISEASES</text>
      {/* brain with holes */}
      <path d="M570 96 q-40 4 -40 44 q0 40 40 44 q40 -4 40 -44 q0 -40 -40 -44" className="fill-current text-stone-400/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      {[[554, 118], [586, 128], [560, 148], [580, 164], [566, 176]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className="fill-current text-stone-600/60" />
      ))}
      <text x="570" y="204" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">sponge-like holes in brain tissue</text>
      {[
        "scrapie — sheep",
        "BSE — mad cow disease",
        "CJD — human variant",
        "kuru — ritual cannibalism",
      ].map((t, i) => (
        <text key={t} x="466" y={226 + i * 13} fontSize="6.8" className="fill-current text-muted-foreground">• {t}</text>
      ))}
    </svg>
  );
}
