// Oxygen industrial use ledger. Theme-aware.
export function OxygenUseLedger({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["steelmaking (LD)", "burns C, S, P from pig iron", "rgb(59 130 246)"],
    ["oxy-acetylene welding", "flame ~3200 °C", "rgb(245 158 11)"],
    ["medicine", "therapy, anaesthesia, life support", "rgb(16 185 129)"],
    ["chemical processes", "contact (H₂SO₄), Ostwald (HNO₃)", "rgb(168 85 247)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four industrial uses of oxygen with brief explanations">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Where the oxygen goes</text>
      {uses.map(([u, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{u}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The gas of life is mostly consumed keeping bridges and cars standing</text>
    </svg>
  );
}
