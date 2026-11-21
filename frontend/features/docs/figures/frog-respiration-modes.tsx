/** Frog respiration modes — cutaneous, buccopharyngeal, pulmonary. Theme-aware. */
export function FrogRespirationModes({ className }: { className?: string }) {
  const panel = (x: number, c: string, t: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y="56" width="196" height="160" rx="12" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 98} y="82" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 12} y={106 + i * 24} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Three modes of frog respiration cutaneous buccopharyngeal and pulmonary with conditions and mechanisms">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three ways a frog breathes</text>
      {panel(16, "rgb(14 165 233 / 0.9)", "CUTANEOUS (skin)", ["always active — even underwater", "moist, vascular skin", "O₂ in, CO₂ out by diffusion", "most of resting uptake"], "a")}
      {panel(232, "rgb(16 185 129 / 0.9)", "BUCCOPHARYNGEAL", ["mouth-cavity lining", "floor pumps up & down", "nostrils closed during intake", "air drawn over the lining"], "b")}
      {panel(448, "rgb(245 158 11 / 0.9)", "PULMONARY (lungs)", ["on land / when active", "positive-pressure filling", "(frog swallows air — no diaphragm)", "simple sacs with septa, no alveoli"], "c")}
      <text x="16" y="232" fontSize="10" className="fill-current text-muted-foreground">The skin works round the clock; lungs take over during activity — an amphibian hedge against two worlds.</text>
    </svg>
  );
}
