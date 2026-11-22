// Worked NEB 2024 ammonia Kc numerical. Theme-aware.
export function Nh3KcNumerical({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["given", "Kc = 0.5,  [N2] = 1.0 M,  [H2] = 0.5 M"],
    ["expression", "Kc = [NH3]^2 / ([N2][H2]^3)"],
    ["substitute", "0.5 = [NH3]^2 / (1.0 x (0.5)^3) = [NH3]^2 / 0.125"],
    ["isolate", "[NH3]^2 = 0.5 x 0.125 = 0.0625"],
    ["answer", "[NH3] = sqrt(0.0625) = 0.25 M"],
  ];
  return (
    <svg viewBox="0 0 660 310" className={className} role="img" aria-label="Step-by-step solution of the NEB 2024 numerical finding ammonia concentration 0.25 molar from Kc 0.5">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">NEB 2024: the ammonia numerical</text>
      <text x="20" y="46" fontSize="11.5" className="fill-current text-muted-foreground">N2(g) + 3H2(g) ⇌ 2NH3(g)</text>
      {steps.map(([t, s], i) => (
        <g key={i}>
          <rect x="40" y={60 + i * 44} width="580" height="36" rx="8" className="fill-current" style={{ color: i === 4 ? "rgb(16 185 129)" : "rgb(59 130 246)" }} opacity={i === 4 ? 0.2 : 0.1} />
          <text x="58" y={83 + i * 44} fontSize="11.5" fontWeight="800" className="fill-current text-foreground" textAnchor="start">{t}</text>
          <text x="150" y={83 + i * 44} fontSize="12.5" fontWeight={i === 4 ? 800 : 600} style={{ fill: i === 4 ? "rgb(16 185 129)" : "rgb(59 130 246)" }}>{s}</text>
        </g>
      ))}
      <text x="330" y="298" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Coefficient 3 becomes a cube: (0.5)^3 = 0.125 - the step that decides the mark</text>
    </svg>
  );
}
