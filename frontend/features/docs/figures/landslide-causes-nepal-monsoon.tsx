/** Landslide causes Nepal monsoon — the slope's failure modes. Well-detailed. Theme-aware. */
export function LandslideCausesNepalMonsoon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Landslide causes Nepal monsoon slope failure steep fragile geology deforestation road cutting unplanned construction overloading slope toe erosion river undercutting rainfall trigger saturation shallow debris flow deep seated landslide types loss life property GLOF interaction bioengineering vetiver bamboo planting drainage early warning warning signs cracking bulging">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Landslides — how a slope decides to fail</text>
      {/* causes */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CAUSES (WEAKENING)</text>
      {[
        "steep, young, fragile geology —",
        "  the Himalaya is still rising",
        "deforestation: roots no longer",
        "  bind the soil",
        "road cutting: slopes undercut",
        "  without retaining support —",
        "  the rural road boom's signature",
        "river undercutting removes the",
        "  slope's toe — its foundation",
        "monsoon rain is the trigger:",
        "  saturation adds weight and",
        "  cuts friction — most slides",
        "  fire in July–August nights",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* prevention */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PREVENTION AND WARNING</text>
      {[
        "drainage: water is the trigger —",
        "  divert it, drain it",
        "bioengineering: grasses (vetiver)",
        "  and bamboo root-mat the slope",
        "engineering: retaining walls,",
        "  toe support, slope flattening",
        "early signs: new cracks, bulging,",
        "  tilting trees, murky springs",
        "warning + evacuation saves more",
        "  lives than any wall — landslide",
        "  early warning systems are",
        "  spreading through hill districts",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four causes (geology, deforestation, cutting, undercutting) + monsoon as trigger + two preventions — the full-mark structure.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal's landslide deaths track its rural road boom — the hazard arrives with the development.</text>
    </svg>
  );
}
