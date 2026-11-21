/** Algal pigments — the colour code of the three classes. Well-detailed. Theme-aware. */
export function AlgaePigmentsChart({ className }: { className?: string }) {
  const classes: [string, string, string, string, string][] = [
    ["Chlorophyceae", "GREEN", "chlorophyll a + b", "stores starch", "rgb(22 163 74)"],
    ["Phaeophyceae", "BROWN", "fucoxanthin masks green", "stores laminarin, mannitol", "rgb(180 130 40)"],
    ["Rhodophyceae", "RED", "phycoerythrin (red) + phycocyanin", "stores floridean starch", "rgb(219 39 119)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Algae pigment chart chlorophyceae green chlorophyll phaeophyceae brown fucoxanthin rhodophyceae red phycoerythrin stored food classification colour">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Pigments are the ID card of each class</text>
      {classes.map(([name, colour, pig, store, rgb], i) => {
        const y = 44 + i * 78;
        return (
          <g key={name}>
            <rect x="30" y={y} width="660" height="66" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <rect x="46" y={y + 14} width="34" height="38" rx="6" className="fill-current" style={{ color: rgb, opacity: 0.45 }} />
            <text x="100" y={y + 24} fontSize="9.4" className="fill-current text-foreground" fontWeight="800">{name} — {colour}</text>
            <text x="100" y={y + 42} fontSize="7.6" className="fill-current text-muted-foreground">pigments: {pig}</text>
            <text x="100" y={y + 58} fontSize="7.6" className="fill-current text-muted-foreground">stored food: {store}</text>
            <text x="560" y={y + 42} fontSize="7.6" className="fill-current" style={{ color: rgb }} fontWeight="700">{colour}</text>
          </g>
        );
      })}
      <rect x="30" y="274" width="660" height="18" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="287" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: all three have chlorophyll a — the accessory pigment decides the colour (fucoxanthin = brown, phycoerythrin = red).</text>
    </svg>
  );
}
