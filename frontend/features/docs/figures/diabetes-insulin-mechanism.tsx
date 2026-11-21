/** Diabetes insulin mechanism — the key and the lock. Well-detailed. Theme-aware. */
export function DiabetesInsulinMechanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Diabetes insulin mechanism key lock analogy glucose uptake cell receptors Type 1 autoimmune beta cell destruction no insulin juvenile onset insulin dependent Type 2 resistance cells ignore insulin obesity associated adult onset oral drugs metformin lifestyle progression complications retinopathy nephropathy neuropathy foot ulcer cardiovascular HbA1c monitoring testing diagnosis fasting levels Nepal prevalence rising urban">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Diabetes — the key-and-lock failure, two ways</text>
      {/* mechanism */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE MECHANISM</text>
      {[
        "insulin is the key; the cell's",
        "  receptor is the lock — glucose",
        "  enters only when the key turns",
        "Type 1: the immune system",
        "  destroys the beta cells that",
        "  make the key — no insulin, so",
        "  injections are life support",
        "Type 2: the key exists but the",
        "  lock resists — obesity and",
        "  inactivity drive the resistance",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* comparison + complications */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">COMPARE AND COMPLICATE</text>
      {[
        "Type 1: young onset, thin",
        "  patients, insulin mandatory",
        "Type 2: adult onset, weight-",
        "  linked, managed first with",
        "  diet + metformin; insulin late",
        "complications (shared): retina",
        "  (blindness), kidney (dialysis),",
        "  nerves (foot ulcers), vessels",
        "  (heart attack, stroke)",
        "monitoring: HbA1c reads the",
        "  three-month average — the",
        "  number that tracks control",
        "Nepal: prevalence climbing with",
        "  urbanisation — a quiet epidemic",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: insulin = key, receptor = lock; Type 1 = no key, Type 2 = rusty lock — the analogy plus two contrasts.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The complications share one cause: sugar-soaked blood slowly glazes the small vessels — control is prevention.</text>
    </svg>
  );
}
