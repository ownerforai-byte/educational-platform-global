/** HIPPO drivers of biodiversity loss. Theme-aware. */
export function HippoDrivers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="HIPPO drivers of biodiversity loss habitat loss invasive species pollution human population and overexploitation with Nepal examples">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">HIPPO — the five drivers of biodiversity loss</text>
      {[
        { y: 50, l: "H", t: "HABITAT LOSS", s: "deforestation, farmland expansion, urbanisation", ex: "Terai forest conversion; roads through forests" },
        { y: 82, l: "I", t: "INVASIVE SPECIES", s: "alien species outcompete natives", ex: "Mikania micrantha smothers Chitwan; water hyacinth in lakes" },
        { y: 114, l: "P", t: "POLLUTION", s: "pesticides, sewage, industrial waste", ex: "pesticide residues in raptors; Kathmandu's rivers" },
        { y: 146, l: "P", t: "POPULATION (HUMAN)", s: "growing demand for land and resources", ex: "encroachment of protected areas" },
        { y: 178, l: "O", t: "OVEREXPLOITATION", s: "hunting and illegal trade", ex: "poaching of rhino and tiger; illegal logging" },
      ].map((r) => (
        <g key={r.t}>
          <circle cx="42" cy={r.y + 8} r="13" className="fill-current text-rose-500/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x="42" y={r.y + 12} fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{r.l}</text>
          <text x="66" y={r.y + 4} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{r.t}</text>
          <text x="66" y={r.y + 17} fontSize="7.2" className="fill-current text-muted-foreground">{r.s}</text>
          <text x="380" y={r.y + 11} fontSize="7.2" className="fill-current text-muted-foreground" fontStyle="italic">{r.ex}</text>
        </g>
      ))}
      <rect x="24" y="200" width="612" height="44" rx="10" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="40" y="218" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">Climate change compounds all five — shifting habitats faster than species can move.</text>
      <text x="40" y="236" fontSize="8" className="fill-current text-muted-foreground">Small populations then lose genetic diversity (genetic drift, inbreeding) — the extinction vortex.</text>
    </svg>
  );
}
