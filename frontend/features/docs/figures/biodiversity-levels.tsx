/** Three levels of biodiversity — genetic, species, ecosystem. Theme-aware. */
export function BiodiversityLevels({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Three levels of biodiversity genetic diversity within populations species diversity in a region and ecosystem diversity across habitats with Nepal examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Biodiversity — three nested levels</text>

      {[
        { x: 110, t: "GENETIC", s: "variation of genes within", s2: "a species or population", ex: "rice landraces: Jumli marshi,", ex2: "Pokhreli masino", c: "rgb(124 58 237 / 0.9)" },
        { x: 330, t: "SPECIES", s: "variety of species in a region", s2: "ecosystem function, resilience,", s3: "national heritage", ex: "Nepal: ~208 mammals,", ex2: "~900 birds, ~6,500 flowering plants", c: "rgb(22 163 74 / 0.9)" },
        { x: 550, t: "ECOSYSTEM", s: "variety of habitats, communities", s2: "and ecological processes —", s3: "the service provider", ex: "Terai sal forests, alpine", ex2: "meadows, wetlands", c: "rgb(14 165 233 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 88} y="56" width="176" height="128" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="78" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="98" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="114" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          {n.s3 && <text x={n.x} y="130" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s3}</text>}
          <text x={n.x} y={n.s3 ? 156 : 148} fontSize="6.9" textAnchor="middle" className="fill-current text-foreground" fontStyle="italic">{n.ex}</text>
          <text x={n.x} y={n.s3 ? 170 : 162} fontSize="6.9" textAnchor="middle" className="fill-current text-foreground" fontStyle="italic">{n.ex2}</text>
        </g>
      ))}

      <rect x="40" y="200" width="580" height="28" rx="9" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="56" y="219" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">The chain rule: losing genes weakens species; losing species weakens ecosystems.</text>
    </svg>
  );
}
