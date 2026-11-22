export function BoyleLawHyperbola({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Boyle's law pressure-volume hyperbola" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Boyle's Law - P vs V at Constant T</text>
      <line x1="60" y1="195" x2="530" y2="195" stroke="currentColor" strokeWidth="1.5" />
      <line x1="60" y1="195" x2="60" y2="35" stroke="currentColor" strokeWidth="1.5" />
      <path d="M70,40 C90,140 150,180 300,188 C400,192 480,193 525,194" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <text x="300" y="215" textAnchor="middle" fontSize="11.5" fill="currentColor">volume V</text>
      <text x="52" y="45" fontSize="10.5" fill="currentColor">P</text>
      <text x="440" y="70" fontSize="11" className="fill-current opacity-75">P1V1 = P2V2</text>
      <text x="440" y="88" fontSize="10.5" className="fill-current opacity-60">hyperbola: T and n fixed</text>
      <text x="280" y="232" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Halve the volume, double the pressure - isothermal compression</text>
    </svg>
  );
}
