/**
 * Levels of ecological organisation — organism → population → community →
 * ecosystem → biome → biosphere. Theme-aware via currentColor.
 */
export function EcologyOrganisationLevels({ className }: { className?: string }) {
  const levels = [
    { y: 60, t: "Organism", s: "one individual (a single frog)", c: "rgb(14 165 233 / 0.9)" },
    { y: 105, t: "Population", s: "all frogs of one species in a pond", c: "rgb(16 185 129 / 0.9)" },
    { y: 150, t: "Community", s: "frogs + insects + plants + microbes together", c: "rgb(245 158 11 / 0.9)" },
    { y: 195, t: "Ecosystem", s: "community + abiotic environment (pond)", c: "rgb(244 63 94 / 0.9)" },
    { y: 240, t: "Biome → Biosphere", s: "major climate zones → whole living Earth", c: "rgb(124 58 237 / 0.9)" },
  ];
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Hierarchy of ecological organisation from organism through population community and ecosystem to biome and biosphere">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ecology's ladder — levels of organisation</text>
      {levels.map((l, i) => (
        <g key={l.t}>
          <rect x="60" y={l.y - 16} width="420" height="30" rx="8" style={{ color: l.c }} className="fill-current opacity-12" strokeWidth="2" stroke="currentColor" />
          <text x="76" y={l.y + 4} fontSize="11" className="fill-current text-foreground" fontWeight="800">{l.t}</text>
          <text x="200" y={l.y + 4} fontSize="9.5" className="fill-current text-muted-foreground">{l.s}</text>
          {i < levels.length - 1 && <line x1="270" y1={l.y + 14} x2="270" y2={l.y + 25} strokeWidth="2" className="stroke-current text-muted-foreground" />}
        </g>
      ))}
      <text x="16" y="272" fontSize="10" className="fill-current text-muted-foreground">Ecology studies each rung: individuals adapt, populations grow, communities interact, ecosystems cycle energy and matter.</text>
    </svg>
  );
}
