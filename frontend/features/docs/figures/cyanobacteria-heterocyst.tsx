/** Cyanobacteria heterocyst — the nitrogen-fixing cell. Well-detailed. Theme-aware. */
export function CyanobacteriaHeterocyst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cyanobacteria heterocyst specialised nitrogen fixing cell filament Nostoc Anabaena photosynthesis oxygen excluded nitrogenase blue green algae blooms water">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Heterocyst — a cell built to fix nitrogen</text>

      {/* filament with heterocysts */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NOSTOC / ANABAENA FILAMENT</text>
      {/* chain of cells */}
      {[80, 118, 156, 232, 270, 308, 346].map((x) => (
        <rect key={x} x={x} y="120" width="30" height="34" rx="6" className="fill-current text-emerald-600/35" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      ))}
      {/* heterocysts (thicker, paler) */}
      {[194, 384].map((x) => (
        <g key={x}>
          <rect x={x} y="112" width="30" height="50" rx="10" className="fill-current text-lime-300/30" stroke="currentColor" strokeWidth="2.6" style={{ color: "rgb(163 230 53 / 0.9)" }} />
          <text x={x + 15} y="180" fontSize="7" textAnchor="middle" className="fill-current text-lime-600" fontWeight="700">heterocyst</text>
        </g>
      ))}
      {/* arrows between cells */}
      {[[110, 138], [148, 138], [186, 138], [262, 138], [300, 138], [338, 138], [376, 138]].map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2={x + 8} y2={y} className="stroke-current text-emerald-700" strokeWidth="1.6" />
      ))}
      <text x="230" y="210" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">vegetable cells photosynthesise and share sugar;</text>
      <text x="230" y="226" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">heterocysts trade back fixed nitrogen</text>
      <text x="50" y="254" fontSize="7.2" className="fill-current text-muted-foreground">Thick walls keep oxygen out — nitrogenase is destroyed by O₂, so the heterocyst is the only safe workshop.</text>

      {/* notes card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IT MATTERS</text>
      {[
        "blue-green 'algae' are bacteria",
        "they fix N₂ — rice paddy fertility",
        "heterocyst = dedicated N₂ cell",
        "no O₂ inside → nitrogenase works",
        "blooms in polluted, nutrient-rich",
        "water signal eutrophication",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="466" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: cyanobacteria = monera,</text>
      <text x="466" y="254" fontSize="7.2" className="fill-current text-muted-foreground">not algae; heterocyst fixes nitrogen.</text>
    </svg>
  );
}
