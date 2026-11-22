// Boiling point anomaly chart: hydrides with and without hydrogen bonding. Theme-aware.
export function BpAnomalyChart({ className }: { className?: string }) {
  const pairs: [string, number, string, number, string][] = [
    ["H2O", 100, "H2S", -60, "hydrogen bonds"],
    ["HF", 19.5, "HCl", -85, "hydrogen bonds"],
    ["NH3", -33, "PH3", -87.7, "hydrogen bonds"],
  ];
  return (
    <svg viewBox="0 0 700 300" className={className} role="img" aria-label="Boiling point anomaly chart comparing water hydrogen fluoride and ammonia with their group neighbours hydrogen sulphide hydrogen chloride and phosphine">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The hydrogen-bond signature in boiling points</text>
      <line x1="80" y1="220" x2="660" y2="220" stroke="currentColor" strokeWidth="1.5" />
      {pairs.map(([a, bpa, b, bpb], i) => {
        const ha = ((bpa + 100) / 200) * 150;
        const hb = ((bpb + 100) / 200) * 150;
        return (
          <g key={i}>
            <rect x={110 + i * 190} y={220 - ha} width="55" height={ha} className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.3" />
            <text x={137 + i * 190} y={212 - ha} fontSize="10.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{bpa}</text>
            <text x={137 + i * 190} y="240" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{a}</text>
            <rect x={180 + i * 190} y={220 - hb} width="55" height={hb} className="fill-current" style={{ color: "rgb(139 92 246)" }} opacity="0.3" />
            <text x={207 + i * 190} y={212 - hb} fontSize="10.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{bpb}</text>
            <text x={207 + i * 190} y="240" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{b}</text>
          </g>
        );
      })}
      <text x="350" y="272" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">green bars hydrogen-bond, purple bars do not - gaps of 55 to 160 degrees Celsius</text>
    </svg>
  );
}
