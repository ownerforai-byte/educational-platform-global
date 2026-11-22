export function MaxwellSpeedDistribution({ className }: { className?: string }) {
  const curve = "M40,190 C120,188 180,60 250,42 C300,32 340,60 420,120 C460,150 500,168 530,175";
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Maxwell-Boltzmann speed distribution curve" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Maxwell Speed Distribution</text>
      <line x1="40" y1="190" x2="535" y2="190" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="190" x2="40" y2="35" stroke="currentColor" strokeWidth="1.5" />
      <path d={curve} fill="none" stroke="currentColor" strokeWidth="2.5" />
      <line x1="250" y1="42" x2="250" y2="190" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-60" />
      <text x="250" y="205" textAnchor="middle" fontSize="11" fill="currentColor">u(mp)</text>
      <line x1="292" y1="52" x2="292" y2="190" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-50" />
      <text x="300" y="205" textAnchor="middle" fontSize="11" fill="currentColor">u(av)</text>
      <line x1="330" y1="70" x2="330" y2="190" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-40" />
      <text x="345" y="205" textAnchor="middle" fontSize="11" fill="currentColor">u(rms)</text>
      <text x="285" y="225" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">molecular speed</text>
      <text x="52" y="55" fontSize="10.5" fill="currentColor">fraction of molecules</text>
      <text x="450" y="60" fontSize="10.5" className="fill-current opacity-70">higher T flattens &amp; shifts right</text>
    </svg>
  );
}
