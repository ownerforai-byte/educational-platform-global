/** Homo erectus fire — control of fire and migration. Well-detailed. Theme-aware. */
export function HomoErectusFire({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Homo erectus fire control cooking Java man Peking man migration out of Africa 1.8 million years brain 900 social evening campfire">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Homo erectus — fire, and the first long journey</text>
      {/* campfire */}
      <path d="M120 220 q-18 -34 8 -52 q4 16 14 18 q-2 -28 18 -40 q2 20 12 26 q14 -8 18 6 q10 24 -14 42 q-28 18 -56 0" className="fill-current text-amber-500/40" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <path d="M90 226 h70" className="stroke-current" strokeWidth="4" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="125" y="254" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">the first hearth — warmth, defence, cooking</text>
      {/* facts */}
      <rect x="260" y="44" width="430" height="200" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="475" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT ERECTUS CHANGED</text>
      {[
        ["Brain", "~900–1100 cc — halfway to us"],
        ["Posture", "fully modern striding walk"],
        ["Fire", "controlled use — the first technology"],
        ["Cooking", "softer food, more energy from it"],
        ["Migration", "out of Africa ~1.8 mya (Java, Peking man)"],
        ["Social life", "campfire evenings — talk around fire"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="276" y={92 + i * 22} fontSize="7" className="fill-current text-sky-600" fontWeight="700">{k}</text>
          <text x="316" y={92 + i * 22} fontSize="7" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Fire made evening social time possible — the campfire may be where language stretched its wings.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: erectus = fire + first to leave Africa — name Java man and Peking man as evidence.</text>
    </svg>
  );
}
