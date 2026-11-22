// SodiumWaterSkate figure. Theme-aware.
export function SodiumWaterSkate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Sodium skating on water surface melting from reaction heat and pushed by hydrogen jets">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Sodium on water — physics meets chemistry</text>
      <rect x="120" y="120" width="420" height="55" rx="6" fill="rgb(59 130 246)" opacity="0.15" stroke="rgb(59 130 246)" />
      <text x="330" y="190" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">water trough</text>
      <ellipse cx="260" cy="118" rx="22" ry="9" fill="rgb(245 158 11)" opacity="0.85" />
      <text x="260" y="104" fontSize="9.5" fill="rgb(245 158 11)" textAnchor="middle">molten Na ball (mp 98 °C)</text>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M ${252 + i * 8} 112 L ${248 + i * 8} ${92 - i * 4}`} stroke="rgb(148 163 184)" strokeWidth="1.5" markerEnd="url(#sws-a)" />
      ))}
      <text x="330" y="72" fontSize="9.5" textAnchor="middle" fill="rgb(148 163 184)">H₂ jets push it along; reaction heat keeps it molten</text>
      <text x="545" y="100" fontSize="10" className="fill-current text-muted-foreground">yellow flame as</text>
      <text x="545" y="118" fontSize="10" className="fill-current text-muted-foreground">H₂ ignites in air</text>
      <defs>
        <marker id="sws-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
      <text x="330" y="220" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">2Na + 2H₂O → 2NaOH + H₂↑ — strongly exothermic, self-accelerating</text>
    </svg>
  );
}
