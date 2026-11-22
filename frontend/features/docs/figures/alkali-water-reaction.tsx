// AlkaliWaterReaction figure. Theme-aware.
export function AlkaliWaterReaction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Escalating reaction of alkali metals with water from lithium fizz to caesium explosion">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">2M + 2H₂O → 2MOH + H₂ — the escalation</text>
      {[
        ["Li", "steady fizz", 30], ["Na", "melts, skates, yellow flame", 155], ["K", "ignites instantly, lilac", 300],
        ["Rb", "explodes", 445], ["Cs", "explodes violently", 560],
      ].map(([m, act, x]) => (
        <g key={m as string}>
          <rect x={x as number} y="60" width="115" height="80" rx="8" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
          <text x={(x as number) + 57} y="86" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{m as string}</text>
          <text x={(x as number) + 57} y="108" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{act as string}</text>
          <text x={(x as number) + 57} y="126" fontSize="9" textAnchor="middle" fill="rgb(16 185 129)">MOH + H₂↑</text>
        </g>
      ))}
      <text x="330" y="170" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Products are the strongest bases in common chemistry; H₂ ignites from reaction heat</text>
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Escalation driver: ionisation energy falls 520 → 376 kJ/mol down the group</text>
    </svg>
  );
}
