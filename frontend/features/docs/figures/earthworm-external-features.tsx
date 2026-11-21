/** Earthworm external features — segments, clitellum, setae, pores. Theme-aware. */
export function EarthwormExternalFeatures({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Earthworm external features with segments clitellum setae dorsal pores mouth prostomium and genital pores labelled">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Pheretima posthuma — reading the outside</text>

      {/* body */}
      <path d="M60 120 q60 -26 130 -22 q80 4 140 0 q90 -6 160 4 q60 8 60 18 q0 12 -60 18 q-70 10 -160 4 q-60 -4 -140 0 q-70 4 -130 -22 Z" className="fill-current text-rose-500/12" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(190 90 90 / 0.9)" }} />

      {/* segments */}
      {Array.from({ length: 16 }, (_, i) => (
        <path key={i} d={`M${80 + i * 32} ${100 - Math.abs(i - 8) * 1.2} q4 20 0 40`} fill="none" strokeWidth="1.5" className="stroke-current text-rose-600/50" />
      ))}

      {/* clitellum */}
      <rect x="290" y="94" width="70" height="52" rx="10" className="fill-current text-amber-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="325" y="82" fontSize="9" textAnchor="middle" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="800">clitellum (14–16)</text>
      <text x="325" y="166" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">glandular saddle — secretes the cocoon</text>

      {/* head end */}
      <text x="46" y="88" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">prostomium + mouth</text>
      <text x="46" y="170" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">no eyes — receptors in skin</text>

      {/* setae */}
      <g className="stroke-current text-slate-600" strokeWidth="2">
        {[[110, 96], [180, 96], [250, 96], [110, 146], [180, 146], [250, 146]].map(([x, y], i) => (
          <line key={i} x1={x} y1={y} x2={x - 6} y2={y - 8} />
        ))}
      </g>
      <text x="140" y="86" fontSize="8.5" className="fill-current text-muted-foreground">setae — S-shaped chitinous anchors for locomotion</text>

      {/* posterior */}
      <text x="590" y="88" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">anus (last segment)</text>
      <text x="590" y="170" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">dorsal pore — coelomic fluid out</text>

      <text x="16" y="216" fontSize="10" className="fill-current text-muted-foreground">100–150 metameres, 12–30 cm, brownish. Genital openings: female pore on 14, male pores on 18, spermathecal pores in grooves 5/6–8/9.</text>
    </svg>
  );
}
