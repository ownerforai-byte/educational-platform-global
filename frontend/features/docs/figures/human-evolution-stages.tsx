/** Stages of human evolution — Dryopithecus to Homo sapiens. Theme-aware. */
export function HumanEvolutionStages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Stages of human evolution Dryopithecus Ramapithecus Australopithecus Homo habilis Homo erectus Neanderthalensis and Homo sapiens with brain sizes and features">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Stages of human evolution (NEB 2024)</text>
      {[
        { y: 56, t: "Dryopithecus", s: "~20–14 mya — earliest ape-like ancestor, forest quadruped" },
        { y: 86, t: "Ramapithecus", s: "~14–10 mya — earliest proposed hominid, partly bipedal" },
        { y: 116, t: "Australopithecus", s: "~4–1 mya — first habitual bipeds; Lucy (A. afarensis, 3.2 mya); brain 450–500 cc" },
        { y: 146, t: "Homo habilis", s: "~2.4–1.4 mya — first stone tools (Oldowan); brain 650–750 cc" },
        { y: 176, t: "Homo erectus", s: "~1.8 mya–300 kya — Java man, Peking man; fire, hand-axes; brain 900–1100 cc" },
        { y: 206, t: "H. neanderthalensis", s: "~400–40 kya — brain ~1400 cc; Mousterian tools, burial of dead" },
        { y: 236, t: "Homo sapiens", s: "~300 kya–present — brain 1350–1450 cc; cave art, agriculture, civilisation" },
      ].map((s) => (
        <g key={s.t}>
          <text x="30" y={s.y} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{s.t}</text>
          <text x="200" y={s.y} fontSize="7" className="fill-current text-muted-foreground">{s.s}</text>
        </g>
      ))}
    </svg>
  );
}
