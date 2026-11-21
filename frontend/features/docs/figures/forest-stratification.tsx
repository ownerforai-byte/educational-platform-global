/**
 * Forest ecosystem — stratification layers (canopy to forest floor)
 * with characteristic life in each. Theme-aware via currentColor.
 */
export function ForestStratification({ className }: { className?: string }) {
  const layers = [
    { y: 70, t: "Emergent / canopy top", s: "eagles, sun-loving birds, epiphytes", c: "rgb(22 163 74 / 0.9)" },
    { y: 118, t: "Canopy", s: "monkeys, birds, most leaves — photosynthesis engine", c: "rgb(16 185 129 / 0.9)" },
    { y: 166, t: "Understorey", s: "shade-tolerant shrubs, lizards, insects", c: "rgb(132 204 22 / 0.9)" },
    { y: 214, t: "Herb / ground layer", s: "herbs, ferns, amphibians, rodents", c: "rgb(120 113 108 / 0.9)" },
    { y: 258, t: "Forest floor (litter)", s: "decomposers — fungi, earthworms, termites", c: "rgb(87 83 78 / 0.9)" },
  ];
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Forest stratification with emergent canopy understorey herb and forest floor layers and the organisms living in each layer">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">A forest, stacked — vertical stratification</text>
      {layers.map((l, i) => (
        <g key={l.t}>
          <rect x="50" y={l.y - 15} width="480" height="28" rx="7" style={{ color: l.c }} className="fill-current opacity-10" strokeWidth="2" stroke="currentColor" />
          <text x="64" y={l.y + 4} fontSize="10.5" className="fill-current text-foreground" fontWeight="800">{l.t}</text>
          <text x="260" y={l.y + 4} fontSize="9" className="fill-current text-muted-foreground">{l.s}</text>
          {i < layers.length - 1 && <line x1="290" y1={l.y + 13} x2="290" y2={l.y + 30} strokeWidth="2" className="stroke-current text-muted-foreground" />}
        </g>
      ))}
      <text x="16" y="292" fontSize="10" className="fill-current text-muted-foreground">Layering multiplies habitats: more storeys → more niches → higher biodiversity. Light intensity falls ~50% per layer — the floor lives on scraps.</text>
    </svg>
  );
}
