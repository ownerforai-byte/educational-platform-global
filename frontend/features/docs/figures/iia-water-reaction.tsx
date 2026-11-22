// IiaWaterReaction figure. Theme-aware.
export function IiaWaterReaction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Escalating reaction of alkaline earth metals with water and steam">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Water — the IIA escalation</text>
      {[
        ["Be", "no reaction — even steam refuses", "rgb(148 163 184)", 30],
        ["Mg", "slow cold; steam: Mg + H₂O → MgO + H₂", "rgb(59 130 246)", 185],
        ["Ca", "brisk cold: Ca + 2H₂O → Ca(OH)₂ + H₂↑", "rgb(245 158 11)", 340],
        ["Sr/Ba", "vigorous", "rgb(239 68 68)", 495],
      ].map(([m, act, col, x]) => (
        <g key={m as string}>
          <rect x={x as number} y="60" width="135" height="90" rx="10" fill={col as string} opacity="0.12" stroke={col as string} />
          <text x={(x as number) + 67} y="86" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{m as string}</text>
          <text x={(x as number) + 67} y="108" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{act as string}</text>
        </g>
      ))}
      <text x="330" y="180" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Mg(OH)₂ is insoluble — it coats the metal and quenches the reaction until steam strips it</text>
      <text x="330" y="204" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Ca(OH)₂ is moderately soluble — the surface stays clean and the fizz continues</text>
    </svg>
  );
}
