/** Bipedal skeleton compare — ape vs human skeleton. Well-detailed. Theme-aware. */
export function BipedalSkeletonCompare({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Bipedal skeleton compare ape versus human foramen magnum spine curve pelvis bowl angled femur long arms knuckle walking">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Four bones that walk upright</text>
      {/* ape skeleton */}
      <rect x="30" y="44" width="330" height="200" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">APE — knuckle-walker</text>
      <circle cx="195" cy="94" r="13" className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <path d="M195 107 q-8 26 -6 52" className="stroke-current" strokeWidth="4" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.7)" }} />
      <path d="M189 159 l-14 52 M201 159 l16 50" className="stroke-current" strokeWidth="3" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.7)" }} />
      <path d="M190 122 l-34 48 M200 122 l36 46" className="stroke-current" strokeWidth="3" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.7)" }} />
      <text x="195" y="232" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">skull sits forward on spine; arms longer than legs</text>
      {/* human skeleton */}
      <rect x="390" y="44" width="300" height="200" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HUMAN — strider</text>
      <circle cx="540" cy="94" r="13" className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <path d="M540 107 q10 26 0 52" className="stroke-current" strokeWidth="4" strokeLinecap="round" style={{ color: "rgb(2 132 199 / 0.7)" }} />
      <path d="M540 159 l-16 52 M540 159 l18 50" className="stroke-current" strokeWidth="3" strokeLinecap="round" style={{ color: "rgb(2 132 199 / 0.7)" }} />
      <path d="M538 122 l-24 44 M542 122 l26 42" className="stroke-current" strokeWidth="3" strokeLinecap="round" style={{ color: "rgb(2 132 199 / 0.7)" }} />
      <text x="540" y="232" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">skull balances on spine; legs longer than arms</text>
      <rect x="30" y="252" width="660" height="40" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">foramen magnum underneath the skull • S-curved spine • bowl-shaped pelvis • femur angles inward to the knee.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: any two of those four features prove bipedalism from a fossil alone.</text>
    </svg>
  );
}
