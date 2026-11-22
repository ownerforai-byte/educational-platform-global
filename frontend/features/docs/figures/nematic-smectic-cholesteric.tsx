export function NematicSmecticCholesteric({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Nematic smectic and cholesteric mesophase structures" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Three Mesophases</text>
      {["NEMATIC", "SMECTIC", "CHOLESTERIC"].map((t, k) => (
        <g key={k} transform={`translate(${40 + k * 180}, 45)`}>
          <rect width="150" height="130" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
          <text x="75" y="148" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="currentColor">{t}</text>
          {k === 0 && [0, 1, 2, 3].map((j) => (
            <line key={j} x1={25 + (j % 2) * 12} y1={25 + j * 28} x2={115 + (j % 2) * 10} y2={25 + j * 28} stroke="currentColor" strokeWidth="2.5" className="opacity-55" />
          ))}
          {k === 1 && [0, 1, 2].map((j) => (
            <g key={j}>
              <rect x="22" y={22 + j * 34} width="106" height="10" rx="3" className="fill-current opacity-25" />
              {[0, 1, 2, 3].map((m) => (<line key={m} x1={30 + m * 26} y1={24 + j * 34} x2={30 + m * 26} y2={30 + j * 34} stroke="currentColor" strokeWidth="2" className="opacity-55" />))}
            </g>
          ))}
          {k === 2 && [0, 1, 2, 3].map((j) => (
            <line key={j} x1={25 + j * 4} y1={25 + j * 28} x2={120 - j * 4} y2={25 + j * 28} stroke="currentColor" strokeWidth="2.5" className="opacity-55" transform={`rotate(${j * 14} 75 ${39 + j * 28})`} />
          ))}
        </g>
      ))}
      <text x="280" y="215" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Lines: parallel only. Layers: aligned rows. Spiral: helix twist layer to layer</text>
    </svg>
  );
}
