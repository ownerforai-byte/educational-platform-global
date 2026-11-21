/** Buffer zone community forestry — the partnership model. Well-detailed. Theme-aware. */
export function BufferZoneCommunityForestry({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Buffer zone community forestry partnership model Nepal national parks buffer zone user groups community forest user groups CFUG revenue sharing 30 50 percent alternative energy livelihoods conservation incentive fence conflict reduction tenure rights success story">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Community forestry — Nepal's conservation partnership</text>
      {/* model */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW THE MODEL WORKS</text>
      {[
        "local Community Forest User",
        "  Groups (CFUGs) get legal",
        "  tenure over a forest block",
        "they write an operational plan:",
        "  what to harvest, what to",
        "  protect, by whose labour",
        "income from timber, herbs and",
        "  ecotourism funds local",
        "  development",
        "buffer-zone user groups around",
        "  parks share up to 30–50% of",
        "  park revenue",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* results */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE RESULTS</text>
      {[
        "forest cover recovered from",
        "  crisis levels to roughly 45%",
        "  of the country",
        "degraded hills regrew —",
        "  spring sources returned",
        "the incentive flip: a forest",
        "  you own is an asset; a forest",
        "  the state guards is a threat",
        "limits remain: elite capture,",
        "  uneven benefits, weak",
        "  monitoring in some districts",
        "exam hook: tenure + revenue",
        "  share = conservation incentive",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: CFUGs + operational plans + revenue sharing — the three ingredients that reversed Nepal's deforestation.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal's community forestry is a global textbook case — cited wherever conservation meets livelihoods.</text>
    </svg>
  );
}
