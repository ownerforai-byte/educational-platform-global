/** Early Earth conditions — reducing atmosphere, primordial soup. Theme-aware. */
export function EarlyEarthConditions({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Early Earth conditions reducing atmosphere of methane ammonia hydrogen and water vapour with UV radiation lightning and volcanic heat forming hot dilute soup primordial oceans">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Early Earth — the setting for life (~4.0–3.5 bya)</text>

      <circle cx="330" cy="130" r="80" className="fill-current text-stone-500/15" stroke="currentColor" strokeWidth="2.5" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <path d="M260 130 q70 -30 140 0" className="fill-none stroke-current text-sky-500" strokeWidth="3" />
      <text x="330" y="150" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">primordial soup (oceans)</text>

      {[
        { x: 130, t: "CH₄" }, { x: 175, t: "NH₃" }, { x: 480, t: "H₂" }, { x: 530, t: "H₂O" },
      ].map((g) => (
        <text key={g.t} x={g.x} y="40" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{g.t}</text>
      ))}

      <path d="M80 60 L110 90" strokeWidth="2" className="stroke-current text-amber-400" />
      <text x="60" y="55" fontSize="7.5" className="fill-current text-muted-foreground">UV rays</text>
      <path d="M540 60 L510 90" strokeWidth="2" className="stroke-current text-amber-400" />
      <text x="530" y="55" fontSize="7.5" className="fill-current text-muted-foreground">lightning</text>

      <rect x="40" y="200" width="580" height="24" rx="8" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="56" y="217" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">Reducing atmosphere: little or no free O₂ — organic molecules could accumulate for millions of years.</text>
    </svg>
  );
}
