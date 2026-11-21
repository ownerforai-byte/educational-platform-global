/** Antibiotic mechanism targets — four ways to kill a bacterium. Well-detailed. Theme-aware. */
export function AntibioticMechanismTargets({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Antibiotic mechanism targets cell wall penicillin protein synthesis ribosome tetracycline DNA replication quinolone folate metabolism sulfa selective toxicity bacteria human cells difference resistance broad narrow spectrum">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Antibiotics — four targets, one principle</text>
      {/* targets */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      {[
        ["Cell wall", "penicillins block wall building — bacteria burst", 130],
        ["Ribosomes", "tetracyclines jam protein synthesis", 300],
        ["DNA replication", "quinolones stop the enzyme that unwinds DNA", 470],
        ["Folate pathway", "sulfa drugs starve bacteria of nucleotides", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(139 92 246 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">selective toxicity: every target is bacterial-specific — that's why the drug kills the microbe and not the patient</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Narrow-spectrum drugs spare useful bacteria; broad-spectrum drugs hit everything — including gut flora that keep you healthy.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Complete the course: stopping early leaves the most resistant cells alive to restart the infection.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four targets (wall, ribosome, DNA, folate) + one principle (selective toxicity) = the full antibiotic answer.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Viruses have none of these targets — which is why antibiotics never cure viral colds.</text>
    </svg>
  );
}
