/** IVF steps timeline — in vitro fertilisation stage by stage. Well-detailed. Theme-aware. */
export function IVFStepsTimeline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="IVF steps timeline in vitro fertilisation hormone stimulation egg retrieval sperm collection fertilisation dish embryo culture transfer luteal support test tube baby Louise Brown 1978 success rate infertility treatment assisted reproduction">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">IVF — conception assisted, step by step</text>
      {/* timeline */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <line x1="70" y1="120" x2="650" y2="120" className="stroke-current" strokeWidth="3" style={{ color: "rgb(139 92 246 / 0.5)" }} />
      {[
        ["1", "hormone stimulation: multiple eggs mature", 130],
        ["2", "egg retrieval under ultrasound guidance", 250],
        ["3", "sperm prepared; eggs fertilised in a dish", 370],
        ["4", "embryos cultured a few days; best chosen", 490],
        ["5", "transfer to the uterus; pregnancy test after ~2 weeks", 610],
      ].map(([n, ev, x], i) => (
        <g key={n as string}>
          <circle cx={x as number} cy="120" r="9" className="fill-current" style={{ color: "rgb(139 92 246 / 0.8)" }} />
          <text x={x as number} y="124" fontSize="7" textAnchor="middle" className="fill-current text-white" fontWeight="800">{n as string}</text>
          <text x={x as number} y={i % 2 === 0 ? 96 : 150} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(0, 30)}</text>
          <text x={x as number} y={i % 2 === 0 ? 106 : 160} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(30, 60)}</text>
        </g>
      ))}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">'in vitro' means in glass — fertilisation happens outside the body, then returns to it</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Louise Brown, born 1978, was the first IVF baby — over ten million have followed worldwide.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Success falls with age: roughly 30–40% per cycle under 35, falling steeply after 40 — expectations matter.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: IVF = stimulation → retrieval → fertilisation in vitro → culture → transfer — five steps in order.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">IVF treats tubal blockage, low sperm counts and unexplained infertility — not every infertility cause.</text>
    </svg>
  );
}
