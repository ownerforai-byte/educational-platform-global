export function LcdPixelSwitch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="LCD pixel switching between bright and dark" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">LCD Pixel - Voltage Flips the Light</text>
      <g transform="translate(50, 50)">
        <rect width="200" height="110" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" />
        <text x="100" y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">OFF (bright)</text>
        {[0, 1, 2].map((j) => (
          <line key={j} x1="40" y1={45 + j * 22} x2="160" y2={45 + j * 22} stroke="currentColor" strokeWidth="2.5" className="opacity-55" transform={`rotate(0 100 ${56 + j * 22})`} />
        ))}
        <text x="100" y="128" textAnchor="middle" fontSize="10" className="fill-current opacity-70">molecules twist light 90</text>
      </g>
      <g transform="translate(310, 50)">
        <rect width="200" height="110" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.5" />
        <text x="100" y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">ON (dark)</text>
        {[0, 1, 2].map((j) => (
          <line key={j} x1="40" y1={45 + j * 22} x2="160" y2={45 + j * 22} stroke="currentColor" strokeWidth="2.5" className="opacity-55" />
        ))}
        <text x="100" y="128" textAnchor="middle" fontSize="10" className="fill-current opacity-70">field aligns rods - no twist</text>
      </g>
      <line x1="255" y1="105" x2="305" y2="105" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrLc)" />
      <text x="280" y="93" textAnchor="middle" fontSize="10.5" fill="currentColor">voltage</text>
      <defs><marker id="arrLc" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor" /></marker></defs>
      <text x="280" y="200" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Between crossed polarisers: twist passes light, alignment blocks it</text>
      <text x="280" y="220" textAnchor="middle" fontSize="10.5" className="fill-current opacity-60">Low power - why watches and phones chose LCD</text>
    </svg>
  );
}
