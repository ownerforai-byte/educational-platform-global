// AcidityLadderCcx figure. Theme-aware.
export function AcidityLadderCcx({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Acidity order acetic chloroacetic dichloroacetic trichloroacetic acid">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Acidity ladder — chlorines strengthen the acid</text>
      {[
        ["CH₃COOH", "baseline", 190, "rgb(148 163 184)"],
        ["ClCH₂COOH", "one −I", 150, "rgb(59 130 246)"],
        ["CHCl₂COOH", "two −I", 110, "rgb(245 158 11)"],
        ["CCl₃COOH", "three −I", 70, "rgb(239 68 68)"],
      ].map(([f, d, y, col], i) => (
        <g key={f as string}>
          <rect x={60 + (i as number) * 145} y={y as number} width="130" height={230 - (y as number)} rx="8" fill={col as string} opacity="0.15" stroke={col as string} />
          <text x={125 + (i as number) * 145} y={(y as number) + 22} fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{f as string}</text>
          <text x={125 + (i as number) * 145} y={(y as number) + 40} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="46" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">each −I chlorine stabilises the carboxylate anion → stronger acid</text>
    </svg>
  );
}
