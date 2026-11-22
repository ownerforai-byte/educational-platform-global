// CoHijackPanel figure. Theme-aware.
export function CoHijackPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Carbon monoxide binding iron in carboxyhaemoglobin causing poisoning">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">CO hijacks the O₂ seat — ~200–250× tighter</text>
      <circle cx="200" cy="120" r="15" fill="rgb(220 38 38)" />
      <text x="200" y="125" fontSize="9" fill="rgb(255 255 255)" textAnchor="middle">Fe²⁺</text>
      <path d="M 218 112 C 250 95, 270 95, 295 108" stroke="rgb(59 130 246)" strokeWidth="2.5" fill="none" markerEnd="url(#chp-a)" />
      <text x="258" y="88" fontSize="10" fill="rgb(59 130 246)">O₂ (normal)</text>
      <path d="M 218 130 C 250 148, 270 148, 295 136" stroke="rgb(120 53 15)" strokeWidth="4" fill="none" markerEnd="url(#chp-b)" />
      <text x="258" y="163" fontSize="10" fill="rgb(120 53 15)">CO wins the seat</text>
      <rect x="305" y="95" width="130" height="55" rx="8" fill="rgb(120 53 15)" opacity="0.15" stroke="rgb(120 53 15)" />
      <text x="370" y="118" fontSize="10.5" fontWeight="800" textAnchor="middle" fill="rgb(120 53 15)">carboxyhaemoglobin</text>
      <text x="370" y="138" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">cannot bind or release O₂</text>
      <rect x="460" y="70" width="160" height="105" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="540" y="94" fontSize="10.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">POISONING</text>
      <text x="540" y="116" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">tissues starved of O₂</text>
      <text x="540" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">headache → unconsciousness</text>
      <text x="540" y="154" fontSize="9.5" textAnchor="middle" fill="rgb(16 185 129)">treat: breathe pure O₂</text>
      <defs>
        <marker id="chp-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(59 130 246)" /></marker>
        <marker id="chp-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(120 53 15)" /></marker>
      </defs>
    </svg>
  );
}
