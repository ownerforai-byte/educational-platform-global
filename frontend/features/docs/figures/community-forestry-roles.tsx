/** Community forestry CFUG roles. Theme-aware. */
export function CommunityForestryRoles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Community forestry Nepal's conservation success story government hands forest management to Community Forest User Groups CFUGs protection regeneration regulated sustainable use income reinvestment local stewardship equity women's participation 1993 Forest Act">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Community forestry — Nepal's success story (NEB 2024)</text>
      {[
        { y: 56, t: "1. Protection & regeneration", s: "local patrols end open access; degraded forests recover" },
        { y: 92, t: "2. Regulated sustainable use", s: "planned thinning, lopping, deadwood harvest" },
        { y: 128, t: "3. Income for reinvestment", s: "timber and NTFP sales fund schools, nurseries, plantations" },
        { y: 164, t: "4. Local stewardship", s: "communities monitor, plant, protect — enforcement cost drops" },
        { y: 200, t: "5. Equity & participation", s: "women's role in many CFUGs; most income stays local" },
      ].map((s) => (
        <g key={s.t}>
          <text x="30" y={s.y} fontSize="8" className="fill-current text-foreground" fontWeight="800">{s.t}</text>
          <text x="250" y={s.y} fontSize="7.2" className="fill-current text-muted-foreground">{s.s}</text>
        </g>
      ))}
      <text x="16" y="230" fontSize="8.4" className="fill-current text-muted-foreground">Definition: government hands management to local Community Forest User Groups (CFUGs) under an approved plan — 1993 Forest Act.</text>
    </svg>
  );
}
