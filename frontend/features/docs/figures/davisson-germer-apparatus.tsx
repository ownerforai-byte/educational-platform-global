// Davisson-Germer electron diffraction experiment. Theme-aware.
export function DavissonGermerApparatus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Davisson Germer 1927 experiment electron gun fires electrons at nickel crystal detector records diffraction pattern proving wave nature of electrons">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Davisson–Germer (1927): electrons diffract like waves</text>
      <rect x="40" y="70" width="120" height="60" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="100" y="95" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Electron gun</text>
      <text x="100" y="112" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">accelerated beam</text>
      <line x1="160" y1="100" x2="310" y2="100" className="stroke-current text-sky-500" strokeWidth="2.4" strokeDasharray="7 5" style={{ color: "rgb(14 165 233 / 0.9)" }} markerEnd="url(#dgarr)" />
      <polygon points="320,100 340,60 360,100 340,140" className="fill-current text-violet-500/20" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="340" y="160" fontSize="9" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">Nickel crystal</text>
      <text x="340" y="174" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">atomic spacing ~ nm ≈ λ</text>
      <line x1="362" y1="94" x2="596" y2="44" className="stroke-current text-emerald-500" strokeWidth="2" strokeDasharray="6 4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <line x1="362" y1="100" x2="596" y2="90" className="stroke-current text-emerald-500" strokeWidth="2" strokeDasharray="6 4" style={{ color: "rgb(16 185 129 / 0.6)" }} />
      <line x1="362" y1="106" x2="596" y2="136" className="stroke-current text-emerald-500" strokeWidth="2" strokeDasharray="6 4" style={{ color: "rgb(16 185 129 / 0.35)" }} />
      <path d="M 600 30 A 90 90 0 0 1 600 150" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.85)" }} />
      <text x="642" y="84" fontSize="8.6" className="fill-current text-emerald-600" fontWeight="800">Detector: maxima at</text>
      <text x="642" y="100" fontSize="8.6" className="fill-current text-emerald-600" fontWeight="800">diffraction angles</text>
      <rect x="30" y="184" width="660" height="34" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="200" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Conclusion: a diffraction pattern (like X-rays) proves electrons behave as waves — and the measured λ matched λ = h/mv.</text>
      <text x="360" y="213" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Drop the name Davisson–Germer for the experimental-proof mark.</text>
      <defs>
        <marker id="dgarr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" className="fill-current" /></marker>
      </defs>
    </svg>
  );
}
