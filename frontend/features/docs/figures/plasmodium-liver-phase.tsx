/** Plasmodium liver phase — the hidden week. Well-detailed. Theme-aware. */
export function PlasmodiumLiverPhase({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Plasmodium liver phase pre-erythrocytic schizogony sporozoites hepatocytes merozoites release no symptoms week hypnozoite vivax relapse">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The liver phase — a silent week that matters</text>
      {/* liver */}
      <path d="M80 100 q60 -40 160 -20 q80 16 70 70 q-10 50 -90 54 q-90 4 -140 -34 q-24 -40 0 -70" className="fill-current text-rose-500/15" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[[140, 120], [190, 140], [240, 130], [170, 170]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="12" className="fill-current text-rose-500/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      ))}
      <text x="195" y="250" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">sporozoites enter liver cells, multiply silently for 7–10 days</text>
      {/* steps */}
      <rect x="400" y="44" width="290" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="545" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT HAPPENS INSIDE</text>
      {[
        "sporozoites reach the liver within",
        "  ~30 minutes of the bite",
        "each invades a hepatocyte and",
        "  multiplies (pre-erythrocytic",
        "  schizogony)",
        "thousands of merozoites burst out",
        "  and invade red blood cells",
        "no symptoms yet — the fever only",
        "  starts with the RBC phase",
      ].map((t, i) => (
        <text key={t} x="416" y={92 + i * 19} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the silent liver week is why symptoms lag behind the bite — and why P. vivax relapses (dormant hypnozoites).</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Drugs must reach the liver stage (e.g. primaquine-class) to cure relapsing malaria fully.</text>
    </svg>
  );
}
