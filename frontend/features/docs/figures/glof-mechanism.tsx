/** GLOF mechanism — when a glacial lake lets go. Well-detailed. Theme-aware. */
export function GlofMechanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="GLOF mechanism glacial lake outburst flood moraine dam failure ice avalanche overtopping meltwater expansion Tsho Rolpa Thulagi Imja lakes early warning siren systems Nepal 1985 Dig Tsho event downstream villages hydropower damage climate change glacier retreat monitoring sensors evacuation drills bhote koshi tsho rolpa lowering project">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">GLOF — when a glacial lake lets go</text>
      {/* mechanism */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FAILURE MECHANISM</text>
      {[
        "glacier retreat leaves a lake",
        "  held back only by an",
        "  unstable moraine dam — loose",
        "  rock and ice rubble",
        "triggers: ice avalanche into the",
        "  lake, quake, or simply the dam",
        "  saturating and slumping",
        "the lake overtops, erodes the",
        "  dam, and releases a wall of",
        "  water, boulders and debris",
        "downstream: villages, bridges and",
        "  hydropower plants sit in the",
        "  path — minutes to hours of",
        "  warning at best",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* Nepal's lakes */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NEPAL'S WATCHLIST</text>
      {[
        "dozens of glacial lakes are",
        "  classified potentially",
        "  dangerous — Tsho Rolpa, Imja,",
        "  Thulagi among them",
        "1985: Dig Tsho burst and destroyed",
        "  the nearly finished Namche",
        "  hydropower plant — the",
        "  cautionary tale",
        "Tsho Rolpa's level was lowered",
        "  by a cut channel — engineering",
        "  as prevention",
        "early warning sirens downstream",
        "  + evacuation drills = the",
        "  practical defence",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: GLOF = glacial lake outburst flood; moraine dam + trigger + debris wave — define, explain, give one Nepali example.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Every retreating glacier writes a cheque the valley below may have to cash.</text>
    </svg>
  );
}
