/** Nepal's biodiversity hotspots — Himalaya and Indo-Burma. Theme-aware. */
export function NepalHotspots({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Nepal's two biodiversity hotspots the Himalaya hotspot along the whole mountain arc and the Indo-Burma hotspot edge in the far eastern Terai">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nepal's two biodiversity hotspots</text>

      {/* schematic Nepal map */}
      <g>
        <path d="M80 60 L140 40 L200 55 L250 45 L310 60 L370 50 L430 65 L490 55 L550 70 L590 95 L560 150 L480 190 L380 205 L280 200 L180 190 L110 150 L70 105 Z" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="3" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        {/* Himalaya band */}
        <path d="M90 75 Q300 30 560 80" className="fill-none stroke-current text-sky-600" strokeWidth="10" strokeDasharray="10 6" opacity="0.7" />
        <text x="300" y="52" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HIMALAYA HOTSPOT</text>
        <text x="300" y="66" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">whole Nepalese Himalayan arc — endemism along altitude gradients</text>
        {/* Indo-Burma corner */}
        <path d="M520 150 L580 130 L595 165 L560 190 Z" className="fill-current text-amber-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <text x="555" y="215" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">INDO-BURMA EDGE</text>
        <text x="555" y="228" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">far-eastern Terai</text>
        <text x="150" y="180" fontSize="7.2" className="fill-current text-muted-foreground">Kanchenjunga–Singalila and eastern plains</text>
      </g>

      <rect x="24" y="192" width="400" height="40" rx="10" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="40" y="210" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">Hotspot test: exceptional endemic species +</text>
      <text x="40" y="226" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">≥70% of original habitat already lost.</text>
    </svg>
  );
}
