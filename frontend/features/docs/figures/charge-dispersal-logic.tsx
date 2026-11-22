// ChargeDispersalLogic figure. Theme-aware.
export function ChargeDispersalLogic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Charge dispersal logic stabilises ions in both directions">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One physics, two directions</text>
      <rect x="40" y="55" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">negative centre</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">−I groups spread the charge</text>
      <text x="180" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">carboxylate stabilised → acid stronger</text>
      <rect x="340" y="55" width="280" height="110" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">positive centre</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">+I groups spread the charge</text>
      <text x="480" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">carbocation stabilised → forms easier</text>
      <text x="330" y="200" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">dispersed charge = stabilised ion — always</text>
    </svg>
  );
}
