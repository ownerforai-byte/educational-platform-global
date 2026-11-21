/** Gene therapy — fixing the gene, not the symptom. Well-detailed. Theme-aware. */
export function GeneTherapyCycle({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["1. Diagnose", "identify the faulty gene causing the disease"],
    ["2. Build vector", "disabled virus carries a healthy gene copy"],
    ["3. Deliver", "vector infects the patient's target cells"],
    ["4. Express", "cells read the new gene and make the protein"],
    ["5. Correct", "missing function restored; disease eased"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Gene therapy cycle faulty gene vector disabled virus healthy gene delivery target cells protein expression treatment SCID cystic fibrosis">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Gene therapy — five beats from defect to cure</text>
      {steps.map(([s, d], i) => {
        const x = 30 + (i % 3) * 228;
        const y = 48 + Math.floor(i / 3) * 118;
        return (
          <g key={s}>
            <rect x={x} y={y} width="210" height="100" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
            <text x={x + 14} y={y + 22} fontSize="8" className="fill-current text-foreground" fontWeight="800">{s}</text>
            <text x={x + 14} y={y + 44} fontSize="7" className="fill-current text-muted-foreground">{d.slice(0, 34)}</text>
            {d.length > 34 && <text x={x + 14} y={y + 58} fontSize="7" className="fill-current text-muted-foreground">{d.slice(34, 68)}</text>}
            <text x={x + 14} y={y + 84} fontSize="6.6" className="fill-current text-violet-500">{["genetic testing", "retrovirus / adenovirus", "bone marrow, lung cells"][i] ?? ""}</text>
            {i < 4 && <line x1={x + 210} y1={y + 50} x2={x + 228} y2={y + 50} className="stroke-current text-violet-500" strokeWidth="2" style={{ color: "rgb(139 92 246 / 0.9)" }} markerEnd="url(#arrhl)" />}
          </g>
        );
      })}
      <rect x="488" y="166" width="202" height="100" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="502" y="188" fontSize="8" className="fill-current text-foreground" fontWeight="800">Targets in the syllabus</text>
      {["SCID — bubble-boy immune defect", "cystic fibrosis — lung chloride", "haemophilia — clotting factor"].map((t, i) => (
        <text key={t} x="502" y={210 + i * 17} fontSize="7" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-violet-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: gene therapy replaces the faulty instruction; the disabled vector cannot cause disease itself.</text>
    </svg>
  );
}
