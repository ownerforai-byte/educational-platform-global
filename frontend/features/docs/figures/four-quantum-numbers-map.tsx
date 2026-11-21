// The four quantum numbers as an electron address. Theme-aware.
export function FourQuantumNumbersMap({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["n", "Principal", "Shell — size and energy", "1, 2, 3, … (capacity 2n²)"],
    ["l", "Azimuthal", "Subshell — shape", "0 to n−1: s, p, d, f"],
    ["mₗ", "Magnetic", "Orientation in space", "−l … 0 … +l (2l + 1 orbitals)"],
    ["mₛ", "Spin", "Electron spin direction", "+1/2 or −1/2 only"],
  ];
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Four quantum numbers as an address n shell l subshell m l orientation m s spin with allowed values and an address analogy">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The four quantum numbers — an address for every electron</text>
      {rows.map(([s, name, meaning, values], i) => (
        <g key={s}>
          <rect x="30" y={40 + i * 44} width="660" height="38" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="48" y={64 + i * 44} fontSize="13" className="fill-current text-sky-600" fontWeight="800">{s}</text>
          <text x="86" y={58 + i * 44} fontSize="9" className="fill-current text-foreground" fontWeight="800">{name}</text>
          <text x="86" y={72 + i * 44} fontSize="7.8" className="fill-current text-muted-foreground">{meaning}</text>
          <text x="674" y={64 + i * 44} fontSize="8.4" textAnchor="end" className="fill-current text-foreground" fontWeight="700">{values}</text>
        </g>
      ))}
      <rect x="30" y="220" width="660" height="0" rx="0" />
      <text x="360" y="236" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Address analogy: n = country, l = city, mₗ = street, mₛ = side of the street — all four pin down exactly one electron state.</text>
    </svg>
  );
}
