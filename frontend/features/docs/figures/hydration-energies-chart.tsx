// HydrationEnergiesChart figure. Theme-aware.
export function HydrationEnergiesChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Hydration enthalpy of divalent cations falling from beryllium to barium">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The engine: hydration energy falls fast</text>
      {[
        ["Be²⁺", "−2494", 0.95, "31 pm"],
        ["Mg²⁺", "−1922", 0.75, "65 pm"],
        ["Ca²⁺", "−1577", 0.6, "99 pm"],
        ["Sr²⁺", "−1443", 0.5, "113 pm"],
        ["Ba²⁺", "−1305", 0.42, "135 pm"],
      ].map(([ion, v, w, r], i) => (
        <g key={ion as string}>
          <text x="55" y={58 + i * 28} fontSize="11" fontWeight="700" className="fill-current text-foreground">{ion as string}</text>
          <rect x="120" y={46 + i * 28} width={(w as number) * 330} height="15" rx="4" fill="rgb(59 130 246)" opacity="0.55" />
          <text x={130 + (w as number) * 330} y={59 + i * 28} fontSize="9.5" fill="rgb(59 130 246)">{v as string} kJ/mol</text>
          <text x="590" y={59 + i * 28} fontSize="9" textAnchor="end" className="fill-current text-muted-foreground">{r as string}</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Small ion, big thirst: Be²⁺ holds water twice as tightly as Ba²⁺</text>
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">This falling income is what the three ladders are paid from</text>
    </svg>
  );
}
