/** Frog sperm pathway male — testis to cloaca. Well-detailed. Theme-aware. */
export function FrogSpermPathwayMale({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog sperm pathway male testis to cloaca vasa efferentia kidney bidder canal collecting tubules ureter dual function urinogenital duct seminal vesicle sperm storage">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The sperm pathway — a shared exit with urine</text>
      {/* pathway */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["Testes", "paired ovoids near kidneys", 120],
        ["Vasa efferentia", "cross into the kidney", 280],
        ["Bidder's canal", "runs along kidney's inner edge", 440],
        ["Urinogenital duct", "sperm + urine → cloaca", 600],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 62} y="70" width="124" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y={90} fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y={110} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 26)}</text>
          <text x={x as number} y={124} fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(26, 52)}</text>
          {i < 3 && <path d={`M${(x as number) + 64} 118 h${((x as number) + 118) - (x as number) - 64 - 2} m-5 -4 l5 4 l-5 4`} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">sperm must detour through the kidney — the male frog's urinogenital duct carries both products</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Seminal vesicles on the duct store mature sperm until amplexus — release is timed to the embrace, not made continuously.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The kidney detour is an evolutionary leftover: testes originated next to the kidneys and simply kept the route.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: vasa efferentia → Bidder's canal → urinogenital duct → cloaca. Bidder's canal is the mark-winner.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Fat bodies sit on the testes — stored energy for breeding season.</text>
    </svg>
  );
}
