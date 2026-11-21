/** Chir pine belt — the subtropical specialist. Well-detailed. Theme-aware. */
export function ChirPineBelt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Chir pine Pinus roxburghii belt subtropical 1000 to 2000 metres needles cones resin fire prone slopes mid hills Nepal">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Chir pine — the mid-hill belt builder</text>

      {/* slope */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <path d="M50 240 L250 90 L450 240" className="fill-none stroke-current text-stone-500" strokeWidth="2.4" />
      <path d="M50 240 L250 90 L450 240 L450 250 L50 250" className="fill-current text-stone-500/15" />
      {[110, 160, 210, 260, 310, 360].map((x, i) => (
        <g key={i}>
          <path d={`M${x} ${216 - Math.abs(x - 250) * 0.28} v-26`} className="stroke-current text-amber-800" strokeWidth="2.6" style={{ color: "rgb(146 64 14 / 0.9)" }} />
          <circle cx={x} cy={186 - Math.abs(x - 250) * 0.28} r="9" className="fill-current text-emerald-600/45" />
        </g>
      ))}
      <text x="250" y="70" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">~1000–2000 m: the chir pine owns the dry south-facing slopes</text>
      <text x="60" y="262" fontSize="6.8" className="fill-current text-muted-foreground">long needle bundles in pairs/threes; woody cones; resin everywhere</text>

      {/* facts */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FIELD NOTES</text>
      {[
        "evergreen — needles all year",
        "resin tapped for turpentine",
        "needle litter makes soil acidic",
        "fire-prone: dry needles burn fast",
        "grass and oak replace it on",
        "  moister, shaded slopes",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="466" y="204" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">Where sal ends (heat), chir begins —</text>
      <text x="466" y="218" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">each species owns its altitude band.</text>
      <text x="466" y="244" fontSize="7" className="fill-current text-muted-foreground">Exam hook: give chir's altitude range</text>
      <text x="466" y="258" fontSize="7" className="fill-current text-muted-foreground">and one economic use (resin).</text>
    </svg>
  );
}
