/** Predation arms race — hunter and hunted evolve together. Well-detailed. Theme-aware. */
export function PredationArmsRace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Predation arms race predator prey adaptations camouflage mimicry speed warning colouration population oscillation lynx hare cycle">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Predation — the arms race (+/−)</text>

      {/* prey defences */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PREY DEFENCES</text>
      {/* camouflaged moth */}
      <path d="M80 110 q20 -10 40 0 q20 10 -8 14 q-26 4 -32 -14" className="fill-current text-stone-500/40" stroke="currentColor" strokeWidth="1.4" />
      <text x="100" y="142" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">camouflage (blends in)</text>
      {/* warning colours frog */}
      <ellipse cx="200" cy="118" rx="18" ry="12" className="fill-current text-amber-500/50" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <circle cx="192" cy="114" r="2.4" className="fill-current text-stone-800" />
      <circle cx="208" cy="114" r="2.4" className="fill-current text-stone-800" />
      <text x="200" y="142" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">warning colour (toxic)</text>
      {/* speed hare */}
      <path d="M290 112 q14 -8 26 0 q10 8 -4 12 q-16 4 -22 -4 q-4 -6 0 -8" className="fill-current text-stone-400/50" stroke="currentColor" strokeWidth="1.4" />
      <text x="300" y="142" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">speed and vigilance</text>
      {[
        "spines, shells and thorns — armour",
        "mimicry: harmless wears warning dress",
        "herding dilutes individual risk",
      ].map((t, i) => (
        <text key={t} x="50" y={170 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="50" y="240" fontSize="7" className="fill-current text-sky-600">Predators, in turn, sharpen eyes, claws</text>
      <text x="50" y="254" fontSize="7" className="fill-current text-sky-600">and ambush tactics — both keep evolving.</text>

      {/* oscillation panel */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">POPULATION PULSE</text>
      <path d="M420 220 q30 -60 60 -20 q30 40 60 -40 q30 -70 60 10 q20 50 50 30" className="fill-none stroke-current text-sky-500" strokeWidth="2.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <path d="M420 230 q30 -50 60 -14 q30 34 60 -30 q30 -60 60 6 q20 40 50 22" className="fill-none stroke-current text-rose-500" strokeWidth="2.4" style={{ color: "rgb(244 63 94 / 0.9)" }} strokeDasharray="5 3" />
      <text x="420" y="188" fontSize="6.8" className="fill-current text-sky-600">prey</text>
      <text x="420" y="204" fontSize="6.8" className="fill-current text-rose-500">predator (lags behind)</text>
      <text x="540" y="252" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">predator peaks trail prey peaks —</text>
      <text x="540" y="266" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">neither side ever wins outright.</text>
    </svg>
  );
}
