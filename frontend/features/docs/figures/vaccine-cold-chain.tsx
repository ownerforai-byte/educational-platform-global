/** Vaccine cold chain — the unbroken temperature line. Well-detailed. Theme-aware. */
export function VaccineColdChain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Vaccine cold chain temperature 2 to 8 degrees manufacturer national store district health post vaccine carrier ice packs breakage potency loss OPV BCG heat sensitive freeze sensitive Nepal reach every district cold box monitoring thermometer shake test">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The cold chain — a vaccine's unbroken temperature line</text>
      {/* chain */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["Factory", "manufactured, frozen or chilled", 130],
        ["National store", "central cold rooms at 2–8°C", 300],
        ["District", "ice-lined refrigerators", 470],
        ["Health post", "vaccine carriers + ice packs to the field", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">every link must hold 2–8°C — one broken link silently wastes the dose</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Heat kills some vaccines (OPV is fragile); freezing ruins others (hepatitis B, DPT) — the chain must be cold but not frozen.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal's terrain makes the last mile brutal — porters, mules and solar refrigerators carry the chain to the hills.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: cold chain = 2–8°C at every step; heat-sensitive (OPV) vs freeze-sensitive (hepatitis B) — know both failure modes.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">A vaccine that never stayed cold is a placebo with a needle — logistics is half of immunisation.</text>
    </svg>
  );
}
