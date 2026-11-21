/** Theories of the origin of life — four views compared. Theme-aware. */
export function OriginTheories({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Theories of origin of life special creation spontaneous generation panspermia abiogenesis and chemical evolution compared">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Four theories of the origin of life</text>
      {[
        { y: 56, t: "SPECIAL CREATION", s: "life created by a divine act — a belief, not testable science" },
        { y: 96, t: "SPONTANEOUS GENERATION", s: "life arises suddenly from non-living matter — disproved by Pasteur" },
        { y: 136, t: "PANSPERMIA", s: "life reached Earth from elsewhere in space (cosmic seeding)" },
        { y: 176, t: "CHEMICAL EVOLUTION (ABIogenesis)", s: "life arose on Earth from non-living matter — Oparin–Haldane, supported by Miller–Urey" },
      ].map((s) => (
        <g key={s.t}>
          <text x="30" y={s.y} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{s.t}</text>
          <text x="260" y={s.y} fontSize="7.2" className="fill-current text-muted-foreground">{s.s}</text>
        </g>
      ))}
      <text x="16" y="216" fontSize="9" className="fill-current text-muted-foreground">Only chemical evolution is testable and supported by experiment (Miller–Urey).</text>
    </svg>
  );
}
