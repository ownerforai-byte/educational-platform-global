// Sulphide group split. Theme-aware.
export function SulphideGroupSplit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Qualitative analysis split of metal sulphides into acid insoluble group two and acid soluble group four">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The qualitative-analysis split</text>
      <rect x="40" y="50" width="280" height="110" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.14" />
      <text x="180" y="78" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">Group II: ppt in acid</text>
      <text x="180" y="102" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">CuS, CdS, PbS, Bi₂S₃, HgS, As₂S₃</text>
      <text x="180" y="124" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">insoluble in dil. HCl</text>
      <text x="180" y="146" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">(very low Ksp)</text>
      <rect x="340" y="50" width="280" height="110" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="480" y="78" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">Group IV: ppt in NH₄OH</text>
      <text x="480" y="102" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">NiS, CoS, MnS, ZnS, FeS</text>
      <text x="480" y="124" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">soluble in dil. HCl — need</text>
      <text x="480" y="146" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">alkaline medium + more S²⁻</text>
      <text x="330" y="206" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Ksp differences turn one reagent into two selective groups</text>
    </svg>
  );
}
