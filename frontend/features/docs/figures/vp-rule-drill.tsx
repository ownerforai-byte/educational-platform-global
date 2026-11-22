export function VpRuleDrill({ className }: { className?: string }) {
  const rows = [
    { s: "Na2CO3.10H2O", v: "VP above air", o: "effloresces to powder" },
    { s: "CaO", v: "absorbs, reacts", o: "stays solid (hygroscopic)" },
    { s: "CaCl2.6H2O", v: "solution VP below air", o: "deliquesces to puddle" },
    { s: "FeCl3", v: "solution VP below air", o: "deliquesces" },
  ];
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Classifying solids by vapour pressure rule" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Classify by the VP Rule</text>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(40, ${40 + i * 42})`}>
          <rect width="480" height="36" rx="6" className="fill-current opacity-5" />
          <text x="14" y="23" fontSize="11.5" fontWeight="600" fill="currentColor">{r.s}</text>
          <text x="200" y="23" fontSize="10.5" fill="currentColor">{r.v}</text>
          <text x="466" y="23" textAnchor="end" fontSize="10.5" fontWeight="700" fill="currentColor">{r.o}</text>
        </g>
      ))}
      <text x="280" y="220" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Compare solid (or saturated-solution) vapour pressure with the air's moisture</text>
    </svg>
  );
}
