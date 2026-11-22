export function CharlesLawLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Charles's law volume-temperature straight line extrapolating to absolute zero" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Charles's Law - V vs T Extrapolates to -273.15 C</text>
      <line x1="80" y1="60" x2="520" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-40" />
      <line x1="80" y1="195" x2="520" y2="195" stroke="currentColor" strokeWidth="1.5" />
      <line x1="80" y1="60" x2="500" y2="110" stroke="currentColor" strokeWidth="2.5" />
      <line x1="80" y1="60" x2="500" y2="70" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" className="opacity-60" />
      <line x1="80" y1="60" x2="500" y2="52" stroke="currentColor" strokeWidth="2" strokeDasharray="3 5" className="opacity-40" />
      <circle cx="80" cy="60" r="4" className="fill-current" />
      <text x="88" y="52" fontSize="11" fontWeight="700" fill="currentColor">-273.15 C (absolute zero)</text>
      <text x="300" y="215" textAnchor="middle" fontSize="11.5" fill="currentColor">temperature (C)</text>
      <text x="60" y="45" fontSize="10.5" fill="currentColor">V</text>
      <text x="470" y="150" fontSize="11" className="fill-current opacity-75">V1/T1 = V2/T2 (Kelvin!)</text>
      <text x="280" y="232" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Every gas extrapolates to zero volume at the same temperature</text>
    </svg>
  );
}
