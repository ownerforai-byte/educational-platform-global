/** Chromosome morphology — parts and shapes. Well-detailed. Theme-aware. */
export function ChromosomeMorphology({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Chromosome morphology parts chromatids centromere primary constriction p arm q arm secondary constriction telomere kinetochore and four shapes metacentric submetacentric acrocentric telocentric">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Chromosome anatomy and the four shapes</text>

      {/* labeled chromosome */}
      <g>
        <path d="M180 70 q-40 0 -40 40 L140 180 q0 40 40 40 q40 0 40 -40 L220 110 q0 -40 -40 -40" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="3" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <path d="M220 70 q40 0 40 40 L260 180 q0 40 -40 40 q-40 0 -40 -40 L180 110 q0 -40 40 -40" className="fill-current text-emerald-500/15" stroke="currentColor" strokeWidth="3" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <rect x="180" y="120" width="40" height="16" rx="4" className="fill-current text-rose-500/40" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="290" y="90" fontSize="7.8" className="fill-current text-sky-600" fontWeight="700">sister chromatid 1 (identical copy)</text>
        <text x="290" y="112" fontSize="7.8" className="fill-current text-emerald-600" fontWeight="700">sister chromatid 2</text>
        <text x="290" y="134" fontSize="7.8" className="fill-current text-rose-600" fontWeight="700">centromere (primary constriction) + kinetochore</text>
        <text x="290" y="156" fontSize="7.8" className="fill-current text-muted-foreground">p arm = short · q arm = long</text>
        <text x="290" y="178" fontSize="7.8" className="fill-current text-muted-foreground">telomeres cap both ends (protect, age-clock)</text>
        <text x="290" y="200" fontSize="7.8" className="fill-current text-muted-foreground">secondary constriction = nucleolar organiser</text>
      </g>

      {/* shapes */}
      {[
        { x: 130, t: "METACENTRIC", s: "centromere median — V-shaped", c: "rgb(14 165 233 / 0.9)" },
        { x: 310, t: "SUBMETACENTRIC", s: "off-centre — L-shaped", c: "rgb(22 163 74 / 0.9)" },
        { x: 490, t: "ACROCENTRIC", s: "near the end — J-shaped", c: "rgb(245 158 11 / 0.9)" },
        { x: 650, t: "TELOCENTRIC", s: "at the very end — I-shaped", c: "rgb(139 92 246 / 0.9)" },
      ].map((p, pi) => (
        <g key={p.t}>
          <rect x={p.x - 72} y="216" width="144" height="66" rx="10" style={{ color: p.c }} className="fill-current opacity-10" strokeWidth="2" stroke="currentColor" />
          <text x={p.x} y="234" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{p.t}</text>
          {pi === 0 && <path d={`M${p.x - 14} 252 L${p.x} 268 L${p.x + 14} 252`} className="fill-none stroke-current" strokeWidth="3" style={{ color: p.c }} />}
          {pi === 1 && <path d={`M${p.x - 12} 246 L${p.x - 12} 268 L${p.x + 12} 262`} className="fill-none stroke-current" strokeWidth="3" style={{ color: p.c }} />}
          {pi === 2 && <path d={`M${p.x - 12} 246 L${p.x - 12} 268 L${p.x + 12} 266`} className="fill-none stroke-current" strokeWidth="3" style={{ color: p.c }} />}
          {pi === 3 && <line x1={p.x - 10} y1="248" x2={p.x - 10} y2="270" strokeWidth="3" style={{ color: p.c }} className="stroke-current" />}
          <text x={p.x} y="278" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">{p.s}</text>
        </g>
      ))}
    </svg>
  );
}
