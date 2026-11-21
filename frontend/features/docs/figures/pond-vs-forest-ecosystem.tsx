/**
 * Pond vs forest ecosystem — side-by-side structural and functional
 * comparison. Theme-aware via currentColor.
 */
export function PondVsForestEcosystem({ className }: { className?: string }) {
  const row = (y: string, feat: string, pond: string, forest: string, k: string) => (
    <g key={k}>
      <text x="16" y={y} fontSize="9.5" className="fill-current text-foreground" fontWeight="700">{feat}</text>
      <text x="300" y={y} fontSize="9" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300">{pond}</text>
      <text x="510" y={y} fontSize="9" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300">{forest}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Comparison table of pond and forest ecosystems across producers consumers decomposers nutrient cycling and stability">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two ecosystems, one blueprint — pond vs forest</text>

      <rect x="200" y="40" width="200" height="24" rx="7" className="fill-current text-sky-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="300" y="56" fontSize="10" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">POND (aquatic)</text>
      <rect x="410" y="40" width="200" height="24" rx="7" className="fill-current text-emerald-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="510" y="56" fontSize="10" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">FOREST (terrestrial)</text>

      {row("92", "Producers", "algae, Hydrilla, phytoplankton", "trees, shrubs, herbs", "r1")}
      {row("116", "Consumers", "zooplankton → fish → heron", "insects → deer → tiger", "r2")}
      {row("140", "Decomposers", "bottom bacteria, bloodworms", "soil fungi, earthworms, termites", "r3")}
      {row("164", "Medium", "water supports & disperses", "air & soil; gravity-supported", "r4")}
      {row("188", "Nutrient cycling", "fast, closed, in-water", "slow; litter layer stores nutrients", "r5")}
      {row("212", "Stratification", "littoral–limnetic–profundal", "canopy–understorey–floor", "r6")}
      {row("236", "Stability", "low — small changes upset it", "high — biomass buffers change", "r7")}

      <text x="16" y="272" fontSize="10" className="fill-current text-muted-foreground">Same functional groups, same energy rules — only the medium and the scale differ. Both need producers, consumers and decomposers to run.</text>
      <text x="16" y="290" fontSize="10" className="fill-current text-muted-foreground">NEB favourite: compare any two ecosystems on structure (who is there) and function (energy flow, cycling).</text>
    </svg>
  );
}
