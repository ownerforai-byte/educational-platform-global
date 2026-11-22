// Chemistry in energy. Theme-aware.
export function EnergyChemistryPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Chemistry in energy fossil fuels fuel cells solar photovoltaic and biogas with reaction basis">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Chemistry as the energy engine</text>
      {[
        ["Fossil fuels", "combustion: CH₄ + 2O₂ → CO₂ + 2H₂O + heat", 30, 44],
        ["Fuel cells", "H₂ + O₂ → H₂O, electricity directly, no burning", 370, 44],
        ["Solar & storage", "silicon purification, lithium-ion electrode chemistry", 30, 116],
        ["Biogas", "anaerobic digestion → methane for Nepali kitchens", 370, 116],
      ].map(([t, d, x, y]) => (
        <g key={String(t)}>
          <rect x={Number(x)} y={Number(y)} width="320" height="62" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.85)" }} />
          <text x={Number(x) + 16} y={Number(y) + 22} fontSize="9.5" className="fill-current text-amber-600" fontWeight="800">{String(t)}</text>
          <text x={Number(x) + 16} y={Number(y) + 42} fontSize="7.8" className="fill-current text-muted-foreground">{String(d).slice(0, 46)}</text>
          <text x={Number(x) + 16} y={Number(y) + 54} fontSize="7.8" className="fill-current text-muted-foreground">{String(d).slice(46, 92)}</text>
        </g>
      ))}
      <rect x="30" y="188" width="660" height="16" rx="0" />
      <text x="360" y="202" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Every energy story is an electron-transfer story — that is why electrochemistry sits inside physical chemistry.</text>
    </svg>
  );
}
