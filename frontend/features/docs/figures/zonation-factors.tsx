/** Factors controlling altitudinal zonation. Theme-aware. */
export function ZonationFactors({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Factors controlling vegetation zonation temperature falls 6 degrees per 1000 m rainfall monsoon and rain shadow altitude thin air intense UV soil and slope">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">What controls the zones?</text>
      {[
        { y: 58, t: "TEMPERATURE", s: "falls ~6 °C per 1000 m — the master variable, mirrors latitude vertically" },
        { y: 96, t: "RAINFALL", s: "high monsoon mid-hills; rain-shadow (Mustang, Manang) dry → xeric plants" },
        { y: 134, t: "ALTITUDE (pressure, UV)", s: "thin air, intense UV → dwarf, cushion, woolly alpine plants" },
        { y: 172, t: "SOIL AND SLOPE", s: "alluvial Terai vs rocky slopes — depth and drainage decide species" },
      ].map((s) => (
        <g key={s.t}>
          <text x="30" y={s.y} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{s.t}</text>
          <text x="240" y={s.y} fontSize="7.2" className="fill-current text-muted-foreground">{s.s}</text>
        </g>
      ))}
      <text x="16" y="204" fontSize="8.6" className="fill-current text-muted-foreground">Rule of thumb: climbing 1000 m ≈ travelling 1000 km toward the poles.</text>
    </svg>
  );
}
