/** Flora conservation strategies — in situ vs ex situ. Theme-aware. */
export function FloraConservationStrategies({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Flora conservation strategies in situ protected areas versus ex situ seed banks botanic gardens tissue culture">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Saving plants — two strategies</text>

      <rect x="20" y="56" width="300" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="170" y="82" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">IN SITU — protect where it grows</text>
      {["national parks & reserves", "conservation forests", "community forests", "protects whole ecosystems", "examples: Shivapuri, Kanchenjunga"].map((s, i) => (
        <text key={i} x="36" y={106 + i * 20} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      <rect x="340" y="56" width="300" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="490" y="82" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EX SITU — protect off-site</text>
      {["seed banks (dried, frozen)", "botanical gardens", "tissue culture labs", "cryopreservation of pollen", "example: Godawari garden"].map((s, i) => (
        <text key={i} x="356" y={106 + i * 20} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      <text x="16" y="228" fontSize="10" className="fill-current text-muted-foreground">Best practice uses both: a reserve keeps the species evolving in place; a seed bank is the insurance copy if the reserve fails.</text>
    </svg>
  );
}
