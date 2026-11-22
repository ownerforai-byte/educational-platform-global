// The three hydrogen isotopes as a ladder. Theme-aware.
export function IsotopeTrioPanel({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["Protium  ¹H", "0 neutrons", "99.98% - ordinary hydrogen", "rgb(16 185 129)"],
    ["Deuterium  ²H (D)", "1 neutron", "0.015% - heavy water D2O", "rgb(14 165 233)"],
    ["Tritium  ³H (T)", "2 neutrons", "trace - beta emitter, t½ 12.3 y", "rgb(239 68 68)"],
  ];
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Ladder of the three hydrogen isotopes with neutron counts, abundances and key facts">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">One proton, three masks</text>
      {rows.map(([n, neu, fact, c], i) => (
        <g key={i}>
          <circle cx="90" cy={78 + i * 62} r="16" className="fill-current" style={{ color: c }} opacity="0.35" />
          <circle cx="90" cy={78 + i * 62} r="5" fill="rgb(239 68 68)" />
          <text x="120" y={72 + i * 62} fontSize="13" fontWeight="800" className="fill-current text-foreground">{n}</text>
          <text x="120" y={90 + i * 62} fontSize="11" className="fill-current text-muted-foreground">{neu}</text>
          <text x="330" y={82 + i * 62} fontSize="11.5" style={{ fill: c }}>{fact}</text>
        </g>
      ))}
      <text x="330" y="258" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Same chemistry, different physics - mass writes the differences</text>
    </svg>
  );
}
