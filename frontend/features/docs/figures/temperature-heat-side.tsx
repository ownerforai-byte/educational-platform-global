// Temperature effect: heat sits on one side of the equation. Theme-aware.
export function TemperatureHeatSide({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Heat written on the product side for exothermic reactions and reactant side for endothermic reactions decides the temperature shift">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Write heat into the equation</text>
      <rect x="40" y="50" width="580" height="64" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.13" />
      <text x="60" y="78" fontSize="13" fontWeight="800" className="fill-current text-foreground">exothermic:  N₂ + 3H₂ ⇌ 2NH₃ + heat</text>
      <text x="60" y="100" fontSize="11" className="fill-current text-muted-foreground">heat is a product - heating drives backward (kills yield)</text>
      <rect x="40" y="132" width="580" height="64" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.13" />
      <text x="60" y="160" fontSize="13" fontWeight="800" className="fill-current text-foreground">endothermic:  N₂O₄ + heat ⇌ 2NO₂</text>
      <text x="60" y="182" fontSize="11" className="fill-current text-muted-foreground">heat is a reactant - heating drives forward (deepens brown)</text>
      <text x="330" y="232" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Heating favours whichever side can absorb it - and only T rewrites Kc</text>
    </svg>
  );
}
