/** Gram staining steps — how the lab sorts bacteria. Well-detailed. Theme-aware. */
export function GramStainingSteps({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["1. Crystal violet", "all cells stain purple"],
    ["2. Iodine (mordant)", "dye fixed inside the wall"],
    ["3. Alcohol wash", "thick wall keeps dye; thin wall loses it"],
    ["4. Safranin", "decolourised cells turn pink-red"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Gram staining steps crystal violet iodine alcohol decolourisation safranin gram positive purple thick peptidoglycan gram negative pink thin wall lipopolysaccharide lab identification">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Gram staining — four steps, two colours</text>

      {/* gram positive */}
      <rect x="30" y="44" width="320" height="150" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="190" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GRAM-POSITIVE — stays PURPLE</text>
      {[[80, 100], [130, 96], [180, 102], [230, 98], [280, 100]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 16} y={y - 7} width="32" height="14" rx="7" className="fill-current text-violet-600/70" />
          <rect x={x - 16} y={y - 9} width="32" height="4" rx="2" className="fill-current text-violet-800/60" />
        </g>
      ))}
      <text x="190" y="132" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">thick peptidoglycan wall (20–80 nm)</text>
      <text x="190" y="148" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">teichoic acids — no outer membrane</text>
      <text x="190" y="172" fontSize="7.6" textAnchor="middle" className="fill-current text-violet-500" fontWeight="700">dye trapped → purple survives alcohol</text>

      {/* gram negative */}
      <rect x="370" y="44" width="320" height="150" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="530" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GRAM-NEGATIVE — turns PINK</text>
      {[[420, 100], [470, 96], [520, 102], [570, 98], [620, 100]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 16} y={y - 7} width="32" height="14" rx="7" className="fill-current text-rose-500/70" />
          <rect x={x - 18} y={y - 10} width="36" height="3.4" rx="1.6" className="fill-current text-stone-500/50" />
        </g>
      ))}
      <text x="530" y="132" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">thin peptidoglycan + outer lipopolysaccharide</text>
      <text x="530" y="148" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">alcohol dissolves outer layer → dye leaks out</text>
      <text x="530" y="172" fontSize="7.6" textAnchor="middle" className="fill-current text-rose-500" fontWeight="700">safranin counterstain wins → pink</text>

      {/* steps strip */}
      {steps.map(([s, d], i) => {
        const x = 30 + i * 170;
        return (
          <g key={s}>
            <rect x={x} y="208" width="160" height="76" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
            <text x={x + 12} y={228} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{s}</text>
            <text x={x + 12} y={246} fontSize="6.8" className="fill-current text-muted-foreground">{d.slice(0, 38)}</text>
            {d.length > 38 && <text x={x + 12} y={260} fontSize="6.8" className="fill-current text-muted-foreground">{d.slice(38, 76)}</text>}
            <text x={x + 12} y={276} fontSize="6.4" className="fill-current text-sky-600">{["1 min", "1 min", "10–20 sec", "30 sec"][i]}</text>
          </g>
        );
      })}
    </svg>
  );
}
