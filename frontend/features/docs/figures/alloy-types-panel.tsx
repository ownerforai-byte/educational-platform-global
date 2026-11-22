// Alloy types: substitutional brass and interstitial steel. Theme-aware.
export function AlloyTypesPanel({ className }: { className?: string }) {
  const gridA: [number, number][] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) gridA.push([70 + c * 46, 110 + r * 46]);
  const gridB: [number, number][] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) gridB.push([400 + c * 46, 110 + r * 46]);
  return (
    <svg viewBox="0 0 680 280" className={className} role="img" aria-label="Alloy types panel with substitutional brass zinc atoms replacing copper positions and interstitial steel carbon atoms sitting between iron atoms">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Alloys: guests the electron sea can tolerate</text>
      <text x="180" y="70" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Substitutional - brass</text>
      {gridA.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="13" className="fill-current" style={{ color: i === 4 || i === 7 ? "rgb(139 92 246)" : "rgb(245 158 11)" }} opacity="0.3" />
      ))}
      <text x="180" y="252" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Zn (purple) replaces Cu in the lattice</text>
      <text x="510" y="70" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Interstitial - steel</text>
      {gridB.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="13" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.3" />
      ))}
      {[[446, 133], [538, 133], [492, 179]].map(([x, y], i) => (
        <circle key={"c" + i} cx={x} cy={y} r="6" className="fill-current" style={{ color: "rgb(244 63 94)" }} opacity="0.6" />
      ))}
      <text x="510" y="252" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">C (red) squeezes between Fe atoms</text>
      <text x="340" y="272" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Both block slip planes - alloys are harder than the pure metal</text>
    </svg>
  );
}
