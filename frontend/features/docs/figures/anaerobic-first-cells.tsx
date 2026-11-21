/** Anaerobic first cells — heterotroph to autotroph shift. Well-detailed. Theme-aware. */
export function AnaerobicFirstCells({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Anaerobic first cells heterotrophic nutrition absorbing soup fermentation oxygen crisis photosynthesis cyanobacteria evolution sequence">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The first cells — anaerobic, then the oxygen crisis</text>
      {[
        ["1. Anaerobic heterotrophs", "absorbed ready-made organics from the soup; fermented them for energy", "rgb(139 92 246)"],
        ["2. Soup runs short", "no new organics being made — competition for food begins", "rgb(245 158 11)"],
        ["3. Autotrophs appear", "some cells learned to make their own food from CO₂ + H₂O using sunlight", "rgb(22 163 74)"],
        ["4. Oxygen crisis", "O₂ — a poison to anaerobes — accumulated; respiration and ozone followed", "rgb(2 132 199)"],
      ].map(([name, detail, rgb], i) => {
        const x = 30 + i * 172;
        return (
          <g key={name}>
            <rect x={x} y="44" width="158" height="160" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 79} y="66" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <ellipse cx={x + 79} cy="112" rx="34" ry="24" className="fill-current text-slate-500/15" stroke="currentColor" strokeWidth="1.8" style={{ color: rgb }} />
            {i === 2 && <circle cx={x + 79} cy="112" r="7" className="fill-current" style={{ color: rgb, opacity: 0.6 }} />}
            {i === 3 && <text x={x + 79} y="117" fontSize="9" textAnchor="middle" className="fill-current" style={{ color: rgb }} fontWeight="700">O₂</text>}
            <text x={x + 12} y="156" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 28)}</text>
            <text x={x + 12} y="170" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(28, 56)}</text>
            <text x={x + 12} y="184" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(56, 84)}</text>
          </g>
        );
      })}
      <rect x="30" y="218" width="660" height="74" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="238" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The great pivot: photosynthesis made the atmosphere aerobic — and aerobic respiration (18× more ATP per glucose) became possible.</text>
      <text x="360" y="256" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Cyanobacteria did the oxygenating; stromatolite fossils record their colonies from ~3.5 bya.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: first cells were anaerobic heterotrophs — say why (no free O₂, food ready-made in the soup).</text>
    </svg>
  );
}
