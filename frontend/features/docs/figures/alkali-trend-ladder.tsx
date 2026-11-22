// AlkaliTrendLadder figure. Theme-aware.
export function AlkaliTrendLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Trends down group one with ionisation energies falling and reactivity rising">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Down the group: everything loosens</text>
      {[
        ["Li", "520 kJ/mol", 0.85],
        ["Na", "496", 0.72],
        ["K", "419", 0.58],
        ["Rb", "403", 0.45],
        ["Cs", "376", 0.32],
      ].map(([m, ie, w]) => (
        <g key={m as string}>
          <text x="60" y={0} />
          <rect x="70" y="0" width="0" height="0" />
        </g>
      ))}
      {[
        ["Li", "520 kJ/mol", 0.85], ["Na", "496", 0.72], ["K", "419", 0.58], ["Rb", "403", 0.45], ["Cs", "376", 0.32],
      ].map(([m, ie, w], i) => (
        <g key={"r" + i}>
          <text x="60" y={58 + i * 26} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{m as string}</text>
          <rect x="100" y={46 + i * 26} width={(w as number) * 260} height="14" rx="4" fill="rgb(59 130 246)" opacity="0.55" />
          <text x={110 + (w as number) * 260} y={58 + i * 26} fontSize="9.5" fill="rgb(59 130 246)">{ie as string}</text>
        </g>
      ))}
      <text x="450" y="70" fontSize="11" fontWeight="800" fill="rgb(239 68 68)">IE falls ↓</text>
      <text x="450" y="94" fontSize="10.5" className="fill-current text-muted-foreground">new shell, more</text>
      <text x="450" y="112" fontSize="10.5" className="fill-current text-muted-foreground">shielding, farther out</text>
      <text x="450" y="146" fontSize="11" fontWeight="800" fill="rgb(16 185 129)">reactivity rises ↓</text>
      <text x="450" y="170" fontSize="10.5" className="fill-current text-muted-foreground">fizz → burn → explode</text>
      <text x="450" y="194" fontSize="10.5" className="fill-current text-muted-foreground">mp 181 → 28 °C</text>
    </svg>
  );
}
