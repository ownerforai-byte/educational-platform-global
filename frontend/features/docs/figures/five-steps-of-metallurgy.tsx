// FiveStepsOfMetallurgy figure. Theme-aware.
export function FiveStepsOfMetallurgy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Five common steps of metallurgy from crushing to refining">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The five steps every metal walks</text>
      {["1 · CRUSH", "2 · CONCENTRATE", "3 · CALCINE / ROAST", "4 · REDUCE", "5 · REFINE"].map((s, i) => (
        <g key={s}>
          <rect x={25 + i * 126} y="70" width="118" height="70" rx="8" fill={["rgb(59 130 246)", "rgb(16 185 129)", "rgb(245 158 11)", "rgb(239 68 68)", "rgb(139 92 246)"][i]} opacity="0.14" stroke={["rgb(59 130 246)", "rgb(16 185 129)", "rgb(245 158 11)", "rgb(239 68 68)", "rgb(139 92 246)"][i]} strokeWidth="1.5" />
          <text x={84 + i * 126} y="98" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{s}</text>
          <text x={84 + i * 126} y="118" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{["jaw crushers", "float / wash / magnet", "oxide form", "coke or current", "electrolysis"][i]}</text>
        </g>
      ))}
      <text x="330" y="180" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Rock in at step 1 — 99.99 % pure metal out at step 5</text>
    </svg>
  );
}
