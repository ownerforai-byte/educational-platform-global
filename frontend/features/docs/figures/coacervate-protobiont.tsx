/** Coacervate to protobiont — the first cell-like droplets. Well-detailed. Theme-aware. */
export function CoacervateProtobiont({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Coacervate protobiont first cell-like droplets membrane boundary internal chemistry Oparin hot dilute soup origin of cells">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">From soup to droplet — the first cell-like bodies</text>
      {/* soup */}
      <rect x="30" y="44" width="300" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="180" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Hot dilute soup</text>
      {[[70, 100], [120, 90], [170, 110], [230, 95], [280, 105], [90, 140], [150, 150], [210, 145], [265, 155], [110, 185], [190, 190], [250, 190]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4 + (i % 3)} className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="0.8" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      ))}
      <text x="180" y="216" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">organics drift freely — reactions wash away, nothing accumulates</text>
      {/* arrow */}
      <path d="M340 130 h40 m-8 -7 l8 7 l-8 7" className="fill-none stroke-current text-amber-600" strokeWidth="2.6" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {/* coacervate */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Coacervate / protobiont</text>
      <ellipse cx="540" cy="140" rx="100" ry="66" className="fill-current text-emerald-500/15" stroke="currentColor" strokeWidth="2.4" strokeDasharray="7 4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="120" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">boundary separates inside from outside</text>
      <text x="540" y="142" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">enzymes + substrates concentrated</text>
      <text x="540" y="160" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">reactions now happen fast, inside</text>
      <text x="540" y="216" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">not yet alive: no heredity, no repair — but a step to cells</text>
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="260" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why it matters: a boundary makes chemistry local — concentration, protection and selection of droplets become possible.</text>
      <text x="360" y="278" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Oparin's coacervates were chemical droplets; protobionts add a boundary; true cells add self-replication.</text>
    </svg>
  );
}
