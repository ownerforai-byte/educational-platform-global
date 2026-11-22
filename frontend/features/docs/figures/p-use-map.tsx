// Phosphorus use map. Theme-aware.
export function PUseMap({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["fertiliser", "superphosphate of lime", "rgb(16 185 129)"],
    ["matches", "red P striking surface", "rgb(239 68 68)"],
    ["rat poison / smoke screens", "white P (historical/military)", "rgb(148 163 184)"],
    ["organophosphates", "insecticides", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Uses of phosphorus in fertilisers matches pesticides and military applications">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Phosphorus at work</text>
      {uses.map(([u, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{u}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Feeds crops and kills pests — handle with respect</text>
    </svg>
  );
}
