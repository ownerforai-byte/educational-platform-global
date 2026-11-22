export function CrystalVsAmorphousOrder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Crystalline long-range order versus amorphous short-range order" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Order: Long Range vs Short Range</text>
      <g transform="translate(50, 45)">
        <rect width="210" height="130" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
        {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => (
          <circle key={`${r}${c}`} cx={40 + c * 44} cy={30 + r * 32} r="7" className="fill-current opacity-50" />
        )))}
        <text x="105" y="150" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">CRYSTALLINE</text>
      </g>
      <g transform="translate(300, 45)">
        <rect width="210" height="130" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
        {[[45, 35], [95, 30], [150, 42], [60, 75], [110, 70], [160, 80], [40, 110], [100, 105], [150, 112]].map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="7" className="fill-current opacity-50" />
        ))}
        <text x="105" y="150" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">AMORPHOUS</text>
      </g>
      <text x="280" y="200" textAnchor="middle" fontSize="10.5" className="fill-current opacity-75">Lattice: sharp melt, anisotropic, cleaves. Random: softens over a range, isotropic</text>
      <text x="280" y="220" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Quartz vs glass: same SiO2, different architecture</text>
    </svg>
  );
}
