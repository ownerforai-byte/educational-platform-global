/** Ozone vs greenhouse — two different atmospheric problems. Well-detailed. Theme-aware. */
export function OzoneVsGreenhouse({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["What goes wrong", "UV-B reaches the surface", "too much heat is trapped"],
    ["Culprit gas", "CFCs (chlorine radicals)", "CO₂, CH₄, N₂O, CFCs"],
    ["Where it acts", "stratosphere, ~25 km up", "troposphere, near the surface"],
    ["Main harm", "skin cancer, cataracts, plankton loss", "warming, sea rise, monsoon shift"],
    ["The fix", "ban CFCs — Montreal Protocol", "cut emissions — energy transition"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ozone depletion versus greenhouse effect comparison two different atmospheric problems CFCs CO2 stratosphere troposphere Montreal energy transition">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ozone hole ≠ greenhouse effect — don't mix them up</text>
      <rect x="30" y="44" width="180" height="30" rx="6" className="fill-current text-slate-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="120" y="64" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Aspect</text>
      <rect x="215" y="44" width="235" height="30" rx="6" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="332" y="64" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Ozone depletion</text>
      <rect x="455" y="44" width="235" height="30" rx="6" className="fill-current text-rose-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="572" y="64" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Greenhouse effect</text>
      {rows.map(([f, o, g], i) => {
        const y = 82 + i * 38;
        return (
          <g key={f}>
            <rect x="30" y={y} width="660" height="32" rx="6" className="fill-current text-slate-500/5" stroke="currentColor" strokeWidth="1" style={{ color: "rgb(120 113 108 / 0.4)" }} />
            <text x="46" y={y + 20} fontSize="7.4" className="fill-current text-foreground" fontWeight="700">{f}</text>
            <text x="230" y={y + 20} fontSize="7.2" className="fill-current text-muted-foreground">{o}</text>
            <text x="470" y={y + 20} fontSize="7.2" className="fill-current text-muted-foreground">{g}</text>
          </g>
        );
      })}
      <rect x="30" y="274" width="660" height="18" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="287" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Overlap: CFCs do both — destroy ozone and trap heat. Otherwise the two problems live on different floors of the sky.</text>
    </svg>
  );
}
