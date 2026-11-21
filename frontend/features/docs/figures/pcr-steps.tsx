/**
 * PCR — three temperature steps per cycle: denaturation, primer
 * annealing, extension; exponential amplification. Theme-aware.
 */
export function PcrSteps({ className }: { className?: string }) {
  const duplex = (x: number, y: number, k: string, sep = false) => (
    <g key={k}>
      <rect x={x} y={y} width="90" height="7" rx="3" style={{ color: "rgb(14 165 233 / 0.9)" }} className="fill-current" />
      {sep ? (
        <>
          <rect x={x} y={y - 14} width="90" height="7" rx="3" style={{ color: "rgb(249 115 22 / 0.9)" }} className="fill-current" />
        </>
      ) : (
        <rect x={x} y={y + 10} width="90" height="7" rx="3" style={{ color: "rgb(249 115 22 / 0.9)" }} className="fill-current" />
      )}
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Polymerase chain reaction cycle with denaturation at 94 degrees, primer annealing at 55 degrees and extension at 72 degrees doubling DNA each cycle">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">PCR — photocopying DNA in a tube (Kary Mullis, 1983)</text>

      {/* thermocycler temps */}
      <g>
        <text x="16" y="60" fontSize="11" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">① DENATURE — 94–95 °C</text>
        <text x="16" y="76" fontSize="9" className="fill-current text-muted-foreground">H-bonds break; the two</text>
        <text x="16" y="90" fontSize="9" className="fill-current text-muted-foreground">strands separate</text>
        {duplex(30, 122, "d1", true)}

        <text x="240" y="60" fontSize="11" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">② ANNEAL — 50–60 °C</text>
        <text x="240" y="76" fontSize="9" className="fill-current text-muted-foreground">primers bind the ends</text>
        <text x="240" y="90" fontSize="9" className="fill-current text-muted-foreground">of the target sequence</text>
        {duplex(250, 122, "d2", true)}
        <rect x="250" y="112" width="18" height="7" rx="2" className="fill-current text-violet-500" />
        <rect x="322" y="126" width="18" height="7" rx="2" className="fill-current text-violet-500" />
        <text x="240" y="152" fontSize="8.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">primers (violet)</text>

        <text x="460" y="60" fontSize="11" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">③ EXTEND — 72 °C</text>
        <text x="460" y="76" fontSize="9" className="fill-current text-muted-foreground">Taq polymerase builds</text>
        <text x="460" y="90" fontSize="9" className="fill-current text-muted-foreground">the complementary strand</text>
        {duplex(470, 122, "d3")}
        <text x="460" y="152" fontSize="8.5" className="fill-current text-muted-foreground">2 copies → cycle repeats</text>
      </g>

      {/* amplification */}
      <text x="16" y="196" fontSize="11" className="fill-current text-foreground" fontWeight="800">Each cycle doubles the target — exponential:</text>
      {[
        { c: 1, n: "2 copies", x: 90 },
        { c: 2, n: "4", x: 190 },
        { c: 3, n: "8", x: 250 },
        { c: 10, n: "1 024", x: 330 },
        { c: 30, n: "≈ 1 billion", x: 470 },
      ].map((s) => (
        <text key={s.c} x={s.x} y="220" fontSize="10" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">{s.c} cycle{Number(s.c) > 1 ? "s" : ""} → {s.n}</text>
      ))}

      <text x="16" y="252" fontSize="10" className="fill-current text-muted-foreground">Needs only: template DNA, primers, Taq polymerase (heat-stable, from Thermus aquaticus), dNTPs, thermocycler.</text>
      <text x="16" y="270" fontSize="10" className="fill-current text-muted-foreground">Uses: COVID tests, forensics, paternity, palaeontology — anywhere DNA is scarce.</text>
      <text x="16" y="288" fontSize="10" className="fill-current text-muted-foreground">Exam hook: name the enzyme and why it must be heat-stable.</text>
    </svg>
  );
}
