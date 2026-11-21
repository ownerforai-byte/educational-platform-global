/** Hydrophyte internal anatomy — air canals and thin cuticle. Well-detailed. Theme-aware. */
export function HydrophyteInternalAnatomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Hydrophyte internal anatomy aerenchyma air canals reduced xylem thin cuticle no stomata submerged leaf cross section water lily adaptation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Inside a hydrophyte leaf — built for buoyancy, not drought</text>

      {/* leaf cross-section */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="230" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LEAF CROSS-SECTION (submerged)</text>
      {/* thin epidermis */}
      <rect x="70" y="90" width="320" height="14" rx="4" className="fill-current text-emerald-500/30" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="230" y="118" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">thin cuticle — no need to hold water in</text>
      {/* aerenchyma chambers */}
      {[0, 1, 2, 3, 4].map((j) => (
        <rect key={j} x={90 + j * 58} y="130" width="40" height="34" rx="8" className="fill-none stroke-current text-sky-500" strokeWidth="2" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      ))}
      <text x="230" y="182" fontSize="7.2" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">aerenchyma — air canals for buoyancy + gas exchange</text>
      {/* reduced xylem */}
      {[0, 1].map((j) => (
        <circle key={j} cx={180 + j * 100} cy="210" r="7" className="fill-none stroke-current text-amber-600" strokeWidth="2" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      ))}
      <text x="230" y="236" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">xylem reduced — water is everywhere already</text>
      <text x="70" y="256" fontSize="6.8" className="fill-current text-muted-foreground">stomata absent on submerged leaves; roots serve mostly as holdfasts</text>

      {/* contrast card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT'S SWITCHED OFF</text>
      {[
        "thick cuticle — unnecessary",
        "stomata — no air to guard",
        "sclerenchyma — water supports",
        "  the body instead",
        "root hairs — absorption is",
        "  across the whole surface",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="466" y="204" fontSize="7" className="fill-current text-emerald-600">Everything that fights drought is</text>
      <text x="466" y="218" fontSize="7" className="fill-current text-emerald-600">dispensable under water.</text>
      <text x="466" y="244" fontSize="7" className="fill-current text-muted-foreground">Exam hook: aerenchyma is the</text>
      <text x="466" y="258" fontSize="7" className="fill-current text-muted-foreground">one-word answer for buoyancy.</text>
    </svg>
  );
}
