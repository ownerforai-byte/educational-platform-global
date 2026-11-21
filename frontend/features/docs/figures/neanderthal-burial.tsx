/** Neanderthal burial — first compassionate care. Well-detailed. Theme-aware. */
export function NeanderthalBurial({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Neanderthal burial deliberate graves Shanidar cave flower pollen care of injured compassion symbolic behaviour evidence">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The first funerals — care made visible</text>
      {/* grave scene */}
      <rect x="30" y="44" width="330" height="200" rx="12" className="fill-current text-stone-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SHANIDAR CAVE SCENE</text>
      <path d="M60 244 q10 -70 90 -70 q90 0 100 70" className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <ellipse cx="180" cy="220" rx="60" ry="14" className="fill-current text-stone-500/30" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <path d="M140 220 q40 -14 80 0" className="stroke-current" strokeWidth="5" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.8)" }} />
      {[[150, 206], [180, 202], [210, 206]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" className="fill-current" style={{ color: "rgb(139 92 246 / 0.7)" }} />
          <line x1={x} y1={y + 4} x2={x} y2={y + 10} className="stroke-current" strokeWidth="1.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
        </g>
      ))}
      <text x="195" y="278" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">pollen grains found with the skeleton — flowers in the grave?</text>
      {/* meaning */}
      <rect x="390" y="44" width="300" height="200" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT BURIALS MEAN</text>
      {[
        "deliberate graves at Shanidar,",
        "  La Chapelle, Kebara",
        "one man survived a withered arm",
        "  and a blind eye — someone fed him",
        "healed fractures show care,",
        "  not abandonment",
        "grave goods suggest belief in",
        "  something beyond the body",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 18} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Burial is behaviour, not anatomy — the strongest evidence that Neanderthal minds were like ours in kind.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Shanidar cave — the 'flower burial' — name it and say why it matters.</text>
    </svg>
  );
}
