// Chemistry in food. Theme-aware.
export function FoodChemistryPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Chemistry in food preservatives flavour enhancers ripening and nutrition testing with examples">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Chemistry on the plate</text>
      {[
        ["Preservation", "salt, sugar, vinegar, benzoates slow spoilage", 30, 44],
        ["Ripening control", "ethylene gas ripens; cold storage slows it", 370, 44],
        ["Additives", "flavour enhancers, colourants, leavening (baking powder)", 30, 116],
        ["Nutrition testing", "iodine for starch, Biuret for protein — food tests are chemistry", 370, 116],
      ].map(([t, d, x, y]) => (
        <g key={String(t)}>
          <rect x={Number(x)} y={Number(y)} width="320" height="62" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.85)" }} />
          <text x={Number(x) + 16} y={Number(y) + 22} fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">{String(t)}</text>
          <text x={Number(x) + 16} y={Number(y) + 42} fontSize="7.8" className="fill-current text-muted-foreground">{String(d).slice(0, 46)}</text>
          <text x={Number(x) + 16} y={Number(y) + 54} fontSize="7.8" className="fill-current text-muted-foreground">{String(d).slice(46, 92)}</text>
        </g>
      ))}
      <rect x="30" y="188" width="660" height="16" rx="0" />
      <text x="360" y="202" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Adulteration detection (metanil yellow in turmeric, argemone in mustard oil) is applied analytical chemistry.</text>
    </svg>
  );
}
