/** Casein protein sources — where the amino acids come from. Well-detailed. Theme-aware. */
export function CaseinProteinSources({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Casein protein sources milk curd cheese paneer dairy amino acid profile complete protein biological value lentils legumes complementation plant sources comparison">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Protein sources — animal and plant compared</text>
      {/* sources */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">COMPLETE PROTEIN FOODS</text>
      {[
        "milk, curd, cheese, paneer:",
        "  casein and whey carry all nine",
        "  essential amino acids",
        "eggs, meat, fish: high biological",
        "  value, easily matched to",
        "  human needs",
        "soy is the plant exception —",
        "  nearly complete on its own",
        "most other plant foods lack one",
        "  or more essential amino acids",
        "  (usually lysine or methionine)",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* complementation */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PLANT SOLUTION</text>
      {[
        "dal + rice (or roti) together",
        "  fill each other's gaps:",
        "  pulses give lysine, cereals",
        "  give methionine",
        "this mutual completion is why",
        "  vegetarian diets work —",
        "  variety, not quantity",
        "protein-energy malnutrition",
        "  (kwashiorkor, marasmus) shows",
        "  what deficiency costs",
        "growing children need the",
        "  highest protein per kilogram",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: essential amino acids cannot be made by the body — the diet must supply all nine.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Dal-bhat is nutrition by complementation — a traditional answer backed by biochemistry.</text>
    </svg>
  );
}
