// H2S hazard panel. Theme-aware.
export function H2sHazardPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Hydrogen sulphide hazard rotten egg smell paralysis of olfactory nerves making high concentrations odourless">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The smell that switches itself off</text>
      <rect x="80" y="56" width="500" height="56" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.15" />
      <text x="330" y="80" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">rotten-egg smell warns at low levels</text>
      <text x="330" y="102" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">but high concentrations paralyse the olfactory nerves</text>
      <text x="330" y="140" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">⇒ a "no smell" room can be the most dangerous one</text>
      <text x="330" y="178" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">More toxic than HCN by some measures; handle only with fume extraction</text>
    </svg>
  );
}
