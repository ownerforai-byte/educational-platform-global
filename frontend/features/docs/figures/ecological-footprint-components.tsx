/** Ecological footprint components — what adds to your footprint. Well-detailed. Theme-aware. */
export function EcologicalFootprintComponents({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ecological footprint components breakdown carbon land food timber housing built up land grazing forest fishing grounds carbon energy largest share transport diet meat air travel clothing fast fashion electronics embodied water virtual comparison average person consumption categories bar shares personal audit">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Your footprint, itemised — what adds what</text>
      {/* components */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE SIX COMPONENTS (global hectares by category)</text>
      {[
        ["Carbon (energy)", "the largest slice — fossil fuel burning needs forest to absorb", 150],
        ["Food (cropland)", "what you eat, especially meat and dairy", 240],
        ["Housing (built-up land)", "the city block you occupy", 330],
        ["Timber + forest products", "paper, furniture, construction", 420],
        ["Grazing land", "livestock products", 500],
        ["Fishing grounds", "seafood consumption", 580],
      ].map(([name, detail, x], i) => {
        const y = 92 + i * 18;
        return (
          <g key={name as string}>
            <text x="46" y={y} fontSize="6.2" className="fill-current text-foreground" fontWeight="600">{name as string}</text>
            <text x="200" y={y} fontSize="5.8" className="fill-current text-muted-foreground">{detail as string}</text>
          </g>
        );
      })}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">carbon dominates rich-world footprints — typically over half the total, which is why energy policy is climate policy</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The hidden layers: embodied carbon in imports, virtual water in food — your footprint includes other countries' factories and farms.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name four footprint components and say which dominates — the carbon answer explains most of the gap between rich and poor footprints.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Diet is the lever most people underestimate — beef carries a footprint an order of magnitude above lentils.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">A personal footprint audit turns the abstract 'planet' into a shopping list you can actually change.</text>
    </svg>
  );
}
