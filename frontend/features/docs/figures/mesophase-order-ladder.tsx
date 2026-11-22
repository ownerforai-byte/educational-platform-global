export function MesophaseOrderLadder({ className }: { className?: string }) {
  const steps = [
    { l: "Crystal", d: "full positional + orientational order", w: 200 },
    { l: "Smectic", d: "aligned layers", w: 150 },
    { l: "Nematic", d: "alignment only", w: 100 },
    { l: "Liquid", d: "no order", w: 55 },
  ];
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Order ladder from crystal to liquid through mesophases" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">The Order Ladder</text>
      {steps.map((s, i) => (
        <g key={i} transform={`translate(60, ${42 + i * 44})`}>
          <rect width={s.w} height="34" rx="6" className="fill-current opacity-15" />
          <text x="14" y="22" fontSize="12" fontWeight="700" fill="currentColor">{s.l}</text>
          <text x={s.w + 16} y="22" fontSize="10.5" className="fill-current opacity-70">{s.d}</text>
        </g>
      ))}
      <text x="280" y="222" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Mesophases live between crystal and liquid - order traded for mobility</text>
    </svg>
  );
}
