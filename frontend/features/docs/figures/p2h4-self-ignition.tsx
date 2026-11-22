// P2H4 self ignition. Theme-aware.
export function P2h4SelfIgnition({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Diphosphine P2H4 impurity spontaneously igniting phosphine air mixture in the preparation flask">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The P₂H₄ troublemaker</text>
      <rect x="80" y="56" width="500" height="56" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.15" />
      <text x="330" y="80" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">P₂H₄ + 2O₂ → P₂O₃ + 2H₂O (spontaneous in air)</text>
      <text x="330" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">its flame then ignites the PH₃ stream — flash inside the flask</text>
      <text x="330" y="150" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">Fix: pass the gas through KOH solution or a freezing trap first</text>
      <text x="330" y="184" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Pure PH₃ is stable in air; the diphosphine impurity is the fire starter</text>
    </svg>
  );
}
