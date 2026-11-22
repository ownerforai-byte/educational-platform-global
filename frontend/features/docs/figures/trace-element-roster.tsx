// TraceElementRoster figure. Theme-aware.
export function TraceElementRoster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Ten trace elements with their biological roles">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The trace ten — under 100 mg/day</text>
      {[
        ["Fe", "O₂ carrier (Hb)"], ["Zn", "carbonic anhydrase"], ["Cu", "haemocyanin"], ["I", "thyroxine"], ["Co", "vitamin B₁₂"],
        ["Mn", "enzymes"], ["Mo", "nitrogenase"], ["Cr", "glucose tolerance"], ["Se", "antioxidant"], ["F", "tooth enamel"],
      ].map(([m, job], i) => {
        const x = 40 + (i % 5) * 118;
        const y = 55 + Math.floor(i / 5) * 78;
        return (
          <g key={m as string}>
            <rect x={x} y={y} width="106" height="66" rx="8" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" strokeWidth="1" />
            <text x={x + 53} y={y + 24} fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">{m as string}</text>
            <text x={x + 53} y={y + 42} fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{job as string}</text>
            <text x={x + 53} y={y + 56} fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground"> </text>
          </g>
        );
      })}
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Catalysts and switches — used over and over, never consumed in bulk</text>
    </svg>
  );
}
