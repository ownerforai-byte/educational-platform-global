/** Specimen to name — the identification workflow. Well-detailed. Theme-aware. */
export function SpecimenCollectionSteps({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["Collect", "whole plant if possible: roots, leaves, flowers, fruit"],
    ["Record", "place, altitude, date, habitat, collector — in the field notebook"],
    ["Press & dry", "flatten between blotters, change papers until crisp"],
    ["Mount & label", "glue to card, write the full label, assign a number"],
    ["Identify", "run the specimen through a key, compare with named sheets"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Specimen collection workflow five steps collect record press dry mount label identify key herbarium comparison naming a plant">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">From field to name — five steps</text>
      {steps.map(([title, detail], i) => {
        const x = 30 + i * 135;
        return (
          <g key={title}>
            <rect x={x} y="44" width="125" height="190" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
            <text x={x + 62} y="66" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {title}</text>
            {i === 0 && <path d={`M${x + 40} 140 L${x + 62} 100 L${x + 84} 140`} className="fill-none stroke-current text-emerald-600" strokeWidth="2.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />}
            {i === 1 && <rect x={x + 44} y={108} width="36" height="46" rx="4" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="1.6" />}
            {i === 2 && <rect x={x + 40} y={110} width="44" height="42" rx="4" className="fill-current text-stone-400/30" stroke="currentColor" strokeWidth="1.6" />}
            {i === 3 && <rect x={x + 38} y={112} width="48" height="38" rx="3" className="fill-current text-stone-200/30" stroke="currentColor" strokeWidth="1.6" />}
            {i === 4 && <path d={`M${x + 44} 132 h36 M${x + 44} 142 h24`} className="stroke-current text-emerald-700" strokeWidth="2" />}
            <text x={x + 62} y={182 + (detail.length > 46 ? 0 : 0)} fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 46)}</text>
            {detail.length > 46 && (
              <text x={x + 62} y={196} fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(46, 92)}</text>
            )}
            {i < 4 && <path d={`M${x + 128} 140 q8 0 12 0`} className="stroke-current text-emerald-600" strokeWidth="2" markerEnd="url(#arrhl)" />}
          </g>
        );
      })}
      <rect x="30" y="250" width="660" height="40" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="268" fontSize="7.6" className="fill-current text-foreground" fontWeight="700">The specimen is the evidence: every name in a flora traces back to a pressed, labelled sheet someone can still check today.</text>
      <text x="50" y="284" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: herbarium sheets storepressed plants; museums store preserved animals; keys turn characters into names.</text>
    </svg>
  );
}
