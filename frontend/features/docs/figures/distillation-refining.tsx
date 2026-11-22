// DistillationRefining figure. Theme-aware.
export function DistillationRefining({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Retort distillation refining of volatile zinc">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Distillation — volatility is the filter</text>
      <rect x="120" y="70" width="180" height="80" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="210" y="98" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">RETORT · 1000 °C</text>
      <text x="210" y="120" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">impure Zn + Fe, Pb</text>
      <path d="M 300 110 L 420 110" stroke="rgb(59 130 246)" strokeWidth="2.5" markerEnd="url(#dr-a)" />
      <text x="360" y="100" fontSize="9.5" textAnchor="middle" fill="rgb(59 130 246)">Zn vapour</text>
      <rect x="425" y="75" width="150" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.12" stroke="rgb(59 130 246)" />
      <text x="500" y="100" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">CONDENSER</text>
      <text x="500" y="122" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">pure Zn collects</text>
      <text x="210" y="185" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Fe (bp 2861 °C) and Pb (bp 1749 °C) stay behind</text>
      <defs>
        <marker id="dr-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(59 130 246)" /></marker>
      </defs>
      <text x="330" y="215" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Zinc boils 907 °C — a thousand degrees below its impurities</text>
    </svg>
  );
}
