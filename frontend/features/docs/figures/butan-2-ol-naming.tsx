// Butan2olNaming figure. Theme-aware.
export function Butan2olNaming({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="NEB 2024 verified PYQ naming CH3CH(OH)CH2CH3 as butan-2-ol">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">NEB 2024 (verified PYQ): name CH₃CH(OH)CH₂CH₃</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="180" y="80" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Step 1–2: chain + numbering</text>
      <text x="180" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C1–C2–C3–C4, –OH on C2</text>
      <text x="180" y="135" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">four-carbon chain → root "but-"</text>
      <text x="180" y="156" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">lowest locant puts –OH at C2</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.08" stroke="rgb(16 185 129)" />
      <text x="480" y="80" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">Step 3–5: suffix + assembly</text>
      <text x="480" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">but- + an- + 2-ol</text>
      <text x="480" y="135" fontSize="13" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">= butan-2-ol</text>
      <text x="480" y="156" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">(not butan-3-ol — count the other way)</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">alcohol suffix "-ol" with its locant joined directly: butan-2-ol</text>
    </svg>
  );
}
