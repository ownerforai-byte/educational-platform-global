/** Struggle for existence — the three struggles. Well-detailed. Theme-aware. */
export function StruggleForExistence({ className }: { className?: string }) {
  const kinds: [string, string, string][] = [
    ["Intraspecific", "same species — strongest competition", "two deer stags, same herd"],
    ["Interspecific", "different species — predator, competitor", "tiger vs leopard, same prey"],
    ["Environmental", "against climate, drought, cold", "rice surviving a monsoon flood"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Struggle for existence intraspecific interspecific environmental competition Darwin overproduction limited resources survival">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Struggle for existence — three kinds of contest</text>
      {kinds.map(([name, detail, ex], i) => {
        const x = 30 + i * 228;
        return (
          <g key={name}>
            <rect x={x} y="44" width="210" height="170" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
            <text x={x + 105} y="68" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* icon: two figures clashing or element */}
            {i === 0 && <><circle cx={x + 88} cy="112" r="8" className="fill-current" style={{ color: "rgb(244 63 94 / 0.6)" }} /><circle cx={x + 122} cy="112" r="8" className="fill-current" style={{ color: "rgb(244 63 94 / 0.6)" }} /><path d={`M${x + 96} 112 h18`} className="stroke-current" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} /></>}
            {i === 1 && <><circle cx={x + 88} cy="112" r="8" className="fill-current" style={{ color: "rgb(244 63 94 / 0.6)" }} /><circle cx={x + 122} cy="112" r="8" className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} /><path d={`M${x + 96} 112 h18`} className="stroke-current" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} /></>}
            {i === 2 && <path d={`M${x + 88} 124 q17 -34 34 0 q-9 -9 -17 0 q-8 -9 -17 0`} className="fill-current" style={{ color: "rgb(244 63 94 / 0.5)" }} />}
            <text x={x + 14} y="152" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{detail}</text>
            <text x={x + 14} y="176" fontSize="6.6" textAnchor="middle" className="fill-current text-rose-600">{ex}</text>
          </g>
        );
      })}
      <rect x="30" y="228" width="660" height="62" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The cause: overproduction + limited resources. Every population could fill the Earth in a few generations — it never does.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Intraspecific struggle is the most severe, because members of one species need exactly the same things.</text>
      <text x="360" y="282" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the three struggles with one example each — a guaranteed short-answer structure.</text>
    </svg>
  );
}
