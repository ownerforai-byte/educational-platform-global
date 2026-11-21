/** Three algal classes — green, brown, red with pigments and habitats. Theme-aware. */
export function AlgaeThreeClasses({ className }: { className?: string }) {
  const col = (x: number, c: string, t: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y="56" width="196" height="160" rx="12" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 98} y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 98} y={102 + i * 20} fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Three algal classes chlorophyceae green phaeophyceae brown and rhodophyceae red compared by pigments stored food flagella and habitat">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Algae by colour — three classes, three pigment sets</text>
      {col(16, "rgb(22 163 74 / 0.9)", "CHLOROPHYCEAE (green)", ["chlorophyll a + b dominant", "starch as stored food", "mostly freshwater", "Spirogyra, Chlamydomonas", "flagella common"], "a")}
      {col(232, "rgb(180 130 60 / 0.9)", "PHAEOPHYCEAE (brown)", ["fucoxanthin masks green", "laminarin + mannitol stored", "almost all marine", "Sargassum, Laminaria", "large kelps to 30 m"], "b")}
      {col(448, "rgb(190 40 60 / 0.9)", "RHODOPHYCEAE (red)", ["phycoerythrin (red) + phycocyanin", "floridean starch", "mostly marine, deep water", "Polysiphonia, Gelidium", "no flagella at any stage"], "c")}
      <text x="16" y="232" fontSize="10" className="fill-current text-muted-foreground">Depth logic: red pigments absorb the blue-green light that penetrates deepest — red algae live deepest of the three.</text>
    </svg>
  );
}
