/** Gibbon brachiation — arm-swinging locomotion. Well-detailed. Theme-aware. */
export function GibbonBrachiation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Gibbon brachiation arm swinging lesser ape Hylobatidae long arms hook hands monogamous pairs duet songs canopy travel">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Gibbon — the brachiation specialist</text>
      {/* canopy branches */}
      <path d="M40 70 q160 -14 320 0 q160 14 320 0" className="fill-none stroke-current" strokeWidth="7" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.7)" }} />
      <path d="M120 150 q100 -10 200 0" className="fill-none stroke-current" strokeWidth="6" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.6)" }} />
      <path d="M400 130 q110 -12 220 0" className="fill-none stroke-current" strokeWidth="6" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.6)" }} />
      {/* gibbon swinging */}
      <circle cx="300" cy="108" r="13" className="fill-current text-amber-600/30" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      <path d="M300 121 q-4 18 -2 34" className="stroke-current" strokeWidth="7" strokeLinecap="round" style={{ color: "rgb(180 130 40 / 0.6)" }} />
      <path d="M298 155 l-8 30 M304 155 l10 28" className="stroke-current" strokeWidth="3.4" strokeLinecap="round" style={{ color: "rgb(180 130 40 / 0.6)" }} />
      <path d="M288 118 q-40 20 -60 44 M312 118 q44 16 66 36" className="stroke-current" strokeWidth="3.6" strokeLinecap="round" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      <text x="300" y="220" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">hands hook over branches — no grip strength needed, just a hook</text>
      {/* facts */}
      <rect x="440" y="44" width="250" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="565" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GIBBON FACT CARD</text>
      {[
        ["Family", "Hylobatidae — the lesser ape"],
        ["Size", "smallest ape, ~5–7 kg"],
        ["Arms", "very long relative to body"],
        ["Locomotion", "brachiation — fastest in canopy"],
        ["Social life", "monogamous pairs, duet songs"],
        ["Range", "SE Asian forests"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="456" y={92 + i * 26} fontSize="7" className="fill-current text-sky-600" fontWeight="700">{k}</text>
          <text x="504" y={92 + i * 26} fontSize="7" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Brachiation = travelling by arm-swinging — the gibbon's signature and the ape body plan's starting point.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: gibbon = lesser ape, monogamous, duets — versus the great apes on every point.</text>
    </svg>
  );
}
