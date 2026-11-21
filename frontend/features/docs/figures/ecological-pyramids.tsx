/**
 * Ecological pyramids — three side-by-side pyramids: number, biomass,
 * energy (upright) with the inverted biomass pyramid of the sea.
 * Theme-aware via currentColor.
 */
export function EcologicalPyramids({ className }: { className?: string }) {
  const tier = (cx: number, y: number, w: number, c: string, label: string, k: string) => (
    <g key={k}>
      <rect x={cx - w / 2} y={y} width={w} height="22" rx="4" style={{ color: c }} className="fill-current opacity-25" strokeWidth="2" stroke="currentColor" />
      <text x={cx} y={y + 15} fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 320" className={className} role="img" aria-label="Three ecological pyramids of number biomass and energy each narrowing upward with producers at the base and top carnivores at the apex">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ecological pyramids — three ways to stack a community</text>

      {/* numbers */}
      <text x="110" y="52" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">of NUMBERS</text>
      {tier(110, 240, 170, "rgb(22 163 74 / 0.9)", "producers 150,000", "p1")}
      {tier(110, 212, 120, "rgb(14 165 233 / 0.9)", "herbivores 20,000", "p2")}
      {tier(110, 184, 80, "rgb(245 158 11 / 0.9)", "carnivores 500", "p3")}
      {tier(110, 156, 46, "rgb(244 63 94 / 0.9)", "top 5", "p4")}

      {/* biomass */}
      <text x="330" y="52" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">of BIOMASS</text>
      {tier(330, 240, 170, "rgb(22 163 74 / 0.9)", "producers 800 g/m²", "b1")}
      {tier(330, 212, 120, "rgb(14 165 233 / 0.9)", "herbivores 120", "b2")}
      {tier(330, 184, 80, "rgb(245 158 11 / 0.9)", "carnivores 20", "b3")}
      {tier(330, 156, 46, "rgb(244 63 94 / 0.9)", "top 2", "b4")}
      <text x="330" y="278" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">inverted in the ocean: plankton mass &lt; fish mass</text>

      {/* energy */}
      <text x="550" y="52" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">of ENERGY</text>
      {tier(550, 240, 170, "rgb(22 163 74 / 0.9)", "producers 20,000 kJ", "e1")}
      {tier(550, 212, 110, "rgb(14 165 233 / 0.9)", "herbivores 2,000", "e2")}
      {tier(550, 184, 70, "rgb(245 158 11 / 0.9)", "carnivores 200", "e3")}
      {tier(550, 156, 40, "rgb(244 63 94 / 0.9)", "top 20", "e4")}
      <text x="550" y="278" fontSize="8" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">ALWAYS upright — 10% law</text>

      <text x="16" y="306" fontSize="10" className="fill-current text-muted-foreground">The energy pyramid can never invert — energy is lost as heat at every step and cannot be recycled; biomass and numbers sometimes can.</text>
    </svg>
  );
}
