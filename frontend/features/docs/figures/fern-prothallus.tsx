/** Fern prothallus structure — heart-shaped gametophyte with sex organs and rhizoids. Theme-aware. */
export function FernProthallus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Fern prothallus heart shaped green gametophyte with antheridia near rhizoids archegonia near notch and single layer of cells">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The prothallus — a whole plant you can lose under a thumb</text>

      {/* heart shape */}
      <path d="M330 190 q-90 -10 -110 -60 q-10 -40 40 -44 q40 -4 70 24 q30 -28 70 -24 q50 4 40 44 q-20 50 -110 60 Z" className="fill-current text-emerald-500/25" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="330" y="70" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">notch (growing point)</text>
      <line x1="330" y1="76" x2="330" y2="96" strokeWidth="1.5" className="stroke-current text-muted-foreground" />

      {/* archegonia near notch */}
      {[[310, 110], [350, 112]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" className="fill-current text-rose-600/70" />
      ))}
      <text x="330" y="132" fontSize="8" textAnchor="middle" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">archegonia (eggs) — near the notch</text>

      {/* antheridia among rhizoids */}
      {[[260, 170], [400, 168], [330, 178]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" className="fill-current text-sky-600/70" />
      ))}
      <text x="330" y="200" fontSize="8" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">antheridia (sperm) — among the rhizoids below</text>

      {/* facts */}
      <rect x="470" y="60" width="180" height="120" rx="12" className="fill-current text-teal-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
      <text x="486" y="86" fontSize="9.5" className="fill-current text-foreground" fontWeight="800">Quick facts</text>
      {["heart-shaped, 5–10 mm", "one cell thick", "photosynthesises itself", "rhizoids (not roots)", "hermaphrodite"].map((s, i) => (
        <text key={i} x="486" y={106 + i * 17} fontSize="8.3" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      <text x="16" y="228" fontSize="10" className="fill-current text-muted-foreground">The fragile gametophyte is the weakest link in the fern's life — which is why seed plants later hid theirs inside pollen and ovules.</text>
    </svg>
  );
}
