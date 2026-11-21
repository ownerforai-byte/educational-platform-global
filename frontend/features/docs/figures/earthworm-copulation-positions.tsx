/** Earthworm copulation positions — head to tail anatomy. Well-detailed. Theme-aware. */
export function EarthwormCopulationPositions({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm copulation head to tail positions rainy night clitellum alignment male pore 18 spermathecal pores 6 to 9 sperm exchange mutual">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Copulation — head to tail, pores to pores</text>
      {/* two worms aligned */}
      <rect x="30" y="44" width="660" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE ALIGNMENT, RAINY NIGHT</text>
      <path d="M80 120 q120 -30 240 0 q120 30 240 0" className="fill-none stroke-current" strokeWidth="16" strokeLinecap="round" style={{ color: "rgb(2 132 199 / 0.35)" }} />
      <path d="M80 160 q120 30 240 0 q120 -30 240 0" className="fill-none stroke-current" strokeWidth="16" strokeLinecap="round" style={{ color: "rgb(16 185 129 / 0.35)" }} />
      {/* alignment markers */}
      {[[250, 130], [360, 130], [470, 130]].map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y - 30} x2={x} y2={y + 30} className="stroke-current" strokeWidth="1.4" strokeDasharray="3 2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
          <text x={x} y={y - 38} fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{["clitellum ↔ segments 7–9", "male pore ↔ spermathecae", "genital papillae grip"][i]}</text>
        </g>
      ))}
      <text x="360" y="200" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">mucus bonds the pair; each worm's male pores (seg 18) face the other's spermathecal pores (segs 6–9)</text>
      {/* facts */}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Both worms ejaculate simultaneously — each receives sperm into its own spermathecae and stores it for weeks.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">After separation, the clitellum secretes the cocoon that will use the stored sperm — days later, no worm in sight.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: copulation happens on a rainy night, head-to-tail, mutual sperm exchange — three examinable details.</text>
    </svg>
  );
}
