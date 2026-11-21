/** Nitrogen fixation routes — four doors into the cycle. Well-detailed. Theme-aware. */
export function NitrogenFixationRoutes({ className }: { className?: string }) {
  const routes: [string, string, string, string][] = [
    ["Lightning", "electrical discharge fixes N₂ as oxides, rained down", "small but free", "rgb(245 158 11)"],
    ["Rhizobium", "symbiotic bacteria in legume nodules", "the big biological door", "rgb(22 163 74)"],
    ["Free-living", "Azotobacter, cyanobacteria in soil and water", "no host needed", "rgb(2 132 199)"],
    ["Industry (Haber)", "fertiliser factories fix N₂ with high pressure", "feeds half the world", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Nitrogen fixation routes lightning Rhizobium free living Azotobacter cyanobacteria Haber Bosch industrial fertiliser N2 to ammonia pathways">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Four doors into the nitrogen cycle</text>
      {/* N2 reservoir */}
      <rect x="240" y="44" width="240" height="44" rx="10" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="62" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">N₂ — 78% of the air</text>
      <text x="360" y="78" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">unusable until something breaks the triple bond</text>
      {routes.map(([name, detail, tag, rgb], i) => {
        const x = 30 + i * 170;
        return (
          <g key={name}>
            <line x1={x + 85} y1="120" x2={240 + i * 60} y2="94" className="stroke-current" strokeWidth="1.8" style={{ color: rgb }} markerEnd="url(#arrhl)" />
            <rect x={x} y="126" width="160" height="130" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 80} y="148" fontSize="8.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <text x={x + 12} y="172" fontSize="7" className="fill-current text-muted-foreground">{detail.slice(0, 34)}</text>
            <text x={x + 12} y="186" fontSize="7" className="fill-current text-muted-foreground">{detail.slice(34, 68)}</text>
            <text x={x + 12} y="212" fontSize="6.8" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{tag}</text>
            <text x={x + 80} y="240" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">N₂ → NH₃ / NO₃⁻</text>
          </g>
        );
      })}
      <rect x="30" y="268" width="660" height="24" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="284" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: fixation = N₂ → ammonia; nitrification = ammonia → nitrite → nitrate; denitrification returns it to the air.</text>
    </svg>
  );
}
