/** Homo habilis tools — Oldowan first stone tools. Well-detailed. Theme-aware. */
export function HomoHabilisTools({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Homo habilis tools Oldowan first stone tools handy man 2 million years brain 650 braincase stone flakes tool culture">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Homo habilis — the 'handy man' and the first toolkit</text>
      {/* Oldowan chopper */}
      <path d="M120 140 q-30 -34 10 -56 q40 -20 66 6 q20 26 -8 52 q-36 22 -68 -2" className="fill-current text-stone-500/30" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <path d="M132 128 l30 -18 M128 140 l36 -14" className="stroke-current" strokeWidth="1.4" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="165" y="176" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Oldowan chopper — struck core with sharp edge</text>
      {/* facts */}
      <rect x="300" y="44" width="390" height="200" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="495" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY HABILIS MATTERS</text>
      {[
        ["Age", "~2.4–1.4 million years"],
        ["Brain", "~650–750 cc — first big jump"],
        ["Hands", "precision grip confirmed by bone ends"],
        ["Tools", "stone flakes for cutting, scraping"],
        ["Diet", "meat and marrow added to plants"],
        ["Name", "'habilis' = handy — named for the tools"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="316" y={92 + i * 22} fontSize="7" className="fill-current text-sky-600" fontWeight="700">{k}</text>
          <text x="356" y={92 + i * 22} fontSize="7" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Tools and brain grew together: cutting meat fed the energy-hungry brain, and a better brain made better tools — a feedback loop.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: habilis = first stone tools + first brain expansion — two firsts in one species.</text>
    </svg>
  );
}
