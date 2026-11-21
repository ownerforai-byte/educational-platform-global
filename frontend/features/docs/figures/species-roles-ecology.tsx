/** Species ecological roles — flagship, umbrella, indicator, keystone. Theme-aware. */
export function SpeciesRolesEcology({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Four ecological roles of species flagship species anchor public appeal umbrella species shelter co-occurring species indicator species signal ecosystem condition keystone species maintain the system">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Four roles a species can play in conservation</text>

      {[
        { x: 105, t: "FLAGSHIP", s: "rhino, tiger, snow leopard —", s2: "anchor public appeal and funding", c: "rgb(234 88 12 / 0.9)" },
        { x: 255, t: "UMBRELLA", s: "protecting its large habitat", s2: "shelters co-occurring species", c: "rgb(22 163 74 / 0.9)" },
        { x: 405, t: "INDICATOR", s: "gharial for river health —", s2: "signals ecosystem condition", c: "rgb(14 165 233 / 0.9)" },
        { x: 555, t: "KEYSTONE", s: "elephants opening paths,", s2: "seed dispersers — maintain", s3: "the system", c: "rgb(124 58 237 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 66} y="52" width="132" height="106" rx="10" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="74" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="94" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="110" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          {n.s3 && <text x={n.x} y="126" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{n.s3}</text>}
        </g>
      ))}

      <rect x="40" y="176" width="580" height="40" rx="10" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="56" y="194" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">Cautionary counterpoint: gharial stays CR despite decades of captive release (wild recruitment is low);</text>
      <text x="56" y="210" fontSize="8.4" className="fill-current text-muted-foreground">the arna's gene pool is diluted by hybridisation — protection must also be genetically effective.</text>
    </svg>
  );
}
