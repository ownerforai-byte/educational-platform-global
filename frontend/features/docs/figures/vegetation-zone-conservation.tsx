/** Conservation value of zones — why every altitude needs saving. Well-detailed. Theme-aware. */
export function VegetationZoneConservation({ className }: { className?: string }) {
  const zones: [string, string, string][] = [
    ["Tropical sal", "Chitwan, Bardiya parks", "rhino, tiger habitat"],
    ["Subtropical chir", "community forests", "resin, fuelwood"],
    ["Temperate oak–fir", "Langtang, Annapurna", "water source for hills"],
    ["Subalpine birch", "Sagarmatha buffer", "snow leopard range"],
    ["Alpine meadow", "protected highlands", "yarsagumba, grazing"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Vegetation zone conservation value protected areas by altitude Chitwan Langtang Sagarmatha community forests species habitat services">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Every zone carries something worth keeping</text>
      {zones.map(([z, place, value], i) => {
        const y = 44 + i * 44;
        return (
          <g key={z}>
            <rect x="30" y={y} width="660" height="36" rx="8" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: `rgb(16 185 129 / ${0.9 - i * 0.1})` }} />
            <text x="46" y={y + 23} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{z}</text>
            <text x="220" y={y + 23} fontSize="7.2" className="fill-current text-sky-600">{place}</text>
            <text x="460" y={y + 23} fontSize="7.2" className="fill-current text-muted-foreground">{value}</text>
          </g>
        );
      })}
      <rect x="30" y="266" width="660" height="26" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="283" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Conservation follows the vegetation map: each altitude band protects different species and different services — lose a zone, lose its gifts.</text>
    </svg>
  );
}
