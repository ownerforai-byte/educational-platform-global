/** Controlled experiment design — variables and controls. Well-detailed. Theme-aware. */
export function ControlGroupDesign({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Controlled experiment design control group experimental group independent dependent variables constants fair test structure">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The fair test — controls and variables</text>

      {/* two pots */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CONTROL vs EXPERIMENT</text>
      {[["Control", "full light, normal water", 90], ["Experiment", "one factor changed", 250]].map(([name, note, x], i) => (
        <g key={name as string}>
          <path d={`M${x as number} 210 v-40`} className="stroke-current text-amber-700" strokeWidth="3" style={{ color: "rgb(180 130 40 / 0.9)" }} />
          <path d={`M${(x as number) - 18} 210 h36 q0 14 -18 14 q-18 0 -18 -14`} className="fill-current text-amber-600/30" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(180 130 40 / 0.9)" }} />
          {i === 0 && <circle cx={x as number} cy={160} r="14" className="fill-current text-emerald-600/50" />}
          {i === 1 && <rect x={(x as number) - 16} y={140} width="32" height="30" rx="6" className="fill-current text-stone-500/30" stroke="currentColor" strokeWidth="1.6" />}
          <text x={x as number} y={244} fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{name as string}</text>
          <text x={x as number} y={258} fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="50" y="94" fontSize="7" className="fill-current text-muted-foreground">Everything identical except the one factor being tested — that is what makes the comparison fair.</text>

      {/* variables */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THREE KINDS OF VARIABLE</text>
      {[
        ["Independent", "the factor YOU change", "light, water, temperature"],
        ["Dependent", "the factor you MEASURE", "growth, leaf count, oxygen"],
        ["Controlled (constant)", "everything held the same", "soil, pot size, species"],
      ].map(([name, what, ex], i) => (
        <g key={name}>
          <text x="410" y={96 + i * 52} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
          <text x="424" y={110 + i * 52} fontSize="7" className="fill-current text-muted-foreground">{what}</text>
          <text x="424" y={124 + i * 52} fontSize="6.8" className="fill-current text-sky-600">{ex}</text>
        </g>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: in any experiment question, name the control, the independent and the dependent variable — three marks, three words.</text>
    </svg>
  );
}
