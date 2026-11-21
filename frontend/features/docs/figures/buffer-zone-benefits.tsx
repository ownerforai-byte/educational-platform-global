/** Buffer zones and people — conservation that pays locals. Well-detailed. Theme-aware. */
export function BufferZoneBenefits({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Buffer zone benefits community participation conservation revenue sharing tourism park people conflict reduction Annapurna Chitwan buffer zone">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Buffer zones — conservation that pays its neighbours</text>

      {/* ring diagram */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <circle cx="195" cy="160" r="86" className="fill-current text-emerald-600/35" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <circle cx="195" cy="160" r="50" className="fill-current text-emerald-700/40" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(20 83 45 / 0.9)" }} />
      <text x="195" y="164" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CORE</text>
      <text x="195" y="178" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground">no entry, no use</text>
      <text x="195" y="90" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">BUFFER</text>
      <text x="195" y="104" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">limited use, shared income</text>
      <text x="195" y="252" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">villages live in the buffer, not the core</text>

      {/* benefits */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT VILLAGERS GET</text>
      {[
        "30–50% of park tourism revenue",
        "community forests and grassland",
        "alternative energy (biogas,ICS)",
        "less wildlife conflict via fencing,",
        "  insurance and rapid response",
        "local users become local guards",
      ].map((t, i) => (
        <text key={t} x="406" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="406" y="204" fontSize="7" className="fill-current text-sky-600" fontWeight="700">The insight: people protect what pays</text>
      <text x="406" y="218" fontSize="7" className="fill-current text-sky-600" fontWeight="700">them — fences alone never worked.</text>
      <text x="406" y="244" fontSize="7" className="fill-current text-muted-foreground">Exam hook: define buffer zone and</text>
      <text x="406" y="258" fontSize="7" className="fill-current text-muted-foreground">give two benefits to communities.</text>
    </svg>
  );
}
