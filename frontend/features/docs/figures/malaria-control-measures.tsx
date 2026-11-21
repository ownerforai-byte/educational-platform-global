/** Malaria control measures — drugs, vector control, environmental. Theme-aware. */
export function MalariaControlMeasures({ className }: { className?: string }) {
  const col = (x: number, c: string, t: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y="56" width="196" height="160" rx="12" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 98} y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 12} y={104 + i * 24} fontSize="8" className="fill-current text-muted-foreground">• {s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Malaria control measures in three groups chemotherapy with quinine chloroquine artemisinin vector control with sprays nets and larvivorous fish and environmental drainage and sanitation">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fighting malaria on three fronts</text>
      {col(16, "rgb(124 58 237 / 0.9)", "CHEMOTHERAPY (patient)", ["quinine — the classic bark drug", "chloroquine, primaquine", "artemisinin combination therapy", "prophylaxis for travellers"], "a")}
      {col(232, "rgb(14 165 233 / 0.9)", "VECTOR CONTROL", ["insecticide sprays (walls, DDT-era)", "insecticide-treated nets (ITNs)", "larvivorous fish (Gambusia)", "oil film on breeding water"], "b")}
      {col(448, "rgb(22 163 74 / 0.9)", "ENVIRONMENTAL", ["drain swamps & stagnant pools", "fill or level puddles", "weekly change of stored water", "sanitation + community education"], "c")}
      <text x="16" y="232" fontSize="10" className="fill-current text-muted-foreground">Best results combine all three: kill the parasite in the patient, the mosquito in the house, and the breeding ground in the village.</text>
    </svg>
  );
}
