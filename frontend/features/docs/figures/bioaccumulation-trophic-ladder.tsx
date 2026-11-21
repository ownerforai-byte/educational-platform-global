/** Bioaccumulation trophic ladder — the 10× climb. Well-detailed. Theme-aware. */
export function BioaccumulationTrophicLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Bioaccumulation trophic ladder DDT concentration water plankton small fish large fish fish eating bird eggshell thinning tenfold increase each level biomagnification fat soluble persistent">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Biomagnification — the tenfold climb</text>
      {/* ladder */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["Water", "trace — parts per trillion", 1, "rgb(2 132 199)"],
        ["Plankton", "absorbs from water", 10, "rgb(16 185 129)"],
        ["Small fish", "eats many plankton", 100, "rgb(217 119 6)"],
        ["Large fish", "eats many small fish", 1000, "rgb(217 119 6)"],
        ["Fish-eating bird", "eggshells thin; chicks fail", 10000, "rgb(244 63 94)"],
      ].map(([name, detail, mult, rgb], i) => {
        const y = 66 + i * 28;
        const w = 30 + i * 100;
        return (
          <g key={name as string}>
            <text x="46" y={y + 12} fontSize="6.6" className="fill-current text-foreground" fontWeight="700">{name as string}</text>
            <rect x="150" y={y} width={w} height="16" rx="8" className="fill-current" style={{ color: `${rgb as string} / 0.4` }} stroke="currentColor" strokeWidth="1.2" />
            <text x={(150 as number) + w + 8} y={y + 12} fontSize="6.2" className="fill-current" style={{ color: rgb as string }} fontWeight="700">×{mult as number}</text>
            <text x="470" y={y + 12} fontSize="5.8" className="fill-current text-muted-foreground">{detail as string}</text>
          </g>
        );
      })}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">each predator eats many prey — and keeps the accumulated load in fat, so concentration climbs ~10× per level</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why top predators suffer first: they sit at the top of a multiplication table they never chose to join.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Classic cases: DDT and eggshell thinning in falcons; mercury in tuna; PCBs in orcas.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: bioaccumulation = buildup in one organism; biomagnification = buildup up the food chain. Distinguish the terms.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Only persistent, fat-soluble poisons climb — sugars and salts wash out.</text>
    </svg>
  );
}
