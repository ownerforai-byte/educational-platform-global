export function IsotropyAnisotropyDrill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Anisotropic crystal versus isotropic glass property directions" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Anisotropy vs Isotropy</text>
      <g transform="translate(80, 50)">
        <rect width="180" height="110" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <line x1="90" y1="55" x2={90 + 55 * Math.cos(i * 1.05)} y2={55 + 55 * Math.sin(i * 1.05)} stroke="currentColor" strokeWidth="1.5" className="opacity-60" markerEnd="url(#arrIso)" />
          </g>
        ))}
        <defs><marker id="arrIso" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor" /></marker></defs>
        <text x="90" y="132" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="currentColor">CRYSTAL: direction matters</text>
      </g>
      <g transform="translate(300, 50)">
        <rect width="180" height="110" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={40 + (i % 3) * 50} cy={35 + Math.floor(i / 3) * 45} r="6" className="fill-current opacity-40" />
        ))}
        <text x="90" y="132" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="currentColor">GLASS: same every way</text>
      </g>
      <text x="280" y="190" textAnchor="middle" fontSize="10.5" className="fill-current opacity-75">Refractive index and conductivity vary with direction in crystals</text>
      <text x="280" y="210" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Random amorphous arrangement averages all directions equal</text>
    </svg>
  );
}
