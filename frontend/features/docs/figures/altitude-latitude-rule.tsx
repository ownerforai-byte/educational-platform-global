/** Climbing 1000 m equals 1000 km toward poles. Theme-aware. */
export function AltitudeLatitudeRule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Climbing 1000 metres equals travelling 1000 kilometres toward the poles altitude mirrors latitude temperature zones equivalent">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Altitude mirrors latitude</text>

      {/* mountain */}
      <path d="M120 180 L280 60 L440 180 Z" className="fill-current text-stone-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="280" y="196" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">climb ↑1000 m</text>

      {/* arrow */}
      <path d="M470 120 L580 120" markerEnd="url(#arral)" strokeWidth="3" className="stroke-current text-sky-500" />
      <text x="525" y="108" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">= 1000 km →</text>
      <text x="525" y="140" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">toward the poles</text>

      <defs><marker id="arral" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-sky-500" /></marker></defs>

      <text x="16" y="184" fontSize="8.6" className="fill-current text-muted-foreground">A day's walk in Nepal crosses climate zones that span a continent — tropical sal to alpine meadow in 200 km.</text>
    </svg>
  );
}
