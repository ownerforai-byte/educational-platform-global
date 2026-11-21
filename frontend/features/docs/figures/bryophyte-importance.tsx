/** Bryophytes as amphibians & economic importance — peat, pioneer, indicator. Theme-aware. */
export function BryophyteImportance({ className }: { className?: string }) {
  const col = (x: number, c: string, t: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y="56" width="150" height="160" rx="12" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 75} y="80" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 75} y={102 + i * 22} fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Bryophyte importance as amphibians of plant kingdom peat formation pioneer colonisers and pollution indicators">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why bryophytes matter</text>
      {col(16, "rgb(14 165 233 / 0.9)", "'AMPHIBIANS'", ["live on land but need", "water to reproduce", "capillary spaces hold", "water in dense mats"], "a")}
      {col(178, "rgb(245 158 11 / 0.9)", "PEAT & FUEL", ["Sphagnum bogs compress", "into peat — fuel & soil", "conditioner; held WWII", "wound dressings"], "b")}
      {col(340, "rgb(22 163 74 / 0.9)", "PIONEERS", ["first green cover on", "rock and burnt ground", "build soil for grasses", "prevent erosion"], "c")}
      {col(502, "rgb(239 68 68 / 0.9)", "INDICATORS", ["absorb directly from air", "sensitive to SO₂ & metals", "map pollution gradients", "cheap bio-monitoring"], "d")}
      <text x="16" y="232" fontSize="10" className="fill-current text-muted-foreground">No xylem, no seeds, no lignin — yet mosses hold more carbon than all forests of the world in peatlands.</text>
    </svg>
  );
}
