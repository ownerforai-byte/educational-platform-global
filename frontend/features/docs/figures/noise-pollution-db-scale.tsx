/** Noise pollution dB scale — the hearing damage ladder. Well-detailed. Theme-aware. */
export function NoisePollutionDbScale({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Noise pollution decibel scale logarithmic hearing damage threshold 85 decibels occupational whisper conversation traffic concert jet engine sound intensity doubling each ten units exposure time halving rule ear protection headphones volume">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Decibels — the logarithmic danger ladder</text>
      {/* ladder */}
      <rect x="30" y="44" width="660" height="170" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EACH +10 dB = TEN TIMES THE SOUND ENERGY</text>
      {[
        ["0 dB", "threshold of hearing", 20],
        ["30 dB", "whisper, quiet library", 70],
        ["60 dB", "normal conversation", 130],
        ["85 dB", "busy traffic — safe limit for 8-hour exposure", 190],
        ["100 dB", "motorcycle, power tool — <15 min safe", 250],
        ["120 dB", "rock concert, siren — pain threshold", 310],
        ["140 dB", "jet takeoff at 25 m — instant damage", 370],
      ].map(([db, label, x], i) => {
        const y = 90 + i * 18;
        const danger = i >= 3;
        return (
          <g key={db as string}>
            <text x="46" y={y} fontSize="6.4" className="fill-current" style={{ color: danger ? "rgb(220 38 38)" : "rgb(139 92 246)" }} fontWeight="800">{db as string}</text>
            <rect x="100" y={y - 8} width={8 + i * 46} height="12" rx="6" className="fill-current" style={{ color: danger ? "rgb(244 63 94 / 0.35)" : "rgb(139 92 246 / 0.3)" }} stroke="currentColor" strokeWidth="0.8" />
            <text x={112 + i * 46} y={y} fontSize="5.8" className="fill-current text-muted-foreground">{label as string}</text>
          </g>
        );
      })}
      <text x="360" y="204" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">every +10 dB halves the safe exposure time — 85 dB for 8 h, 88 dB for 4 h, 91 dB for 2 h</text>
      {/* facts */}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Ear damage is cumulative and permanent — hair cells in the cochlea don't regrow; prevention is the only cure.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: dB is logarithmic (10× per 10 units); 85 dB = the 8-hour occupational safe limit.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Earphones at full volume can exceed 100 dB — a personal noise hazard teenagers carry in their pockets.</text>
    </svg>
  );
}
