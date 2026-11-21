/** Algae reproduction — vegetative, asexual, sexual. Well-detailed. Theme-aware. */
export function AlgaeReproductionModes({ className }: { className?: string }) {
  const modes: [string, string, string, string][] = [
    ["VEGETATIVE", "fragmentation", "a piece breaks off and grows on its own", "text-emerald-500"],
    ["ASEXUAL", "zoospores", "motile spores with flagella swim off, settle, grow", "text-sky-500"],
    ["SEXUAL", "gamete fusion (isogamy in Spirogyra)", "two similar gametes fuse → zygote → new filament", "text-violet-500"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Algae reproduction three modes vegetative fragmentation asexual zoospores flagella sexual gamete fusion isogamy zygote spirogyra life cycle">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three routes to a new alga</text>
      {modes.map(([name, how, detail, tint], i) => {
        const y = 44 + i * 78;
        return (
          <g key={name}>
            <rect x="30" y={y} width="660" height="66" rx="10" className={`fill-current ${tint}/10`} strokeWidth="2" stroke="currentColor" />
            <text x="48" y={y + 24} fontSize="9.2" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name} — {how}</text>
            <text x="48" y={y + 44} fontSize="7.6" className="fill-current text-muted-foreground">{detail}</text>
            {/* mini icon */}
            {i === 0 && <path d={`M560 ${y + 20} q30 -14 60 0 M590 ${y + 20} L590 ${y + 44}`} className="fill-none stroke-current text-emerald-500" strokeWidth="3" />}
            {i === 1 && (
              <g>
                <ellipse cx="600" cy={y + 32} rx="10" ry="7" className="fill-current text-sky-500/40" stroke="currentColor" strokeWidth="1.5" />
                <path d={`M590 ${y + 26} q-10 -6 -16 -6 M590 ${y + 38} q-10 6 -16 6`} className="fill-none stroke-current text-sky-500" strokeWidth="1.6" />
              </g>
            )}
            {i === 2 && (
              <g>
                <circle cx="586" cy={y + 32} r="7" className="fill-current text-violet-500/40" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="614" cy={y + 32} r="7" className="fill-current text-violet-500/40" stroke="currentColor" strokeWidth="1.5" />
                <line x1="593" y1={y + 32} x2="607" y2={y + 32} className="stroke-current text-violet-500" strokeWidth="2" />
                <circle cx="600" cy={y + 32} r="9" className="fill-none stroke-current text-violet-600" strokeWidth="1.6" />
              </g>
            )}
          </g>
        );
      })}
      <rect x="30" y="274" width="660" height="18" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="287" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: zoospore = asexual + flagella; conjugation in Spirogyra = sexual without flagellated gametes.</text>
    </svg>
  );
}
