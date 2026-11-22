// Mole volume relationship panel. Theme-aware.
export function MoleStpVolumePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Mole and volume relationship moles times twenty two point four equals litres at STP with worked ladder half mole one mole two moles">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">n × 22.4 = V (L at STP) — the volume ladder</text>
      {[
        ["0.5 mol", "11.2 L"],
        ["1 mol", "22.4 L"],
        ["2 mol", "44.8 L"],
        ["3 mol", "67.2 L"],
      ].map(([n, v], i) => (
        <g key={n}>
          <rect x={30 + i * 168} y="48" width="150" height="70" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x={105 + i * 168} y="76" fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">{n}</text>
          <text x={105 + i * 168} y="100" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{v}</text>
        </g>
      ))}
      <rect x="30" y="134" width="660" height="66" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="46" y="158" fontSize="9" className="fill-current text-emerald-600" fontWeight="800">Two-direction use:</text>
      <text x="46" y="176" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">mass → moles → litres (forward); litres → moles → mass (reverse)</text>
      <text x="46" y="192" fontSize="7.8" className="fill-current text-muted-foreground">Example: 5.6 L O₂ at STP = 0.25 mol = 8 g — both directions in one line.</text>
    </svg>
  );
}
