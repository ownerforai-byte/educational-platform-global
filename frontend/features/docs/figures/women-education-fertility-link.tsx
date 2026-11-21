/** Women education fertility link — the most powerful contraceptive. Well-detailed. Theme-aware. */
export function WomenEducationFertilityLink({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Women education fertility link inverse correlation schooling years total fertility rate TRF girls education empowerment delayed marriage contraception access employment opportunity cost children investment quality versus quantity demographic transition driver Kerala Bangladesh example Nepal improvement literacy gender gap explanation mechanism why education lowers fertility strongest predictor">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Education and fertility — the strongest link in demography</text>
      {/* mechanism */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY SCHOOLING LOWERS FERTILITY</text>
      {[
        "later marriage: each extra year of",
        "  girls' schooling delays first",
        "  birth",
        "knowledge: educated women use",
        "  contraception more effectively",
        "opportunity cost: children compete",
        "  with careers — families shift",
        "  from quantity to quality",
        "voice: educated women negotiate",
        "  family size within households",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* evidence */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE EVIDENCE</text>
      {[
        "Kerala, India: high female",
        "  literacy → fertility below",
        "  replacement, despite modest",
        "  income — the classic case",
        "Bangladesh: girls' stipends and",
        "  garment work drove fertility",
        "  from ~6 to ~2",
        "Nepal: female literacy climbed",
        "  from ~20% (1981) to over 70% —",
        "  fertility fell from ~5 to ~2",
        "exam hook: call education 'the",
        "  most powerful contraceptive' —",
        "  the quote examiners reward",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the inverse correlation + four mechanisms (marriage age, contraception, opportunity cost, voice) — the full answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">No population policy outperforms a girls' school — the classroom is the quietest family-planning clinic.</text>
    </svg>
  );
}
