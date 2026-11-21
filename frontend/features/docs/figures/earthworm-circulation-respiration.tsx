/** Earthworm circulation & respiration — closed system with dorsal/ventral vessels, cutaneous gas exchange. Theme-aware. */
export function EarthwormCirculationRespiration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Earthworm closed circulatory system with dorsal vessel hearts lateral hearts ventral vessel and capillaries plus cutaneous respiration through moist skin">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Closed circulation + skin breathing</text>

      {/* body cross-section */}
      <ellipse cx="200" cy="140" rx="120" ry="80" className="fill-current text-rose-500/8" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(190 90 90 / 0.9)" }} />

      {/* vessels */}
      <line x1="110" y1="112" x2="290" y2="112" strokeWidth="5" className="stroke-current text-rose-600" />
      <text x="300" y="112" fontSize="9" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">dorsal vessel (blood forward)</text>
      <line x1="110" y1="168" x2="290" y2="168" strokeWidth="5" className="stroke-current text-sky-500" />
      <text x="300" y="168" fontSize="9" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">ventral vessel (blood backward)</text>
      <g className="stroke-current text-rose-500" strokeWidth="3">
        <line x1="140" y1="116" x2="140" y2="164" /><line x1="200" y1="116" x2="200" y2="164" /><line x1="260" y1="116" x2="260" y2="164" />
      </g>
      <text x="310" y="140" fontSize="8.5" className="fill-current text-muted-foreground">lateral hearts (segments 7–13)</text>
      <text x="310" y="154" fontSize="8.5" className="fill-current text-muted-foreground">pump dorsal → ventral</text>

      {/* capillary net in skin */}
      <g className="stroke-current text-rose-400" strokeWidth="1.5">
        <path d="M120 80 q40 -14 80 0 q40 12 80 0" fill="none" /><path d="M120 200 q40 14 80 0 q40 -12 80 0" fill="none" />
      </g>
      <text x="80" y="60" fontSize="9" className="fill-current text-muted-foreground">capillary loop reaches the skin — the breathing surface</text>

      {/* gas exchange box */}
      <rect x="420" y="80" width="210" height="110" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="432" y="104" fontSize="10" className="fill-current text-foreground" fontWeight="800">CUTANEOUS respiration</text>
      <text x="432" y="124" fontSize="8.5" className="fill-current text-muted-foreground">skin must stay MOUST (mucus glands)</text>
      <text x="432" y="140" fontSize="8.5" className="fill-current text-muted-foreground">O₂ diffuses in → haemoglobin</text>
      <text x="432" y="156" fontSize="8.5" className="fill-current text-muted-foreground">CO₂ diffuses out</text>
      <text x="432" y="176" fontSize="8.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">no lungs, no gills — the skin is enough</text>

      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Closed system (blood stays in vessels) + haemoglobin dissolved in plasma (not in cells) + skin as lung — three linked exam facts.</text>
    </svg>
  );
}
