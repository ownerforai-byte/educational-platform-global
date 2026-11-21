/** Malaria control Nepal progress — from epidemic to control. Well-detailed. Theme-aware. */
export function MalariaControlNepalProgress({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Malaria control Nepal progress Terai history DDT spraying cases decline LLIN nets elimination target 2025 Anopheles vector Terai plains lowland risk districts surveillance">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Malaria in Nepal — the control story in numbers</text>
      {/* history */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FROM EPIDEMIC TO CONTROL</text>
      {[
        "1950s: malaria was the main",
        "  obstacle to settling the Terai —",
        "  entire districts unliveable",
        "DDT spraying campaigns opened",
        "  the plains for settlement",
        "cases fell from hundreds of",
        "  thousands to a few thousand",
        "now: the goal is elimination,",
        "  not just control — every",
        "  remaining case matters",
        "risk persists in forest-fringe",
        "  and border districts",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* tools */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CONTROL TOOLKIT</text>
      {[
        "LLINs: long-lasting insecticide",
        "  nets — the workhorse",
        "rapid diagnosis: village-level",
        "  tests catch cases early",
        "effective treatment: ACT for",
        "  falciparum malaria",
        "vector control: larval source",
        "  management where feasible",
        "surveillance: track every case",
        "  to its source — elimination",
        "  is detective work",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: malaria shaped Nepal's settlement history — the Terai was 'conquered' by vector control before agriculture.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Control reduces cases; elimination ends local transmission — the two words are not synonyms.</text>
    </svg>
  );
}
