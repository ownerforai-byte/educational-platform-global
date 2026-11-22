// NaohPropertiesPanel figure. Theme-aware.
export function NaohPropertiesPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Properties panel of sodium hydroxide as strong deliquescent caustic base">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">NaOH — caustic soda</text>
      {[
        ["strong, monobasic", "NaOH → Na⁺ + OH⁻ completely", "rgb(239 68 68)"],
        ["deliquescent", "drinks air: H₂O + CO₂ → Na₂CO₃ crust", "rgb(59 130 246)"],
        ["exothermic in water", "dissolving burns — add pellet TO water", "rgb(245 158 11)"],
        ["caustic to skin", "saponifies skin fats — soapy touch", "rgb(139 92 246)"],
        ["mp 318 °C", "white solid, very soluble", "rgb(16 185 129)"],
      ].map(([head, sub, col], i) => (
        <g key={head as string}>
          <rect x="40" y={48 + i * 34} width="580" height="28" rx="6" fill={col as string} opacity="0.1" />
          <text x="58" y={67 + i * 34} fontSize="11" fontWeight="800" fill={col as string}>{head as string}</text>
          <text x="300" y={67 + i * 34} fontSize="10.5" className="fill-current text-muted-foreground">{sub as string}</text>
        </g>
      ))}
    </svg>
  );
}
