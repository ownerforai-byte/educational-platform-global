export function KeTemperatureLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Average kinetic energy proportional to absolute temperature" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Average KE is a Temperature Dial</text>
      <line x1="70" y1="180" x2="520" y2="180" stroke="currentColor" strokeWidth="1.5" />
      <line x1="70" y1="180" x2="70" y2="40" stroke="currentColor" strokeWidth="1.5" />
      <line x1="70" y1="180" x2="500" y2="55" stroke="currentColor" strokeWidth="2.5" />
      <line x1="70" y1="180" x2="500" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" className="opacity-60" />
      <line x1="70" y1="180" x2="500" y2="125" stroke="currentColor" strokeWidth="2" strokeDasharray="3 5" className="opacity-40" />
      <text x="508" y="58" fontSize="11" fill="currentColor">He</text>
      <text x="508" y="93" fontSize="11" fill="currentColor">O2</text>
      <text x="508" y="128" fontSize="11" fill="currentColor">CO2</text>
      <text x="295" y="200" textAnchor="middle" fontSize="11.5" fill="currentColor">absolute temperature (K)</text>
      <text x="76" y="50" fontSize="10.5" fill="currentColor">average KE</text>
      <text x="295" y="222" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Same KE for every gas at the same T - KE = 3/2 kT per molecule</text>
    </svg>
  );
}
