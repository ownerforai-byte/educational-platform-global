/** Reflex vs instinct layers — the behaviour hierarchy. Well-detailed. Theme-aware. */
export function ReflexVsInstinctLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Reflex versus instinct behaviour hierarchy innate learned reflex simple spinal instinct complex inherited web spinning courtship learning habituation conditioning ladder complexity">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Behaviour's hierarchy — from reflex to insight</text>
      {/* ladder */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE COMPLEXITY LADDER</text>
      {[
        ["Reflex", "fastest, simplest, spinal", 110],
        ["Instinct", "complex but inborn — web spinning", 160],
        ["Learned", "shaped by experience — habituation, conditioning", 210],
      ].map(([name, detail, y], i) => (
        <g key={name as string}>
          <rect x="70" y={(y as number) - 18} width="250" height="36" rx="8" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x="195" y={y as number} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string} — {(detail as string).split(" — ")[0]}</text>
          <text x="195" y={(y as number) + 12} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).split(" — ")[1]}</text>
        </g>
      ))}
      <path d="M195 92 v-4 M195 128 v8 M195 178 v8" className="stroke-current" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT DISTINGUISHES THEM</text>
      {[
        "reflex: one stimulus, one response,",
        "  no room for improvement",
        "instinct: a full inherited program —",
        "  a spider's first web is perfect",
        "  with no teacher, yet it is rigid:",
        "  the program cannot adapt",
        "learned: slow to build, flexible",
        "  in use — the only tier that",
        "  improves with experience",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: reflex = spinal and simple; instinct = inherited and complex; learning = experience-built and flexible.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Speed falls as flexibility rises — the nervous system trades one for the other.</text>
    </svg>
  );
}
