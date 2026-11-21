/** Frog heart double circulation — two loops one pump. Well-detailed. Theme-aware. */
export function FrogHeartDoubleCirculation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog heart double circulation two loops one pump pulmonary systemic deoxygenated oxygenated three chambered mixing truncus arteriosus comparison mammal">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Double circulation — two loops, one pump</text>
      {/* loop diagram */}
      <rect x="30" y="44" width="380" height="200" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="220" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TWO LOOPS</text>
      {/* heart */}
      <circle cx="220" cy="150" r="34" className="fill-current text-rose-500/25" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="220" y="154" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">3-chambered</text>
      {/* pulmonary loop */}
      <path d="M186 130 q-70 -40 -90 20 q-16 50 66 44" className="fill-none stroke-current" strokeWidth="3.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="90" y="102" fontSize="6.2" className="fill-current text-sky-600" fontWeight="700">pulmonary loop</text>
      <text x="90" y="114" fontSize="5.8" className="fill-current text-muted-foreground">heart → lungs/skin → heart</text>
      {/* systemic loop */}
      <path d="M254 130 q70 -40 90 20 q16 50 -66 44" className="fill-none stroke-current" strokeWidth="3.4" style={{ color: "rgb(220 38 38 / 0.9)" }} />
      <text x="300" y="102" fontSize="6.2" className="fill-current text-rose-600" fontWeight="700">systemic loop</text>
      <text x="300" y="114" fontSize="5.8" className="fill-current text-muted-foreground">heart → body → heart</text>
      <text x="220" y="222" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">two atria keep the streams separate; one ventricle lets them meet slightly</text>
      {/* comparison */}
      <rect x="440" y="44" width="250" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="565" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IT WORKS ANYWAY</text>
      {[
        "frog metabolism is slow — the",
        "  oxygen cost of mixing is small",
        "cutaneous respiration adds a",
        "  second oxygen source (skin)",
        "mammals, with high energy needs,",
        "  could not afford this design —",
        "  they evolved a full septum",
      ].map((t, i) => (
        <text key={t} x="456" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: double circulation = pulmonary + systemic loops; the frog's ventricle mixes blood — incomplete double circulation.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Birds and mammals: complete double circulation, four chambers, no mixing.</text>
    </svg>
  );
}
