/** Lamarckism — four propositions. Theme-aware. */
export function LamarckismPropositions({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Lamarckism four propositions internal vital forces environment and need use and disuse and inheritance of acquired characters">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Lamarckism (1809) — four propositions</text>
      {[
        { y: 56, t: "1. Internal vital forces", s: "innate tendency toward complexity" },
        { y: 92, t: "2. Environment and need", s: "new needs generate new structures" },
        { y: 128, t: "3. Use and disuse", s: "used organs grow stronger; unused organs weaken" },
        { y: 164, t: "4. Inheritance of acquired characters", s: "characters acquired in a lifetime pass to offspring" },
      ].map((s) => (
        <g key={s.t}>
          <text x="30" y={s.y} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{s.t}</text>
          <text x="280" y={s.y} fontSize="7.2" className="fill-current text-muted-foreground">{s.s}</text>
        </g>
      ))}
      <rect x="24" y="188" width="612" height="40" rx="10" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="40" y="206" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">Why it failed: acquired (somatic) changes do not reach the germ line.</text>
      <text x="40" y="220" fontSize="8" className="fill-current text-muted-foreground">Epigenetics shows some marks persist a generation or two — not permanent inheritance.</text>
    </svg>
  );
}
