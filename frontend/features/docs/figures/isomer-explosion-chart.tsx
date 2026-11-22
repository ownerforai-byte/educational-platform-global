// IsomerExplosionChart figure. Theme-aware.
export function IsomerExplosionChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Growth in the number of isomers with increasing carbon count">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The isomer explosion</text>
      {[
        ["C₄H₁₀", 2, 60, "rgb(59 130 246)"],
        ["C₅H₁₂", 3, 90, "rgb(16 185 129)"],
        ["C₆H₁₄", 5, 120, "rgb(245 158 11)"],
        ["C₁₀H₂₂", 75, 150, "rgb(239 68 68)"],
      ].map(([f, n, y, col]) => (
        <g key={f as string}>
          <text x="60" y={(y as number) + 14} fontSize="10.5" fontWeight="800" className="fill-current text-foreground">{f as string}</text>
          <rect x="120" y={y as number} width={Math.min((n as number) * 3.2, 320)} height="18" rx="4" fill={col as string} opacity="0.75" />
          <text x={130 + Math.min((n as number) * 3.2, 320)} y={(y as number) + 14} fontSize="10.5" fontWeight="800" fill={col as string}>{n as string}</text>
        </g>
      ))}
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">C₂₀H₄₂: over 300,000 isomers — catenation + branching = a library per formula</text>
      <text x="330" y="218" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">this combinatorial growth is why organic chemistry is the largest branch</text>
    </svg>
  );
}
