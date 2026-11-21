/** UV penetration comparison — healthy vs thinned ozone. Well-detailed. Theme-aware. */
export function UvPenetrationComparison({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="UV penetration healthy ozone versus thinned layer skin cancer cataract DNA mutation plankton damage effects comparison shield">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">One thin layer, two worlds of UV</text>

      {/* healthy */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HEALTHY OZONE</text>
      <rect x="70" y="84" width="250" height="26" rx="6" className="fill-current text-emerald-500/40" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="195" y="102" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">ozone layer absorbs UV-B, UV-C</text>
      {[[0, 1], [1, 1], [2, 1], [3, 1]].map(([j, s], i) => (
        <line key={i} x1={100 + i * 60} y1="140" x2={100 + i * 60} y2="120" className="stroke-current text-rose-400" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} markerEnd="url(#arrhl)" />
      ))}
      <text x="195" y="164" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">UV hits the shield and stops</text>
      {["sunburn stays mild", "skin-cancer rates low", "plankton and crops unharmed"].map((t, i) => (
        <text key={t} x="50" y={192 + i * 16} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="50" y="254" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">a shield 3 mm thick at sea-level pressure</text>

      {/* thinned */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THINNED OZONE</text>
      <rect x="430" y="84" width="220" height="12" rx="4" className="fill-current text-rose-500/30" stroke="currentColor" strokeWidth="1.6" strokeDasharray="6 4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="110" fontSize="7.4" textAnchor="middle" className="fill-current text-rose-500" fontWeight="700">holes and thinning let UV-B through</text>
      {[0, 1, 2, 3].map((j) => (
        <line key={j} x1={430 + j * 70} y1="130" x2={430 + j * 70} y2="170" className="stroke-current text-rose-500" strokeWidth="2.4" style={{ color: "rgb(244 63 94 / 0.9)" }} markerEnd="url(#arrhl)" />
      ))}
      {["skin cancer and cataracts rise", "DNA damage in plants, plankton die-off", "immunity suppression in humans"].map((t, i) => (
        <text key={t} x="410" y={192 + i * 16} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="410" y="254" fontSize="7" className="fill-current text-rose-500" fontWeight="700">worst over Antarctica each spring</text>
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: UV-B damages DNA; UV-C would sterilise the surface — the ozone layer stops both.</text>
    </svg>
  );
}
