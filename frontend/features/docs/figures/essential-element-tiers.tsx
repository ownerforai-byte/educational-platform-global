// EssentialElementTiers figure. Theme-aware.
export function EssentialElementTiers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Three tiers of essential elements from bulk CHON to trace elements">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">~25 essential elements, three tiers</text>
      <rect x="40" y="55" width="580" height="46" rx="8" fill="rgb(59 130 246)" opacity="0.14" stroke="rgb(59 130 246)" />
      <text x="56" y="76" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)">BULK — C, H, O, N</text>
      <text x="56" y="93" fontSize="10" className="fill-current text-muted-foreground">~99 % of body mass: framework, water, fuels</text>
      <rect x="40" y="107" width="580" height="46" rx="8" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="56" y="128" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)">MACRO-MINERALS — Ca, P, K, S, Na, Cl, Mg</text>
      <text x="56" y="145" fontSize="10" className="fill-current text-muted-foreground">grams per day: bones, electrolytes, enzymes</text>
      <rect x="40" y="159" width="580" height="46" rx="8" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" />
      <text x="56" y="180" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)">TRACE — Fe, Zn, Cu, I, Co, Mn, Mo, Cr, Se, F</text>
      <text x="56" y="197" fontSize="10" className="fill-current text-muted-foreground">mg–µg per day: catalysts, hormones, O₂ carrier</text>
      <text x="330" y="226" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Of ~90 natural elements, only about 25 made the cut</text>
    </svg>
  );
}
