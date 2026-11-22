// PositionIsomerismDemo figure. Theme-aware.
export function PositionIsomerismDemo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Position isomerism same skeleton group moved along chain">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Position isomerism — the group moves</text>
      <rect x="40" y="52" width="280" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">propan-1-ol</text>
      <text x="180" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">HO–CH₂–CH₂–CH₃</text>
      <text x="180" y="136" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">–OH on carbon 1 (terminal)</text>
      <rect x="340" y="52" width="280" height="110" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">propan-2-ol</text>
      <text x="480" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃–CH(OH)–CH₃</text>
      <text x="480" y="136" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">–OH on carbon 2 (middle)</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">same skeleton C–C–C, same –OH — only the position differs</text>
    </svg>
  );
}
