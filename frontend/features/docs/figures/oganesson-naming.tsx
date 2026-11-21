// Oganesson naming panel. Theme-aware.
export function OganessonNaming({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 200" className={className} role="img" aria-label="Oganesson naming honouring Yuri Oganessian element 118 symbol Og group eighteen period seven with temporary name ununoctium retired">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Oganesson (Og) — the naming honour</text>
      <rect x="30" y="44" width="320" height="100" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="190" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Who it honours</text>
      <text x="190" y="90" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Yuri Oganessian</text>
      <text x="190" y="110" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">leading figure in superheavy-element</text>
      <text x="190" y="128" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">synthesis at the Dubna laboratory</text>
      <rect x="370" y="44" width="320" height="100" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="530" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">Identity card</text>
      <text x="530" y="90" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Z = 118 · symbol Og · group 18, period 7</text>
      <text x="530" y="110" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">one of only two elements named after a</text>
      <text x="530" y="128" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">living scientist (the other is nihonium's town)</text>
      <rect x="30" y="158" width="660" height="34" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="176" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">The temporary name ununoctium (Uuo) was retired the day IUPAC confirmed the discovery — systematic names exist to be replaced.</text>
      <text x="360" y="188" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Named-after-a-person endings use -on for noble-gas-column elements and -ium for everything else.</text>
    </svg>
  );
}
