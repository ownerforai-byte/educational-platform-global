/** Death cap warning — deadly lookalikes. Well-detailed. Theme-aware. */
export function MushroomDeathCapWarning({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Death cap warning Amanita phalloides deadly mushroom looks like edible paddy straw mushroom volva annulus white gills amatoxin liver failure symptoms delayed six hours no antidote rules never eat wild mushrooms unverified">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The death cap — why looks kill</text>

      {/* death cap drawing */}
      <rect x="30" y="44" width="320" height="170" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="190" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">AMANITA PHALLOIDES — deadly</text>
      <path d="M130 120 q60 -44 120 0 q-24 10 -60 10 q-36 0 -60 -10" className="fill-current text-stone-400/40" stroke="currentColor" strokeWidth="3" style={{ color: "rgb(168 162 158 / 0.9)" }} />
      <rect x="184" y="128" width="12" height="60" rx="5" className="fill-current text-stone-200/60" />
      <rect x="176" y="146" width="28" height="7" rx="3" className="fill-none stroke-current text-amber-600" strokeWidth="2" />
      <path d="M170 190 q20 16 40 0" className="fill-none stroke-current text-rose-500" strokeWidth="3" />
      <circle cx="190" cy="142" r="4" className="fill-current text-stone-100" />
      <text x="60" y="204" fontSize="7" className="fill-current text-muted-foreground">volva (base cup) · ring · white gills · greenish cap</text>

      {/* facts */}
      <rect x="370" y="44" width="320" height="170" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="530" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">AMATOXIN POISONING</text>
      {[
        "symptoms delayed 6–24 hours",
        "false recovery, then liver failure",
        "one cap can kill an adult",
        "no reliable antidote — transplant",
        "cooking does NOT destroy it",
      ].map((t, i) => (
        <text key={t} x="390" y={92 + i * 22} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* rules */}
      <rect x="30" y="228" width="660" height="58" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="250" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">FIELD RULES: never eat a wild mushroom without expert ID · dig up the base to check for a volva · colour, smell and folklore are unreliable.</text>
      <text x="50" y="270" fontSize="7.6" className="fill-current text-muted-foreground">It mimics edible paddy-straw mushrooms — the classic fatal mistake in South Asia.</text>
    </svg>
  );
}
