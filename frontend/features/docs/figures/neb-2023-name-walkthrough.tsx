// Neb2023NameWalkthrough figure. Theme-aware.
export function Neb2023NameWalkthrough({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="NEB 2023 verified PYQ IUPAC name 2-ethyl-5-methylhexan-1-ol">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">NEB 2023 (verified PYQ): the long-chain alcohol</text>
      <rect x="40" y="52" width="580" height="60" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="330" y="76" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃CH(CH₃)CH₂CH₂CH(CH₂CH₃)CH₂OH — find the longest chain (6 C) holding the –OH</text>
      <text x="330" y="98" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">number from the –OH end: C1 bears –OH, C2 bears –CH₂CH₃, C5 bears –CH₃</text>
      {[
        ["hexan-1-ol", "parent: 6 C + –OH at C1", "rgb(16 185 129)", 40],
        ["2-ethyl", "ethyl at C2", "rgb(245 158 11)", 240],
        ["5-methyl", "methyl at C5", "rgb(139 92 246)", 440],
      ].map(([h, d, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="130" width="180" height="56" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="152" fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y="172" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="212" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">2-ethyl-5-methylhexan-1-ol (substituents alphabetical)</text>
    </svg>
  );
}
