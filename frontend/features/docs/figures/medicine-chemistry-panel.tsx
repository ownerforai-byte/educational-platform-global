// Chemistry in medicine. Theme-aware.
export function MedicineChemistryPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Chemistry in medicine drug synthesis dosage formulation and analysis with examples aspirin cisplatin antacids">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Chemistry in medicine — from molecule to pharmacy</text>
      {[
        ["Design & synthesis", "aspirin (acetylsalicylic acid), paracetamol — built molecule by molecule", 30, 44],
        ["Anaesthetics", "nitrous oxide, halothane — chemistry switches off pain", 370, 44],
        ["Diagnostic chemistry", "glucose strips, urea tests — reactions read as numbers", 30, 116],
        ["Anticancer agents", "cisplatin — a platinum complex that stops DNA copying", 370, 116],
      ].map(([t, d, x, y]) => (
        <g key={String(t)}>
          <rect x={Number(x)} y={Number(y)} width="320" height="62" rx="10" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(244 63 94 / 0.85)" }} />
          <text x={Number(x) + 16} y={Number(y) + 22} fontSize="9.5" className="fill-current text-rose-500" fontWeight="800">{String(t)}</text>
          <text x={Number(x) + 16} y={Number(y) + 42} fontSize="7.8" className="fill-current text-muted-foreground">{String(d).slice(0, 46)}</text>
          <text x={Number(x) + 16} y={Number(y) + 54} fontSize="7.8" className="fill-current text-muted-foreground">{String(d).slice(46, 92)}</text>
        </g>
      ))}
      <rect x="30" y="188" width="660" height="16" rx="0" />
      <text x="360" y="202" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Drug + body is still chemistry: binding, dose, metabolism — the reason pharmacy begins in a chemistry lab.</text>
    </svg>
  );
}
