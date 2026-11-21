/**
 * Species interactions matrix — mutualism, commensalism, parasitism,
 * predation, competition, amensalism with +/−/0 outcomes. Theme-aware.
 */
export function SpeciesInteractionsMatrix({ className }: { className?: string }) {
  const rows = [
    { a: "+", b: "+", n: "Mutualism", ex: "bee ↔ flower; Rhizobium ↔ legume", c: "rgb(22 163 74 / 0.9)" },
    { a: "+", b: "0", n: "Commensalism", ex: "epiphytes on tree; cattle egret", c: "rgb(14 165 233 / 0.9)" },
    { a: "+", b: "−", n: "Parasitism", ex: "Plasmodium in human; Cuscuta on plant", c: "rgb(239 68 68 / 0.9)" },
    { a: "+", b: "−", n: "Predation", ex: "frog eats insect (predator kills quickly)", c: "rgb(217 119 6 / 0.9)" },
    { a: "−", b: "−", n: "Competition", ex: "two barnacle species for space (Gause)", c: "rgb(148 163 184 / 0.9)" },
    { a: "−", b: "0", n: "Amensalism", ex: "Penicillium inhibits bacteria (antibiosis)", c: "rgb(120 113 108 / 0.9)" },
  ];
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Species interactions table with effect symbols showing mutualism commensalism parasitism predation competition and amensalism with examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Species interactions — who wins, who loses</text>
      <text x="200" y="52" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Species A</text>
      <text x="240" y="52" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Species B</text>
      <text x="270" y="52" fontSize="10" className="fill-current text-foreground" fontWeight="800">Interaction</text>
      <text x="450" y="52" fontSize="10" className="fill-current text-foreground" fontWeight="800">Example</text>
      {rows.map((r, i) => (
        <g key={r.n}>
          <rect x="12" y={62 + i * 36} width="636" height="30" rx="6" style={{ color: r.c }} className="fill-current opacity-8" stroke="none" />
          <text x="200" y={82 + i * 36} fontSize="11" textAnchor="middle" style={{ color: r.c }} className="fill-current" fontWeight="800">{r.a}</text>
          <text x="240" y={82 + i * 36} fontSize="11" textAnchor="middle" style={{ color: r.c }} className="fill-current" fontWeight="800">{r.b}</text>
          <text x="270" y={82 + i * 36} fontSize="10" className="fill-current text-foreground" fontWeight="700">{r.n}</text>
          <text x="450" y={82 + i * 36} fontSize="9" className="fill-current text-muted-foreground">{r.ex}</text>
        </g>
      ))}
      <text x="16" y="288" fontSize="10" className="fill-current text-muted-foreground">+ benefits · − harmed · 0 unaffected. Same symbols, different tempo: parasitism harms slowly, predation kills at once.</text>
    </svg>
  );
}
