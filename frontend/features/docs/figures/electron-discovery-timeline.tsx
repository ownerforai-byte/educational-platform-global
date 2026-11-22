// Subatomic particle discovery timeline. Theme-aware.
export function ElectronDiscoveryTimeline({ className }: { className?: string }) {
  const events: [string, string, string][] = [
    ["1897", "Electron — J.J. Thomson", "cathode rays bend toward the positive plate"],
    ["1911", "Nucleus — Rutherford", "alpha particles bounce off a dense core"],
    ["1919", "Proton — Rutherford", "hydrogen nuclei knocked out of nitrogen"],
    ["1932", "Neutron — Chadwick", "neutral radiation from beryllium"],
  ];
  return (
    <svg viewBox="0 0 720 200" className={className} role="img" aria-label="Subatomic particle discovery timeline electron Thomson nucleus Rutherford proton neutron Chadwick eighteen ninety seven to nineteen thirty two">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">35 years that dismantled "indivisible"</text>
      <line x1="60" y1="110" x2="660" y2="110" className="stroke-current text-muted-foreground" strokeWidth="2" />
      {events.map(([yr, who, how], i) => {
        const x = 110 + i * 175;
        return (
          <g key={yr}>
            <circle cx={x} cy="110" r="7" className="fill-current text-sky-500" style={{ color: "rgb(14 165 233 / 0.9)" }} />
            <text x={x} y={70} fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">{yr}</text>
            <text x={x} y={86} fontSize="7.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{who}</text>
            <text x={x} y={140} fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{how.slice(0, 32)}</text>
            <text x={x} y={152} fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{how.slice(32, 64)}</text>
          </g>
        );
      })}
      <rect x="30" y="168" width="660" height="24" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="184" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Each date is quotable in a 2m "limitation" answer: postulate 1 fell in 1897, postulate 2 in the isotope era.</text>
    </svg>
  );
}
