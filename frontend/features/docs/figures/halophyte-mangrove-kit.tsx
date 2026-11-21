/** Halophyte mangrove kit — life in salt water. Well-detailed. Theme-aware. */
export function HalophyteMangroveKit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Halophyte mangrove adaptations salt glands breathing roots pneumatophores viviparous seedlings salt exclusion coastal swamp adaptation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Halophytes — the mangrove survival kit</text>

      {/* mangrove scene */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      {/* water */}
      <rect x="50" y="160" width="360" height="90" rx="8" className="fill-current text-sky-400/20" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="180" fontSize="6.4" className="fill-current text-sky-700">salty tidal water</text>
      {/* tree */}
      <path d="M150 160 v-70 M150 110 q-24 -8 -40 -22 M150 110 q24 -8 40 -22" className="stroke-current text-amber-800" strokeWidth="3" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      <circle cx="110" cy="82" r="14" className="fill-current text-emerald-600/40" />
      <circle cx="190" cy="82" r="14" className="fill-current text-emerald-600/40" />
      <circle cx="150" cy="70" r="16" className="fill-current text-emerald-600/40" />
      {/* pneumatophores */}
      {[80, 110, 140, 170, 200, 230].map((x, i) => (
        <path key={i} d={`M${x} 250 q4 -22 8 -36`} className="stroke-current text-stone-600" strokeWidth="3" />
      ))}
      <text x="156" y="268" fontSize="6.8" className="fill-current text-muted-foreground">pneumatophores — breathing roots above the mud</text>
      {/* salt glands */}
      <text x="290" y="120" fontSize="6.8" className="fill-current text-sky-700">salt excreted on leaves,</text>
      <text x="290" y="134" fontSize="6.8" className="fill-current text-sky-700">washed off by tide</text>
      {/* vivipary */}
      <path d="M110 96 q-2 30 6 44" className="stroke-current text-lime-600" strokeWidth="2.4" strokeDasharray="4 3" />
      <text x="60" y="152" fontSize="6.8" className="fill-current text-lime-700">seedling sprouts on the tree</text>

      {/* kit list */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FOUR TOOLS</text>
      {[
        "salt glands excrete crystals",
        "membranes filter salt at the root",
        "pneumatophores breathe in mud",
        "vivipary: seedlings plant",
        "  themselves on falling",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="466" y="196" fontSize="7" className="fill-current text-emerald-600">Salt is the enemy; every tool</text>
      <text x="466" y="210" fontSize="7" className="fill-current text-emerald-600">answers one part of the salt problem.</text>
      <text x="466" y="236" fontSize="7" className="fill-current text-muted-foreground">Exam hook: name two mangrove</text>
      <text x="466" y="250" fontSize="7" className="fill-current text-muted-foreground">adaptations and what each solves.</text>
    </svg>
  );
}
