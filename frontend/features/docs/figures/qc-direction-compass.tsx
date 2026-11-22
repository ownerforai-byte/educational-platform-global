// Qc vs Kc direction compass. Theme-aware.
export function QcDirectionCompass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Reaction quotient compared with equilibrium constant decides direction: Qc below Kc forward, above Kc reverse, equal at equilibrium">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Qc: the compass needle</text>
      <circle cx="330" cy="150" r="70" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <circle cx="330" cy="150" r="6" fill="rgb(59 130 246)" />
      <text x="330" y="86" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">Qc &lt; Kc</text>
      <text x="330" y="104" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">too little product</text>
      <text x="330" y="120" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">forward</text>
      <text x="330" y="216" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">Qc &gt; Kc</text>
      <text x="330" y="234" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">too much product</text>
      <text x="330" y="250" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">reverse</text>
      <text x="430" y="154" fontSize="12.5" fontWeight="800" fill="rgb(59 130 246)">Qc = Kc</text>
      <text x="430" y="172" fontSize="11" className="fill-current text-muted-foreground">at equilibrium</text>
      <text x="330" y="270" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Same expression as Kc - just evaluated wherever the flask currently stands</text>
    </svg>
  );
}
