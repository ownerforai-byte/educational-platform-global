/** Frog tadpole gills to lungs — the breathing switchover. Well-detailed. Theme-aware. */
export function FrogTadpoleGillsToLungs({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog tadpole gills to lungs breathing switchover external internal gills early aquatic later lungs air breathing metamorphosis stages gradual transition">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Tadpole to frog — the breathing switchover</text>
      {/* stages */}
      <rect x="30" y="44" width="660" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["Early tadpole", "external gills, no mouth yet", 130],
        ["Later tadpole", "internal gills, tail fin, algae diet", 300],
        ["Metamorph", "lungs budding, gills shrinking, legs out", 470],
        ["Froglet", "lungs only, tail absorbed, land ready", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="100" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y={90} fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y={110} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 28)}</text>
          <text x={x as number} y={124} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(28, 56)}</text>
          <text x={x as number} y={144} fontSize="5.6" textAnchor="middle" className="fill-current" style={{ color: "rgb(2 132 199 / 0.9)" }}>{["gills only", "gills dominant", "both working", "lungs only"][i]}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 120 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="204" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the switchover is gradual — a metamorph breathes with both systems while its body rebuilds</text>
      {/* facts */}
      <rect x="30" y="230" width="660" height="62" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="250" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The tadpole is a fish in miniature: gills, fin, two-chambered heart, herbivore gut — then everything changes at once.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: external gills → internal gills → lungs; the heart also rebuilds from two chambers to three.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Gills do not fall off — they are reabsorbed, the materials recycled into the growing body.</text>
    </svg>
  );
}
