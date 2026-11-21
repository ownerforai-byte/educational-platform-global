/** Genetic counselling session — the conversation flow. Well-detailed. Theme-aware. */
export function GeneticCounsellingSession({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Genetic counselling session pedigree chart family history risk assessment non directive counselling options not decisions recurrence risk probability autosomal recessive carrier testing prenatal diagnosis informed choice ethics">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Genetic counselling — a conversation, not a command</text>
      {/* session flow */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE SESSION FLOW</text>
      {[
        ["1. Pedigree", "draw the family tree; mark affected", 120],
        ["2. Assess", "estimate recurrence risk in numbers", 165],
        ["3. Inform", "explain the disorder and the options", 210],
      ].map(([k, v, y], i) => (
        <g key={k}>
          <text x="60" y={(y as number) - 4} fontSize="6.8" className="fill-current text-sky-600" fontWeight="800">{k}</text>
          <text x="60" y={(y as number) + 10} fontSize="6" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">the counsellor informs; the family decides — non-directive by principle</text>
      {/* example */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WORKED EXAMPLE (RECESSIVE)</text>
      {[
        "both parents are carriers of the",
        "  same recessive allele (Aa × Aa)",
        "risk per child: 1 in 4 affected,",
        "  2 in 4 carriers, 1 in 4 clear",
        "options discussed: prenatal",
        "  testing, carrier screening of",
        "  relatives, or no further action",
        "the counselling rule: numbers,",
        "  not orders — the family's",
        "  values decide",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: counselling = pedigree + risk estimate + non-directive options — three parts, one ethics rule.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A 1-in-4 risk is not a prediction of any single child — probability needs explaining, not just stating.</text>
    </svg>
  );
}
