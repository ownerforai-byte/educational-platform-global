// PumpImportancePanel figure. Theme-aware.
export function PumpImportancePanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Three things the sodium potassium pump maintains">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why the pump never clocks out</text>
      {[
        ["resting potential", "≈ −70 mV — nerves and muscles fire on it", "rgb(59 130 246)", 40, 55],
        ["cell volume", "osmotic balance — stops cells swelling", "rgb(16 185 129)", 340, 55],
        ["the Na⁺ gradient", "the battery that secondary transport spends", "rgb(245 158 11)", 40, 125],
        ["constant running", "ions leak back continuously; stop ATP → gradients collapse in minutes", "rgb(239 68 68)", 340, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 140} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">One of the body's largest ATP customers — the brain pays the biggest share</text>
    </svg>
  );
}
