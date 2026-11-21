/** Prehensile tail demo — fifth hand. Well-detailed. Theme-aware. */
export function PrehensileTailDemo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Prehensile tail demo fifth hand spider monkey hanging New World monkeys grip hairless pad tail tip balance Old World never prehensile">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The tail as a fifth hand — New World only</text>
      {/* branch */}
      <path d="M40 90 q160 -18 320 0 q160 18 320 0" className="fill-none stroke-current" strokeWidth="8" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.7)" }} />
      {/* spider monkey hanging */}
      <circle cx="240" cy="120" r="16" className="fill-current text-amber-600/30" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      <path d="M240 136 q-6 24 -4 44" className="stroke-current" strokeWidth="9" strokeLinecap="round" style={{ color: "rgb(180 130 40 / 0.6)" }} />
      <path d="M236 180 l-12 40 M244 180 l14 38" className="stroke-current" strokeWidth="4.5" strokeLinecap="round" style={{ color: "rgb(180 130 40 / 0.6)" }} />
      <path d="M228 146 l-24 30 M252 146 l26 28" className="stroke-current" strokeWidth="4" strokeLinecap="round" style={{ color: "rgb(180 130 40 / 0.6)" }} />
      <path d="M236 220 q-6 30 10 44 q14 10 18 -6 q2 -12 -8 -14" className="fill-none stroke-current" strokeWidth="4.5" strokeLinecap="round" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      <text x="240" y="286" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">spider monkey hangs by its tail tip — a hairless friction pad grips like a fingerprint</text>
      {/* contrast */}
      <rect x="420" y="44" width="270" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="555" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NEW vs OLD WORLD TAILS</text>
      {[
        ["New World", "long, often prehensile,", "  tip bare and gripping"],
        ["Old World", "varied length but NEVER", "  prehensile — balance only"],
        ["Apes & man", "no tail at all — the", "  tailless grade"],
      ].map(([a, b, c], i) => (
        <g key={a}>
          <text x="436" y={96 + i * 54} fontSize="7.4" className="fill-current text-foreground" fontWeight="800">{a}</text>
          <text x="436" y={110 + i * 54} fontSize="6.8" className="fill-current text-muted-foreground">{b}</text>
          <text x="436" y={122 + i * 54} fontSize="6.8" className="fill-current text-muted-foreground">{c}</text>
        </g>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">A prehensile tail is the single most reliable field mark separating the two monkey lineages.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: prehensile = able to grasp — say 'fifth hand' and name the spider monkey.</text>
    </svg>
  );
}
