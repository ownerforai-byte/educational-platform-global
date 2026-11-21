/** Mycorrhiza symbiosis — roots plus fungus. Well-detailed. Theme-aware. */
export function MycorrhizaSymbiosis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mycorrhiza symbiosis plant root with fungal sheath and hyphal network extending absorption zone mineral phosphorus water to plant sugars to fungus ectomycorrhiza versus endomycorrhiza arbuscular types">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mycorrhiza — the root–fungus partnership</text>

      {/* root */}
      <rect x="150" y="60" width="60" height="190" rx="18" className="fill-current text-amber-600/25" stroke="currentColor" strokeWidth="2.5" style={{ color: "rgb(180 83 9 / 0.9)" }} />
      <text x="180" y="270" fontSize="7.6" textAnchor="middle" className="fill-current text-amber-700" fontWeight="700">root</text>

      {/* fungal sheath */}
      <rect x="138" y="60" width="84" height="190" rx="24" className="fill-none stroke-current text-emerald-600" strokeWidth="3" strokeDasharray="7 5" />
      {/* hyphae network */}
      <path d="M222 80 q80 -20 160 0 q80 20 160 0 M222 130 q80 20 160 0 q80 -20 160 0 M222 180 q80 -20 160 0 q80 20 160 0 M222 230 q80 20 160 0 q80 -20 160 0" className="fill-none stroke-current text-emerald-500" strokeWidth="2" />
      <text x="470" y="120" fontSize="8" className="fill-current text-emerald-600" fontWeight="800">hyphal network — 100× root surface</text>

      {/* exchange arrows */}
      <path d="M300 165 L470 165" markerEnd="url(#arrmy1)" strokeWidth="3" className="stroke-current text-sky-600" />
      <text x="385" y="158" fontSize="7.6" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">P, N, Zn, water →</text>
      <path d="M470 195 L300 195" markerEnd="url(#arrmy2)" strokeWidth="3" className="stroke-current text-amber-600" />
      <text x="385" y="212" fontSize="7.6" textAnchor="middle" className="fill-current text-amber-600" fontWeight="700">← sugars from photosynthesis</text>
      <defs>
        <marker id="arrmy1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-sky-600" /></marker>
        <marker id="arrmy2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-amber-600" /></marker>
      </defs>

      {/* types */}
      <rect x="30" y="252" width="660" height="38" rx="10" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="50" y="268" fontSize="7.8" className="fill-current text-foreground" fontWeight="700">Ectomycorrhiza: sheath around the root (pines) · Endomycorrhiza: fungus enters root cells with arbuscles (most crops).</text>
      <text x="50" y="284" fontSize="7.4" className="fill-current text-muted-foreground">~90% of land plants have mycorrhiza — the partnership made land colonisation by plants possible.</text>
    </svg>
  );
}
