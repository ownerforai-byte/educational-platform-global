/** Frog ovary seasonal cycle — eggs through the year. Well-detailed. Theme-aware. */
export function FrogOvarySeasonalCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog ovary seasonal cycle eggs through the year immature mature ova yolk monsoon breeding after spawning resting phase ovulation hormones">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The ovary's year — eggs in seasons</text>
      {/* cycle stages */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["Resting phase", "ovary small, ova immature", 130],
        ["Growth", "ova accumulate yolk; ovary swells", 300],
        ["Breeding (monsoon)", "ovulation: eggs released into coelom", 470],
        ["After spawning", "ovary shrinks; cycle restarts", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y={90} fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y={110} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 28)}</text>
          <text x={x as number} y={124} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(28, 56)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the ovary's size tracks the season — a spring frog carries hundreds of visible yolked eggs</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Eggs released into the coelom are swept by cilia into the oviduct's mouth (ostium), not connected directly to the ovary.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The oviduct coats each egg with jelly as it travels — layers added en route, finished at the uterus.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: ovary → coelom → ostium → oviduct (jelly added) → uterus → cloaca — six stations in order.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The coelomic detour mirrors the male's kidney detour — shared body-plan history.</text>
    </svg>
  );
}
