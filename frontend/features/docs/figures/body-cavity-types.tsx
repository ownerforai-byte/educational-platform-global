/** Body cavity types — acoelomate, pseudocoelomate, coelomate. Theme-aware. */
export function BodyCavityTypes({ className }: { className?: string }) {
  const plan = (cx: number, k: string, title: string, ex: string, meso: "none" | "packed" | "lined") => {
    const inner = meso === "none" ? (
      <rect x={cx - 18} y="110" width="36" height="50" rx="8" className="fill-current text-amber-500/50" stroke="none" />
    ) : meso === "packed" ? (
      <rect x={cx - 18} y="110" width="36" height="50" rx="8" className="fill-current text-amber-500/50" stroke="none" />
    ) : (
      <rect x={cx - 16} y="112" width="32" height="46" rx="8" className="fill-current text-amber-500/50" stroke="none" />
    );
    return (
      <g key={k}>
        <ellipse cx={cx} cy="135" rx="52" ry="70" className="fill-current text-sky-500/8" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        {meso === "lined" && <ellipse cx={cx} cy="135" rx="34" ry="52" className="fill-current text-violet-500/20" stroke="none" />}
        {inner}
        <text x={cx} y="50" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{title}</text>
        <text x={cx} y="230" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{ex}</text>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Three body cavity plans acoelomate flatworm solid mesoderm pseudocoelomate roundworm false cavity and true coelomate earthworm with mesoderm lining">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Body cavities — three plans, rising complexity</text>

      {plan(110, "a", "ACOELOMATE", "flatworms (Planaria) — no cavity", "none")}
      <text x="110" y="252" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">mesoderm packed solid</text>

      {plan(330, "b", "PSEUDOCOELOMATE", "roundworms (Ascaris)", "packed")}
      <text x="330" y="252" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">false cavity, not lined by mesoderm</text>

      {plan(550, "c", "COELOMATE", "earthworm → vertebrates", "lined")}
      <text x="550" y="252" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">true coelom, mesoderm-lined</text>

      <text x="16" y="258" fontSize="0">.</text>
      <text x="16" y="266" fontSize="10" className="fill-current text-muted-foreground">A true coelom cushions organs, lets the gut move independently of the wall, and enables bigger, more active bodies.</text>
    </svg>
  );
}
