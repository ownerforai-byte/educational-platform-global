// Chemistry's double edge: benefit vs pollution. Theme-aware.
export function EnvironmentDoubleEdge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Chemistry double edge panel benefits fertilisers medicines plastics versus problems pollution ozone depletion greenhouse effect with green chemistry answer">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The double edge — and the way out</text>
      <rect x="30" y="44" width="320" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="190" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">What chemistry gives</text>
      {["fertilisers and higher yields", "medicines and vaccines", "materials: polymers, alloys, glass"].map((t, i) => (
        <text key={t} x="50" y={88 + i * 18} fontSize="8.4" className="fill-current text-foreground" fontWeight="700">• {t}</text>
      ))}
      <rect x="370" y="44" width="320" height="100" rx="10" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="530" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">What misuse costs</text>
      {["CFCs thinned the ozone layer", "CO₂ and CH₄ warm the planet", "pesticides and effluent poison water"].map((t, i) => (
        <text key={t} x="390" y={88 + i * 18} fontSize="8.4" className="fill-current text-foreground" fontWeight="700">• {t}</text>
      ))}
      <rect x="30" y="158" width="660" height="48" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="178" fontSize="8.4" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">The answer is more chemistry, not less: green chemistry, catalytic converters, CFC replacements, effluent treatment.</text>
      <text x="360" y="196" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Exam framing: name the problem, name the chemical responsible, name the chemical solution — three-part structure scores full marks.</text>
    </svg>
  );
}
