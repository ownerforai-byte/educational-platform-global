/** Frog heart internal structure — sinus venosus, two atria, one ventricle, truncus. Theme-aware. */
export function FrogHeartInternal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Frog heart internal structure with sinus venosus two atria single ventricle spiral valve truncus arteriosus and three arches carotid systemic pulmocutaneous">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Inside the frog heart — three chambers, one clever valve</text>

      {/* sinus venosus */}
      <rect x="60" y="90" width="70" height="50" rx="10" className="fill-current text-sky-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="95" y="112" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">sinus venosus</text>
      <text x="95" y="160" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">deoxygenated blood collects here first</text>

      {/* atria */}
      <rect x="190" y="70" width="80" height="70" rx="14" className="fill-current text-sky-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="230" y="100" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">RIGHT atrium</text>
      <text x="230" y="116" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">(blood from body)</text>
      <rect x="190" y="150" width="80" height="70" rx="14" className="fill-current text-rose-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="230" y="180" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LEFT atrium</text>
      <text x="230" y="196" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">(blood from lungs)</text>

      {/* ventricle */}
      <path d="M300 120 q60 -24 100 0 q20 60 -30 110 q-60 -20 -70 -110 Z" className="fill-current text-violet-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="370" y="180" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SINGLE ventricle</text>
      <text x="370" y="196" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">streams stay mostly separate by timing & ridges</text>

      {/* truncus + arches */}
      <rect x="420" y="120" width="70" height="40" rx="8" className="fill-current text-amber-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="455" y="144" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">truncus + spiral valve</text>
      <g className="stroke-current text-foreground" strokeWidth="2.5">
        <line x1="490" y1="128" x2="540" y2="96" /><line x1="490" y1="140" x2="545" y2="140" /><line x1="490" y1="152" x2="540" y2="184" />
      </g>
      <text x="548" y="100" fontSize="8" className="fill-current text-muted-foreground">carotid (head)</text>
      <text x="552" y="144" fontSize="8" className="fill-current text-muted-foreground">systemic (body)</text>
      <text x="548" y="188" fontSize="8" className="fill-current text-muted-foreground">pulmocutaneous (lungs+skin)</text>

      <text x="16" y="244" fontSize="10" className="fill-current text-muted-foreground">Beat origin: sinus venosus (myogenic) → atria → ventricle → truncus. Mixed blood reaches organs — incomplete double circulation.</text>
    </svg>
  );
}
