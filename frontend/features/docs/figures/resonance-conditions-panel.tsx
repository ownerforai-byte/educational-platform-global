// Conditions for resonance: electrons move, atoms do not. Theme-aware.
export function ResonanceConditionsPanel({ className }: { className?: string }) {
  const rules: [string, string][] = [
    ["Only electrons shift", "pi bonds and lone pairs relocate; every atom keeps its position"],
    ["Same atom count", "all forms must have identical sigma framework and charges placed differently"],
    ["Similar energy", "equivalent forms contribute equally; unequal forms contribute by stability"],
    ["Charge hygiene", "keep formal charges small, on electronegative atoms, and octets intact"],
  ];
  return (
    <svg viewBox="0 0 680 300" className={className} role="img" aria-label="Conditions for valid resonance structures electrons move atoms stay framework fixed similar energy and charge hygiene rules">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">What may move in a resonance story</text>
      {rules.map(([head, body], i) => (
        <g key={i}>
          <rect x="24" y={44 + i * 60} width="632" height="52" rx="8" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.08" />
          <rect x="24" y={44 + i * 60} width="632" height="52" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <text x="40" y={66 + i * 60} fontSize="12" className="fill-current text-foreground" fontWeight="800">{head}</text>
          <text x="40" y={86 + i * 60} fontSize="10.5" className="fill-current text-muted-foreground">{body}</text>
        </g>
      ))}
    </svg>
  );
}
