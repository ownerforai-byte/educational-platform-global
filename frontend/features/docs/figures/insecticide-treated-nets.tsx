/** Insecticide treated nets — personal protection physics. Well-detailed. Theme-aware. */
export function InsecticideTreatedNets({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Insecticide treated nets ITN bed net protection night biting mosquito barrier knockdown community effect herd protection malaria prevention">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The bed net — a barrier that also poisons</text>
      {/* net over sleeper */}
      <rect x="30" y="44" width="330" height="200" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NIGHT SCENE</text>
      <path d="M80 200 L120 100 L270 100 L310 200 Z" className="fill-none stroke-current" strokeWidth="2" strokeDasharray="3 3" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <line x1="120" y1="100" x2="270" y2="100" className="stroke-current" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <path d="M150 200 q10 -26 45 -26 q35 0 45 26" className="fill-current text-slate-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      {[[70, 130], [320, 150]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="12" ry="5" className="fill-current text-slate-500/40" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(120 113 108 / 0.9)" }} transform={`rotate(${i === 0 ? -45 : 45} ${x} ${y})`} />
          <path d={`M${x + (i === 0 ? 12 : -12)} ${y} l${i === 0 ? 14 : -14} ${i === 0 ? -8 : 8}`} className="stroke-current" strokeWidth="1.6" style={{ color: "rgb(120 113 108 / 0.9)" }} />
        </g>
      ))}
      <text x="195" y="232" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">Anopheles bites after 10 pm — exactly when people are under nets</text>
      {/* why it works */}
      <rect x="390" y="44" width="300" height="200" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DOUBLE ACTION</text>
      {[
        "physical barrier — mesh blocks",
        "  most bites outright",
        "insecticide coating — mosquitoes",
        "  that touch it are knocked down",
        "community effect: even neighbours",
        "  without nets are protected,",
        "  because fewer mosquitoes survive",
        "  to bite anyone",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 18} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: ITNs work twice — as a barrier and as a poison — and their benefit spills over to the whole household.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Cheap, proven, and the single most cost-effective malaria intervention.</text>
    </svg>
  );
}
