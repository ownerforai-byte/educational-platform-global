/** Monkeys vs apes vs man comparison. Theme-aware. */
export function MonkeysApesMan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 290" className={className} role="img" aria-label="Monkeys versus apes versus man comparison tail size posture arms versus legs brain face locomotion tool use language and examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Monkeys vs apes vs man</text>
      {[
        { y: 56, h: "BASIS", a: "Monkeys", b: "Apes", c: "Man" },
        { y: 84, h: "Tail", a: "present", b: "absent", c: "absent" },
        { y: 112, h: "Posture", a: "horizontal, four-legged", b: "semi-erect, knuckle-walking", c: "fully erect bipedal" },
        { y: 140, h: "Arms vs legs", a: "roughly equal", b: "arms longer than legs", c: "legs longer than arms" },
        { y: 168, h: "Brain", a: "~100–200 cc", b: "400–500 cc (gorilla)", c: "~1350–1450 cc" },
        { y: 196, h: "Locomotion", a: "branch running/leaping", b: "brachiation, knuckle-walking", c: "striding bipedal gait" },
        { y: 224, h: "Language", a: "calls", b: "calls and gestures", c: "speech with grammar" },
        { y: 252, h: "Examples", a: "macaque, langur, spider", b: "gibbon (lesser); orangutan, gorilla, chimp", c: "Homo sapiens" },
      ].map((r, i) => (
        <g key={r.h}>
          <rect x="24" y={r.y - 18} width="612" height="24" rx="6" className={i === 0 ? "fill-current text-foreground/5" : "fill-current text-muted-foreground/5"} />
          <text x="34" y={r.y} fontSize="7.4" className="fill-current text-foreground" fontWeight={i === 0 ? 800 : 700}>{r.h}</text>
          <text x="170" y={r.y} fontSize="7" className="fill-current text-muted-foreground">{r.a}</text>
          <text x="350" y={r.y} fontSize="7" className="fill-current text-muted-foreground">{r.b}</text>
          <text x="545" y={r.y} fontSize="7" className="fill-current text-muted-foreground">{r.c}</text>
        </g>
      ))}
      <text x="16" y="280" fontSize="8" className="fill-current text-muted-foreground">Lesser apes: gibbon (Hylobatidae — small, brachiating, monogamous). Great apes: orangutan, gorilla, chimpanzee (Hominidae).</text>
    </svg>
  );
}
