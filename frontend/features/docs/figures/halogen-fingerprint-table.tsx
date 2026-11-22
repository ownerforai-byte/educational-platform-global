// Halogen fingerprint table. Theme-aware.
export function HalogenFingerprintTable({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["colour", "green-yellow gas", "red-brown vapour", "violet vapour"],
    ["moist litmus", "bleached fast", "bleached slowly", "no bleach"],
    ["starch", "negative", "negative", "deep blue-black"],
    ["excess NH₃", "white NH₄Cl fumes", "weaker fumes", "explosive NI₃"],
  ];
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Fingerprint table for chlorine bromine and iodine covering colour litmus starch and ammonia tests">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Three gases, three fingerprints</text>
      <text x="290" y="50" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">Cl₂</text>
      <text x="440" y="50" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(180 83 9)">Br₂</text>
      <text x="580" y="50" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(124 58 237)">I₂</text>
      {rows.map(([t, a, b, c], i) => (
        <g key={i}>
          <text x="50" y={80 + i * 44} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{t}</text>
          <text x="290" y={80 + i * 44} fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">{a}</text>
          <text x="440" y={80 + i * 44} fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">{b}</text>
          <text x="580" y={80 + i * 44} fontSize="10.5" textAnchor="middle" fontWeight="700" fill="rgb(124 58 237)">{c}</text>
          <line x1="40" y1={88 + i * 44} x2="630" y2={88 + i * 44} stroke="currentColor" strokeWidth="0.6" className="text-muted-foreground" opacity="0.3" />
        </g>
      ))}
      <text x="330" y="270" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Bleaching speed separates Cl₂ from Br₂; starch isolates I₂; ammonia confirms Cl₂</text>
    </svg>
  );
}
