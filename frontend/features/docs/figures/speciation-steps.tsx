/** Speciation steps — from variety to species. Well-detailed. Theme-aware. */
export function SpeciationSteps({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["One population", "a single interbreeding group, one gene pool"],
    ["Barrier splits it", "a river or valley cuts gene flow"],
    ["Independent change", "mutations, drift and selection act separately"],
    ["Divergence grows", "forms differ in structure, behaviour, genes"],
    ["Reproductive isolation", "even reunited, they no longer interbreed — two species"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Speciation steps one population barrier independent evolution divergence reproductive isolation new species definition interbreeding">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Speciation — five steps from one species to two</text>
      {steps.map(([name, detail], i) => {
        const x = 30 + i * 136;
        return (
          <g key={name}>
            <rect x={x} y="52" width="122" height="140" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
            <text x={x + 61} y="74" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            {i === 0 && <circle cx={x + 61} cy="112" r="16" className="fill-current text-emerald-500/30" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(16 185 129 / 0.9)" }} />}
            {i === 1 && <><circle cx={x + 44} cy="112" r="12" className="fill-current text-emerald-500/30" /><circle cx={x + 78} cy="112" r="12" className="fill-current text-sky-500/30" /><line x1={x + 61} y1="94" x2={x + 61} y2="130" className="stroke-current" strokeWidth="2.4" style={{ color: "rgb(120 113 108 / 0.9)" }} /></>}
            {i >= 2 && <><circle cx={x + 44} cy="112" r="12" className="fill-current text-emerald-500/30" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.9)" }} /><circle cx={x + 78} cy="112" r="12" className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(2 132 199 / 0.9)" }} /></>}
            <text x={x + 8} y="146" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 24)}</text>
            <text x={x + 8} y="157" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(24, 48)}</text>
            <text x={x + 8} y="168" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(48, 72)}</text>
            {i < 4 && <path d={`M${x + 124} 112 l10 0 m-4 -4 l4 4 l-4 4`} className="fill-none stroke-current text-amber-600" strokeWidth="2" style={{ color: "rgb(217 119 6 / 0.9)" }} />}
          </g>
        );
      })}
      <rect x="30" y="206" width="660" height="84" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="226" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The species test: if two forms, brought back together, still interbreed and produce fertile young — they are one species.</text>
      <text x="360" y="244" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">That is why reproductive isolation, not mere difference in looks, marks the finishing line of speciation.</text>
      <text x="360" y="262" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal example: populations split by deep river gorges (Kali Gandaki) can diverge on either bank.</text>
      <text x="360" y="280" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the final step — reproductive isolation — and justify it with the species test.</text>
    </svg>
  );
}
