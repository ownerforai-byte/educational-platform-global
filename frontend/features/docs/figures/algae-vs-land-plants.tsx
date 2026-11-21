/** Algae vs plants — what algae lack compared to land plants. Theme-aware. */
export function AlgaeVsLandPlants({ className }: { className?: string }) {
  const row = (y: number, f: string, a: string, b: string, k: string) => (
    <g key={k}>
      <text x="30" y={y} fontSize="8.5" className="fill-current text-muted-foreground">{f}</text>
      <text x="250" y={y} fontSize="8.5" textAnchor="middle" className="fill-current text-foreground">{a}</text>
      <text x="510" y={y} fontSize="8.5" textAnchor="middle" className="fill-current text-foreground">{b}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Algae versus land plants comparison across body tissues vascular tissue embryos roots and reproduction">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why algae are not plants — the gap that evolution closed</text>
      {row(56, "FEATURE", "ALGAE", "LAND PLANTS", "h")}
      <line x1="20" y1="64" x2="640" y2="64" strokeWidth="1.5" className="stroke-current text-muted-foreground" />
      {row(86, "body", "thallus, no tissues", "true roots, stems, leaves", "r1")}
      {row(110, "vascular tissue", "absent", "xylem + phloem", "r2")}
      {row(134, "embryo", "not retained", "embryo develops on parent", "r3")}
      {row(158, "reproductive organs", "single cells / naked gametes", "jacketed, multicellular", "r4")}
      {row(182, "life support", "water bathes every cell", "cuticle + stomata fight drying", "r5")}
      {row(206, "habitat", "water (fresh or marine)", "land, with water only for some", "r6")}
      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Bryophytes sit halfway: land-dwellers still needing water for fertilisation — the bridge between algae and the rest.</text>
    </svg>
  );
}
