/** Hornwort structure — the horn-like sporophyte. Well-detailed. Theme-aware. */
export function HornwortStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Hornwort structure Anthoceros horn-like upright sporophyte grows from flat thallus rosette cells single chloroplast continuous growth damp shady">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Anthoceros — the hornwort's true horn</text>

      {/* thallus with horns */}
      <rect x="30" y="44" width="380" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="220" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DAMP SOIL / ROCK CREVICE</text>
      {/* flat rosette thallus */}
      <path d="M70 226 q60 -20 120 -6 q60 14 130 -8 q30 -6 60 8 L380 246 q-160 14 -310 0 Z" className="fill-current text-emerald-700/25" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(20 83 45 / 0.9)" }} />
      <text x="220" y="262" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">flat, simple thallus (gametophyte)</text>
      {/* horns */}
      {[[120, 222], [180, 216], [250, 218], [320, 222]].map(([x, y], i) => (
        <g key={x}>
          <path d={`M${x} ${y} q3 -50 -2 -96 q-2 -18 6 -18 q8 0 6 18 q-5 46 -2 96`} className="fill-current text-amber-700/35" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(146 64 14 / 0.9)" }} />
          <text x={x + 14} y={y - 60 - i * 4} fontSize="6.6" className="fill-current text-amber-700">horn {i + 1}</text>
        </g>
      ))}
      <text x="50" y="96" fontSize="7.2" className="fill-current text-amber-700" fontWeight="700">upright, needle-like sporophytes</text>

      {/* notes card */}
      <rect x="430" y="44" width="260" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="560" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HORNWORT SIGNATURES</text>
      {[
        "sporophyte looks like a horn",
        "grows from its base continuously",
        "unlike moss — capsule not one-shot",
        "cells often hold ONE chloroplast",
        "thallus has no scales or air chambers",
        "lives in damp, shady places",
      ].map((t, i) => (
        <text key={t} x="446" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="446" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: name = Anthoceros;</text>
      <text x="446" y="254" fontSize="7.2" className="fill-current text-muted-foreground">'horn' = the sporophyte; the flat</text>
      <text x="446" y="268" fontSize="7.2" className="fill-current text-muted-foreground">green mat = the gametophyte.</text>
    </svg>
  );
}
