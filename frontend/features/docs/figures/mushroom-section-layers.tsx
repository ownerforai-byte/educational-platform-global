/** Mushroom cross-section — full anatomy. Well-detailed. Theme-aware. */
export function MushroomSectionLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 320" className={className} role="img" aria-label="Mushroom cross section anatomy cap pileus gills lamellae stipe annulus ring volva cup mycelium underground hyphae basidia on gill surfaces spores basidiocarp structure labelled">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mushroom anatomy — the basidiocarp in section</text>

      {/* underground mycelium */}
      <rect x="30" y="230" width="660" height="70" rx="10" className="fill-current text-amber-800/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      <text x="46" y="250" fontSize="7" className="fill-current text-muted-foreground">SOIL — mycelium (the real body)</text>
      <path d="M350 230 q-60 -10 -110 8 M350 230 q60 -10 110 8 M350 230 q-20 -14 -10 -24 M350 230 q20 -14 10 -24" className="fill-none stroke-current text-amber-700" strokeWidth="2" />

      {/* stipe */}
      <rect x="336" y="120" width="28" height="112" rx="10" className="fill-current text-stone-300/40" stroke="currentColor" strokeWidth="2.5" style={{ color: "rgb(214 211 209 / 0.9)" }} />
      {/* volva */}
      <path d="M320 232 q30 22 60 0 q-6 -12 -30 -14 q-24 2 -30 14" className="fill-none stroke-current text-rose-500" strokeWidth="3" />
      <text x="395" y="240" fontSize="7.4" className="fill-current text-rose-500" fontWeight="700">volva (cup — egg remnant)</text>
      {/* annulus */}
      <rect x="328" y="150" width="44" height="8" rx="4" className="fill-none stroke-current text-amber-600" strokeWidth="2.5" />
      <text x="395" y="158" fontSize="7.4" className="fill-current text-amber-600" fontWeight="700">annulus (ring — veil remnant)</text>
      {/* cap */}
      <path d="M250 122 q100 -80 200 0 q-40 14 -100 14 q-60 0 -100 -14" className="fill-current text-rose-500/25" stroke="currentColor" strokeWidth="3" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="350" y="58" fontSize="8" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">pileus (cap)</text>
      {/* gills */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={286 + i * 26} y1={i < 3 ? 128 : 126} x2={330 + i * 8} y2="150" strokeWidth="2.5" className="stroke-current text-rose-600" />
      ))}
      <text x="230" y="170" fontSize="7.4" className="fill-current text-rose-600" fontWeight="700">gills (lamellae) —</text>
      <text x="230" y="184" fontSize="7.4" className="fill-current text-rose-600" fontWeight="700">spore factory</text>

      {/* labels right */}
      <rect x="470" y="60" width="220" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="490" y="82" fontSize="8.2" className="fill-current text-foreground" fontWeight="800">PARTS AND JOBS</text>
      {["cap: protects gills", "gills: basidia make spores", "stipe: lifts gills into airflow", "annulus + volva: veil remnants", "mycelium: absorption + anchoring"].map((t, i) => (
        <text key={t} x="490" y={104 + i * 20} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      <text x="16" y="316" fontSize="8.4" className="fill-current text-muted-foreground">Only the fruiting body is visible — the feeding mycelium below may run for metres through the soil.</text>
    </svg>
  );
}
