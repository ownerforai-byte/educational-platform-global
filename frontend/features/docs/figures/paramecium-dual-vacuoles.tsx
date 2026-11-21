/** Paramecium osmoregulation dual vacuoles — two pumps. Well-detailed. Theme-aware. */
export function ParameciumDualVacuoles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Paramecium dual contractile vacuoles anterior posterior radiating canals alternating discharge freshwater balance excretion">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two pumps, one balance — Paramecium's vacuoles</text>
      {/* cell */}
      <ellipse cx="240" cy="150" rx="150" ry="80" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {/* two vacuoles with canals */}
      {[[170, 120], [310, 180]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="16" className="fill-current text-sky-500/35" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const rad = (a * Math.PI) / 180;
            return <line key={a} x1={x + 16 * Math.cos(rad)} y1={y + 16 * Math.sin(rad)} x2={x + 34 * Math.cos(rad)} y2={y + 34 * Math.sin(rad)} className="stroke-current" strokeWidth="1.2" style={{ color: "rgb(2 132 199 / 0.9)" }} />;
          })}
          <text x={x} y={y + (i === 0 ? -30 : 46)} fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{i === 0 ? "anterior" : "posterior"} vacuole</text>
        </g>
      ))}
      <text x="240" y="252" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">radiating canals collect water from the cytoplasm into the central vacuole</text>
      {/* facts */}
      <rect x="450" y="44" width="240" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="570" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY TWO, AND WHY ALTERNATE</text>
      {[
        "one at each end of the slipper",
        "  cell — no dead zones",
        "they discharge alternately, so",
        "  pumping never pauses",
        "canals gather water + some",
        "  nitrogenous waste",
        "a full cycle takes only seconds",
        "  in active freshwater ciliates",
      ].map((t, i) => (
        <text key={t} x="466" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: two contractile vacuoles, alternating discharge, radiating canals — three precise details examiners look for.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Amoeba manages with one; Paramecium's shape demands two.</text>
    </svg>
  );
}
