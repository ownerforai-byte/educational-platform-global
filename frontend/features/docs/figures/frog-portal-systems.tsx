/** Frog portal systems — two special delivery routes. Well-detailed. Theme-aware. */
export function FrogPortalSystems({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog portal systems two special delivery routes hepatic portal vein intestine to liver renal portal kidney blood filtered before heart capillary network processing">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Portal systems — detours that process first</text>
      {/* hepatic portal */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HEPATIC PORTAL</text>
      <rect x="60" y="100" width="90" height="50" rx="10" className="fill-current text-slate-500/15" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="105" y="128" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">intestine</text>
      <path d="M150 125 h60 m-8 -5 l8 5 l-8 5" className="fill-none stroke-current" strokeWidth="2.4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="180" y="112" fontSize="5.8" className="fill-current text-emerald-600" fontWeight="700">hepatic portal vein</text>
      <rect x="210" y="100" width="90" height="50" rx="10" className="fill-current text-emerald-500/20" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="255" y="128" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">liver</text>
      <text x="195" y="180" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">nutrient-rich blood is processed by the liver</text>
      <text x="195" y="196" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">before it ever reaches the heart</text>
      {/* renal portal */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">RENAL PORTAL</text>
      <rect x="420" y="100" width="80" height="50" rx="10" className="fill-current text-slate-500/15" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="460" y="128" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">hind body</text>
      <path d="M500 125 h40 m-8 -5 l8 5 l-8 5" className="fill-none stroke-current" strokeWidth="2.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="520" y="112" fontSize="5.8" className="fill-current text-sky-600" fontWeight="700">renal portal vein</text>
      <rect x="540" y="100" width="80" height="50" rx="10" className="fill-current text-sky-500/20" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="580" y="128" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">kidneys</text>
      <text x="540" y="180" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">waste-laden blood from the back half is</text>
      <text x="540" y="196" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">filtered by the kidneys before returning</text>
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">A portal system = a vein that starts and ends in capillaries, letting an organ process blood en route — the body's inspection stop.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: hepatic portal (gut → liver) and renal portal (hind body → kidneys) — name both, define 'portal'.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Mammals keep the hepatic portal; they lost the renal one.</text>
    </svg>
  );
}
