// SO2 use map. Theme-aware.
export function So2UseMap({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["H₂SO₄ feedstock", "contact process step 1", "rgb(59 130 246)"],
    ["food preservative E220", "dried fruit, wine, jam — antimicrobial + antioxidant", "rgb(16 185 129)"],
    ["bleaching", "delicate silk/wool (temporary)", "rgb(124 58 237)"],
    ["fumigant / refrigerant", "disinfection; old refrigeration cycles", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four uses of sulphur dioxide from sulphuric acid to food preservative">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">From the acid plant to the raisin packet</text>
      {uses.map(([u, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" style={{ fill: c }}>{u}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">E220 on a label is the same gas that roasts ore</text>
    </svg>
  );
}
