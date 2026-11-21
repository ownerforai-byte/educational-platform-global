/** Human activities that damage vegetation. Theme-aware. */
export function VegetationDamageActivities({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Human activities that damage vegetation deforestation agriculture settlements slash and burn khoriya overgrazing fuelwood harvest illegal logging road building fire shifting cultivation invasive species Mikania lantana water hyacinth">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Human activities that damage vegetation</text>
      {[
        { y: 56, t: "DEFORESTATION", s: "agriculture, settlement, slash-and-burn (khoriya) → habitat loss" },
        { y: 92, t: "OVERGRAZING", s: "livestock pressure → regeneration failure, soil erosion" },
        { y: 128, t: "FUELWOOD HARVEST", s: "most rural energy still from wood → thinning, lopping" },
        { y: 164, t: "ILLEGAL LOGGING", s: "selective felling of sal, khair → degraded stand structure" },
        { y: 200, t: "ROADS / FIRE / INVASIVES", s: "slope cuts and landslides; burning kills seedlings; Mikania, lantana, water hyacinth" },
      ].map((s) => (
        <g key={s.t}>
          <text x="30" y={s.y} fontSize="8" className="fill-current text-foreground" fontWeight="800">{s.t}</text>
          <text x="230" y={s.y} fontSize="7.2" className="fill-current text-muted-foreground">{s.s}</text>
        </g>
      ))}
      <text x="16" y="244" fontSize="8.4" className="fill-current text-muted-foreground">NEB 2024: major deforestation causes — agriculture expansion, fuelwood, logging, overgrazing, infrastructure, fire.</text>
    </svg>
  );
}
