// Halogen use map. Theme-aware.
export function HalogenUseMap({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["Cl₂", "water sterilisation, bleaching powder, PVC, HCl", "rgb(14 165 233)"],
    ["Br₂", "AgBr photographic film, fire retardants", "rgb(245 158 11)"],
    ["I₂", "tincture antiseptic, iodised salt, AgI cloud seeding", "rgb(124 58 237)"],
  ];
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Uses of chlorine bromine and iodine">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Three halogens, three industries</text>
      {uses.map(([x, u, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.13" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" style={{ fill: c }}>{x}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{u}</text>
        </g>
      ))}
      <text x="330" y="208" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">From drinking water to camera film to your salt shaker</text>
    </svg>
  );
}
