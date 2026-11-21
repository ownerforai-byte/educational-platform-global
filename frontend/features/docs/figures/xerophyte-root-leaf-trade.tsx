/** Xerophyte root vs leaf trade — where the budget goes. Well-detailed. Theme-aware. */
export function XerophyteRootLeafTrade({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Xerophyte root versus leaf investment deep wide roots succulent stem spines water storage budget allocation cactus adaptation drought">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The xerophyte budget — roots win, leaves lose</text>

      {/* plant */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHERE THE WATER GOES</text>
      {/* succulent stem */}
      <path d="M170 130 q-6 60 0 100 q25 12 50 0 q6 -40 0 -100 q-25 -10 -50 0" className="fill-current text-emerald-600/30" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      {/* spines */}
      {[0, 1, 2, 3, 4].map((j) => (
        <line key={j} x1={j % 2 ? 222 : 168} y1={145 + j * 18} x2={j % 2 ? 240 : 150} y2={140 + j * 18} className="stroke-current text-amber-700" strokeWidth="2" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      ))}
      <text x="260" y="150" fontSize="6.8" className="fill-current text-muted-foreground">spines, not leaves</text>
      <text x="260" y="164" fontSize="6.8" className="fill-current text-muted-foreground">(nothing to transpire)</text>
      {/* deep roots */}
      <path d="M195 232 v40 M195 244 q-30 10 -48 24 M195 244 q30 10 48 24" className="stroke-current text-amber-800" strokeWidth="2.4" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      <text x="70" y="278" fontSize="6.8" className="fill-current text-muted-foreground">roots: wide + deep — first claim on rare rain</text>

      {/* trade table */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TRADE-OFF</text>
      <text x="406" y="92" fontSize="7.4" className="fill-current text-emerald-600" fontWeight="700">INVESTED:</text>
      {["water-storage parenchyma", "thick cuticle + sunken stomata", "CAM night-time gas exchange"].map((t, i) => (
        <text key={t} x="420" y={108 + i * 15} fontSize="7" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="406" y="170" fontSize="7.4" className="fill-current text-rose-500" fontWeight="700">SACRIFICED:</text>
      {["broad leaves → spines", "fast growth (drought forbids it)", "shade for neighbours (none given)"].map((t, i) => (
        <text key={t} x="420" y={186 + i * 15} fontSize="7" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="406" y="244" fontSize="7" className="fill-current text-emerald-600">Survival over speed — the desert</text>
      <text x="406" y="258" fontSize="7" className="fill-current text-emerald-600">rewards the patient, not the lush.</text>
    </svg>
  );
}
