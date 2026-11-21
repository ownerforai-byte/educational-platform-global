/** Cancer hallmarks — what makes a cell malignant. Well-detailed. Theme-aware. */
export function CancerHallmarks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cancer hallmarks uncontrolled division apoptosis evasion angiogenesis metastasis invasion benign versus malignant tumour difference carcinogen mutation oncogene tumour suppressor p53 features list">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cancer — the six behaviours of a malignant cell</text>
      {/* hallmarks */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["Grows on signal", "ignores 'stop dividing' orders", 130],
        ["Refuses to die", "evades apoptosis — broken p53", 300],
        ["Invades", "digs through tissue boundaries", 470],
        ["Spreads", "metastasis via blood and lymph", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">plus two enablers: angiogenesis (growing its own blood supply) and immune evasion — six hallmarks in total</text>
      {/* benign vs malignant */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Benign vs malignant: benign stays local and encapsulated; malignant invades and metastasises — that difference defines cancer.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Causes are multi-hit: carcinogens (tobacco, UV, viruses like HPV) plus inherited susceptibility — usually several mutations accumulated.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: benign = contained, malignant = invasive + metastatic — the one-line distinction examiners want.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Treatment logic follows the hallmarks: cut it out, poison dividing cells, starve the blood supply, or unmask it to immunity.</text>
    </svg>
  );
}
