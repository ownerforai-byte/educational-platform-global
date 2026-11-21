// Lanthanide and actinide rows placement. Theme-aware.
export function LanthanideActinideRows({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Lanthanide and actinide series placed as two separate rows below the main table with fourteen elements each and reasons for removal">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The f-block lives downstairs — lanthanides and actinides</text>
      <rect x="40" y="44" width="640" height="34" rx="6" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
      <text x="360" y="66" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">main table — periods 6 and 7 would otherwise need 32 columns each</text>
      <rect x="40" y="92" width="640" height="34" rx="6" className="fill-current text-violet-500/15" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="60" y="114" fontSize="9" className="fill-current text-violet-600" fontWeight="800">Lanthanides: Ce → Lu (14 elements, 4f filling)</text>
      <text x="664" y="114" fontSize="8" textAnchor="end" className="fill-current text-muted-foreground">after La</text>
      <rect x="40" y="140" width="640" height="34" rx="6" className="fill-current text-amber-500/15" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="60" y="162" fontSize="9" className="fill-current text-amber-600" fontWeight="800">Actinides: Th → Lr (14 elements, 5f filling)</text>
      <text x="664" y="162" fontSize="8" textAnchor="end" className="fill-current text-muted-foreground">after Ac</text>
      <rect x="30" y="186" width="660" height="18" rx="0" />
      <text x="360" y="200" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Both rows sit in group 3 of their periods; pulling them out keeps the main table readable and preserves period lengths of 32.</text>
    </svg>
  );
}
