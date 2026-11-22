export function BoilingPressureRule({ className }: { className?: string }) {
  const rows = [
    { p: "Everest (~0.5 atm)", bp: "~70 C", w: 90 },
    { p: "1 atm (sea level)", bp: "100 C", w: 150 },
    { p: "Pressure cooker (~2 atm)", bp: "~120 C", w: 200 },
  ];
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Boiling point rises with external pressure" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Boils When VP = External Pressure</text>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(50, ${42 + i * 44})`}>
          <text x="0" y="17" fontSize="11.5" fontWeight="600" fill="currentColor">{r.p}</text>
          <rect x="215" y="4" width={r.w} height="18" rx="4" className="fill-current opacity-25" />
          <text x="440" y="18" fontSize="11.5" fontWeight="700" fill="currentColor">{r.bp}</text>
        </g>
      ))}
      <text x="280" y="195" textAnchor="middle" fontSize="11" className="fill-current opacity-75">Same water, three boiling points - external pressure sets the appointment</text>
      <text x="280" y="213" textAnchor="middle" fontSize="10.5" className="fill-current opacity-60">Vacuum evaporation protects heat-sensitive materials the same way</text>
    </svg>
  );
}
