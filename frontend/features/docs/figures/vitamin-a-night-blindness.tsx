/** Vitamin A night blindness — the eye's dark adaptation. Well-detailed. Theme-aware. */
export function VitaminANightBlindness({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Vitamin A night blindness dark adaptation rhodopsin visual purple xerophthalmia Bitot spots corneal ulceration children blindness sources sources green leafy vegetables carrot papaya mango liver retinol beta carotene conversion supplementation capsules twice yearly Nepal programme mortality reduction measles interaction">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Vitamin A — from night blindness to national capsules</text>
      {/* mechanism */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE MECHANISM</text>
      {[
        "rhodopsin ('visual purple') in",
        "  rod cells needs vitamin A —",
        "  without it, dark adaptation",
        "  fails: night blindness",
        "progression if untreated:",
        "  night blindness → Bitot's",
        "  spots (foamy patches) →",
        "  corneal ulceration →",
        "  permanent blindness",
        "also: vitamin A deficiency",
        "  raises child death risk from",
        "  measles and diarrhoea",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* sources + programme */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SOURCES AND THE PROGRAMME</text>
      {[
        "sources: liver, eggs (preformed",
        "  retinol); carrots, papaya,",
        "  mango, green leaves (beta-",
        "  carotene, converted in body)",
        "fat helps absorption — greens",
        "  eaten with a little oil work",
        "  far better",
        "Nepal's twice-yearly vitamin A",
        "  capsule campaign for young",
        "  children — delivered by",
        "  Female Community Health",
        "  Volunteers — cut child",
        "  blindness and mortality",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: rhodopsin + night blindness + Bitot's spots in order; beta-carotene needs fat — the mechanism plus the practical tip.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal's capsule volunteers are a global model: two capsules a year per child, delivered door to door.</text>
    </svg>
  );
}
