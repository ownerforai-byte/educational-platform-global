/** Lichen economic & ecological importance — litmus, perfume, food, pollution indicator. Theme-aware. */
export function LichenImportance({ className }: { className?: string }) {
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
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Lichen importance in industry litmus dyes perfume food medicine ecology pioneer species and pollution monitoring">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Lichens at work</text>
      {col(16, "rgb(124 58 237 / 0.9)", "INDUSTRY", ["litmus indicator dye", "natural dyes & perfumes", "antibiotic usnic acid", "food for reindeer (Cladonia)"], "a")}
      {col(178, "rgb(14 165 233 / 0.9)", "ECOLOGY", ["pioneers on bare rock", "start soil formation", "nitrogen fixation by", "cyanobacterial partners"], "b")}
      {col(340, "rgb(239 68 68 / 0.9)", "POLLUTION METER", ["sensitive to SO₂", "die near cities & factories", "their presence = clean air,", "absence = pollution alarm"], "c")}
      {col(502, "rgb(22 163 74 / 0.9)", "NEPAL LINK", ["grows on Himal oaks,", "rocks and old walls", "used as dye and medicine", "in mountain communities"], "d")}
      <text x="16" y="232" fontSize="10" className="fill-current text-muted-foreground">Exam favourite: lichens are both the FIRST colonisers of bare rock and the most reliable biological air-quality monitors.</text>
    </svg>
  );
}
