// NaKPairPanel figure. Theme-aware.
export function NaKPairPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Sodium outside potassium inside with the pump maintaining gradients">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Na⁺ outside, K⁺ inside — the membrane battery</text>
      <rect x="60" y="55" width="540" height="120" rx="12" fill="rgb(59 130 246)" opacity="0.06" stroke="rgb(59 130 246)" strokeDasharray="4 3" />
      <text x="330" y="76" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">cell membrane</text>
      <text x="140" y="105" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">OUTSIDE (blood/tissue fluid)</text>
      <text x="140" y="127" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Na⁺ HIGH — fluid balance, osmosis</text>
      <text x="140" y="147" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">carries the nerve impulse inward</text>
      <text x="520" y="105" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">INSIDE (cytoplasm)</text>
      <text x="520" y="127" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">K⁺ HIGH — resting potential</text>
      <text x="520" y="147" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">≈ −70 mV across the membrane</text>
      <path d="M 300 95 C 330 85, 330 85, 360 95" stroke="rgb(239 68 68)" strokeWidth="2.5" fill="none" markerEnd="url(#nkp-a)" />
      <text x="330" y="82" fontSize="9" fill="rgb(239 68 68)" textAnchor="middle">3 Na⁺ out</text>
      <path d="M 360 145 C 330 155, 330 155, 300 145" stroke="rgb(59 130 246)" strokeWidth="2.5" fill="none" markerEnd="url(#nkp-a)" />
      <text x="330" y="165" fontSize="9" fill="rgb(59 130 246)" textAnchor="middle">2 K⁺ in (per ATP)</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The Na⁺/K⁺ pump keeps both gradients steep — nerves run on this battery</text>
      <defs>
        <marker id="nkp-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
    </svg>
  );
}
