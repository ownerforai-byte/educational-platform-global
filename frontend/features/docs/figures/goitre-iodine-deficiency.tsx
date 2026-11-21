/** Goitre iodine deficiency — the neck swelling solved by salt. Well-detailed. Theme-aware. */
export function GoitreIodineDeficiency({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Goitre iodine deficiency thyroid enlargement neck swelling cretinism mental retardation Himalaya goitre belt soil leached iodine iodised salt two child IDD universal salt iodisation control programme Nepal success cretinism prevention pregnancy requirement thyroxine hormone">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Iodine deficiency — the neck swelling salt solved</text>
      {/* why Himalaya */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY THE HIMALAYA</text>
      {[
        "glaciers and monsoon rains",
        "  leached iodine from mountain",
        "  soils millennia ago — the",
        "  'goitre belt' runs the length",
        "  of the Himalaya",
        "the thyroid needs iodine to",
        "  make thyroxine; without it the",
        "  gland swells — a goitre",
        "the deeper cost: in pregnancy,",
        "  deficiency causes cretinism —",
        "  permanent intellectual",
        "  disability",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* solution */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE SOLUTION</text>
      {[
        "iodised salt: a few rupees of",
        "  fortification prevents goitre,",
        "  cretinism and lowered IQ —",
        "  among the cheapest public-",
        "  health wins ever",
        "Nepal's programme reached near-",
        "  universal household coverage;",
        "  two-child salt packets carry",
        "  the logo",
        "the catch: iodine evaporates",
        "  from open salt containers —",
        "  storage matters",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: leached Himalayan soil → goitre; pregnancy deficiency → cretinism; iodised salt prevents both — the causal chain.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A pinch of fortification in salt undid a geological accident written across whole mountain ranges.</text>
    </svg>
  );
}
