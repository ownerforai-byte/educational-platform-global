/** Sewage treatment stages detail — primary to tertiary. Well-detailed. Theme-aware. */
export function SewageTreatmentStagesDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Sewage treatment stages detail primary screening sedimentation secondary aeration activated sludge tertiary chlorination BOD reduction sludge digester biogas reuse">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sewage treatment — what each stage removes</text>
      {/* stages */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["Primary", "screens + settling tanks remove solids by gravity", 130],
        ["Secondary", "aeration: microbes digest dissolved organic waste (BOD falls)", 300],
        ["Tertiary", "nutrient and pathogen polishing: chlorination, filtration", 470],
        ["Sludge line", "settled sludge digested anaerobically → biogas + fertiliser", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="100" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="90" fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="110" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 28)}</text>
          <text x={x as number} y="124" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(28, 56)}</text>
          <text x={x as number} y="138" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(56, 84)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 120 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">secondary treatment is biology, not chemistry — a managed city of bacteria doing the digesting</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The measure of success is BOD: raw sewage is high-BOD; treated effluent must be low-BOD before a river can safely receive it.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Biogas from sludge digesters can power the plant itself — waste treatment as energy production.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: primary = physical; secondary = biological (aeration); tertiary = chemical polishing. Match stage to method.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Most of Nepal's urban sewage still skips all three — septic tanks and rivers do the work instead.</text>
    </svg>
  );
}
