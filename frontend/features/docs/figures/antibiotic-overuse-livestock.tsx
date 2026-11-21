/** Antibiotic overuse livestock — the farm-to-human resistance link. Well-detailed. Theme-aware. */
export function AntibioticOveruseLivestock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Antibiotic overuse livestock growth promotion routine dosing farm animals resistance genes transfer manure soil water food chain human infections untreatable WHO guidelines ban growth promoters Europe vs countries poultry aquaculture same drug classes human medicine colistin last resort surveillance One Health">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Antibiotics on farms — the resistance pipeline</text>
      {/* pipeline */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      {[
        ["Routine dosing", "growth promotion and prophylaxis in herds and flocks", 130],
        ["Resistance evolves", "gut bacteria select for resistant strains", 300],
        ["Spread", "manure → soil → water → food; workers carry it too", 470],
        ["Human risk", "same drug classes fail in the clinic", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(139 92 246 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">most antibiotics globally go to animals, not people — the farm is the larger selection pressure</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The EU banned growth-promotion antibiotics in 2006 — production continued, showing routine dosing was never necessary.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Colistin — a 'last resort' human drug — was widely used in livestock in some countries until resistance surfaced.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the pipeline (dosing → selection → spread → clinical failure) and one policy fix (ban growth promotion).</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Resistance genes travel sideways between species of bacteria — a farm problem becomes a hospital problem.</text>
    </svg>
  );
}
