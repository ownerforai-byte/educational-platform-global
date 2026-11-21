// Bohr model with its five stock defects as callouts. Theme-aware.
export function BohrDefectsMap({ className }: { className?: string }) {
  const defects: [string, string, number, number][] = [
    ["Fails for multi-electron atoms", "repulsion + shielding break Eₙ", 40, 60],
    ["No fine structure", "one line, no sub-levels", 470, 60],
    ["Zeeman & Stark unexplained", "no mₗ — no magnetic/electric split", 40, 200],
    ["Orbits vs uncertainty", "Δx·Δp ≥ h/4π forbids tracks", 470, 200],
    ["No line intensities; circles only", "cannot say how bright, no ellipses", 255, 268],
  ];
  return (
    <svg viewBox="0 0 720 320" className={className} role="img" aria-label="Bohr atom in the centre with five defect callouts multi-electron fine structure Zeeman Stark uncertainty and line intensities">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Bohr's model — five seams the quantum model had to fix</text>
      <circle cx="360" cy="150" r="52" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <circle cx="360" cy="150" r="30" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <circle cx="360" cy="120" r="4" className="fill-current text-foreground" />
      <circle cx="335" cy="165" r="4" className="fill-current text-foreground" />
      <circle cx="388" cy="162" r="4" className="fill-current text-foreground" />
      <text x="360" y="155" fontSize="9" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Bohr atom</text>
      {defects.map(([t, d, x, y]) => (
        <g key={t}>
          <rect x={x} y={y} width="210" height="42" rx="9" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x + 12} y={y + 17} fontSize="8.6" className="fill-current text-foreground" fontWeight="800">{t}</text>
          <text x={x + 12} y={y + 32} fontSize="7.6" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}
      <text x="360" y="312" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Each defect is a missing quantum number: fine structure → l; Zeeman/Stark → mₗ; spin splitting → mₛ; multi-electron failure → shielding.</text>
    </svg>
  );
}
