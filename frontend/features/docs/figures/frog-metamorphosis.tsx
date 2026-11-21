/** Frog metamorphosis — egg → tadpole stages → froglet → adult with gills-to-lungs switch. Theme-aware. */
export function FrogMetamorphosis({ className }: { className?: string }) {
  const stages = [
    { x: 70, t: "Egg (jelly)", s: "clustered in water", c: "rgb(120 113 108 / 0.9)" },
    { x: 200, t: "Early tadpole", s: "external gills, no limbs", c: "rgb(14 165 233 / 0.9)" },
    { x: 330, t: "Tadpole", s: "internal gills, tail, herbivore", c: "rgb(16 185 129 / 0.9)" },
    { x: 460, t: "Froglet", s: "hind then fore limbs; tail absorbed", c: "rgb(245 158 11 / 0.9)" },
    { x: 590, t: "Adult frog", s: "lungs + skin, carnivore", c: "rgb(22 163 74 / 0.9)" },
  ];
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Frog metamorphosis from jelly egg through tadpole stages with gills and tail to froglet with limbs to adult frog with lungs">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Metamorphosis — a water animal becomes a land animal</text>
      {stages.map((st, i) => (
        <g key={st.t}>
          <rect x={st.x - 48} y="70" width="96" height="70" rx="10" style={{ color: st.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={st.x} y="100" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{st.t}</text>
          <text x={st.x} y="118" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{st.s}</text>
          {i < 4 && <line x1={st.x + 50} y1="105" x2={st.x + 78} y2="105" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}

      {/* what changes */}
      <text x="16" y="176" fontSize="10.5" className="fill-current text-foreground" fontWeight="800">The transformation checklist:</text>
      <text x="16" y="196" fontSize="9.5" className="fill-current text-muted-foreground">gills → lungs · tail → absorbed · herbivore gut → carnivore gut · lateral line → eyelids & tympanum</text>
      <text x="16" y="216" fontSize="9.5" className="fill-current text-muted-foreground">driven by the hormone thyroxine from the thyroid — iodine is required (a classic NEB fact).</text>
      <text x="16" y="236" fontSize="0">.</text>
    </svg>
  );
}
