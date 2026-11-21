/** Dichotomous key example — couplet decision path to identify a plant. Theme-aware. */
export function DichotomousKeyExample({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Dichotomous key example with paired couplets choosing between characters leading to species identification through decision path">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">A key in action — couplet by couplet</text>

      {[
        { y: 70, q: "1a. Leaves parallel-veined ……… go to 2", a: "1b. Leaves net-veined …………… go to 3" },
        { y: 130, q: "2a. Fruit is a caryopsis ……… MAIZE (grass family)", a: "2b. Fruit is a nut …………………" },
        { y: 190, q: "3a. Flower parts in 4s/5s ……… go to 4", a: "3b. Flower parts in 3s …………" },
        { y: 236, q: "4a. Fruit a legume ……………… PEA (Fabaceae)", a: "" },
      ].map((c, i) => (
        <g key={i}>
          <rect x="40" y={c.y - 16} width="580" height="30" rx="8" className="fill-current text-sky-500/8" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x="56" y={c.y + 4} fontSize="8.8" className="fill-current text-foreground">{c.q}</text>
          {c.a && <text x="340" y={c.y + 4} fontSize="8.8" className="fill-current text-muted-foreground">{c.a}</text>}
        </g>
      ))}
      <text x="16" y="40" fontSize="9" className="fill-current text-muted-foreground">Each couplet offers exactly two contrasting choices — pick the one that matches your specimen and follow its pointer.</text>
    </svg>
  );
}
