/** Four families comparison — Brassicaceae, Fabaceae, Solanaceae, Liliaceae table. Theme-aware. */
export function FamiliesComparisonTable({ className }: { className?: string }) {
  const row = (y: number, f: string, a: string, b: string, c: string, d: string, k: string) => (
    <g key={k}>
      <text x="24" y={y} fontSize="7.8" className="fill-current text-muted-foreground">{f}</text>
      <text x="180" y={y} fontSize="7.8" textAnchor="middle" className="fill-current text-foreground">{a}</text>
      <text x="330" y={y} fontSize="7.8" textAnchor="middle" className="fill-current text-foreground">{b}</text>
      <text x="480" y={y} fontSize="7.8" textAnchor="middle" className="fill-current text-foreground">{c}</text>
      <text x="610" y={y} fontSize="7.8" textAnchor="middle" className="fill-current text-foreground">{d}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Four angiosperm families compared brassicaceae fabaceae solanaceae liliaceae across flower symmetry merosity stamens carpels fruit and examples">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Four families at a glance</text>
      {row(48, "FEATURE", "BRASSICACEAE", "FABACEAE", "SOLANACEAE", "LILIACEAE", "h")}
      <line x1="16" y1="56" x2="644" y2="56" strokeWidth="1.5" className="stroke-current text-muted-foreground" />
      {row(76, "symmetry", "actinomorphic", "zygomorphic", "actinomorphic", "actinomorphic", "r1")}
      {row(96, "merosity", "4s / 5s (dicot)", "5s (dicot)", "5s (dicot)", "3s (monocot)", "r2")}
      {row(116, "petals", "4, cruciform", "5, papilionaceous", "5, fused rotate", "6 tepals", "r3")}
      {row(136, "stamens", "6 (2+4)", "10 (9)+1", "5, epipetalous", "6 (3+3)", "r4")}
      {row(156, "carpels", "2 (bicarpellary)", "1 (monocarpellary)", "2 (bicarpellary)", "3 (tricarpellary)", "r5")}
      {row(176, "fruit", "silique", "legume", "berry / capsule", "capsule", "r6")}
      {row(196, "placentation", "parietal", "marginal", "axile", "axile", "r7")}
      {row(216, "examples", "mustard, cabbage", "pea, bean", "potato, tomato", "onion, aloe", "r8")}
      <text x="16" y="244" fontSize="9" className="fill-current text-muted-foreground">Memorise the stamens line first — it separates all four families instantly: 2+4 vs (9)+1 vs 5 vs 3+3.</text>
      <text x="16" y="264" fontSize="9" className="fill-current text-muted-foreground">Liliaceae is the only monocot in the set — trimerous flowers and tepals give it away.</text>
    </svg>
  );
}
