/** Ciliophora cilia rows — coordinated oars. Well-detailed. Theme-aware. */
export function CiliophoraCiliaRows({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ciliophora cilia rows coordinated beating slipper animalcule Paramecium Vorticella stalked ciliates oral groove feeding current">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ciliophora — thousands of tiny oars</text>
      {/* paramecium with cilia */}
      <ellipse cx="220" cy="130" rx="130" ry="62" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {Array.from({ length: 26 }).map((_, i) => {
        const t = i / 25;
        const x = 100 + t * 240;
        const yTop = 130 - 62 * Math.sqrt(Math.max(0.02, 1 - Math.pow((x - 220) / 130, 2)));
        const yBot = 130 + 62 * Math.sqrt(Math.max(0.02, 1 - Math.pow((x - 220) / 130, 2)));
        return (
          <g key={i}>
            <line x1={x} y1={yTop} x2={x - 5} y2={yTop - 10} className="stroke-current" strokeWidth="1.2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <line x1={x} y1={yBot} x2={x - 5} y2={yBot + 10} className="stroke-current" strokeWidth="1.2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          </g>
        );
      })}
      <path d="M300 130 q26 10 34 26" className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="220" y="222" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">cilia beat in coordinated waves — fast, reversible swimming</text>
      {/* facts */}
      <rect x="420" y="44" width="270" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="555" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CILIATE SPECIALTIES</text>
      {[
        "cilia in longitudinal rows",
        "oral groove sweeps a feeding current",
        "two nuclei: macronucleus runs the",
        "  cell, micronucleus carries genes",
        "trichocysts fire as defence threads",
        "conjugation = sexual reshuffling",
        "examples: Paramecium, Vorticella",
      ].map((t, i) => (
        <text key={t} x="436" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why cilia beat cilia: each cilium is short and weak, but thousands beating in waves move the cell faster than any flagellate of its size.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Ciliophora = cilia + two nuclei + conjugation — three identifiers in one line.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Vorticella adds the stalk: a ciliate that anchors instead of swimming.</text>
    </svg>
  );
}
