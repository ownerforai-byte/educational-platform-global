/** Frog webbed feet physics — the swimming paddle. Well-detailed. Theme-aware. */
export function FrogWebbedFeetPhysics({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog webbed feet physics swimming paddle hind limbs longer thrust power stroke recovery stroke forelimbs four fingers landing cushion">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Webbed feet — the physics of the paddle</text>
      {/* power stroke */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">POWER STROKE</text>
      <path d="M100 150 L170 130 L230 150" className="fill-none stroke-current" strokeWidth="7" strokeLinecap="round" style={{ color: "rgb(2 132 199 / 0.8)" }} />
      <path d="M230 130 q50 -10 70 20 q-30 22 -70 0" className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <path d="M260 170 q40 20 70 6 m-10 -8 l10 8 l-12 6" className="fill-none stroke-current text-amber-600" strokeWidth="2" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="212" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">web spreads — maximum surface pushes water back</text>
      {/* recovery */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">RECOVERY STROKE</text>
      <path d="M450 150 L510 130 L560 150" className="fill-none stroke-current" strokeWidth="7" strokeLinecap="round" style={{ color: "rgb(16 185 129 / 0.8)" }} />
      <path d="M560 128 q40 6 50 24 q-30 10 -50 -6" className="fill-current text-emerald-500/15" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="540" y="212" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">web folds — the limb slips forward with little drag</text>
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Same principle as a duck's foot or a swimmer's hand: shape changes between push and recovery — no engine needed, just timing.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: hind limbs are longer and webbed (swimming + jumping); forelimbs have four fingers (landing, gripping).</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Hind limbs do both jobs — the frog's legs are its engines and its springs.</text>
    </svg>
  );
}
