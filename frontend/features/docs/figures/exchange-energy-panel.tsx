// Exchange energy — why half-filled sets win. Theme-aware.
export function ExchangeEnergyPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Exchange energy diagram parallel parallel spin pairs in half filled d five subshell maximise exchange interactions lowering energy">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Exchange energy — the hidden stabiliser</text>
      <rect x="40" y="50" width="290" height="100" rx="10" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="185" y="72" fontSize="9.5" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">d⁴ (less stable)</text>
      {[70, 120, 170, 220].map((x, i) => (
        <rect key={x} x={x} y="88" width="34" height="34" rx="4" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(120 120 130 / 0.8)" }} />
      ))}
      {["↑", "↑", "↑", "↑↓"].map((s, i) => (
        <text key={i} x={87 + i * 50} y="112" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{s}</text>
      ))}
      <text x="185" y="142" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">3 exchange pairs among parallel spins</text>
      <rect x="390" y="50" width="290" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="535" y="72" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">d⁵ (half-filled — extra stable)</text>
      {[420, 470, 520, 570, 620].map((x) => (
        <rect key={x} x={x} y="88" width="34" height="34" rx="4" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(120 120 130 / 0.8)" }} />
      ))}
      {["↑", "↑", "↑", "↑", "↑"].map((s, i) => (
        <text key={i} x={437 + i * 50} y="112" fontSize="10" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">{s}</text>
      ))}
      <text x="535" y="142" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">10 exchange pairs — every electron with every other</text>
      <rect x="30" y="164" width="660" height="34" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="182" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Parallel spins can "exchange" positions at no energy cost — each pair lowers the state. More parallel pairs, more exchange energy.</text>
      <text x="360" y="194" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">d⁵ gives 10 pairs vs d⁴'s 3: the arithmetic behind Cr's [Ar] 4s¹ 3d⁵ and Fe³⁺'s stability.</text>
    </svg>
  );
}
