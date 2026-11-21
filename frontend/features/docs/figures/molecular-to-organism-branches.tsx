/** Molecular to organism branches — structure levels of study. Well-detailed. Theme-aware. */
export function MolecularToOrganismBranches({ className }: { className?: string }) {
  const levels: [string, string, string][] = [
    ["Molecular biology", "DNA, RNA, protein machinery of life", "how genes are read"],
    ["Cytology", "cells — the units of structure and function", "mitosis under the microscope"],
    ["Histology / anatomy", "tissues and internal organisation", "xylem rings, gut layers"],
    ["Morphology", "external form of whole organisms", "leaf shapes, body plans"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Molecular to organism branches molecular biology cytology histology anatomy morphology levels of structural study zoom scale">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Zooming out — four levels of structural study</text>
      {levels.map(([name, detail, ex], i) => {
        const y = 48 + i * 56;
        const w = 560 - i * 90;
        return (
          <g key={name}>
            <rect x="40" y={y} width={w} height="44" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `rgb(14 165 233 / ${0.9 - i * 0.12})` }} />
            <text x="56" y={y + 19} fontSize="8.4" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x="56" y={y + 34} fontSize="7" className="fill-current text-muted-foreground">{detail}</text>
            <text x={60 + w} y={y + 28} fontSize="7.2" className="fill-current text-sky-600">{ex}</text>
          </g>
        );
      })}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Each branch is a zoom level on the same organism — and the cell sits at the hinge between chemistry and anatomy.</text>
    </svg>
  );
}
