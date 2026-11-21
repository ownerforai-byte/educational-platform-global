// Defect to quantum fix mapping. Theme-aware.
export function DefectFixMap({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Multi-electron failure", "electron–electron repulsion ignored", "quantum model + shielding (Z_eff)"],
    ["No fine structure", "only circular orbits, one l value", "azimuthal quantum number l + spin mₛ"],
    ["Zeeman / Stark missing", "no orientation quantum number", "magnetic quantum number mₗ"],
    ["Orbits vs uncertainty", "definite path impossible", "orbitals: probability density ψ²"],
  ];
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Defect to fix map four Bohr defects each paired with the quantum mechanical concept that repairs it">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Each defect points at one missing quantum number</text>
      {rows.map(([defect, why, fix], i) => (
        <g key={defect}>
          <rect x="30" y={40 + i * 46} width="300" height="40" rx="9" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x="46" y={58 + i * 46} fontSize="8.8" className="fill-current text-foreground" fontWeight="800">{defect}</text>
          <text x="46" y={73 + i * 46} fontSize="7.6" className="fill-current text-muted-foreground">{why}</text>
          <text x="345" y={64 + i * 46} fontSize="11" className="fill-current text-sky-500" fontWeight="800">→</text>
          <rect x="380" y={40 + i * 46} width="310" height="40" rx="9" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x="396" y={64 + i * 46} fontSize="8.8" className="fill-current text-emerald-600" fontWeight="800">{fix}</text>
        </g>
      ))}
      <text x="360" y="232" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">This mapping is the 3m answer skeleton: name the defect, say why Bohr fails, name the quantum concept that replaces it.</text>
    </svg>
  );
}
