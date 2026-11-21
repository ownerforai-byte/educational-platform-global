/** Acid rain damage path — from stack to lake. Well-detailed. Theme-aware. */
export function AcidRainDamagePath({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Acid rain damage path sulphur dioxide nitrogen oxides stack sulphuric nitric acid lake pH fish eggs forest soil marble Taj Mahal limestone pH 4 below neutral 5.6">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Acid rain — the full damage path</text>
      {/* path */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["1. Emission", "SO₂ from smelters, NOₓ from vehicles", 130],
        ["2. Reaction", "dissolves in cloud water → H₂SO₄, HNO₃", 300],
        ["3. Deposition", "falls as rain, snow or dry particles", 470],
        ["4. Damage", "lakes, forests, soil, marble", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">normal rain is already pH 5.6 (dissolved CO₂); acid rain drops to pH 4 or lower — ten times more acidic</text>
      {/* damage table */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["Lakes", "below pH ~5, fish eggs fail; lakes turn clear and lifeless"],
        ["Forests", "acid strips soil nutrients and releases aluminium that poisons roots"],
        ["Buildings", "marble and limestone statues dissolve — the Taj Mahal's known enemy"],
        ["Humans", "fine acid aerosols deepen into lungs; heavy metals mobilise into water"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="46" y={232 + i * 16} fontSize="6.8" className="fill-current text-rose-600" fontWeight="700">{k}</text>
          <text x="106" y={232 + i * 16} fontSize="6.6" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: SO₂ + NOₓ → sulphuric + nitric acid — write the gases AND the acids for the mechanism mark.</text>
    </svg>
  );
}
