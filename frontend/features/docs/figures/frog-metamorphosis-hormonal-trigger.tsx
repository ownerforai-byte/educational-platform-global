/** Frog metamorphosis hormonal trigger — the rebuild signal. Well-detailed. Theme-aware. */
export function FrogMetamorphosisHormonalTrigger({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog metamorphosis hormonal trigger rebuild signal thyroid gland hormone thyroxine controls timing iodine deficiency neoteny axolotl analogy developmental switch">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The rebuild signal — hormones run metamorphosis</text>
      {/* trigger chain */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      {[
        ["Thyroid matures", "the tadpole's thyroid gland grows", 130],
        ["Hormone released", "thyroid hormone rises in the blood", 300],
        ["Body rebuilds", "legs grow, tail reabsorbed, gut shortens", 470],
        ["Land ready", "adult form and behaviour switch on", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
          <text x={x as number} y={90} fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y={110} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 28)}</text>
          <text x={x as number} y={124} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(28, 56)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(139 92 246 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the same hormone that keeps us warm drives the tadpole's total renovation</text>
      {/* evidence */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The experiment: tadpoles fed thyroid hormone metamorphose early; tadpoles whose thyroid is removed stay tadpoles forever.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Iodine is needed to build the hormone — iodine-poor water delays or blocks the change.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: metamorphosis is controlled by the thyroid gland; its hormone is the developmental switch.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The axolotl's permanent larval state shows what happens when the switch never fires.</text>
    </svg>
  );
}
