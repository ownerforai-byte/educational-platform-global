/** Air quality index reading — the daily number decoded. Well-detailed. Theme-aware. */
export function AirQualityIndexReading({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Air quality index AQI reading categories good moderate unhealthy very hazardous colour code 0 500 PM2.5 basis advice each category mask activity outdoor exercise sensitive groups Nepal Kathmandu daily level">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">AQI — the daily number, decoded</text>
      {/* scale */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE SIX BANDS (0–500)</text>
      {[
        ["0–50", "Good", "green — no restrictions", "rgb(22 163 74)"],
        ["51–100", "Moderate", "yellow — sensitive people take care", "rgb(202 138 4)"],
        ["101–150", "Unhealthy (sensitive)", "orange — asthma, elderly limit exertion", "rgb(217 119 6)"],
        ["151–200", "Unhealthy", "red — everyone reduces outdoor effort", "rgb(220 38 38)"],
        ["201–300", "Very Unhealthy", "purple — health warnings", "rgb(147 51 234)"],
        ["301+", "Hazardous", "maroon — stay indoors", "rgb(127 29 29)"],
      ].map(([range, name, advice, rgb], i) => {
        const y = 92 + i * 18;
        return (
          <g key={range as string}>
            <rect x="60" y={y - 9} width="70" height="14" rx="4" className="fill-current" style={{ color: `${rgb as string} / 0.45` }} stroke="currentColor" strokeWidth="0.8" />
            <text x="95" y={y} fontSize="5.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{range as string}</text>
            <text x="140" y={y} fontSize="6.2" className="fill-current" style={{ color: rgb as string }} fontWeight="700">{name as string}</text>
            <text x="290" y={y} fontSize="5.8" className="fill-current text-muted-foreground">{advice as string}</text>
          </g>
        );
      })}
      <text x="360" y="196" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">the index is usually driven by PM2.5 — the pollutant with the strongest health link</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Kathmandu's winter routinely crosses 150 — 'unhealthy' on the same scale where a clean mountain morning reads under 50.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: AQI is a 0–500 scale, six colour bands, PM2.5-driven — quote a band with its advice for full marks.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The bands exist to trigger action, not just inform — each colour maps to specific behaviour advice.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Reading AQI daily is a health habit — like checking the weather, but for your lungs.</text>
    </svg>
  );
}
