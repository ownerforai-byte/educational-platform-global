/** Man vs apes — key differences. Theme-aware. */
export function ManVsApes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Man versus apes key differences posture brain size face hands language and culture">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Man vs apes — the key differences</text>
      {[
        { y: 58, h: "BASIS", a: "Apes", b: "Man" },
        { y: 88, h: "Posture", a: "knuckle-walking, semi-erect", b: "fully erect, bipedal" },
        { y: 118, h: "Brain", a: "~400–500 cc", b: "~1350–1450 cc" },
        { y: 148, h: "Face", a: "prognathous muzzle, heavy brow", b: "flat face, small canines, chin" },
        { y: 178, h: "Hands", a: "long arms, knuckle support", b: "free hands, fully opposable thumb, precision grip" },
        { y: 208, h: "Language/Culture", a: "limited signals; minimal tool culture", b: "speech (Broca's area); cumulative culture" },
      ].map((r, i) => (
        <g key={r.h}>
          <rect x="30" y={r.y - 18} width="600" height="26" rx="6" className={i === 0 ? "fill-current text-foreground/5" : "fill-current text-muted-foreground/5"} />
          <text x="40" y={r.y} fontSize="7.8" className="fill-current text-foreground" fontWeight={i === 0 ? 800 : 700}>{r.h}</text>
          <text x="180" y={r.y} fontSize="7.4" className="fill-current text-muted-foreground">{r.a}</text>
          <text x="440" y={r.y} fontSize="7.4" className="fill-current text-muted-foreground">{r.b}</text>
        </g>
      ))}
      <text x="16" y="240" fontSize="8" className="fill-current text-muted-foreground">Distinguished not by separate creation but by a few decisive evolutionary acquisitions.</text>
    </svg>
  );
}
