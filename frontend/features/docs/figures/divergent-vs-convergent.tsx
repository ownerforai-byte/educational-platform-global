/** Divergent vs convergent evolution — two directions from one ancestor or two. Well-detailed. Theme-aware. */
export function DivergentVsConvergent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Divergent versus convergent evolution common ancestor homologous analogous forelimbs butterfly bird wing cactus euphorb adaptive radiation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two directions of evolution</text>
      {/* divergent */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DIVERGENT — one ancestor, many forms</text>
      <circle cx="195" cy="120" r="12" className="fill-current text-sky-500/40" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="124" fontSize="5.6" textAnchor="middle" className="fill-current text-foreground">ancestor</text>
      {[[90, 180], [195, 195], [300, 180]].map(([x, y], i) => (
        <line key={i} x1="195" y1="132" x2={x} y2={y} className="stroke-current text-sky-500" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      ))}
      <text x="90" y="206" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">human arm</text>
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">whale flipper</text>
      <text x="300" y="206" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">bat wing</text>
      <text x="195" y="228" fontSize="6.8" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">homologous organs</text>
      {/* convergent */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CONVERGENT — different ancestors, one form</text>
      {[[470, 120], [610, 120]].map(([x], i) => (
        <circle key={i} cx={x} cy="120" r="12" className="fill-current text-emerald-500/40" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      ))}
      <text x="470" y="124" fontSize="5.4" textAnchor="middle" className="fill-current text-foreground">insect</text>
      <text x="610" y="124" fontSize="5.4" textAnchor="middle" className="fill-current text-foreground">bird</text>
      <path d="M482 120 h116 m-8 -6 l8 6 l-8 6" className="fill-none stroke-current text-emerald-600" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="540" y="112" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">both → wings for flight</text>
      <text x="540" y="160" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">cactus (America) and euphorb (Africa)</text>
      <text x="540" y="176" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">both → succulent spiny desert plant</text>
      <text x="540" y="206" fontSize="6.8" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">analogous organs</text>
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="260" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The rule: same structure, different function = divergent (homology). Same function, different structure = convergent (analogy).</text>
      <text x="360" y="278" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: give one example pair for each — forelimbs for divergent, wings for convergent.</text>
    </svg>
  );
}
