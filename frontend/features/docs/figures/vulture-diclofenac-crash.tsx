/** Vulture diclofenac crash — the drug that emptied the sky. Well-detailed. Theme-aware. */
export function VultureDiclofenacCrash({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Vulture diclofenac crash veterinary drug cattle carcass renal failure kidney 99 percent decline white rumped meloxicam safe alternative vulture restaurant feeding stations Parsa breeding Nepal India Pakistan catastrophe ecosystem service carcass disposal">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The diclofenac crash — a drug that emptied the sky</text>
      {/* mechanism */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE MECHANISM</text>
      {[
        "diclofenac: a cheap painkiller",
        "  given to cattle across South Asia",
        "vultures scavenge treated",
        "  carcasses — the drug causes",
        "  fatal kidney (renal) failure",
        "white-rumped vultures fell",
        "  >99% — one of the fastest",
        "  declines ever recorded",
        "the carcass crisis followed:",
        "  feral dogs exploded, rabies",
        "  risk rose, disposal costs grew",
        "the fix: meloxicam, a vulture-",
        "  safe alternative, banned-in",
        "  and vulture restaurants",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* recovery */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NEPAL'S RECOVERY WORK</text>
      {[
        "vulture restaurants: safe,",
        "  drug-free carcass feeding",
        "  stations",
        "diclofenac banned for veterinary",
        "  use; meloxicam promoted",
        "Parsa and other sites run captive",
        "  breeding and release",
        "Nepal declared its first vulture",
        "  safe zones — pharmacies",
        "  pledge drug-free carcasses",
        "slow but real: vultures live long",
        "  and breed late, so recovery",
        "  takes decades",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">
        Exam hook: diclofenac → renal failure in vultures → {'>'}99% decline — name drug, organ, magnitude.
      </text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Vultures were a free carcass-disposal service — losing them cost public health, not just biodiversity.</text>
    </svg>
  );
}
