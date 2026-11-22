// White fumes test NH3 + HCl. Theme-aware.
export function WhiteFumesTest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="Ammonia and hydrogen chloride gases meeting to form dense white fumes of ammonium chloride">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Two rods, one white cloud</text>
      <text x="120" y="80" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(14 165 233)">rod dipped in conc. NH₃</text>
      <text x="540" y="80" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">rod dipped in conc. HCl</text>
      <path d="M 180 100 Q 330 60 480 100" stroke="rgb(148 163 184)" strokeWidth="3" fill="none" />
      <circle cx="330" cy="82" r="26" className="fill-current" style={{ color: "rgb(226 232 240)" }} opacity="0.7" />
      <text x="330" y="140" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">NH₃ + HCl → NH₄Cl (dense white fumes)</text>
      <text x="330" y="176" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">A gas identification classic - and the reason open bottles of NH₃ and HCl quarrel</text>
    </svg>
  );
}
