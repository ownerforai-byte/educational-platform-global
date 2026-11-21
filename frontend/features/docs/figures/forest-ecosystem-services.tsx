/** Ecosystem services forests give. Theme-aware. */
export function ForestEcosystemServices({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Ecosystem services forests give provisioning timber fuelwood fodder medicine yarsagumba chiraito regulating water watershed flood control carbon storage supporting soil formation nutrient cycling cultural sacred groves trekking">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">What forests give — four service classes</text>
      {[
        { y: 58, t: "PROVISIONING", s: "timber, fuelwood, fodder, leaf litter, wild foods, medicinal herbs (yarsagumba, chiraito), fibre" },
        { y: 96, t: "REGULATING", s: "water regulation (watershed protection, spring recharge), flood and landslide control, carbon storage" },
        { y: 134, t: "SUPPORTING", s: "soil formation, nutrient cycling, habitat for biodiversity" },
        { y: 172, t: "CULTURAL", s: "sacred groves, trekking economies, aesthetic and religious value" },
      ].map((s) => (
        <g key={s.t}>
          <text x="30" y={s.y} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{s.t}</text>
          <text x="180" y={s.y} fontSize="7.2" className="fill-current text-muted-foreground">{s.s}</text>
        </g>
      ))}
      <text x="16" y="214" fontSize="8.6" className="fill-current text-muted-foreground">Vegetation shapes human life — and human life reshapes vegetation, mostly destructively.</text>
    </svg>
  );
}
