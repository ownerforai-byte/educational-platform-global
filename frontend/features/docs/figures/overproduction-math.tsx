/** Overproduction math — elephant example. Well-detailed. Theme-aware. */
export function OverproductionMath({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Overproduction math Darwin elephant example descendants million years geometric increase limited resources struggle">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Overproduction — Darwin's elephant arithmetic</text>
      <rect x="30" y="44" width="330" height="200" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE ELEPHANT THOUGHT EXPERIMENT</text>
      {[
        "one pair breeds from age 30 to 90",
        "six offspring in that span, all surviving",
        "after 750 years: ~19 million elephants",
        "after a few thousand years: elephants",
        "  would cover every continent",
      ].map((t, i) => (
        <text key={t} x="50" y={96 + i * 20} fontSize="7.2" className="fill-current text-muted-foreground">{i === 3 ? "  " + t : "• " + t}</text>
      ))}
      <text x="195" y="222" fontSize="7" textAnchor="middle" className="fill-current text-amber-600" fontWeight="700">It never happens — something prunes every population.</text>
      {/* curve */}
      <rect x="390" y="44" width="300" height="200" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GEOMETRIC GROWTH VS REALITY</text>
      <line x1="430" y1="210" x2="430" y2="90" className="stroke-current text-stone-500" strokeWidth="1.4" />
      <line x1="430" y1="210" x2="670" y2="210" className="stroke-current text-stone-500" strokeWidth="1.4" />
      <path d="M430 208 q60 -8 100 -50 q40 -50 90 -90" className="fill-none stroke-current text-amber-600" strokeWidth="2.4" strokeDasharray="5 3" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <path d="M430 208 q80 -6 130 -20 q60 -14 100 -24" className="fill-none stroke-current text-emerald-600" strokeWidth="2.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="560" y="108" fontSize="6.4" className="fill-current text-amber-600">potential</text>
      <text x="590" y="168" fontSize="6.4" className="fill-current text-emerald-600">actual</text>
      <text x="540" y="232" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">the gap between the curves is the struggle</text>
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Overproduction is observation 1 of Darwin's five — it forces a struggle, and the struggle selects among variants.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: quote the elephant numbers — it shows you understand why selection must act.</text>
    </svg>
  );
}
