/**
 * Hydrophyte vs xerophyte — side-by-side contrast of the two
 * adaptation strategies. Theme-aware via currentColor.
 */
export function HydrophyteVsXerophyte({ className }: { className?: string }) {
  const row = (y: number, feat: string, hyd: string, xer: string, k: string) => (
    <g key={k}>
      <text x="16" y={y} fontSize="9.5" className="fill-current text-foreground" fontWeight="700">{feat}</text>
      <text x="290" y={y} fontSize="9" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300">{hyd}</text>
      <text x="510" y={y} fontSize="9" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300">{xer}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Comparison table of hydrophyte and xerophyte adaptations across cuticle stomata roots leaves support tissue and internal air spaces">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two strategies, one problem — water balance</text>

      <rect x="190" y="40" width="200" height="24" rx="7" className="fill-current text-sky-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="290" y="56" fontSize="10" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">HYDROPHYTE (water plenty)</text>
      <rect x="410" y="40" width="200" height="24" rx="7" className="fill-current text-emerald-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="510" y="56" fontSize="10" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">XEROPHYTE (water scarce)</text>

      {row(96, "Cuticle", "absent / very thin", "very thick, waxy", "r1")}
      {row(120, "Stomata", "none (submerged) or on top", "sunken, few, open at night", "r2")}
      {row(144, "Leaves", "large, thin, ribbon-like", "reduced to spines / needles", "r3")}
      {row(168, "Roots", "reduced or absent", "extensive, deep + wide", "r4")}
      {row(192, "Support tissue", "reduced — water supports", "well developed mechanical", "r5")}
      {row(216, "Air spaces", "aerenchyma everywhere", "none — compact tissue", "r6")}
      {row(240, "Water loss", "unlimited, freely", "minimised at all costs", "r7")}

      <text x="16" y="272" fontSize="10" className="fill-current text-muted-foreground">Mirror images: the hydrophyte fights excess water and gas exchange; the xerophyte fights loss. Every row flips.</text>
      <text x="16" y="290" fontSize="10" className="fill-current text-muted-foreground">NEB classic: "Give four xerophytic characters" — quote cuticle, spines, CAM, deep roots with one example each.</text>
    </svg>
  );
}
