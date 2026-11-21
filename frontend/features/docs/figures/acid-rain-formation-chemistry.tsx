/** Acid rain formation chemistry — SO2 NOx to acid. Well-detailed. Theme-aware. */
export function AcidRainFormationChemistry({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Acid rain formation chemistry SO2 NOx emissions coal power plants vehicles oxidation sulphuric acid nitric acid reactions H2SO4 HNO3 dry deposition wet deposition pH 5.6 natural rain normal acid threshold wind transport hundreds kilometres transboundary Scandinavia damage China photochemical oxidants hydroxyl radical equations">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Acid rain — the chemistry from chimney to cloud</text>
      {/* chemistry chain */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["1. Emit", "SO₂ from coal/oil burning; NOₓ from vehicle engines", 130],
        ["2. Oxidise", "in the atmosphere: SO₂ → H₂SO₄; NOₓ → HNO₃", 300],
        ["3. Deposit", "rain (wet) or particles and gas (dry) fall to Earth", 470],
        ["4. Acidify", "lakes, soils, buildings — pH drops below 5.6", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the acids form in the sky — pollution travels hundreds of kilometres before it falls, making acid rain transboundary</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The reactions to memorise: SO₂ + ½O₂ → SO₃, SO₃ + H₂O → H₂SO₄; and 2NO₂ + H₂O → HNO₂ + HNO₃.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Normal rain is already slightly acid (pH ~5.6 from CO₂) — 'acid rain' means pH well below that, from pollution.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: write both formation reactions and name wet vs dry deposition — the chemistry half of any acid-rain question.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Scandinavia's dead lakes were fed by Britain's chimneys — the classic transboundary pollution case.</text>
    </svg>
  );
}
