export function TyrePressureCharles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Tyre pressure rising with temperature as Charles's law" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Charles's Law on the Road</text>
      <g transform="translate(90, 55)">
        <ellipse cx="70" cy="70" rx="58" ry="58" className="fill-current opacity-10" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="70" cy="70" rx="26" ry="26" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" />
        <text x="70" y="150" textAnchor="middle" fontSize="11" fill="currentColor">20 C: 32 psi</text>
      </g>
      <line x1="240" y1="125" x2="310" y2="125" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrTy)" />
      <text x="275" y="112" textAnchor="middle" fontSize="11" fill="currentColor">drive 1 h</text>
      <defs><marker id="arrTy" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor" /></marker></defs>
      <g transform="translate(330, 55)">
        <ellipse cx="70" cy="70" rx="58" ry="58" className="fill-current opacity-20" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="70" cy="70" rx="27" ry="27" className="fill-current opacity-10" stroke="currentColor" strokeWidth="1.5" />
        <text x="70" y="150" textAnchor="middle" fontSize="11" fill="currentColor">60 C: ~35 psi</text>
      </g>
      <text x="280" y="195" textAnchor="middle" fontSize="11" className="fill-current opacity-75">V, n fixed so P proportional to T (Kelvin) - the gauge reads Charles's law</text>
      <text x="280" y="214" textAnchor="middle" fontSize="10.5" className="fill-current opacity-60">303 K to 333 K lifts pressure by about 10 percent</text>
    </svg>
  );
}
