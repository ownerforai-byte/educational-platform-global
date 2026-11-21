/** Seed bank and cryopreservation flow. Theme-aware. */
export function SeedBankCryopreservation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Seed bank and cryopreservation flow collect seeds dry to low humidity store at low temperature genebank Khumaltar Svalbard or freeze in liquid nitrogen minus 196 degrees for long term preservation">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Seed banks — from field to frozen</text>
      {[
        { x: 110, t: "1. COLLECT", s: "seeds from wild", s2: "and crop varieties" },
        { x: 260, t: "2. DRY", s: "reduce humidity", s2: "so seeds stay dormant" },
        { x: 410, t: "3. STORE", s: "low temperature vaults", s2: "Khumaltar genebank;" },
        { x: 560, t: "4. FREEZE / REVIVE", s: "−196 °C liquid nitrogen;", s2: "germinate & re-grow" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 62} y="58" width="124" height="86" rx="10" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x={n.x} y="80" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="100" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="116" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          {n.x < 550 && <path d={`M${n.x + 64} 101 h${84}`} markerEnd="url(#arrsb)" strokeWidth="2.5" className="stroke-current text-muted-foreground" />}
        </g>
      ))}
      <defs><marker id="arrsb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-muted-foreground" /></marker></defs>
      <text x="16" y="180" fontSize="8.4" className="fill-current text-muted-foreground">Svalbard (Norway) is the global model; Nepal's genebank is at Khumaltar. Genetic diversity preserved in dormancy.</text>
    </svg>
  );
}
