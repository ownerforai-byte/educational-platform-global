/**
 * Plant life forms across habitats — hydrophyte, mesophyte, xerophyte,
 * halophyte, epiphyte continuum. Theme-aware via currentColor.
 */
export function PlantHabitatSpectrum({ className }: { className?: string }) {
  const bands = [
    { t: "HYDROPHYTE", s: "in water — aerenchyma, no cuticle", c: "rgb(14 165 233 / 0.9)", x: 20 },
    { t: "MESOPHYTE", s: "moderate water — the ordinary garden plant", c: "rgb(22 163 74 / 0.9)", x: 170 },
    { t: "XEROPHYTE", s: "desert — spines, CAM, deep roots", c: "rgb(217 119 6 / 0.9)", x: 320 },
    { t: "HALOPHYTE", s: "salty mangrove — salt glands, pneumatophores", c: "rgb(244 63 94 / 0.9)", x: 470 },
    { t: "EPIPHYTE", s: "on other plants — aerial roots, not parasitic", c: "rgb(124 58 237 / 0.9)", x: 560 },
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Plant life forms across a habitat spectrum from hydrophyte through mesophyte xerophyte halophyte to epiphyte with key adaptations">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The habitat spectrum — one plant problem at a time</text>
      {bands.map((b, i) => (
        <g key={b.t}>
          <rect x={b.x} y="60" width="120" height="90" rx="10" style={{ color: b.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={b.x + 60} y="86" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{b.t}</text>
          <text x={b.x + 60} y="104" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{b.s.split("—")[0]}</text>
          <text x={b.x + 60} y="118" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{b.s.split("—")[1] ?? ""}</text>
          {i < 4 && <line x1={b.x + 120} y1="105" x2={b.x + 148} y2="105" strokeWidth="2" className="stroke-current text-muted-foreground" />}
        </g>
      ))}
      <text x="16" y="196" fontSize="10" className="fill-current text-muted-foreground">Water is never the whole story: salinity (halophytes excrete salt through glands; pneumatophores breathe in waterlogged mud) and substrate (epiphytes perch, absorbing rain through aerial roots) create their own syndromes.</text>
      <text x="16" y="216" fontSize="10" className="fill-current text-muted-foreground">Mesophytes — rice, mango, wheat — sit in the comfortable middle; most crops are mesophytes, which is why irrigation matters.</text>
      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Exam: match each life form to its habitat and name one adaptation for each.</text>
    </svg>
  );
}
