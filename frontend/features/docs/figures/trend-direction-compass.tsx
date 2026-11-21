// Trend direction compass for six properties. Theme-aware.
export function TrendDirectionCompass({ className }: { className?: string }) {
  const props: [string, string][] = [
    ["Atomic radius", "↓ across · ↑ down"],
    ["Ionisation energy", "↑ across · ↓ down"],
    ["Electron affinity", "↑ across · ↓ down"],
    ["Electronegativity", "↑ across · ↓ down"],
    ["Metallic character", "↓ across · ↑ down"],
    ["Shielding (σ)", "~ across · ↑ down"],
  ];
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Trend direction compass six periodic properties atomic radius ionisation energy electron affinity electronegativity metallic character shielding with direction across period and down group">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Six properties, two directions — learn the compass once</text>
      {props.map(([name, dir], i) => (
        <g key={name}>
          <rect x={30 + (i % 2) * 340} y={44 + Math.floor(i / 2) * 52} width="320" height="44" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x={46 + (i % 2) * 340} y={64 + Math.floor(i / 2) * 52} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{name}</text>
          <text x={46 + (i % 2) * 340} y={80 + Math.floor(i / 2) * 52} fontSize="8.4" className="fill-current text-sky-600" fontWeight="700">{dir}</text>
        </g>
      ))}
      <rect x="30" y="208" width="660" height="24" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="224" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Everything traces back to Z_eff: radius is its mirror image; IE, EA and EN are its echo; metallic character is anti-IE.</text>
    </svg>
  );
}
