/** Darwin's five observations and deductions. Theme-aware. */
export function DarwinFiveObservations({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Darwin's five observations and deductions overproduction struggle for existence variation survival of the fittest natural selection and inheritance descent with modification">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Darwin's five observations and deductions (NEB 5m skeleton)</text>
      {[
        { y: 56, t: "1. Overproduction", s: "far more offspring than can survive (cod: millions of eggs)" },
        { y: 92, t: "2. Struggle for existence", s: "food, space, mates, predators limited → competition" },
        { y: 128, t: "3. Variation", s: "heritable differences — the raw material" },
        { y: 164, t: "4. Survival of the fittest", s: "fitness = reproductive success, not strength" },
        { y: 200, t: "5. Natural selection + inheritance", s: "favourable variations pass on → descent with modification" },
      ].map((s) => (
        <g key={s.t}>
          <text x="30" y={s.y} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{s.t}</text>
          <text x="270" y={s.y} fontSize="7.2" className="fill-current text-muted-foreground">{s.s}</text>
        </g>
      ))}
      <text x="16" y="236" fontSize="8" className="fill-current text-muted-foreground">Darwin and Wallace independently arrived at natural selection; Darwin published after Wallace's 1858 letter (Origin, 1859).</text>
    </svg>
  );
}
