/** Frog feeding mechanics — tongue flip capture sequence. Theme-aware. */
export function FrogFeedingMechanics({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Frog feeding sequence showing tongue flip prey capture and swallowing with eyes retracting to push food down">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">How a frog eats — the tongue flip, in three frames</text>

      {/* frame 1: spotting */}
      <g>
        <ellipse cx="110" cy="120" rx="56" ry="26" className="fill-current text-emerald-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <circle cx="150" cy="104" r="7" className="fill-current text-amber-400/70" />
        <circle cx="196" cy="86" r="5" className="fill-current text-sky-500/60" />
        <text x="110" y="170" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">① spot the insect</text>
        <text x="110" y="184" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">eyes judge distance</text>
      </g>

      {/* frame 2: tongue flip */}
      <g>
        <ellipse cx="330" cy="120" rx="56" ry="26" className="fill-current text-emerald-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <circle cx="370" cy="104" r="7" className="fill-current text-amber-400/70" />
        <path d="M372 118 q26 -34 44 -46" fill="none" strokeWidth="4" strokeLinecap="round" className="stroke-current text-rose-400" />
        <circle cx="418" cy="70" r="5" className="fill-current text-sky-500/60" />
        <text x="330" y="170" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">② tongue flips out (forked, sticky)</text>
        <text x="330" y="184" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">attached at the FRONT — flips backward-hitting</text>
      </g>

      {/* frame 3: swallow */}
      <g>
        <ellipse cx="550" cy="120" rx="56" ry="26" className="fill-current text-emerald-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <circle cx="590" cy="104" r="7" className="fill-current text-amber-400/70" />
        <path d="M560 128 q20 10 40 6" fill="none" strokeWidth="3" className="stroke-current text-rose-400" />
        <text x="550" y="170" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">③ swallowed whole</text>
        <text x="550" y="184" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">eyeballs retract to help push food down!</text>
      </g>

      <text x="16" y="220" fontSize="10" className="fill-current text-muted-foreground">No chewing — teeth only grip. Swallowing is helped by the retracted eyeballs pressing the bolus into the oesophagus (a NEB favourite fact).</text>
    </svg>
  );
}
