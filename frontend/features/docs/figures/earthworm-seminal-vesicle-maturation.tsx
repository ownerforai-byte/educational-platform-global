/** Earthworm seminal vesicle maturation — the sperm nursery. Well-detailed. Theme-aware. */
export function EarthwormSeminalVesicleMaturation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm seminal vesicle maturation sperm nursery testes produce immature cells vesicles 11 and 12 mature storage vasa deferentia male pore 18">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The sperm nursery — testes, vesicles, exit</text>
      {/* pathway */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["Testes (10–11)", "tiny lobes release immature cells", 130],
        ["Seminal vesicles (11–12)", "large sacs mature and store sperm", 330],
        ["Vasa deferentia", "tubes carry mature sperm forward", 520],
        ["Male pore (18)", "sperm exits to the partner", 650],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 62} y="70" width="124" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y={90} fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y={110} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 26)}</text>
          <text x={x as number} y={124} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(26, 52)}</text>
          {i < 3 && <path d={`M${(x as number) + 64} 118 h${((x as number) + 118) - (x as number) - 64 - 2} m-5 -4 l5 4 l-5 4`} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the vesicles dwarf the testes — maturation needs volume, production needs only a nudge</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The split of labour: testes make the raw cells; seminal vesicles finish them into swimming sperm and hold them ready.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Prostate glands (segments 17–19) add the fluid that activates sperm just before release.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: testes 10–11, vesicles 11–12, male pore 18 — three addresses on the male side.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Sperm matures in the vesicles, not the testes — a distinction examiners love.</text>
    </svg>
  );
}
