/** Noise thermal pollution — the overlooked pair. Well-detailed. Theme-aware. */
export function NoiseThermalPollution({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Noise thermal pollution decibel scale hearing damage traffic construction power plant cooling water river fish metabolism dissolved oxygen warm water holds less gas urban honking Kathmandu stress">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Noise and heat — pollution without smoke</text>
      {/* noise scale */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DECIBEL SCALE</text>
      {[
        ["30 dB", "whisper — comfortable", 20],
        ["60 dB", "conversation — normal", 90],
        ["85 dB", "busy traffic — hearing risk over 8 h", 160],
        ["110 dB", "horn, concert — damage in minutes", 230],
        ["140 dB", "jet takeoff — pain threshold", 290],
      ].map(([db, v, y], i) => (
        <g key={db as string}>
          <text x="46" y={(y as number) + 4} fontSize="6.4" className="fill-current text-violet-600" fontWeight="700">{db as string}</text>
          <text x="96" y={(y as number) + 4} fontSize="6" className="fill-current text-muted-foreground">{v as string}</text>
        </g>
      ))}
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">Kathmandu's horns routinely exceed 85 dB — chronic stress, sleep loss, hearing damage</text>
      {/* thermal */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THERMAL POLLUTION</text>
      {[
        "power plants discharge cooling",
        "  water several degrees warmer",
        "warm water holds less oxygen —",
        "  fish suffocate even without",
        "  any chemical added",
        "metabolism speeds up: organisms",
        "  need more food in warmer water",
        "cold-adapted species are pushed",
        "  out; warm-tolerant ones invade",
        "fix: cooling towers and ponds",
        "  before discharge",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: noise is measured in decibels (dB); thermal pollution kills by oxygen solubility, not toxicity.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Both are 'invisible' pollutants — the damage is physiological, not chemical.</text>
    </svg>
  );
}
