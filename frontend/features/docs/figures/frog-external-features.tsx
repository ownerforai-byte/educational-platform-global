/** Frog external features — body regions, webbed feet, tympanum. Theme-aware. */
export function FrogExternalFeatures({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Frog external features showing head trunk webbed hind limbs tympanum eyes nostrils and skin with mucus glands">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Rana tigrina — reading the frog from outside</text>

      {/* body */}
      <ellipse cx="300" cy="140" rx="170" ry="56" className="fill-current text-emerald-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      {/* head */}
      <ellipse cx="470" cy="130" rx="60" ry="38" className="fill-current text-emerald-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      {/* eye */}
      <circle cx="486" cy="112" r="9" className="fill-current text-amber-400/70" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(251 191 36)" }} />
      <text x="486" y="86" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">prominent eyes (nictitating membrane)</text>
      {/* nostril */}
      <circle cx="520" cy="118" r="3" className="fill-current text-foreground" />
      <text x="540" y="108" fontSize="8.5" className="fill-current text-muted-foreground">nostrils</text>
      {/* tympanum */}
      <circle cx="452" cy="136" r="9" className="fill-current text-slate-500/50" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(100 116 139 / 0.9)" }} />
      <text x="452" y="166" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">tympanum (eardrum)</text>
      {/* mouth */}
      <path d="M500 142 q-30 14 -60 12" fill="none" strokeWidth="2.5" className="stroke-current text-foreground" />
      <text x="540" y="150" fontSize="8.5" className="fill-current text-muted-foreground">wide mouth — tongue flips out</text>

      {/* forelimb */}
      <g className="stroke-current text-emerald-600" strokeWidth="3.5">
        <line x1="200" y1="160" x2="180" y2="200" /><line x1="180" y1="200" x2="196" y2="222" />
      </g>
      <text x="150" y="238" fontSize="8.5" className="fill-current text-muted-foreground">forelimb — 4 fingers, shock absorber on landing</text>

      {/* hindlimb */}
      <g className="stroke-current text-emerald-600" strokeWidth="4">
        <line x1="150" y1="130" x2="90" y2="150" /><line x1="90" y1="150" x2="80" y2="210" /><line x1="80" y1="210" x2="110" y2="236" />
      </g>
      <path d="M110 236 q20 8 34 2 q10 -6 -4 -10 q-16 -4 -30 8" className="fill-current text-emerald-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="70" y="120" fontSize="8.5" className="fill-current text-muted-foreground">webbed hind limb — the swimming oar + 5-toed jump lever</text>

      <text x="16" y="256" fontSize="10" className="fill-current text-muted-foreground">Skin: moist, glandular, scaleless — it breathes through it. Body divided into head + trunk only (no neck); vertebral column short (10 vertebrae).</text>
    </svg>
  );
}
