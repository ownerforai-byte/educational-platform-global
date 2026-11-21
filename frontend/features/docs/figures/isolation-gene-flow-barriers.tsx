/** Isolation gene flow barrier types. Well-detailed. Theme-aware. */
export function IsolationGeneFlowBarriers({ className }: { className?: string }) {
  const barriers: [string, string, string][] = [
    ["Geographical", "river, mountain, sea, valley", "splits a range physically"],
    ["Reproductive", "mating times, courtship, gamete incompatibility", "stops interbreeding even side by side"],
    ["Genetic", "chromosome differences, sterility of hybrids", "makes any cross a dead end"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Isolation gene flow barriers geographical reproductive genetic speciation split population no interbreeding new species">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Isolation — how one population becomes two</text>
      {barriers.map(([name, detail, effect], i) => {
        const x = 30 + i * 228;
        return (
          <g key={name}>
            <rect x={x} y="44" width="210" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x={x + 105} y="68" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name} isolation</text>
            {/* split icon */}
            <circle cx={x + 70} cy="110" r="12" className="fill-current text-sky-500/35" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <circle cx={x + 140} cy="110" r="12" className="fill-current text-emerald-500/35" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
            <line x1={x + 105} y1="88" x2={x + 105} y2="132" className="stroke-current" strokeWidth="3" style={{ color: "rgb(120 113 108 / 0.9)" }} strokeDasharray="4 3" />
            <text x={x + 14} y="152" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{detail}</text>
            <text x={x + 14} y="176" fontSize="6.4" textAnchor="middle" className="fill-current text-sky-600">{effect}</text>
          </g>
        );
      })}
      <rect x="30" y="228" width="660" height="62" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The chain: isolation blocks gene flow → each side accumulates its own mutations → differences grow → interbreeding becomes impossible → new species.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Geographical isolation usually starts it; reproductive isolation finishes it.</text>
      <text x="360" y="282" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 'no gene flow' is the key phrase — isolation matters only because it stops alleles moving.</text>
    </svg>
  );
}
