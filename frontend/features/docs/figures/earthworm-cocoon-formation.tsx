/** Earthworm cocoon formation — the clitellum workshop. Well-detailed. Theme-aware. */
export function EarthwormCocoonFormation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Earthworm cocoon formation clitellum secretes ring slides forward eggs albumen sperm deposited seal lemon shape incubation weeks">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cocoon formation — the clitellum's four-step workshop</text>
      {/* steps */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {[
        ["1. Secrete", "clitellum ring secretes a mucus band", 130],
        ["2. Slide", "the band slides forward over the body", 300],
        ["3. Fill", "eggs + albumen + stored sperm deposited", 470],
        ["4. Seal", "band slips off the head and seals into a cocoon", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="100" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
          <text x={x as number} y={92} fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y={112} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 28)}</text>
          <text x={x as number} y={126} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(28, 56)}</text>
          <text x={x as number} y={144} fontSize="5.6" textAnchor="middle" className="fill-current" style={{ color: "rgb(217 119 6 / 0.9)" }}>{["ring forms", "backwards body wave", "one package", "lemon-shaped capsule"][i]}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 120 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(217 119 6 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the sliding ring picks up eggs from segment 14, albumen, and stored sperm from the spermathecae as it passes segments 6–9</text>
      {/* facts */}
      <rect x="30" y="220" width="660" height="72" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="240" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The result: a lemon-shaped capsule buried in soil, incubating for 2–4 weeks — usually one worm per cocoon, up to a handful in good conditions.</text>
      <text x="360" y="258" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The sliding-ring mechanism is why the clitellum sits so far forward: the ring must pass the egg and sperm openings on its way to the head.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: clitellum position (14–16) exists because the cocoon band must slide forward past the reproductive pores.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Direct development — no larva, a miniature worm hatches.</text>
    </svg>
  );
}
