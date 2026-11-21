/** Osmoregulation contractile vacuole — the water pump. Well-detailed. Theme-aware. */
export function OsmoregulationContractileVacuole({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Osmoregulation contractile vacuole water pump amoeba freshwater bailing excess water radiating canals burst prevention cycle">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The contractile vacuole — bailing out a leaking cell</text>
      {/* cell with vacuole cycle */}
      <ellipse cx="220" cy="140" rx="130" ry="90" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {/* stage circles */}
      {[[140, 110, 10], [220, 170, 20], [300, 110, 8]].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          {i === 1 && <path d={`M${x - 18} ${y - 14} q18 -14 36 0`} className="fill-none stroke-current" strokeWidth="1.4" strokeDasharray="3 2" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="140" y="88" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">filling</text>
      <text x="220" y="210" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">full</text>
      <text x="300" y="88" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">emptied</text>
      <text x="220" y="252" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">fill → contract → expel through the pellicle → repeat</text>
      {/* why */}
      <rect x="420" y="44" width="270" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="555" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY FRESHWATER CELLS NEED IT</text>
      {[
        "pond water is hypotonic —",
        "  water floods in by osmosis",
        "without a pump the cell",
        "  would swell and burst",
        "the vacuole collects the water",
        "  and squirts it out",
        "marine protozoa mostly lack it —",
        "  seawater does not flood them",
        "Sporozoa lack it too — the host",
        "  balances their fluids",
      ].map((t, i) => (
        <text key={t} x="436" y={92 + i * 17} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Function first, name second: osmoregulation = keeping water balance, and the contractile vacuole is the pump that does it.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: say 'freshwater osmoregulation' and give the burst-if-absent consequence.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">In Amoeba the vacuole also collects some excretory waste — a bonus function.</text>
    </svg>
  );
}
