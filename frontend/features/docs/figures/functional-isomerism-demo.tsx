// FunctionalIsomerismDemo figure. Theme-aware.
export function FunctionalIsomerismDemo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Functional isomerism different functional groups same formula">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Functional isomerism — the group itself changes</text>
      {[
        ["C₂H₆O", "alcohol –OH", "ether –O–", "rgb(16 185 129)", "rgb(245 158 11)"],
        ["C₃H₆O", "aldehyde –CHO", "ketone C=O", "rgb(59 130 246)", "rgb(139 92 246)"],
      ].map(([f, a, b, ca, cb], i) => (
        <g key={f as string}>
          <text x="60" y={100 + (i as number) * 70} fontSize="13" fontWeight="800" fill="rgb(148 163 184)">{f as string}</text>
          <rect x="150" y={76 + (i as number) * 70} width="220" height="44" rx="10" fill={ca as string} opacity="0.1" stroke={ca as string} />
          <text x="260" y={103 + (i as number) * 70} fontSize="11" fontWeight="800" textAnchor="middle" fill={ca as string}>{a as string}</text>
          <rect x="390" y={76 + (i as number) * 70} width="220" height="44" rx="10" fill={cb as string} opacity="0.1" stroke={cb as string} />
          <text x="500" y={103 + (i as number) * 70} fontSize="11" fontWeight="800" textAnchor="middle" fill={cb as string}>{b as string}</text>
        </g>
      ))}
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the most dramatic isomerism — whole families of reactions change</text>
    </svg>
  );
}
