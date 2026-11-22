// SaturationLadder figure. Theme-aware.
export function SaturationLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Saturated alkane versus unsaturated alkene and alkyne structures">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Saturated vs unsaturated — the bond ladder</text>
      <rect x="40" y="55" width="180" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.08" stroke="rgb(16 185 129)" />
      <text x="130" y="80" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ALKANE (saturated)</text>
      <circle cx="85" cy="120" r="11" fill="rgb(16 185 129)" opacity="0.4" /><circle cx="175" cy="120" r="11" fill="rgb(16 185 129)" opacity="0.4" />
      <line x1="96" y1="120" x2="164" y2="120" stroke="rgb(16 185 129)" strokeWidth="3" />
      <text x="130" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C–C single bond · CₙH₂ₙ₊₂ · ethane</text>
      <rect x="240" y="55" width="180" height="110" rx="10" fill="rgb(245 158 11)" opacity="0.08" stroke="rgb(245 158 11)" />
      <text x="330" y="80" fontSize="11" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">ALKENE</text>
      <circle cx="285" cy="120" r="11" fill="rgb(245 158 11)" opacity="0.4" /><circle cx="375" cy="120" r="11" fill="rgb(245 158 11)" opacity="0.4" />
      <line x1="296" y1="116" x2="364" y2="116" stroke="rgb(245 158 11)" strokeWidth="3" />
      <line x1="296" y1="126" x2="364" y2="126" stroke="rgb(245 158 11)" strokeWidth="3" />
      <text x="330" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C=C double · CₙH₂ₙ · ethene CH₂=CH₂</text>
      <rect x="440" y="55" width="180" height="110" rx="10" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" />
      <text x="530" y="80" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">ALKYNE</text>
      <circle cx="485" cy="120" r="11" fill="rgb(239 68 68)" opacity="0.4" /><circle cx="575" cy="120" r="11" fill="rgb(239 68 68)" opacity="0.4" />
      {[112, 120, 128].map((yy) => <line key={yy} x1="496" y1={yy} x2="564" y2={yy} stroke="rgb(239 68 68)" strokeWidth="2.5" />)}
      <text x="530" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C≡C triple · CₙH₂ₙ₋₂ · ethyne HC≡CH</text>
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Saturated = maximum hydrogen per carbon; unsaturated = multiple bond ready to add</text>
    </svg>
  );
}
